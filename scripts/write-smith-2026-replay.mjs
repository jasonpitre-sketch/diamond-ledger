#!/usr/bin/env node
import { readFileSync } from "fs"
const replay = JSON.parse(readFileSync(new URL("../games/hagen_smith-2026.json", import.meta.url), "utf8"))
const dryRun = process.argv.includes("--dry-run")
console.log(JSON.stringify({ mode: dryRun ? "dry-run" : "live-disabled", player_id: replay.player_id, weeklyRows: replay.weeklyRows.length, monthly: !!replay.aprilSettlement, finalDlr: replay.weeklyRows.at(-1)?.dlr_score }, null, 2))
if (!dryRun) { console.error("Live write not enabled for scaffold batch."); process.exit(1) }
