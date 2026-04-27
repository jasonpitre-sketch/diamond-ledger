/* eslint-disable @typescript-eslint/no-explicit-any */

/*
ANALYST
max = 18
focus = projection signals
*/

function score_xAVG(v:number){

if(v >= .305) return 3
if(v >= .290) return 2.7
if(v >= .275) return 2.4
if(v >= .260) return 2
if(v >= .245) return 1.6

return 1.2
}


function score_xSLG(v:number){

if(v >= .540) return 3
if(v >= .500) return 2.7
if(v >= .460) return 2.4
if(v >= .430) return 2
if(v >= .390) return 1.6

return 1.2
}


function scale(v:number){

return (v ?? .55) * 3
}



export function calculatePerformanceHitterAnalyst(player:any){

const a = player?.performance?.analyst

if(!a) return 0

let raw = 0

raw += score_xAVG(a.xAVG ?? .260)
raw += score_xSLG(a.xSLG ?? .420)

raw += scale(a.plateDiscTrend)
raw += scale(a.contactTrend)
raw += scale(a.injuryTrend)
raw += scale(a.sprintTrend)
raw += scale(a.posValue)
raw += scale(a.consistency)


return Number(((raw/24)*18).toFixed(2))

}