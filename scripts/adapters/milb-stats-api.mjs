/**
 * MiLB STATS API ADAPTER — Pass 74 (2026-05-14)
 * ═══════════════════════════════════════════════════════════════════════════
 * Fetches the previous-day game for a MiLB player from the MLB Stats API and
 * normalizes the result into ingestionArgs ready to pass to ingest-game.mjs.
 *
 * Plugs into the daily scheduler via the same AdapterResult interface as the
 * MLB Stats API adapter (scripts/adapters/mlb-stats-api.mjs).
 *
 * Interface contract:
 *   fetchLastGame(rosterRow, date) → Promise<AdapterResult>
 *
 * AdapterResult shape:
 *   {
 *     status:        "success" | "no_game" | "error",
 *     message:       string,
 *     ingestionArgs: object | null,   // CLI args shape for ingest-game.mjs
 *     rawResponse:   object | null    // for debugging / logging
 *   }
 *
 * Sport IDs (confirmed against MLB Stats API /api/v1/sports — 2026-05-14):
 *   11 → Triple-A (AAA)
 *   12 → Double-A (AA)
 *   13 → High-A  (A+)
 *   14 → Single-A (A)
 *   16 → Rookie
 *
 * NOTE: The pass 74 spec listed these in the wrong order (14=Triple-A etc).
 * The values above are verified directly from the API sports endpoint.
 * The adapter reads external_sport_id from the roster row — no hardcoded
 * level names appear in the ingestion logic itself.
 *
 * Current players:
 *   eli_willits    — Fredericksburg Nationals (sportId=14, Single-A, WAS affiliate)
 *   ethan_holliday — Fresno Grizzlies         (sportId=14, Single-A, COL affiliate)
 *   kade_anderson  — Arkansas Travelers        (sportId=12, Double-A, SEA affiliate)
 *
 * MiLB-specific quirks vs MLB adapter:
 *   - Stat corrections happen more frequently at lower levels; accept for now
 *   - Doubleheaders more common; ingest first game only (Pass 74 scope)
 *   - Game finalization can lag; codedGameState check not available via this
 *     endpoint — instead only games returned in gameLog are final
 *   - Opponent abbreviation is NOT embedded in game-log split objects;
 *     this adapter uses a complete static ID→abbreviation map for all
 *     120 affiliated MiLB teams across all 4 levels
 *   - Affiliate movement (promotions mid-season) requires manual roster
 *     updates to external_team_id / external_sport_id; no auto-detection
 *
 * Standalone CLI usage:
 *   node scripts/adapters/milb-stats-api.mjs --player eli_willits --date 2026-05-13
 *
 * See: data/dlr/AUTOMATION_RULES.md
 */

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL   = "https://statsapi.mlb.com/api/v1"
const TIMEOUT_MS = 10_000
const RETRY_WAIT = 2_000

// ─────────────────────────────────────────────────────────────────────────────
// MILB TEAM ID → ABBREVIATION MAP
// Covers all 120 affiliated MiLB teams across Triple-A, Double-A, High-A,
// and Single-A as of the 2026 season.
// Source: MLB Stats API /api/v1/teams?sportId={11,12,13,14} — 2026-05-14
// Key: team ID (integer). Value: standard abbreviation string.
// ─────────────────────────────────────────────────────────────────────────────

const MILB_TEAM_ABBR = {
  // ── Triple-A (sportId=11) ──────────────────────────────────────────────
  102: "RR",   // Round Rock Express
  105: "SAC",  // Sacramento River Cats
  234: "DUR",  // Durham Bulls
  235: "MEM",  // Memphis Redbirds
  238: "OKC",  // Oklahoma City Comets
  342: "ABQ",  // Albuquerque Isotopes
  400: "LV",   // Las Vegas Aviators
  416: "LOU",  // Louisville Bats
  422: "BUF",  // Buffalo Bisons
  431: "GWN",  // Gwinnett Stripers
  445: "COL",  // Columbus Clippers
  451: "IOW",  // Iowa Cubs
  484: "IND",  // Indianapolis Indians
  494: "CLT",  // Charlotte Knights
  512: "TOL",  // Toledo Mud Hens
  529: "TAC",  // Tacoma Rainiers
  531: "SWB",  // Scranton/Wilkes-Barre RailRiders
  533: "WOR",  // Worcester Red Sox
  534: "ROC",  // Rochester Red Wings
  541: "OMA",  // Omaha Storm Chasers
  552: "SYR",  // Syracuse Mets
  556: "NAS",  // Nashville Sounds
  561: "SL",   // Salt Lake Bees
  564: "JAX",  // Jacksonville Jumbo Shrimp
  568: "NOR",  // Norfolk Tides
  1410: "LHV", // Lehigh Valley IronPigs
  1960: "STP", // St. Paul Saints
  2310: "RNO", // Reno Aces
  4904: "ELP", // El Paso Chihuahuas
  5434: "SUG", // Sugar Land Space Cowboys

  // ── Double-A (sportId=12) ─────────────────────────────────────────────
  106: "ERI",  // Erie SeaWolves
  237: "MID",  // Midland RockHounds
  247: "BIR",  // Birmingham Barons
  260: "TUL",  // Tulsa Drillers
  402: "AKR",  // Akron RubberDucks
  418: "CHE",  // Chesapeake Baysox
  421: "MTG",  // Montgomery Biscuits
  440: "SPR",  // Springfield Cardinals
  452: "ALT",  // Altoona Curve
  463: "NH",   // New Hampshire Fisher Cats
  482: "CC",   // Corpus Christi Hooks
  498: "CHA",  // Chattanooga Lookouts
  505: "BNG",  // Binghamton Rumble Ponies
  510: "SA",   // San Antonio Missions
  522: "REA",  // Reading Fightin Phils
  538: "HFD",  // Hartford Yard Goats
  540: "FRI",  // Frisco RoughRiders
  546: "POR",  // Portland Sea Dogs
  547: "HBG",  // Harrisburg Senators
  553: "KNX",  // Knoxville Smokies
  559: "RCT",  // Rocket City Trash Pandas
  574: "ARK",  // Arkansas Travelers
  1350: "NWA", // Northwest Arkansas Naturals
  1956: "SOM", // Somerset Patriots
  3410: "RIC", // Richmond Flying Squirrels
  3898: "WCH", // Wichita Wind Surge
  4124: "PNS", // Pensacola Blue Wahoos
  5015: "BLX", // Biloxi Shuckers
  5368: "AMA", // Amarillo Sod Poodles
  6325: "CLB", // Columbus Clingstones (CLB to avoid collision with COL/445)

  // ── High-A (sportId=13) ───────────────────────────────────────────────
  403: "EVE",  // Everett AquaSox
  419: "HIL",  // Hillsboro Hops
  426: "WLM",  // Wilmington Blue Rocks (WLM to avoid collision with WIL/249)
  427: "JS",   // Jersey Shore BlueClaws
  428: "GVL",  // Greenville Drive
  432: "ROM",  // Rome Emperors
  435: "VAN",  // Vancouver Canadians
  437: "LC",   // Lake County Captains
  443: "PEO",  // Peoria Chiefs
  453: "BRK",  // Brooklyn Cyclones
  456: "GL",   // Great Lakes Loons
  459: "DAY",  // Dayton Dragons
  460: "TRI",  // Tri-City Dust Devils
  461: "EUG",  // Eugene Emeralds
  477: "GBO",  // Greensboro Grasshoppers
  486: "SPO",  // Spokane Indians
  492: "CR",   // Cedar Rapids Kernels
  493: "FRD",  // Frederick Keys (FRD to avoid collision with FRE/259)
  499: "LAN",  // Lansing Lugnuts
  537: "HV",   // Hudson Valley Renegades
  550: "SB",   // South Bend Cubs
  554: "BEL",  // Beloit Sky Carp
  565: "QC",   // Quad Cities River Bandits
  572: "WIS",  // Wisconsin Timber Rattlers
  573: "ASH",  // Asheville Tourists
  580: "WS",   // Winston-Salem Dash
  582: "WM",   // West Michigan Whitecaps
  584: "FW",   // Fort Wayne TinCaps
  2498: "BG",  // Bowling Green Hot Rods
  6324: "HCS", // Hub City Spartanburgers

  // ── Single-A (sportId=14) ─────────────────────────────────────────────
  103: "LE",   // Lake Elsinore Storm
  233: "CHS",  // Charleston RiverDogs
  249: "WIL",  // Wilson Warbirds
  259: "FRE",  // Fresno Grizzlies
  279: "PMB",  // Palm Beach Cardinals
  401: "IE",   // Inland Empire 66ers
  414: "SAL",  // Salem RidgeYaks
  424: "DUN",  // Dunedin Blue Jays
  436: "FBG",  // Fredericksburg Nationals
  448: "HIC",  // Hickory Crawdads
  450: "DBT",  // Daytona Tortugas
  476: "SJ",   // San Jose Giants
  478: "AUG",  // Augusta GreenJackets
  479: "JUP",  // Jupiter Hammerheads
  481: "HC",   // Hill City Howlers
  487: "KAN",  // Kannapolis Cannon Ballers
  507: "SLU",  // St. Lucie Mets
  509: "FTM",  // Fort Myers Mighty Mussels
  516: "VIS",  // Visalia Rawhide
  521: "MB",   // Myrtle Beach Pelicans
  524: "STK",  // Stockton Ports
  526: "RC",   // Rancho Cucamonga Quakes
  548: "DEL",  // Delmarva Shorebirds
  566: "CLR",  // Clearwater Threshers
  570: "LAK",  // Lakeland Flying Tigers
  587: "TAM",  // Tampa Tarpons
  3390: "BRD", // Bradenton Marauders
  3705: "CAL", // Columbia Fireflies (CAL to avoid collision with COL/445)
  3712: "FAY", // Fayetteville Woodpeckers
  6482: "ONT", // Ontario Tower Buzzers
}

function teamAbbr(id) {
  if (!id) return "UNK"
  const known = MILB_TEAM_ABBR[id]
  if (known) return known
  // Fallback: return T+id for any team not in the map (future expansions)
  return `T${id}`
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP FETCH WITH TIMEOUT + RETRY
// ─────────────────────────────────────────────────────────────────────────────

async function fetchWithTimeout(url, timeoutMs = TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    return res
  } catch (err) {
    clearTimeout(timer)
    throw err
  }
}

async function fetchJSON(url) {
  let lastError = null
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetchWithTimeout(url)
      if (!res.ok) {
        if (res.status >= 500 && attempt === 1) {
          await sleep(RETRY_WAIT)
          continue
        }
        throw new Error(`HTTP ${res.status} from ${url}`)
      }
      return await res.json()
    } catch (err) {
      lastError = err
      if (attempt === 1 && (err.name === "AbortError" || err.message?.includes("fetch"))) {
        await sleep(RETRY_WAIT)
        continue
      }
      break
    }
  }
  throw lastError ?? new Error(`fetchJSON failed: ${url}`)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ─────────────────────────────────────────────────────────────────────────────
// OPPONENT STRING
// Formats "@ SAL" or "vs FBG" depending on home/away.
// Uses MILB_TEAM_ABBR map; falls back to T{id} for unmapped teams.
// ─────────────────────────────────────────────────────────────────────────────

function formatOpponent(split) {
  const oppId  = split.opponent?.id
  const abbr   = teamAbbr(oppId)
  const isHome = split.isHome ?? false
  return isHome ? `vs ${abbr}` : `@ ${abbr}`
}

// ─────────────────────────────────────────────────────────────────────────────
// HITTER: normalize stat block → ingestionArgs
// Field mapping mirrors MLB adapter exactly.
// ─────────────────────────────────────────────────────────────────────────────

function buildHitterArgs(rosterRow, date, split) {
  const st  = split.stat
  const opp = formatOpponent(split)

  return {
    player: rosterRow.player_id,
    date,
    opp,
    ab:   st.atBats         ?? 0,
    r:    st.runs           ?? 0,
    h:    st.hits           ?? 0,
    "2b": st.doubles        ?? 0,
    "3b": st.triples        ?? 0,
    hr:   st.homeRuns       ?? 0,
    rbi:  st.rbi            ?? 0,
    bb:   st.baseOnBalls    ?? 0,
    so:   st.strikeOuts     ?? 0,
    sb:   st.stolenBases    ?? 0,
    cs:   st.caughtStealing ?? 0,
    hbp:  st.hitByPitch     ?? 0,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PITCHER: normalize stat block → ingestionArgs
// IP convention: MLB Stats API returns inningsPitched as a decimal-thirds
// string (e.g., "5.1" = 5⅓ innings). parseFloat passes it through as-is
// to ingest-game.mjs which expects this convention.
// ─────────────────────────────────────────────────────────────────────────────

function buildPitcherArgs(rosterRow, date, split) {
  const st  = split.stat
  const opp = formatOpponent(split)

  const wins   = st.wins   ?? 0
  const losses = st.losses ?? 0
  const saves  = st.saves  ?? 0
  const holds  = st.holds  ?? 0
  const result = wins   ? "W"
               : losses ? "L"
               : saves  ? "SV"
               : holds  ? "HLD"
               :          "ND"

  const ipRaw = parseFloat(st.inningsPitched ?? "0.0")

  return {
    player: rosterRow.player_id,
    date,
    opp,
    ip:     ipRaw,
    h:      st.hits           ?? 0,
    r:      st.runs           ?? 0,
    er:     st.earnedRuns     ?? 0,
    bb:     st.baseOnBalls    ?? 0,
    k:      st.strikeOuts     ?? 0,
    hr:     st.homeRuns       ?? 0,
    bf:     st.battersFaced   ?? null,
    result,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT: fetchLastGame
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch the most recent game for a roster player on the given date.
 *
 * Reads external_sport_id from rosterRow to route to the correct MiLB level.
 * No level-name parsing — the adapter trusts the sport ID on the row.
 *
 * @param {object} rosterRow  - Row from the roster table
 *                              (player_id, kind, external_player_id, external_sport_id)
 * @param {string} date       - ISO date string YYYY-MM-DD
 * @returns {Promise<AdapterResult>}
 */
export async function fetchLastGame(rosterRow, date) {
  const { player_id, kind, external_player_id, external_sport_id } = rosterRow

  if (!external_player_id) {
    return {
      status:        "error",
      message:       `No external_player_id for ${player_id}`,
      ingestionArgs: null,
      rawResponse:   null,
    }
  }

  if (!external_sport_id) {
    return {
      status:        "error",
      message:       `No external_sport_id for ${player_id} — cannot determine MiLB level`,
      ingestionArgs: null,
      rawResponse:   null,
    }
  }

  const year = date.slice(0, 4)
  const url  = `${BASE_URL}/people/${external_player_id}/stats?stats=gameLog&sportId=${external_sport_id}&season=${year}`

  let data
  try {
    data = await fetchJSON(url)
  } catch (err) {
    return {
      status:        "error",
      message:       `API fetch failed for ${player_id}: ${err.message}`,
      ingestionArgs: null,
      rawResponse:   null,
    }
  }

  // Validate response shape
  const splits = data?.stats?.[0]?.splits
  if (!Array.isArray(splits)) {
    return {
      status:        "error",
      message:       `Unexpected API response shape for ${player_id}`,
      ingestionArgs: null,
      rawResponse:   data,
    }
  }

  // Filter to target date
  const gamesOnDate = splits.filter(s => s.date === date)

  if (gamesOnDate.length === 0) {
    // Surface the last game date in message to help with debugging and email digest
    const lastDate = splits.at(-1)?.date ?? null
    const hint = lastDate ? ` (last game in log: ${lastDate})` : ""
    return {
      status:        "no_game",
      message:       `No game scheduled${hint}`,
      ingestionArgs: null,
      rawResponse:   { totalGamesInLog: splits.length, lastGameDate: lastDate },
    }
  }

  // DNP check: game entry present but player didn't contribute stats
  // Hitter: no atBats field → DNP or pinch-run only (no PA)
  // Pitcher: no inningsPitched or 0.0 → player did not pitch
  const split = gamesOnDate[0]
  const st    = split.stat ?? {}

  const didAppear = kind === "pitcher"
    ? (st.inningsPitched != null && st.inningsPitched !== "0.0" && st.inningsPitched !== 0)
    : (st.atBats != null)

  if (!didAppear) {
    // Distinguish: if the player is on IL/minors assignment vs simply didn't play
    // The game log endpoint only returns games where the player appeared on the lineup/roster;
    // a completely absent player (IL, option) would not appear in the splits at all.
    // So this branch means: game found, player active that day, but didn't get a stat.
    return {
      status:        "no_game",
      message:       "Player did not appear (game found, no stats recorded)",
      ingestionArgs: null,
      rawResponse:   split,
    }
  }

  // Doubleheader: ingest first game only, flag the second
  let message = "OK"
  if (gamesOnDate.length > 1) {
    message = `Doubleheader detected — ingesting game 1 of ${gamesOnDate.length}. Game 2 NOT ingested (Pass 74 scope). Manual ingestion required for game 2.`
    console.warn(`[WARN] ${player_id} has ${gamesOnDate.length} games on ${date} (doubleheader). Ingesting game 1 only.`)
  }

  // Normalize to ingestionArgs
  let ingestionArgs
  try {
    ingestionArgs = kind === "pitcher"
      ? buildPitcherArgs(rosterRow, date, split)
      : buildHitterArgs(rosterRow, date, split)
  } catch (err) {
    return {
      status:        "error",
      message:       `Failed to build ingestionArgs for ${player_id}: ${err.message}`,
      ingestionArgs: null,
      rawResponse:   split,
    }
  }

  return {
    status:        "success",
    message,
    ingestionArgs,
    rawResponse:   split,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// STANDALONE CLI
// node scripts/adapters/milb-stats-api.mjs --player eli_willits --date 2026-05-13
// ─────────────────────────────────────────────────────────────────────────────

const CLI_PLAYER_MAP = {
  eli_willits:    { player_id: "eli_willits",    kind: "hitter",  external_player_id: "816113", external_team_id: "436", external_sport_id: "14" },
  ethan_holliday: { player_id: "ethan_holliday", kind: "hitter",  external_player_id: "815787", external_team_id: "259", external_sport_id: "14" },
  kade_anderson:  { player_id: "kade_anderson",  kind: "pitcher", external_player_id: "807739", external_team_id: "574", external_sport_id: "12" },
}

async function cliMain() {
  const argv = process.argv.slice(2)
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      args[argv[i].slice(2)] = argv[i + 1]
      i++
    }
  }

  const playerId = args.player
  const date     = args.date

  if (!playerId || !date) {
    console.error("Usage: node scripts/adapters/milb-stats-api.mjs --player <player_id> --date <YYYY-MM-DD>")
    console.error(`Known players: ${Object.keys(CLI_PLAYER_MAP).join(", ")}`)
    process.exit(1)
  }

  const rosterRow = CLI_PLAYER_MAP[playerId]
  if (!rosterRow) {
    console.error(`Unknown player: ${playerId}`)
    console.error(`Known players: ${Object.keys(CLI_PLAYER_MAP).join(", ")}`)
    process.exit(1)
  }

  const levelNames = { "11": "Triple-A", "12": "Double-A", "13": "High-A", "14": "Single-A", "16": "Rookie" }
  const levelName  = levelNames[rosterRow.external_sport_id] ?? `sportId=${rosterRow.external_sport_id}`

  console.log(`\n── MiLB Stats API Adapter ────────────────────────────────────`)
  console.log(`  Player  : ${playerId}`)
  console.log(`  MLB ID  : ${rosterRow.external_player_id}`)
  console.log(`  Kind    : ${rosterRow.kind}`)
  console.log(`  Level   : ${levelName} (sportId=${rosterRow.external_sport_id})`)
  console.log(`  Date    : ${date}`)
  console.log(`─────────────────────────────────────────────────────────────\n`)

  const result = await fetchLastGame(rosterRow, date)

  console.log("AdapterResult:")
  console.log(JSON.stringify(result, null, 2))

  if (result.status === "success") {
    console.log("\n✓ Ready to ingest. ingestionArgs:")
    console.log(JSON.stringify(result.ingestionArgs, null, 2))
  } else if (result.status === "no_game") {
    console.log(`\n○ No ingestion needed: ${result.message}`)
  } else {
    console.log(`\n✗ Error: ${result.message}`)
    process.exit(1)
  }
}

if (process.argv[1].endsWith("milb-stats-api.mjs")) {
  cliMain().catch(err => {
    console.error("[FATAL]", err.message)
    process.exit(1)
  })
}
