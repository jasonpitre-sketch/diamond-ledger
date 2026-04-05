export type DLRInputs = {

performance:{

war?:number
ops?:number
trend?:number

ageFactor?:number
consistency?:number
durability?:number

upside?:number
floor?:number
confidence?:number

}

media:{

hype?:number
marketSize?:number
highlightFactor?:number

trend?:number
mentions?:number
buzz?:number

stability?:number
velocity?:number
confidence?:number

}

cardMarket:{

psa10Premium?:number
liquidity?:number
scarcity?:number

trend?:number
volatility?:number
depth?:number

longTerm?:number
stability?:number
confidence?:number

}

}

export type DLROutput = {

rating:number
tier:string

}

/* =========================
HELPERS
========================= */

function clamp(v:number){

return Math.max(
40,
Math.min(
98,
Math.round(v)
)
)

}

/* =========================
MAIN CALC
========================= */

export function calculateDLR(player:any):DLROutput{

if(!player?.dlr){

return{

rating:65,
tier:"AVERAGE"

}

}

const p = player.dlr.performance || {}
const m = player.dlr.media || {}
const c = player.dlr.cardMarket || {}

/* -------------------------
PERFORMANCE
------------------------- */

const performanceScore =

50 +

(p.war ?? 3)*5 +

((p.ops ?? .760)-.700)*90 +

(p.trend ?? .55)*12 +

(p.ageFactor ?? .6)*8 +

(p.consistency ?? .6)*10 +

(p.durability ?? .6)*8 +

(p.upside ?? .7)*10 +

(p.floor ?? .55)*6 +

(p.confidence ?? .6)*10

/* -------------------------
MEDIA
------------------------- */

const mediaScore =

48 +

(m.hype ?? .6)*14 +

(m.marketSize ?? .6)*8 +

(m.highlightFactor ?? .6)*10 +

(m.trend ?? .55)*8 +

(m.mentions ?? .55)*8 +

(m.buzz ?? .6)*10 +

(m.stability ?? .55)*6 +

(m.velocity ?? .6)*8 +

(m.confidence ?? .6)*8

/* -------------------------
CARD MARKET
------------------------- */

const marketScore =

46 +

(c.psa10Premium ?? 1.8)*6 +

(c.liquidity ?? .6)*10 +

(c.scarcity ?? .6)*10 +

(c.trend ?? .6)*10 +

(1-(c.volatility ?? .5))*8 +

(c.depth ?? .6)*8 +

(c.longTerm ?? .7)*12 +

(c.stability ?? .6)*10 +

(c.confidence ?? .6)*10

/* -------------------------
FINAL BLEND
------------------------- */

const rating = clamp(

performanceScore * .46 +
mediaScore * .18 +
marketScore * .36

)

return{

rating,
tier:getTier(rating)

}

}

/* =========================
TIERS
========================= */

function getTier(r:number){

if(r >= 90) return "EXCELLENT"

if(r >= 75) return "GOOD"

if(r >= 60) return "AVERAGE"

return "POOR"

}