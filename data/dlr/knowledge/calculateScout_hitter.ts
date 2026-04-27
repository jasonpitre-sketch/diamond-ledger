/* eslint-disable @typescript-eslint/no-explicit-any */


/* =====================================================
SCOUT → SCOUT LAYER (HITTER)
5 tools contribute
max contribution = 2 pts
===================================================== */

export function calculateKnowledgeScoutScout_Hitter(k:any){

if(!k?.scout?.scouting) return 0

const s = k.scout.scouting


/* convert 20-80 scouting scale to normalized score */

function normalizeFV(fv:number){

if(fv>=70) return 1
if(fv>=65) return .97
if(fv>=60) return .95
if(fv>=55) return .92
if(fv>=50) return .88
if(fv>=45) return .84

return .8

}


let score = 0

score += normalizeFV(s?.hit ?? 50)
score += normalizeFV(s?.power ?? 50)
score += normalizeFV(s?.run ?? 50)
score += normalizeFV(s?.arm ?? 50)
score += normalizeFV(s?.field ?? 50)


/* average of 5 tools → scaled to 2 pt max */

return Number(((score / 5) * 2).toFixed(3))

}