import { readRoleToolGrades } from "@/data/dlr/signalEngine"

export function calculateScoutScoutRows(k:any){

const tools = k?.scout?.scout ?? {}
const weight = 2 / 5

const role =
tools.fastball !== undefined || tools.fb !== undefined
? "pitcher"
: "hitter"

const rows = Object.fromEntries(
readRoleToolGrades(tools, role).map(({ key, normalized }) => [
key,
(normalized ?? 0) * weight
])
)

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
