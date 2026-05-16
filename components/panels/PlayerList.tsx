"use client"

import styles from "./PlayerList.module.css"

import { playersDraft2026 } from "@/data/playersDraft2026"
import { playersDraft2025 } from "@/data/playersDraft2025"
import { playersDraft2024 } from "@/data/playersDraft2024"
import { playersDraft2023 } from "@/data/playersDraft2023"
import { playersDraft2018 } from "@/data/playersDraft2018"
import { getDLRPhase, DLR_PHASE_BADGE } from "@/data/dlr/dlrPhase"
import {
resolveSignals,
signalStateScore,
signalDirectionScore,
type SignalState,
type SignalDirection,
} from "@/lib/signals/signalEngine"


import { useCallback, useEffect, useMemo, useState } from "react"

// Pass 43B — StatRecord defined locally. Previously referenced without import
// (pre-existing TS error: Cannot find name 'StatRecord'). The type originated
// in data/dlr/signals/playerSignals.ts which is now deprecated. Defined here
// as the canonical local alias. For future consolidation: move to data/types/player.ts.
type StatRecord = Record<string, number | string | null | undefined>

type Props = {
selected: string | null
onSelect: (id:string)=>void
mode?: "hs" | "ncaa" | "draft" | "minors" | "majors" | "players" | "tracked"
/** Active performance intelligence context — lifted to page.tsx so IntelStack switches in sync. */
performanceContext?: "bats" | "arms"
/** Called when the user clicks BATS or ARMS — updates lifted state in page.tsx. */
onPerformanceContextChange?: (ctx: "bats" | "arms") => void
}

type SortDir = "asc" | "desc"

type SortKey =
| "name"
| "team"
| "age"
| "position"
| "draftYear"
| "draftPick"
| "tier"
| "ab"
| "h"
| "hr"
| "rbi"
| "bb"
| "k"
| "sb"
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
draftPick?: number
tier?: string
hitting?: StatRecord | null
pitching?: StatRecord | null
tracker?: {
// hitter fields
AB?: number | null
SB?: number | null
AVG?: number | null
OPS?: number | null
// pitcher fields
IP?: number | null
W?: number | null
L?: number | null
ERA?: number | null
WHIP?: number | null
SO?: number | null
lastGame?: {
// hitter
AB?: number | null
H?: number | null
HR?: number | null
RBI?: number | null
BB?: number | null
K?: number | null
SB?: number | null
// pitcher
IP?: number | null
ER?: number | null
} | null
}
performance?: {
kind?: "hitter" | "pitcher" | string
competitionLevel?: "HS" | "NCAA" | "MiLB" | "MLB" | string
snapshot?: StatRecord
scout?: StatRecord
analyst?: StatRecord
}
// Pass 43B — media snapshot/analyst narrowed to number-only records.
// Media fields are pre-normalized 0–1 floats — never strings.
// Narrowing fixes SignalPlayerInput compatibility for resolveSignals() calls.
media?: {
snapshot?: Record<string, number | null | undefined>
analyst?: Record<string, number | null | undefined>
}
signals?: {
tracked?: boolean
heat?: string | null
price?: string | null
}
}

/* Canonical developmental progression — drives filter dropdown ordering.
   Ecosystem tabs (DRAFT, TRACKED) are routing contexts, NOT development stages.
   Development stages:
   🟢 Amateur:  HS → NCAA
   🟠 Minors:   ROK → A → A+ → AA → AAA
   🟢 MLB:      MLB */
const tierOrder = [
  "HS",
  "NCAA",
  "ROK",
  "A",
  "A+",
  "AA",
  "AAA",
  "MLB",
  "Rookie",
  "Starter",
  "All-Star",
  "MVP"
]

const teamNameMap: Record<string, string> = {
  "Arizona Diamondbacks": "ARI",
  "Atlanta Braves": "ATL",
  "Baltimore Orioles": "BAL",
  "Boston Red Sox": "BOS",
  "Chicago Cubs": "CHC",
  "Chicago White Sox": "CWS",
  "Cincinnati Reds": "CIN",
  "Cleveland Guardians": "CLE",
  "Colorado Rockies": "COL",
  "Detroit Tigers": "DET",
  "Houston Astros": "HOU",
  "Kansas City Royals": "KC",
  "Los Angeles Angels": "LAA",
  "Los Angeles Dodgers": "LAD",
  "Miami Marlins": "MIA",
  "Milwaukee Brewers": "MIL",
  "Minnesota Twins": "MIN",
  "New York Mets": "NYM",
  "New York Yankees": "NYY",
  "Athletics": "ATH",
  "Oakland Athletics": "ATH",
  "Philadelphia Phillies": "PHI",
  "Pittsburgh Pirates": "PIT",
  "San Diego Padres": "SD",
  "San Francisco Giants": "SF",
  "Seattle Mariners": "SEA",
  "St. Louis Cardinals": "STL",
  "Tampa Bay Rays": "TB",
  "Texas Rangers": "TEX",
  "Toronto Blue Jays": "TOR",
  "Washington Nationals": "WSH",
}

function displayTeam(team?: string | null) {
  const raw = String(team ?? "").trim()
  if (!raw) return ""
  const upper = raw.toUpperCase()
  if (upper.length <= 4) return upper
  return teamNameMap[raw] ?? raw
}

/**
 * Resolves the display tier label for a player row.
 * Players with tier "Draft" / "DRAFT" are pre-draft amateurs —
 * their developmental stage is derived from performance.competitionLevel.
 * This keeps ecosystem tab context (DRAFT board) separate from
 * developmental stage label (HS / NCAA).
 */
function resolveTierLabel(p: PlayerRow): string {
  const raw = (p.tier ?? "").trim()
  const upper = raw.toUpperCase()
  if (upper === "DRAFT") {
    const comp = (p.performance?.competitionLevel ?? "").trim().toUpperCase()
    if (comp === "HS")   return "HS"
    if (comp === "NCAA") return "NCAA"
    // Fallback: unknown amateur — return empty so "—" renders
    return ""
  }
  return raw
}

// Inline lifecycle hex — avoids importing a separate module for a simple lookup
function lifecycleHex(competitionLevel?: string | null): string | null {
  const t = (competitionLevel ?? "").trim().toUpperCase()
  if (t === "HS")   return "#c8a564"
  if (t === "NCAA") return "#3eb489"
  if (t === "MILB" || t === "A" || t === "A+" || t === "AA" || t === "AAA" || t === "ROK" || competitionLevel === "MiLB") return "#2d72d4"
  if (t === "MLB")  return "#b8e8ff"
  return null
}

export default function PlayerList({
selected,
onSelect,
mode="draft",
onPerformanceContextChange
}:Props){

const [teamFilter,setTeamFilter] = useState("ALL")
const [posFilter,setPosFilter] = useState("ALL")
const [draftYearFilter,setDraftYearFilter] = useState("ALL")
const [tierFilter,setTierFilter] = useState("ALL")

const [viewMode,setViewMode] = useState<"all"|"hit"|"pitch">("all")

// Auto-switch to pitcher view when a pitcher (RHP/LHP/SP/RP/P) is selected,
// and back to hitter view when a hitter is selected.
useEffect(()=>{
  if(!selected) return
  const allPlayers=[...playersDraft2026,...playersDraft2025,...playersDraft2024,...playersDraft2023,...playersDraft2018] as PlayerRow[]
  const player=allPlayers.find(p=>p.id===selected)
  if(!player) return
  if(isPitcherPosition(player.position)){
    setViewMode("pitch")
    onPerformanceContextChange?.("arms")
  } else {
    setViewMode(v=> v==="pitch" ? "all" : v)
    onPerformanceContextChange?.("bats")
  }
},[selected]) // eslint-disable-line react-hooks/exhaustive-deps

const [sortKey,setSortKey] = useState<SortKey>("draftPick")
const [sortDir,setSortDir] = useState<SortDir>("asc")


/* =========================
DATASET
========================= */

const dataset = useMemo(()=>{

const allPlayers: PlayerRow[] = [

...playersDraft2026,
...playersDraft2025,
...playersDraft2024,
...playersDraft2023,
...playersDraft2018

] as PlayerRow[]

// HS ecosystem — prep/high-school lifecycle stage
if(mode==="hs"){
return allPlayers.filter(p=>
  (p.performance?.competitionLevel ?? "").toUpperCase() === "HS"
)
}

// NCAA ecosystem — college lifecycle stage
if(mode==="ncaa"){
return allPlayers.filter(p=>
  (p.performance?.competitionLevel ?? "").toUpperCase() === "NCAA"
)
}

if(mode==="draft"){
return allPlayers.filter(p=>p.draftYear===2026)
}

if(mode==="tracked"){
return allPlayers.filter(p=>p.signals?.tracked)
}

if(mode==="minors"){
return allPlayers.filter(p=>{
  const level = (p.performance?.competitionLevel ?? p.tier ?? "").toUpperCase()
  return ["ROK", "A", "A+", "AA", "AAA", "MILB"].includes(level)
})
}

if(mode==="majors"){
return allPlayers.filter(p=>{
  const level = (p.performance?.competitionLevel ?? p.tier ?? "").toUpperCase()
  return level === "MLB"
})
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
.map(p=>displayTeam(p?.team))
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

// Use resolved developmental tier labels, not raw tier strings.
// This ensures "Draft" players appear under HS/NCAA in the filter dropdown.
const found = Array.from(
new Set(
dataset
.map(p=>resolveTierLabel(p))
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

function formIcon(val: SignalState){
if(val==="hot"  || val==="warm") return "🔥"
if(val==="cool" || val==="dark") return "❄"
return "•"
}

function surgeIcon(val: SignalState){
if(val==="hot"  || val==="warm") return "⚡"
if(val==="cool" || val==="dark") return "↓"
return "•"
}

function valueIcon(val: SignalDirection){
if(val==="up")   return "◇"
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

if(teamFilter !== "ALL" && displayTeam(p.team) !== teamFilter) return false

if(posFilter !== "ALL" && p.position !== posFilter) return false

if(draftYearFilter !== "ALL" && String(p.draftYear) !== draftYearFilter) return false

if(tierFilter !== "ALL" && resolveTierLabel(p) !== tierFilter) return false

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
case "team": return displayTeam(p.team)
case "age": return p.age ?? -999
case "position": return p.position ?? ""
case "draftYear": return p.draftYear ?? -999
case "draftPick": return p.draftPick ?? 9999
case "tier": return p.tier ?? ""

case "ab": return p.tracker?.AB ?? -999
case "h": return p.hitting?.H ?? -999
case "hr": return p.hitting?.HR ?? -999
case "rbi": return p.hitting?.RBI ?? -999
case "bb": return p.hitting?.BB ?? -999
case "k": return viewMode==="pitch" ? p.pitching?.K ?? -999 : p.hitting?.K ?? -999
case "sb": return p.tracker?.SB ?? -999

case "era": return p.pitching?.ERA ?? 999
case "pitchH": return p.pitching?.H ?? -999
case "w": return p.pitching?.W ?? -999
case "whip": return p.pitching?.WHIP ?? 999
case "ip": return p.pitching?.IP ?? -999

case "tracked": return p.signals?.tracked ? 1 : 0

case "heat":
case "form": {
  const mode = viewMode==="pitch" ? "pitch" : "hit"
  const sig = resolveSignals(p, mode)
  return signalStateScore(mode==="pitch" ? sig.cmd.state : sig.bat.state)
}

case "surge": {
  const mode = viewMode==="pitch" ? "pitch" : "hit"
  const sig = resolveSignals(p, mode)
  return signalStateScore(mode==="pitch" ? sig.run.state : sig.pwr.state)
}

case "value":
case "price": {
  const sig = resolveSignals(p, viewMode==="pitch" ? "pitch" : "hit")
  return signalDirectionScore(sig.val.direction)
}

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
onClick={()=>{ setViewMode("hit"); onPerformanceContextChange?.("bats") }}
>
BATS
</button>

<button
type="button"
className={`${styles.viewButton} ${viewMode==="pitch" ? styles.activeView : ""}`}
onClick={()=>{ setViewMode("pitch"); onPerformanceContextChange?.("arms") }}
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

<div>{sortLabel("AB","ab")}</div>
<div>{sortLabel("H","h")}</div>
<div>{sortLabel("HR","hr")}</div>
<div>{sortLabel("RBI","rbi")}</div>
<div>{sortLabel("BB","bb")}</div>
<div>{sortLabel("K","k")}</div>
<div>{sortLabel("SB","sb")}</div>

</>

)}


{viewMode==="pitch" && (

<>

<div>{sortLabel("IP","ip")}</div>
<div>{sortLabel("H","pitchH")}</div>
<div>BB</div>
<div>{sortLabel("K","k")}</div>
<div>ER</div>
<div>{sortLabel("W","w")}</div>
<div>{sortLabel("WHIP","whip")}</div>

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


<div>{sortLabel("DP","draftPick")}</div>


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

// Signal engine — rolling-window-aware behavioral signals (Pass 33).
// Priority: 7D rolling → 15D → 30D → season totals → dark.
const signals = resolveSignals(p, signalMode)
const batTone  = signals.bat.state
const pwrTone  = signals.pwr.state
const cmdTone  = signals.cmd.state
const runTone  = signals.run.state
const valDir: SignalDirection = signals.val.direction

// Lifecycle accent — resolved for ALL rows so CSS hover can consume --row-lifecycle-color.
// Active selected state also applies box-shadow + background override inline.
const rowLifecycleColor = lifecycleHex(p.performance?.competitionLevel)
const activeRowStyle: React.CSSProperties = {
  // CSS variable available to :hover pseudo-class (CSS custom props inherit to pseudo-classes).
  // Falls back to static blue in CSS when no lifecycle is known.
  ...(rowLifecycleColor ? { '--row-lifecycle-color': rowLifecycleColor } as React.CSSProperties : {}),
  ...(isActive && rowLifecycleColor
    ? {
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${rowLifecycleColor} 45%, rgba(120,170,255,.35))`,
        background: `linear-gradient(90deg, color-mix(in srgb, ${rowLifecycleColor} 9%, rgba(60,120,255,.14)), rgba(0,0,0,0))`
      }
    : {})
}

return(

<div
key={p.id}
className={`${styles.row} ${p.signals?.tracked ? styles.trackedRow : ""} ${isActive ? styles.active : ""}`}
style={activeRowStyle}
onClick={()=>onSelect(p.id)}
>

<div className={styles.name}>
{p.name}
</div>

{/* Signal 1 — BAT (hitter) / CMD (pitcher) */}
<div className={`${styles.signal} ${(signalMode==="pitch" ? cmdTone : batTone)==="hot" || (signalMode==="pitch" ? cmdTone : batTone)==="warm" ? styles.signalHot : ""} ${(signalMode==="pitch" ? cmdTone : batTone)==="cool" || (signalMode==="pitch" ? cmdTone : batTone)==="dark" ? styles.signalCold : ""}`}>
{formIcon(signalMode==="pitch" ? cmdTone : batTone)}
</div>

{/* Signal 2 — PWR (hitter) / RUN (pitcher) */}
<div className={`${styles.signal} ${(signalMode==="pitch" ? runTone : pwrTone)==="hot" || (signalMode==="pitch" ? runTone : pwrTone)==="warm" ? styles.signalSurge : ""} ${(signalMode==="pitch" ? runTone : pwrTone)==="cool" || (signalMode==="pitch" ? runTone : pwrTone)==="dark" ? styles.signalDown : ""}`}>
{surgeIcon(signalMode==="pitch" ? runTone : pwrTone)}
</div>

{/* Signal 3 — VAL (universal) */}
<div className={`${styles.signal} ${valDir==="up" ? styles.signalValue : ""} ${valDir==="down" ? styles.signalDown : ""}`}>
{valueIcon(valDir)}
</div>


{viewMode!=="pitch" && (

<>

<div>{typeof p.tracker?.lastGame?.AB === "number" ? p.tracker.lastGame.AB : "—"}</div>

<div>{typeof p.tracker?.lastGame?.H === "number" ? p.tracker.lastGame.H : "—"}</div>

<div>{p.tracker?.lastGame?.HR ? p.tracker.lastGame.HR : "—"}</div>

<div>{p.tracker?.lastGame?.RBI ? p.tracker.lastGame.RBI : "—"}</div>

<div>{typeof p.tracker?.lastGame?.BB === "number" ? p.tracker.lastGame.BB : "—"}</div>

<div>{typeof p.tracker?.lastGame?.K === "number" ? p.tracker.lastGame.K : "—"}</div>

<div>{typeof p.tracker?.lastGame?.SB === "number" ? p.tracker.lastGame.SB : "—"}</div>

</>

)}


{viewMode==="pitch" && (

<>

<div>{typeof p.tracker?.lastGame?.IP === "number" ? p.tracker.lastGame.IP.toFixed(1) : "—"}</div>

<div>{typeof p.tracker?.lastGame?.H === "number" ? p.tracker.lastGame.H : "—"}</div>

<div>{typeof p.tracker?.lastGame?.BB === "number" ? p.tracker.lastGame.BB : "—"}</div>

<div>{typeof p.tracker?.lastGame?.K === "number" ? p.tracker.lastGame.K : "—"}</div>

<div>{typeof p.tracker?.lastGame?.ER === "number" ? p.tracker.lastGame.ER : "—"}</div>

<div>{typeof p.tracker?.W === "number" ? p.tracker.W : "—"}</div>

<div>{typeof p.tracker?.WHIP === "number" ? p.tracker.WHIP.toFixed(2) : "—"}</div>

</>

)}


<div>{p.draftYear ?? "—"}</div>

<div>{p.draftPick ?? "—"}</div>

<div
className={styles.tier}
style={{ color: lifecycleHex(resolveTierLabel(p)) ?? DLR_PHASE_BADGE[getDLRPhase(resolveTierLabel(p) || p.tier, undefined)] }}
>
{resolveTierLabel(p) || "—"}
</div>

<div>{displayTeam(p.team) || "—"}</div>

<div>{p.age ?? "—"}</div>

<div>{p.position ?? "—"}</div>


</div>

)

})}

</div>


</section>

)

}
