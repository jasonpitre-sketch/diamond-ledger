/**
 * UCLA SIDEARM BASEBALL ADAPTER — Pass 83 prototype (2026-05-15)
 * Fetches UCLA Sidearm/Nuxt boxscores and normalizes Roch Cholowsky's
 * daily batting line into ingest-game.mjs hitter arguments.
 *
 * Standalone CLI:
 *   node scripts/adapters/ucla-sidearm-baseball.mjs --player roch_cholowsky --date 2026-05-14
 *   node scripts/adapters/ucla-sidearm-baseball.mjs --player roch_cholowsky --boxscore-id 34569
 */

const BASE_URL = "https://uclabruins.com"
const SCHEDULE_URL = `${BASE_URL}/sports/baseball/schedule/2026`
const TIMEOUT_MS = 10_000

const PLAYER_MAP = {
  roch_cholowsky: {
    player_id: "roch_cholowsky",
    name: "Roch Cholowsky",
    sidearmName: "Cholowsky, Roch",
  },
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchText(url, attempt = 1) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`)
    return await res.text()
  } catch (err) {
    clearTimeout(timer)
    if (attempt === 1) {
      await sleep(1_000)
      return fetchText(url, 2)
    }
    throw err
  }
}

function extractNuxtPayload(html) {
  const match = html.match(/<script type="application\/json"[^>]*id="__NUXT_DATA__">([\s\S]*?)<\/script>/)
  if (!match) throw new Error("UCLA boxscore payload not found")
  return JSON.parse(match[1])
}

function reviveNuxtPayload(values) {
  const seen = new Map()

  function revive(value) {
    if (typeof value === "number" && Number.isInteger(value) && value >= 0 && value < values.length) {
      return revive(values[value])
    }

    if (Array.isArray(value)) {
      if (value[0] === "Reactive" || value[0] === "ShallowReactive" || value[0] === "Set") {
        return revive(value[1] ?? [])
      }
      return value.map(revive)
    }

    if (value && typeof value === "object") {
      if (seen.has(value)) return seen.get(value)
      const out = {}
      seen.set(value, out)
      for (const [key, child] of Object.entries(value)) out[key] = revive(child)
      return out
    }

    return value
  }

  return revive(values[0])
}

function parseYMD(date) {
  const [year, month, day] = date.split("-").map(Number)
  return { year, month, day }
}

function scheduleDateLabel(date) {
  const { month, day } = parseYMD(date)
  const monthName = new Date(Date.UTC(2026, month - 1, day)).toLocaleString("en-US", { month: "long", timeZone: "UTC" })
  return `${monthName} ${day}`
}

function normalizeDate(mmddyyyy) {
  const [month, day, year] = mmddyyyy.split("/")
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

function findBoxscoreIdForDate(scheduleHtml, date) {
  const label = scheduleDateLabel(date)
  const links = [...scheduleHtml.matchAll(/<a href="\/boxscore\.aspx\?id=(\d+)"[^>]*aria-label="([^"]+)"/g)]
  const hit = links.find(([, , aria]) => aria.includes(` on ${label} `))
  return hit?.[1] ?? null
}

function firstBoxscoreObject(root) {
  const boxscores = root?.pinia?.boxscore?.boxscore
  if (!boxscores || typeof boxscores !== "object") throw new Error("No boxscore object in UCLA payload")
  const first = Object.values(boxscores)[0]
  if (!first) throw new Error("Empty UCLA boxscore object")
  return first
}

function findPlayer(boxscore, sidearmName) {
  const teams = [boxscore.visitingTeam, boxscore.homeTeam].filter(Boolean)
  for (const team of teams) {
    const player = team.players?.find(p => p.name === sidearmName || p.playerFirstLastName === sidearmName)
    if (player) return { team, player }
  }
  return null
}

function toInt(value) {
  return Number.parseInt(value ?? "0", 10) || 0
}

function buildHitterArgs(rosterRow, boxscore, player) {
  const hitting = player.hitting ?? {}
  const date = normalizeDate(boxscore.gameDate ?? boxscore.venue?.date)
  const oppPrefix = boxscore.thisTeamIsHomeTeam ? "vs" : "@"
  const opp = `${oppPrefix} ${boxscore.opponentTeam ?? boxscore.venue?.homeId ?? "OPP"}`

  return {
    player: rosterRow.player_id,
    date,
    opp,
    ab:  toInt(hitting.atBats),
    r:   toInt(hitting.runsScored),
    h:   toInt(hitting.hits),
    "2b": toInt(hitting.doubles),
    "3b": toInt(hitting.triples),
    hr:  toInt(hitting.homeRuns),
    rbi: toInt(hitting.runsBattedIn),
    bb:  toInt(hitting.walks),
    so:  toInt(hitting.strikeouts),
    sb:  toInt(hitting.stolenBases),
    cs:  toInt(hitting.caughtStealing),
    hbp: toInt(hitting.hitByPitch),
  }
}

export async function fetchLastGame(rosterRow, date) {
  try {
    const playerConfig = PLAYER_MAP[rosterRow.player_id]
    if (!playerConfig) {
      return { status: "error", message: `Unsupported UCLA player: ${rosterRow.player_id}`, ingestionArgs: null, rawResponse: null }
    }

    const scheduleHtml = await fetchText(SCHEDULE_URL)
    const boxscoreId = findBoxscoreIdForDate(scheduleHtml, date)

    if (!boxscoreId) {
      return {
        status: "no_game",
        message: `No UCLA boxscore found for ${date}`,
        ingestionArgs: null,
        rawResponse: { date, scheduleUrl: SCHEDULE_URL },
      }
    }

    return await fetchBoxscorePlayerLine(rosterRow, boxscoreId)
  } catch (err) {
    return { status: "error", message: err.message, ingestionArgs: null, rawResponse: null }
  }
}

export async function fetchBoxscorePlayerLine(rosterRow, boxscoreId) {
  const playerConfig = PLAYER_MAP[rosterRow.player_id]
  if (!playerConfig) {
    return { status: "error", message: `Unsupported UCLA player: ${rosterRow.player_id}`, ingestionArgs: null, rawResponse: null }
  }

  try {
    const boxscoreUrl = `${BASE_URL}/boxscore.aspx?id=${boxscoreId}`
    const html = await fetchText(boxscoreUrl)
    const root = reviveNuxtPayload(extractNuxtPayload(html))
    const boxscore = firstBoxscoreObject(root)
    const found = findPlayer(boxscore, playerConfig.sidearmName)

    if (!found) {
      return {
        status: "no_game",
        message: `${playerConfig.name} did not appear in UCLA boxscore ${boxscoreId}`,
        ingestionArgs: null,
        rawResponse: { boxscoreId, boxscoreUrl },
      }
    }

    const ingestionArgs = buildHitterArgs(rosterRow, boxscore, found.player)
    return {
      status: "success",
      message: `${playerConfig.name}: ${ingestionArgs.ab} AB, ${ingestionArgs.h} H, ${ingestionArgs.bb} BB, ${ingestionArgs.so} SO`,
      ingestionArgs,
      rawResponse: {
        boxscoreId,
        boxscoreUrl,
        gameDate: boxscore.gameDate,
        opponent: boxscore.opponentTeam,
        player: found.player,
      },
    }
  } catch (err) {
    return { status: "error", message: err.message, ingestionArgs: null, rawResponse: { boxscoreId } }
  }
}

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i]
    if (!key.startsWith("--")) continue
    args[key.slice(2)] = argv[i + 1]?.startsWith("--") ? true : argv[++i]
  }
  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const playerId = args.player ?? "roch_cholowsky"
  const rosterRow = { player_id: playerId }

  const result = args["boxscore-id"]
    ? await fetchBoxscorePlayerLine(rosterRow, args["boxscore-id"])
    : await fetchLastGame(rosterRow, args.date)

  console.log(JSON.stringify(result, null, 2))
  process.exit(result.status === "error" ? 1 : 0)
}

if (process.argv[1]?.endsWith("ucla-sidearm-baseball.mjs")) {
  main().catch(err => {
    console.error(err)
    process.exit(1)
  })
}
