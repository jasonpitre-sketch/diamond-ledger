/**
 * MLB STATS API ADAPTER — Pass 72
 * ═══════════════════════════════════════════════════════════════════════════
 * Fetches the previous-day game for a player from the MLB Stats API and
 * normalizes the result into ingestionArgs ready to pass to ingest-game.mjs.
 *
 * Interface contract:
 *   fetchLastGame(rosterRow, date) → Promise<AdapterResult>
 *
 * AdapterResult shape:
 *   {
 *     status:       "success" | "no_game" | "error",
 *     message:      string,
 *     ingestionArgs: object | null,   // CLI args shape for ingest-game.mjs
 *     rawResponse:  object | null     // for debugging / logging
 *   }
 *
 * Design rules:
 *   - Never throws. All errors return { status: "error", ... }
 *   - Retries once on transient failure (5xx / network timeout)
 *   - Game log endpoint only returns finalized games — presence = final
 *   - DNP (team played, player absent) returns { status: "no_game" }
 *   - IL players return { status: "no_game", message: "Player did not appear" }
 *
 * Standalone CLI usage:
 *   node scripts/adapters/mlb-stats-api.mjs --player alec_bohm --date 2026-05-13
 *
 * See: data/dlr/MLB_AUTOMATION_RULES.md
 */

import { createRequire } from "module"

const BASE_URL   = "https://statsapi.mlb.com/api/v1"
const TIMEOUT_MS = 10_000
const RETRY_WAIT = 2_000

// ─────────────────────────────────────────────────────────────────────────────
// TEAM ID → ABBREVIATION MAP
// Full MLB roster as of 2026 season. Covers all 30 teams.
// ─────────────────────────────────────────────────────────────────────────────
const TEAM_ABBR = {
  108: "LAA", 109: "ARI", 110: "BAL", 111: "BOS", 112: "CHC",
  113: "CIN", 114: "CLE", 115: "COL", 116: "DET", 117: "HOU",
  118: "KC",  119: "LAD", 120: "WSH", 121: "NYM", 133: "OAK",
  134: "PIT", 135: "SD",  136: "SEA", 137: "SF",  138: "STL",
  139: "TB",  140: "TEX", 141: "TOR", 142: "MIN", 143: "PHI",
  144: "ATL", 145: "CWS", 146: "MIA", 147: "NYY", 158: "MIL",
}

function teamAbbr(id) {
  return TEAM_ABBR[id] ?? `T${id}`
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
          // Transient server error — retry once
          await sleep(RETRY_WAIT)
          continue
        }
        throw new Error(`HTTP ${res.status} from ${url}`)
      }
      return await res.json()
    } catch (err) {
      lastError = err
      if (attempt === 1 && (err.name === "AbortError" || err.message?.includes("fetch"))) {
        // Network timeout or connectivity — retry once
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
// HITTER: normalize stat block → ingestionArgs
// ─────────────────────────────────────────────────────────────────────────────

function buildHitterArgs(rosterRow, date, split) {
  const st  = split.stat
  const opp = formatOpponent(split)

  return {
    player: rosterRow.player_id,
    date,
    opp,
    ab:  st.atBats         ?? 0,
    r:   st.runs           ?? 0,
    h:   st.hits           ?? 0,
    "2b": st.doubles       ?? 0,
    "3b": st.triples       ?? 0,
    hr:  st.homeRuns       ?? 0,
    rbi: st.rbi            ?? 0,
    bb:  st.baseOnBalls    ?? 0,
    so:  st.strikeOuts     ?? 0,
    sb:  st.stolenBases    ?? 0,
    cs:  st.caughtStealing ?? 0,
    hbp: st.hitByPitch     ?? 0,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PITCHER: normalize stat block → ingestionArgs
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

  // MLB Stats API returns IP as baseball notation string e.g. "6.0", "5.1"
  // ingest-game.mjs expects this as a number — parseFloat preserves the notation
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
// OPPONENT STRING
// Formats "@ BOS" or "vs MIL" depending on home/away
// ─────────────────────────────────────────────────────────────────────────────

function formatOpponent(split) {
  const oppId   = split.opponent?.id
  const abbr    = oppId ? teamAbbr(oppId) : "UNK"
  const isHome  = split.isHome ?? false
  return isHome ? `vs ${abbr}` : `@ ${abbr}`
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT: fetchLastGame
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch the most recent game for a roster player on the given date.
 *
 * @param {object} rosterRow   - Row from the roster table (player_id, kind, external_player_id, external_sport_id)
 * @param {string} date        - ISO date string YYYY-MM-DD
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

  const year = date.slice(0, 4)
  const url  = `${BASE_URL}/people/${external_player_id}/stats?stats=gameLog&sportId=${external_sport_id ?? 1}&season=${year}`

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
    if (Array.isArray(data?.stats) && data.stats.length === 0) {
      return {
        status:        "no_game",
        message:       "No 2026 game log yet",
        ingestionArgs: null,
        rawResponse:   { totalGamesInLog: 0, lastGameDate: null },
      }
    }
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
    return {
      status:        "no_game",
      message:       "No game scheduled",
      ingestionArgs: null,
      rawResponse:   { totalGamesInLog: splits.length, lastGameDate: splits.at(-1)?.date ?? null },
    }
  }

  // DNP check: if game entry has no meaningful stat, the player didn't appear
  const split = gamesOnDate[0]
  const st    = split.stat ?? {}
  const didAppear = kind === "pitcher"
    ? (st.inningsPitched != null && st.inningsPitched !== "0.0")
    : (st.atBats != null)

  if (!didAppear) {
    return {
      status:        "no_game",
      message:       "Player did not appear",
      ingestionArgs: null,
      rawResponse:   split,
    }
  }

  // Doubleheader: flag second game (out of scope for Pass 72)
  if (gamesOnDate.length > 1) {
    console.warn(`[WARN] ${player_id} has ${gamesOnDate.length} games on ${date} (doubleheader). Ingesting game 1 only.`)
    // Fall through — ingests gamesOnDate[0], second game flagged in message
  }

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
    status: "success",
    message: gamesOnDate.length > 1
      ? `Doubleheader — ingesting game 1 of 2. Game 2 requires manual ingestion.`
      : "OK",
    ingestionArgs,
    rawResponse: split,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// STANDALONE CLI  (node scripts/adapters/mlb-stats-api.mjs --player X --date Y)
// ─────────────────────────────────────────────────────────────────────────────

// External player IDs for CLI testing without Supabase
const CLI_PLAYER_MAP = {
  alec_bohm:    { player_id: "alec_bohm",    kind: "hitter",  external_player_id: "664761", external_sport_id: "1" },
  brice_turang: { player_id: "brice_turang", kind: "hitter",  external_player_id: "668930", external_sport_id: "1" },
  brady_singer: { player_id: "brady_singer", kind: "pitcher", external_player_id: "663903", external_sport_id: "1" },
  casey_mize:   { player_id: "casey_mize",   kind: "pitcher", external_player_id: "663554", external_sport_id: "1" },
  matthew_liberatore: { player_id: "matthew_liberatore", kind: "pitcher", external_player_id: "669461", external_sport_id: "1" },
  bo_naylor:    { player_id: "bo_naylor",    kind: "hitter",  external_player_id: "666310", external_sport_id: "1" },
  jake_mccarthy:{ player_id: "jake_mccarthy",kind: "hitter",  external_player_id: "664983", external_sport_id: "1" },
  chase_burns:  { player_id: "chase_burns",  kind: "pitcher", external_player_id: "695505", external_sport_id: "1" },
  nick_kurtz:   { player_id: "nick_kurtz",   kind: "hitter",  external_player_id: "701762", external_sport_id: "1" },
  jac_caglianone: { player_id: "jac_caglianone", kind: "hitter", external_player_id: "695506", external_sport_id: "1" },
  jj_wetherholt: { player_id: "jj_wetherholt", kind: "hitter", external_player_id: "802139", external_sport_id: "1" },
  cam_smith:    { player_id: "cam_smith",    kind: "hitter",  external_player_id: "701358", external_sport_id: "1" },
  carson_benge: { player_id: "carson_benge", kind: "hitter",  external_player_id: "701807", external_sport_id: "1" },
  trey_yesavage:{ player_id: "trey_yesavage",kind: "pitcher", external_player_id: "702056", external_sport_id: "1" },
  ryan_waldschmidt: { player_id: "ryan_waldschmidt", kind: "hitter", external_player_id: "814439", external_sport_id: "1" },
  payton_tolle: { player_id: "payton_tolle", kind: "pitcher", external_player_id: "801139", external_sport_id: "1" },
  paul_skenes: { player_id: "paul_skenes", kind: "pitcher", external_player_id: "694973", external_sport_id: "1" },
  wyatt_langford: { player_id: "wyatt_langford", kind: "hitter", external_player_id: "694671", external_sport_id: "1" },
  jacob_wilson: { player_id: "jacob_wilson", kind: "hitter", external_player_id: "805779", external_sport_id: "1" },
  rhett_lowder: { player_id: "rhett_lowder", kind: "pitcher", external_player_id: "695076", external_sport_id: "1" },
  chase_dollander: { player_id: "chase_dollander", kind: "pitcher", external_player_id: "801403", external_sport_id: "1" },
  nolan_schanuel: { player_id: "nolan_schanuel", kind: "hitter", external_player_id: "694384", external_sport_id: "1" },
  matt_shaw: { player_id: "matt_shaw", kind: "hitter", external_player_id: "807713", external_sport_id: "1" },
  bryce_eldridge: { player_id: "bryce_eldridge", kind: "hitter", external_player_id: "805811", external_sport_id: "1" },
  hurston_waldrep: { player_id: "hurston_waldrep", kind: "pitcher", external_player_id: "694462", external_sport_id: "1" },
  brice_matthews: { player_id: "brice_matthews", kind: "hitter", external_player_id: "694728", external_sport_id: "1" },
  kevin_mcgonigle: { player_id: "kevin_mcgonigle", kind: "hitter", external_player_id: "805808", external_sport_id: "1" },
  luke_keaschall: { player_id: "luke_keaschall", kind: "hitter", external_player_id: "807712", external_sport_id: "1" },
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
    console.error("Usage: node scripts/adapters/mlb-stats-api.mjs --player <player_id> --date <YYYY-MM-DD>")
    process.exit(1)
  }

  const rosterRow = CLI_PLAYER_MAP[playerId]
  if (!rosterRow) {
    console.error(`Unknown player: ${playerId}. Known: ${Object.keys(CLI_PLAYER_MAP).join(", ")}`)
    process.exit(1)
  }

  console.log(`\n── MLB Stats API Adapter ─────────────────────────────────────`)
  console.log(`  Player : ${playerId}  (ID: ${rosterRow.external_player_id}, kind: ${rosterRow.kind})`)
  console.log(`  Date   : ${date}`)
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

// Run as CLI if invoked directly
if (process.argv[1].endsWith("mlb-stats-api.mjs")) {
  cliMain().catch(err => {
    console.error("[FATAL]", err.message)
    process.exit(1)
  })
}
