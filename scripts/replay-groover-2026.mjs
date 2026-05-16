#!/usr/bin/env node
import fs from "node:fs"
const data = JSON.parse(fs.readFileSync(new URL("../games/lujames_groover-2026.json", import.meta.url), "utf8"))
console.log("LuJames Groover 2026 replay dry-run")
console.log(JSON.stringify({ playerId: data.playerId, games: data.games.length, weeklyRows: data.weeklyRows.length, finalDlr: data.weeklyRows.at(-1)?.dlr_score ?? null }, null, 2))
