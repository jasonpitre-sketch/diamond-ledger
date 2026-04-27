export function calculateScoutScoutRows(k:any){

const tools = k?.scout?.scout ?? {}

function normalize(grade:number){

if(!grade) return 0

// convert 20-80 scouting scale → 0-1
return Math.max(0,Math.min(1,(grade-20)/60))

}

const weight = 2 / 5

/* =========================
HITTER TOOLS
========================= */

const hitter = {

hit:
normalize(tools.hit) * weight,

power:
normalize(tools.power) * weight,

run:
normalize(tools.run) * weight,

arm:
normalize(tools.arm) * weight,

field:
normalize(tools.field) * weight

}

/* =========================
PITCHER TOOLS
========================= */

const pitcher = {

fastball:
normalize(tools.fastball) * weight,

slider:
normalize(tools.slider) * weight,

splitter:
normalize(tools.splitter) * weight,

command:
normalize(tools.command) * weight,

overallFV:
normalize(tools.overallFV) * weight

}

/* =========================
AUTO SELECT TYPE
========================= */

const rows =
tools.fastball !== undefined
? pitcher
: hitter

const total =
Object.values(rows).reduce(
(sum:number,v:any)=>sum+(v||0),
0
)

return {

...rows,
total

}

}