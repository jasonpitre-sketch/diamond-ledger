#!/usr/bin/env node
import { readFileSync } from "fs"
const replay = JSON.parse(readFileSync(new URL("../games/travis_bazzana-2026.json", import.meta.url), "utf8"))
console.log(JSON.stringify({ player_id: replay.player_id, games: replay.games.length, weeks: replay.weeklyRows.length, totals: replay.totals, rates: replay.rates, final_dlr: replay.weeklyRows.at(-1)?.dlr_score }, null, 2))
