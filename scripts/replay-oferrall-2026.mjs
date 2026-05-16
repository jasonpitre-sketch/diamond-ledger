#!/usr/bin/env node
import { readFileSync } from "fs"
const r=JSON.parse(readFileSync(new URL("../games/griff_oferrall-2026.json", import.meta.url),"utf8"))
console.log(JSON.stringify({player_id:r.player_id,games:r.games.length,weeks:r.weeklyRows.length,totals:r.totals,rates:r.rates,final_dlr:r.weeklyRows.at(-1)?.dlr_score},null,2))
