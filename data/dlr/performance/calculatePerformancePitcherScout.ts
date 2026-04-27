/* eslint-disable @typescript-eslint/no-explicit-any */

function score_kPercent(v:number){

if(v >= 30) return 3
if(v >= 27) return 2.6
if(v >= 24) return 2.2
if(v >= 21) return 1.8

return 1.2
}

function score_bbPercent(v:number){

if(v <= 5) return 2
if(v <= 6.5) return 1.8
if(v <= 8) return 1.6
if(v <= 10) return 1.2

return .8
}

function score_kMinusBB(v:number){

if(v >= 22) return 3
if(v >= 18) return 2.6
if(v >= 15) return 2.2
if(v >= 12) return 1.8

return 1.2
}

function score_whiff(v:number){

if(v >= 32) return 3
if(v >= 29) return 2.6
if(v >= 26) return 2.2
if(v >= 23) return 1.8

return 1.2
}

function score_avgEV(v:number){

if(v <= 86) return 3
if(v <= 88.5) return 2.6
if(v <= 90) return 2.2
if(v <= 92) return 1.6

return 1
}

export function calculatePerformancePitcherScout(player:any){

const s = player?.performance?.scout

if(!s) return 0

let raw = 0

raw += score_kPercent(s.kPercent ?? 20)
raw += score_bbPercent(s.bbPercent ?? 8)
raw += score_kMinusBB(s.kMinusBB ?? 12)
raw += score_whiff(s.whiff ?? 24)
raw += score_avgEV(s.avgEV ?? 90)

return Number(((raw/15)*14).toFixed(2))

}