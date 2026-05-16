#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const GAMES_DIR = path.join(ROOT, "games")
const REPORT_DIR = path.join(ROOT, "reports")
const BACKUP_DIR = path.join(ROOT, ".backups", "cohort-normalization", timestamp())
const REPORT_PATH = path.join(REPORT_DIR, "cohort-normalization-2023-2024.json")
const WINDOWS = [7, 15, 30]

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-")
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value)
}

function numberOrZero(value) {
  return isFiniteNumber(value) ? value : 0
}

function round(value, places = 3) {
  return isFiniteNumber(value) ? Number(value.toFixed(places)) : null
}

function dateMs(date) {
  return new Date(`${date}T12:00:00Z`).getTime()
}

function validDate(date) {
  return typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(dateMs(date))
}

function inferRole(doc, games) {
  const explicit = doc.role || doc.kind || doc.playerKind
  if (explicit === "hitter" || explicit === "pitcher") return explicit
  const first = games.find(isPlainObject) || {}
  if ("ip" in first || "er" in first || "outs" in first) return "pitcher"
  return "hitter"
}

function ipToOuts(ip) {
  if (isFiniteNumber(ip)) return Math.round(Math.floor(ip) * 3 + Math.round((ip % 1) * 10))
  const text = String(ip ?? "0")
  const [whole, frac = "0"] = text.split(".")
  return Number(whole || 0) * 3 + Number(frac || 0)
}

function outsToIpDecimal(outs) {
  return outs / 3
}

function gameOuts(game) {
  if (isFiniteNumber(game.outs)) return game.outs
  if (isFiniteNumber(game.ip_real)) return Math.round(game.ip_real * 3)
  if (isFiniteNumber(game.bip)) return ipToOuts(game.bip)
  return ipToOuts(game.ip)
}

function hasValidRollingWindow(value, role) {
  if (!isPlainObject(value)) return false
  if (role === "pitcher") {
    return ["IP", "ERA", "WHIP", "SO", "BB", "H", "ER"].every(key => key in value) &&
      Object.values(value).every(v => v === null || (typeof v !== "number" || Number.isFinite(v)))
  }
  return ["AVG", "OBP", "SLG", "OPS", "HR", "RBI", "SB", "H", "AB", "BB", "SO"].every(key => key in value) &&
    Object.values(value).every(v => v === null || (typeof v !== "number" || Number.isFinite(v)))
}

function needsRollingPatch(doc, role) {
  const rolling = doc.rolling
  if (!isPlainObject(rolling)) return true
  return WINDOWS.some(days => !hasValidRollingWindow(rolling[`days${days}`], role))
}

function gameKey(game, index) {
  return game.id || game.gamePk || game.gameId || [game.date, game.team, game.opp, game.g ?? index].join("|")
}

function validateGame(game, role) {
  if (!isPlainObject(game)) return { ok: false, reason: "not_object" }
  if (!validDate(game.date)) return { ok: false, reason: "missing_or_invalid_date" }

  const numericKeys = role === "pitcher"
    ? ["outs", "h", "er", "bb", "k", "so", "sv", "qs", "hr", "r"]
    : ["ab", "h", "tb", "hr", "rbi", "bb", "so", "k", "sb", "cs", "hbp", "sf"]

  for (const key of numericKeys) {
    if (key in game && game[key] !== null && game[key] !== undefined && !isFiniteNumber(game[key])) {
      return { ok: false, reason: `non_numeric_${key}` }
    }
  }

  if (role === "pitcher" && !("outs" in game) && !("ip" in game) && !("ip_real" in game) && !("bip" in game)) {
    return { ok: false, reason: "missing_ip" }
  }

  return { ok: true }
}

function rollingHitters(games, targetDate, daysBack) {
  const target = dateMs(targetDate)
  const cutoff = target - (daysBack - 1) * 24 * 60 * 60 * 1000
  const window = games.filter(game => {
    const ms = dateMs(game.date)
    return ms >= cutoff && ms <= target
  })
  if (window.length === 0) return null

  const AB = window.reduce((sum, game) => sum + numberOrZero(game.ab), 0)
  const H = window.reduce((sum, game) => sum + numberOrZero(game.h), 0)
  const BB = window.reduce((sum, game) => sum + numberOrZero(game.bb), 0)
  const TB = window.reduce((sum, game) => sum + numberOrZero(game.tb), 0)
  const HR = window.reduce((sum, game) => sum + numberOrZero(game.hr), 0)
  const RBI = window.reduce((sum, game) => sum + numberOrZero(game.rbi), 0)
  const SB = window.reduce((sum, game) => sum + numberOrZero(game.sb), 0)
  const SO = window.reduce((sum, game) => sum + numberOrZero(game.so ?? game.k), 0)

  const AVG = AB > 0 ? H / AB : null
  const OBP = AB + BB > 0 ? (H + BB) / (AB + BB) : null
  const SLG = AB > 0 ? TB / AB : null
  const OPS = OBP !== null && SLG !== null ? OBP + SLG : null

  return { games: window.length, AB, H, BB, SO, HR, RBI, SB, AVG: round(AVG), OBP: round(OBP), SLG: round(SLG), OPS: round(OPS) }
}

function rollingPitchers(games, targetDate, daysBack) {
  const target = dateMs(targetDate)
  const cutoff = target - (daysBack - 1) * 24 * 60 * 60 * 1000
  const window = games.filter(game => {
    const ms = dateMs(game.date)
    return ms >= cutoff && ms <= target
  })
  if (window.length === 0) return null

  const outs = window.reduce((sum, game) => sum + gameOuts(game), 0)
  const IP = outsToIpDecimal(outs)
  const H = window.reduce((sum, game) => sum + numberOrZero(game.h), 0)
  const ER = window.reduce((sum, game) => sum + numberOrZero(game.er), 0)
  const BB = window.reduce((sum, game) => sum + numberOrZero(game.bb), 0)
  const SO = window.reduce((sum, game) => sum + numberOrZero(game.so ?? game.k), 0)
  const SV = window.reduce((sum, game) => sum + numberOrZero(game.sv), 0)
  const QS = window.reduce((sum, game) => sum + numberOrZero(game.qs), 0)
  const ERA = IP > 0 ? (ER * 9) / IP : null
  const WHIP = IP > 0 ? (BB + H) / IP : null

  return { games: window.length, IP: round(IP, 1), SO, BB, H, ER, SV, QS, ERA: round(ERA, 2), WHIP: round(WHIP, 3) }
}

function normalizePlayer(filePath) {
  const fileName = path.basename(filePath)
  const result = {
    file: fileName,
    playerId: fileName.replace(/-2026\.json$/, ""),
    status: "processed",
    role: null,
    gamesRead: 0,
    gamesUsed: 0,
    malformedLogs: [],
    duplicateGames: [],
    missingDates: [],
    rebuiltRollingWindows: [],
    failedValidations: [],
    wroteFile: false,
    backupPath: null,
  }

  let raw
  let doc
  try {
    raw = fs.readFileSync(filePath, "utf8")
    doc = JSON.parse(raw)
  } catch (error) {
    result.status = "skipped"
    result.failedValidations.push(`json_parse_failed:${error.message}`)
    return result
  }

  if (!isPlainObject(doc) || !Array.isArray(doc.games)) {
    result.status = "skipped"
    result.failedValidations.push("missing_games_array")
    return result
  }

  result.gamesRead = doc.games.length
  const role = inferRole(doc, doc.games)
  result.role = role
  const seen = new Set()
  const validGames = []

  doc.games.forEach((game, index) => {
    const validation = validateGame(game, role)
    if (!validation.ok) {
      result.malformedLogs.push({ index, reason: validation.reason })
      if (validation.reason === "missing_or_invalid_date") result.missingDates.push(index)
      return
    }

    const key = gameKey(game, index)
    if (seen.has(key)) {
      result.duplicateGames.push({ index, key })
      return
    }
    seen.add(key)
    validGames.push(game)
  })

  validGames.sort((a, b) => a.date.localeCompare(b.date))
  result.gamesUsed = validGames.length

  if (validGames.length === 0) {
    if (needsRollingPatch(doc, role)) {
      doc.rolling = doc.rolling ?? { days7: null, days15: null, days30: null }
      for (const days of WINDOWS) {
        if (!hasValidRollingWindow(doc.rolling[`days${days}`], role)) {
          doc.rolling[`days${days}`] = null
          result.rebuiltRollingWindows.push(`days${days}`)
        }
      }
    }
  } else {
    const lastDate = validGames.at(-1).date
    doc.rolling = isPlainObject(doc.rolling) ? doc.rolling : {}
    for (const days of WINDOWS) {
      const key = `days${days}`
      if (hasValidRollingWindow(doc.rolling[key], role)) continue
      doc.rolling[key] = role === "pitcher"
        ? rollingPitchers(validGames, lastDate, days)
        : rollingHitters(validGames, lastDate, days)
      result.rebuiltRollingWindows.push(key)
    }
  }

  const sortedChanged = JSON.stringify(doc.games) !== JSON.stringify(validGames) && validGames.length === doc.games.length
  if (sortedChanged) doc.games = validGames

  if (result.rebuiltRollingWindows.length > 0 || sortedChanged) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true })
    const backupPath = path.join(BACKUP_DIR, fileName)
    fs.copyFileSync(filePath, backupPath)
    result.backupPath = path.relative(ROOT, backupPath)
    fs.writeFileSync(filePath, `${JSON.stringify(doc, null, 2)}\n`)
    result.wroteFile = true
  }

  return result
}

function main() {
  fs.mkdirSync(REPORT_DIR, { recursive: true })
  const files = fs.readdirSync(GAMES_DIR)
    .filter(file => file.endsWith("-2026.json"))
    .sort()
    .map(file => path.join(GAMES_DIR, file))

  const results = files.map(normalizePlayer)
  const processed = results.filter(item => item.status === "processed")
  const skipped = results.filter(item => item.status === "skipped")
  const rebuilt = results.filter(item => item.rebuiltRollingWindows.length > 0)
  const warnings = results.filter(item => item.malformedLogs.length || item.duplicateGames.length || item.failedValidations.length)

  const report = {
    generatedAt: new Date().toISOString(),
    source: "local games/*-2026.json only",
    processedPlayers: processed.length,
    skippedPlayers: skipped.length,
    malformedLogs: results.reduce((sum, item) => sum + item.malformedLogs.length, 0),
    duplicateGames: results.reduce((sum, item) => sum + item.duplicateGames.length, 0),
    missingDates: results.reduce((sum, item) => sum + item.missingDates.length, 0),
    rebuiltRollingWindows: rebuilt.reduce((sum, item) => sum + item.rebuiltRollingWindows.length, 0),
    failedValidations: results.reduce((sum, item) => sum + item.failedValidations.length, 0),
    players: results,
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`)

  for (const item of rebuilt.slice(0, 30)) {
    console.log(`[OK] ${item.playerId} rebuilt ${item.rebuiltRollingWindows.map(key => `rolling.${key}`).join(", ")}`)
  }
  for (const item of warnings.slice(0, 20)) {
    if (item.status === "skipped") console.log(`[SKIP] ${item.playerId} ${item.failedValidations.join(", ")}`)
    else if (item.duplicateGames.length) console.log(`[WARN] duplicate game IDs for ${item.playerId}`)
    else if (item.malformedLogs.length) console.log(`[WARN] malformed logs for ${item.playerId}`)
  }

  console.log(`Summary: processed=${processed.length} skipped=${skipped.length} rebuilt=${report.rebuiltRollingWindows} warnings=${warnings.length}`)
  console.log(`Report: ${path.relative(ROOT, REPORT_PATH)}`)
}

main()
