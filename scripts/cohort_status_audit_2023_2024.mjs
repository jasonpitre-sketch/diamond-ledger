#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const REPORT_DIR = path.join(ROOT, "reports")
const REPORT_PATH = path.join(REPORT_DIR, "cohort-status-audit-2023-2024.json")
const COHORT_FILES = [
  path.join(ROOT, "data", "playersDraft2023.ts"),
  path.join(ROOT, "data", "playersDraft2024.ts"),
]

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8")
  } catch {
    return null
  }
}

function safeJson(filePath) {
  try {
    return { ok: true, data: JSON.parse(fs.readFileSync(filePath, "utf8")) }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}

function parseCohortIds() {
  const players = []
  for (const filePath of COHORT_FILES) {
    const source = safeRead(filePath)
    if (!source) continue
    const draftYear = Number(filePath.match(/playersDraft(\d{4})/)?.[1])
    const importPattern = /import\s+\{\s*([a-zA-Z0-9_]+)\s*\}\s+from\s+"@\/data\/players\/([^"]+)"/g
    const imports = []
    let match
    while ((match = importPattern.exec(source))) {
      imports.push({ symbol: match[1], id: match[2] })
    }

    for (const item of imports) {
      const symbolIndex = source.indexOf(`...${item.symbol}`)
      const afterSymbol = symbolIndex >= 0 ? source.slice(symbolIndex, symbolIndex + 240) : ""
      const draftPick = Number(afterSymbol.match(/draftPick:\s*(\d+)/)?.[1] ?? NaN)
      players.push({
        id: item.id,
        draftYear,
        draftPick: Number.isFinite(draftPick) ? draftPick : null,
      })
    }
  }
  return players
}

function parseRosterMigrations() {
  const migrationsDir = path.join(ROOT, "supabase", "migrations")
  const result = new Map()
  if (!fs.existsSync(migrationsDir)) return result

  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith("_roster_auto.sql"))
    .sort()

  for (const file of files) {
    const sql = safeRead(path.join(migrationsDir, file))
    if (!sql) continue
    const values = sql.match(/values\s*\((.*?)\)\s*on\s+conflict/is)?.[1]
    if (!values) continue
    const fields = splitSqlValues(values)
    const [playerId, name, kind, level, active, dataSource, externalPlayerId, externalTeamId, externalSportId] = fields
    result.set(playerId, {
      name,
      kind,
      level,
      active,
      dataSource,
      externalPlayerId,
      externalTeamId,
      externalSportId,
      migrationFile: file,
    })
  }
  return result
}

function splitSqlValues(text) {
  const values = []
  let current = ""
  let inQuote = false
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === "'" && text[i + 1] === "'") {
      current += "'"
      i++
      continue
    }
    if (char === "'") {
      inQuote = !inQuote
      continue
    }
    if (char === "," && !inQuote) {
      values.push(coerceSqlValue(current.trim()))
      current = ""
      continue
    }
    current += char
  }
  values.push(coerceSqlValue(current.trim()))
  return values
}

function coerceSqlValue(value) {
  if (value === "true") return true
  if (value === "false") return false
  if (value.toLowerCase() === "null") return null
  if (value.toLowerCase() === "now()") return null
  return value
}

function fileExists(...parts) {
  return fs.existsSync(path.join(ROOT, ...parts))
}

function gameArray(doc) {
  if (Array.isArray(doc.games)) return doc.games
  if (Array.isArray(doc.starts)) return doc.starts
  if (Array.isArray(doc.gameLog)) return doc.gameLog
  return []
}

function rollingStatus(doc) {
  const rolling = doc?.rolling ?? doc?.tracker?.rolling ?? doc?.finalTracker?.rolling
  return {
    hasDays7: Boolean(rolling?.days7),
    hasDays15: Boolean(rolling?.days15),
    hasDays30: Boolean(rolling?.days30),
  }
}

function classify({ player, roster, game }) {
  if (!roster) return {
    status: "not_auto_wired",
    reason: "No roster_auto migration found.",
    schedulerEligible: false,
  }

  if (!roster.externalPlayerId) return {
    status: "source_missing",
    reason: "Auto row exists but external player ID is missing.",
    schedulerEligible: false,
  }

  if (!game.ok) return {
    status: "parse_error",
    reason: `Local game log JSON cannot parse: ${game.error}`,
    schedulerEligible: true,
  }

  const games = gameArray(game.data)
  if (games.length === 0) return {
    status: "auto_zero_games_org_check",
    reason: "Auto source and IDs exist, but local replay found zero 2026 games; verify injury, assignment, release, or org status before treating as broken.",
    schedulerEligible: true,
  }

  const rolling = rollingStatus(game.data)
  if (!rolling.hasDays7 || !rolling.hasDays15 || !rolling.hasDays30) return {
    status: "auto_games_need_rolling_backfill",
    reason: "Game log exists, but one or more rolling windows are missing.",
    schedulerEligible: true,
  }

  const weeklyRows = Array.isArray(game.data.weeklyRows) ? game.data.weeklyRows.length : 0
  const weeklyHistory = Array.isArray(game.data.weeklyHistory) ? game.data.weeklyHistory.length : 0
  const hasWeekly = weeklyRows > 0 || weeklyHistory > 0
  return {
    status: hasWeekly ? "full_replay_like" : "auto_live_game_log",
    reason: hasWeekly
      ? "Has games, rolling windows, and weekly replay history."
      : "Has games and rolling windows; weekly replay rows are not present locally.",
    schedulerEligible: true,
  }
}

function main() {
  fs.mkdirSync(REPORT_DIR, { recursive: true })
  const cohortPlayers = parseCohortIds()
  const rosterById = parseRosterMigrations()

  const players = cohortPlayers.map(player => {
    const gamePath = path.join(ROOT, "games", `${player.id}-2026.json`)
    const gameExists = fs.existsSync(gamePath)
    const game = gameExists ? safeJson(gamePath) : { ok: false, error: "missing games file" }
    const roster = rosterById.get(player.id) ?? null
    const classification = classify({ player, roster, game })
    const games = game.ok ? gameArray(game.data) : []
    const rolling = game.ok ? rollingStatus(game.data) : { hasDays7: false, hasDays15: false, hasDays30: false }

    return {
      ...player,
      name: roster?.name ?? null,
      kind: roster?.kind ?? null,
      level: roster?.level ?? null,
      dataSource: roster?.dataSource ?? null,
      externalPlayerId: roster?.externalPlayerId ?? null,
      externalTeamId: roster?.externalTeamId ?? null,
      externalSportId: roster?.externalSportId ?? null,
      files: {
        composite: fileExists("data", "players", `${player.id}.ts`),
        knowledge: fileExists("data", "players", `${player.id}_knowledge.ts`),
        performance: fileExists("data", "players", `${player.id}_performance.ts`),
        media: fileExists("data", "players", `${player.id}_media.ts`),
        market: fileExists("data", "players", `${player.id}_market.ts`),
        games: gameExists,
      },
      gameLog: {
        parseOk: game.ok,
        parseError: game.ok ? null : game.error,
        games: games.length,
        rolling,
        weeklyRows: game.ok && Array.isArray(game.data.weeklyRows) ? game.data.weeklyRows.length : 0,
        weeklyHistory: game.ok && Array.isArray(game.data.weeklyHistory) ? game.data.weeklyHistory.length : 0,
      },
      ...classification,
    }
  })

  const byStatus = players.reduce((acc, player) => {
    acc[player.status] = (acc[player.status] ?? 0) + 1
    return acc
  }, {})
  const bySource = players.reduce((acc, player) => {
    const source = player.dataSource ?? "missing"
    acc[source] = (acc[source] ?? 0) + 1
    return acc
  }, {})
  const byYear = players.reduce((acc, player) => {
    acc[player.draftYear] = (acc[player.draftYear] ?? 0) + 1
    return acc
  }, {})

  const report = {
    generatedAt: new Date().toISOString(),
    scope: "2023 and 2024 draft cohort files",
    method: "local files only; no external scrape; roster_auto migrations used for source/ID audit",
    totals: {
      players: players.length,
      schedulerEligible: players.filter(player => player.schedulerEligible).length,
      withGames: players.filter(player => player.gameLog.games > 0).length,
      zeroGameLogs: players.filter(player => player.gameLog.parseOk && player.gameLog.games === 0).length,
      parseErrors: players.filter(player => !player.gameLog.parseOk).length,
      withCompleteDomainFiles: players.filter(player => Object.values(player.files).every(Boolean)).length,
    },
    byStatus,
    bySource,
    byYear,
    players,
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`)

  console.log(`[OK] audited ${players.length} cohort players`)
  console.log(`[OK] scheduler eligible: ${report.totals.schedulerEligible}`)
  console.log(`[OK] with games: ${report.totals.withGames}`)
  console.log(`[OK] zero-game logs: ${report.totals.zeroGameLogs}`)
  console.log(`[OK] parse errors: ${report.totals.parseErrors}`)
  console.log(`[OK] statuses: ${JSON.stringify(byStatus)}`)
  console.log(`[OK] report: ${path.relative(ROOT, REPORT_PATH)}`)
}

main()
