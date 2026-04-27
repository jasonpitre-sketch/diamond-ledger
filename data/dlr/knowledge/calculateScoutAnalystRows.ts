export function calculateKnowledgeScoutAnalyst(k:any){

const a = k?.scout?.analyst ?? {}

function clamp(v:number){

if(v===undefined || v===null) return 0

return Math.max(0,Math.min(1,v))

}

/*
Scout → Analyst max = 3 total
7 rows → equal weighting
*/

const weight = 3 / 7

return {

ceiling:
clamp(a.ceiling) * weight,

floor:
clamp(a.floor) * weight,

roleProb:
clamp(a.roleProb) * weight,

skillTrend:
clamp(a.skillTrend) * weight,

volatility:
clamp(a.volatility) * weight,

orgFit:
clamp(a.orgFit) * weight,

riskTrend:
clamp(a.riskTrend) * weight

}

}