#!/usr/bin/env node
import fs from "node:fs"
const data = JSON.parse(fs.readFileSync(new URL("../games/kemp_alderman-2026.json", import.meta.url), "utf8"))
const dryRun = process.argv.includes("--dry-run")
console.log("Kemp Alderman replay writer " + (dryRun ? "dry-run" : "dry-run only"))
console.log(JSON.stringify({ playerId: data.playerId, weeklyRows: data.weeklyRows.length, monthlyRows: data.monthlyRows.length, hotCache: data.weeklyRows.at(-1)?.dlr_score ?? null }, null, 2))
