/* =========================
DLR CONFIDENCE ENGINE
========================= */

export function calculatePitcherConfidence(p:any){

let score = 0

const ip =
p.performance?.snapshot?.ip ??
0

const injury =
p.performance?.analyst?.injuryTrend ??
.5

const role =
p.performance?.analyst?.roleStability ??
.5


/* sample size */

if(ip >= 170) score += 35
else if(ip >= 130) score += 30
else if(ip >= 90) score += 25
else if(ip >= 50) score += 18
else if(ip >= 20) score += 10
else score += 5


/* durability */

score += injury * 25


/* role certainty */

score += role * 25


/* recency baseline */

score += 15


return Math.round(score)

}



/* =========================
HITTER CONFIDENCE
========================= */

export function calculateHitterConfidence(p:any){

let score = 0

const pa =
p.performance?.snapshot?.pa ??
0

const injury =
p.performance?.analyst?.injuryTrend ??
.5

const consistency =
p.performance?.analyst?.consistency ??
.5


/* sample size */

if(pa >= 600) score += 35
else if(pa >= 450) score += 30
else if(pa >= 300) score += 25
else if(pa >= 180) score += 18
else if(pa >= 80) score += 10
else score += 5


/* health stability */

score += injury * 25


/* performance stability */

score += consistency * 25


/* recency baseline */

score += 15


return Math.round(score)

}



/* =========================
AUTO ROUTER
========================= */

export function calculateConfidence(player:any){

const isPitcher =
player?.position === "SP" ||
player?.position === "RP" ||
player?.position === "LHP" ||
player?.position === "RHP"

return isPitcher
? calculatePitcherConfidence(player)
: calculateHitterConfidence(player)

}