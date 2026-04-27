/* eslint-disable @typescript-eslint/no-explicit-any */

function score_xERA(v:number){

if(v <= 2.80) return 3
if(v <= 3.30) return 2.6
if(v <= 3.80) return 2.2
if(v <= 4.20) return 1.6
if(v <= 4.60) return 1

return .6
}

function score_stuff(v:number){

if(v >= 115) return 3
if(v >= 110) return 2.6
if(v >= 105) return 2.2
if(v >= 100) return 1.8
if(v >= 95) return 1.2

return .6
}

function scale(v:number){

return (v ?? .5) * 3

}

function score_war(v:number){

if(v >= 6) return 3
if(v >= 5) return 2.7
if(v >= 4) return 2.4
if(v >= 3) return 2
if(v >= 2) return 1.6
if(v >= 1) return 1.2
if(v >= 0) return .8

return .4

}


export function calculatePerformancePitcherAnalyst(player:any){

const a = player?.performance?.analyst

if(!a) return 0

let raw = 0

raw += score_xERA(a.xERA ?? 4.2)
raw += score_stuff(a.stuffPlus ?? 95)

raw += scale(a.pitchMixGrade)
raw += scale(a.veloTrend)
raw += scale(a.commandTrend)
raw += scale(a.injuryTrend)
raw += scale(a.roleStability)

raw += score_war(a.war ?? 2.4)

/*
8 metrics total
max raw score = 24
normalized to 18 DLR scale
*/

return Number(((raw / 24) * 18).toFixed(2))

}