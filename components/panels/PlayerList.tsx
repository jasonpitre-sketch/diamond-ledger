"use client"

import styles from "./PlayerList.module.css"

import { playersDraft2026 } from "@/data/playersDraft2026"
import { playersDraft2025 } from "@/data/playersDraft2025"
import { playersDraft2018 } from "@/data/playersDraft2018"
import {
calculatePlayerSignals,
directionScore,
toneScore,
type SignalDirection,
type SignalTone,
type StatRecord
} from "@/data/dlr/signals/playerSignals"


import { useCallback, useMemo, useState } from "react"

type Props = {
selected: string | null
onSelect: (id:string)=>void
mode?: "draft" | "players" | "tracked"
}

type SortDir = "asc" | "desc"

type SortKey =
| "name"
| "team"
| "age"
| "position"
| "draftYear"
| "draftRank"
| "tier"
| "avg"
| "h"
| "hr"
| "rbi"
| "bb"
| "k"
| "ops"
| "era"
| "pitchH"
| "w"
| "whip"
| "ip"
| "tracked"
| "heat"
| "price"
| "form"
| "surge"
| "value"

type PlayerRow = {
id: string
name?: string
team?: string
age?: number
position?: string
draftYear?: number
draftRank?: number
tier?: string
hitting?: StatRecord | null
pitching?: StatRecord | null
performance?: {
kind?: "hitter" | "pitcher" | string
snapshot?: StatRecord
scout?: StatRecord
analyst?: StatRecord
}
media?: {
snapshot?: StatRecord
analyst?: StatRecord
}
signals?: {
tracked?: boolean
heat?: string | null
price?: string | null
}
}

const tierOrder = [
"DRAFT",
"ROK",
"A",
"A+",
"AA",
"AAA",
"RY",
"MLB",
"AS",
"MVP"
]

export default function PlayerList({
selected,
onSelect,
mode="draft"
}:Props){

const [teamFilter,setTeamFilter] = useState("ALL")
const [posFilter,setPosFilter] = useState("ALL")
const [draftYearFilter,setDraftYearFilter] = useState("ALL")
const [tierFilter,setTierFilter] = useState("ALL")

const [viewMode,setViewMode] = useState<"all"|"hit"|"pitch">("all")

const [sortKey,setSortKey] = useState<SortKey>("draftRank")
const [sortDir,setSortDir] = useState<SortDir>("asc")


/* =========================
DATASET
========================= */

const dataset = useMemo(()=>{

const allPlayers: PlayerRow[] = [

...playersDraft2026,
...playersDraft2025,
...playersDraft2018

] as PlayerRow[]

if(mode==="draft"){
return allPlayers.filter(p=>p.draftYear===2026)
}

if(mode==="tracked"){
return allPlayers.filter(p=>p.signals?.tracked)
}

if(mode==="players"){
return allPlayers.filter(p=>p.draftYear!==2026)
}

return allPlayers

},[mode])

/* =========================
OPTIONS
========================= */

const teamOptions = useMemo(()=>{

return [
"ALL",
...Array.from(
new Set(
dataset
.map(p=>p?.team)
.filter(Boolean)
)
).sort()
]

},[dataset])

const posOptions = useMemo(()=>{

return [
"ALL",
...Array.from(
new Set(
dataset
.map(p=>p?.position)
.filter(Boolean)
)
).sort()
]

},[dataset])

const draftYearOptions = useMemo(()=>{

return [
"ALL",
...Array.from(
new Set(
dataset
.map(p=>p?.draftYear)
.filter((v): v is number => typeof v === "number")
)
).sort((a,b)=>b-a)
]

},[dataset])


const tierOptions = useMemo(()=>{

const found = Array.from(
new Set(
dataset
.map(p=>p?.tier)
.filter(Boolean)
)
)

return [

"ALL",
...tierOrder.filter(t=>found.includes(t)),
...found.filter(t=>!tierOrder.includes(t))

]

},[dataset])


/* =========================
ICONS
========================= */

function formIcon(val:SignalTone){

if(val==="hot") return "🔥"
if(val==="cold") return "❄"

return "•"

}

function surgeIcon(val:SignalTone){

if(val==="hot") return "⚡"
if(val==="cold") return "↓"

return "•"

}

function valueIcon(val:SignalDirection){

if(val==="up") return "◇"
if(val==="down") return "▼"

return "→"

}

function isPitcherPosition(position?:string){

const pos = String(position ?? "").toUpperCase()

return pos==="P" || pos==="SP" || pos==="RP" || pos==="RHP" || pos==="LHP"

}

/* =========================
FILTERING
========================= */

const filtered = useMemo(()=>{

return dataset.filter(p=>{

if(teamFilter !== "ALL" && p.team !== teamFilter) return false

if(posFilter !== "ALL" && p.position !== posFilter) return false

if(draftYearFilter !== "ALL" && String(p.draftYear) !== draftYearFilter) return false

if(tierFilter !== "ALL" && p.tier !== tierFilter) return false

const isPitcher = isPitcherPosition(p.position)

if(viewMode==="pitch" && !isPitcher) return false

if(viewMode==="hit" && isPitcher) return false

return true

})

},[dataset,teamFilter,posFilter,draftYearFilter,tierFilter,viewMode])


/* =========================
SORTING
========================= */

const getSortValue = useCallback((p:PlayerRow,key:SortKey)=>{

switch(key){

case "name": return p.name ?? ""
case "team": return p.team ?? ""
case "age": return p.age ?? -999
case "position": return p.position ?? ""
case "draftYear": return p.draftYear ?? -999
case "draftRank": return p.draftRank ?? 9999
case "tier": return p.tier ?? ""

case "avg": return p.hitting?.AVG ?? -999
case "h": return p.hitting?.H ?? -999
case "hr": return p.hitting?.HR ?? -999
case "rbi": return p.hitting?.RBI ?? -999
case "bb": return p.hitting?.BB ?? -999
case "k": return viewMode==="pitch" ? p.pitching?.K ?? -999 : p.hitting?.K ?? -999
case "ops": return p.hitting?.OPS ?? -999

case "era": return p.pitching?.ERA ?? 999
case "pitchH": return p.pitching?.H ?? -999
case "w": return p.pitching?.W ?? -999
case "whip": return p.pitching?.WHIP ?? 999
case "ip": return p.pitching?.IP ?? -999

case "tracked": return p.signals?.tracked ? 1 : 0

case "heat":
case "form":

return toneScore(calculatePlayerSignals(p,viewMode==="pitch" ? "pitch" : "hit").form)

case "surge":

return toneScore(calculatePlayerSignals(p,viewMode==="pitch" ? "pitch" : "hit").surge)

case "value":

case "price":

return directionScore(calculatePlayerSignals(p,viewMode==="pitch" ? "pitch" : "hit").value)

default:

return ""

}

},[viewMode])


const sorted = useMemo(()=>{

const arr = [...filtered]

arr.sort((a,b)=>{

const aVal = getSortValue(a,sortKey)
const bVal = getSortValue(b,sortKey)

if(typeof aVal === "string" && typeof bVal === "string"){

const result = aVal.localeCompare(bVal)

return sortDir==="asc" ? result : -result

}

if(aVal < bVal) return sortDir==="asc" ? -1 : 1

if(aVal > bVal) return sortDir==="asc" ? 1 : -1

return 0

})

return arr

},[filtered,sortKey,sortDir,getSortValue])


function cycleSort(key:SortKey){

if(sortKey===key){

setSortDir(prev=>prev==="asc" ? "desc" : "asc")

return

}

setSortKey(key)

setSortDir("asc")

}


function sortLabel(label:string,key:SortKey){

const active = sortKey===key

const arrow = !active ? "" : sortDir==="asc" ? " ▲" : " ▼"

return(

<button
type="button"
className={`${styles.headerButton} ${active ? styles.activeSort : ""}`}
onClick={()=>cycleSort(key)}
>
{label}{arrow}
</button>

)

}


/* =========================
RENDER
========================= */

return(

<section className={`${styles.panel} ${viewMode==="pitch" ? styles.pitchView : styles.hitView}`}>

<div className={styles.tableTools}>

<div className={styles.viewSwitch} aria-label="Stat view">

<button
type="button"
className={`${styles.viewButton} ${viewMode==="all" ? styles.activeView : ""}`}
onClick={()=>setViewMode("all")}
>
ALL
</button>

<button
type="button"
className={`${styles.viewButton} ${viewMode==="hit" ? styles.activeView : ""}`}
onClick={()=>setViewMode("hit")}
>
BATS
</button>

<button
type="button"
className={`${styles.viewButton} ${viewMode==="pitch" ? styles.activeView : ""}`}
onClick={()=>setViewMode("pitch")}
>
ARMS
</button>

</div>

<div className={styles.statContext}>
{viewMode==="pitch" ? "ARMS · PITCHER STATS" : viewMode==="all" ? "ALL · HITTER STATS" : "BATS · HITTER STATS"}
</div>

</div>


<div className={styles.columnHeader}>


<div className={styles.nameHeader}>
{sortLabel("PLAYER","name")}
</div>


<div>{sortLabel(viewMode==="pitch" ? "CMD" : "BAT","form")}</div>
<div>{sortLabel(viewMode==="pitch" ? "RUN" : "PWR","surge")}</div>
<div>{sortLabel("VAL","value")}</div>


{viewMode!=="pitch" && (

<>

<div>{sortLabel("AVG","avg")}</div>
<div>{sortLabel("H","h")}</div>
<div>{sortLabel("HR","hr")}</div>
<div>{sortLabel("RBI","rbi")}</div>
<div>{sortLabel("BB","bb")}</div>
<div>{sortLabel("K","k")}</div>
<div>{sortLabel("OPS","ops")}</div>

</>

)}


{viewMode==="pitch" && (

<>

<div>{sortLabel("ERA","era")}</div>
<div>{sortLabel("H","pitchH")}</div>
<div>{sortLabel("W","w")}</div>
<div>{sortLabel("K","k")}</div>
<div>{sortLabel("WHIP","whip")}</div>
<div>{sortLabel("IP","ip")}</div>
<div>—</div>

</>

)}


<div>

<select
className={styles.headerSelect}
value={draftYearFilter}
onChange={e=>setDraftYearFilter(e.target.value)}
>

{draftYearOptions.map(year=>(

<option key={String(year)} value={String(year)}>
{year==="ALL" ? "DY" : year}
</option>

))}

</select>

</div>


<div>{sortLabel("DR","draftRank")}</div>


<div>

<select
className={styles.headerSelect}
value={tierFilter}
onChange={e=>setTierFilter(e.target.value)}
>

{tierOptions.map(tier=>(

<option key={tier} value={tier}>
{tier==="ALL" ? "TIER" : tier}
</option>

))}

</select>

</div>


<div>

<select
className={styles.headerSelect}
value={teamFilter}
onChange={e=>setTeamFilter(e.target.value)}
>

{teamOptions.map(team=>(

<option key={team} value={team}>
{team==="ALL" ? "TM" : team}
</option>

))}

</select>

</div>


<div>{sortLabel("AGE","age")}</div>


<div>

<select
className={styles.headerSelect}
value={posFilter}
onChange={e=>setPosFilter(e.target.value)}
>

{posOptions.map(pos=>(

<option key={pos} value={pos}>
{pos==="ALL" ? "POS" : pos}
</option>

))}

</select>

</div>


</div>



<div className={styles.list}>


{sorted.map(p=>{

const isActive = selected===p.id
const signalMode = viewMode==="pitch" ? "pitch" : "hit"
const calculatedSignals = calculatePlayerSignals(p,signalMode)

return(

<div
key={p.id}
className={`${styles.row} ${p.signals?.tracked ? styles.trackedRow : ""} ${isActive ? styles.active : ""}`}
onClick={()=>onSelect(p.id)}
>

<div className={styles.name}>
{p.name}
</div>

<div className={`${styles.signal} ${calculatedSignals.form==="hot" ? styles.signalHot : ""} ${calculatedSignals.form==="cold" ? styles.signalCold : ""}`}>
{formIcon(calculatedSignals.form)}
</div>


<div className={`${styles.signal} ${calculatedSignals.surge==="hot" ? styles.signalSurge : ""} ${calculatedSignals.surge==="cold" ? styles.signalDown : ""}`}>
{surgeIcon(calculatedSignals.surge)}
</div>


<div className={`${styles.signal} ${calculatedSignals.value==="up" ? styles.signalValue : ""} ${calculatedSignals.value==="down" ? styles.signalDown : ""}`}>
{valueIcon(calculatedSignals.value)}
</div>


{viewMode!=="pitch" && (

<>

<div>{typeof p.hitting?.AVG === "number" ? p.hitting.AVG.toFixed(3) : "—"}</div>

<div>{p.hitting?.H ?? "—"}</div>

<div>{p.hitting?.HR ?? "—"}</div>

<div>{p.hitting?.RBI ?? "—"}</div>

<div>{p.hitting?.BB ?? "—"}</div>

<div>{p.hitting?.K ?? "—"}</div>

<div>{typeof p.hitting?.OPS === "number" ? p.hitting.OPS.toFixed(3) : "—"}</div>

</>

)}


{viewMode==="pitch" && (

<>

<div>{typeof p.pitching?.ERA === "number" ? p.pitching.ERA.toFixed(2) : "—"}</div>

<div>{p.pitching?.H ?? "—"}</div>

<div>{p.pitching?.W ?? "—"}</div>

<div>{p.pitching?.K ?? "—"}</div>

<div>{typeof p.pitching?.WHIP === "number" ? p.pitching.WHIP.toFixed(2) : "—"}</div>

<div>{p.pitching?.IP ?? "—"}</div>

<div>—</div>

</>

)}


<div>{p.draftYear ?? "—"}</div>

<div>{p.draftRank ?? "—"}</div>

<div className={styles.tier}>
{p.tier ?? "—"}
</div>

<div>{p.team ?? "—"}</div>

<div>{p.age ?? "—"}</div>

<div>{p.position ?? "—"}</div>


</div>

)

})}

</div>


</section>

)

}
