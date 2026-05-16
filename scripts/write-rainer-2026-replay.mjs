#!/usr/bin/env node
import { readFileSync } from "fs"
const r=JSON.parse(readFileSync(new URL("../games/bryce_rainer-2026.json", import.meta.url),"utf8"))
const dry=process.argv.includes("--dry-run")
console.log(JSON.stringify({mode:dry?"dry-run":"live-disabled",player_id:r.player_id,weeklyRows:r.weeklyRows.length,finalDlr:r.weeklyRows.at(-1)?.dlr_score},null,2))
if(!dry){console.error("Live write not enabled for scaffold batch.");process.exit(1)}
