"use client"

import styles from "./PlayerList.module.css"
import { players } from "@/data/players"
import { useState } from "react"

type Props = {
  selected:string | null
  onSelect:(id:string)=>void
}

export default function PlayerList({
  selected,
  onSelect
}:Props){

const [teamFilter,setTeamFilter] = useState("MLB")
const [posFilter,setPosFilter] = useState("POS")
const [mode,setMode] = useState<"hit"|"pitch">("hit")


/* FULL NAME */

function displayName(full:string){
return full
}


/* SIGNAL ICONS */

function heatIcon(val?:string){

if(val==="hot") return "▲"
if(val==="cold") return "▼"

return "■"

}

function priceIcon(val?:string){

if(val==="up") return "▲"
if(val==="down") return "▼"

return "■"

}

function trackIcon(val?:boolean){

return val ? "●" : "○"

}


/* FILTERING */

const filtered = players.filter(p=>{

if(teamFilter !== "MLB" && p.team !== teamFilter) return false
if(posFilter !== "POS" && p.position !== posFilter) return false

if(mode === "pitch" && !p.pitching) return false
if(mode === "hit" && !p.hitting) return false

return true

})


return(

<section className={styles.panel}>


{/* TOP BAR */}

<div className={styles.topBar}>

<div className={styles.title}>
PLAYER TRACKER
</div>


<div className={styles.controls}>

<select
value={teamFilter}
onChange={e=>setTeamFilter(e.target.value)}
>

<option>MLB</option>

<option>LAD</option>
<option>NYY</option>
<option>ATL</option>
<option>BAL</option>
<option>PIT</option>
<option>WSH</option>

</select>


<select
value={posFilter}
onChange={e=>setPosFilter(e.target.value)}
>

<option>POS</option>

<option>OF</option>
<option>SS</option>
<option>RF</option>
<option>SP</option>
<option>DH</option>

</select>


<div className={styles.modeSwitch}>

<button
className={mode==="hit" ? styles.activeMode : ""}
onClick={()=>setMode("hit")}
>
H
</button>

<button
className={mode==="pitch" ? styles.activeMode : ""}
onClick={()=>setMode("pitch")}
>
P
</button>

</div>

</div>

</div>



{/* HEADER */}

<div className={styles.columnHeader}>

<div className={styles.nameHeader}>PLAYER</div>

<div>TM</div>
<div>POS</div>


{mode==="hit" && (
<>
<div>AVG</div>
<div>R</div>
<div>H</div>
<div>HR</div>
<div>RBI</div>
<div>K</div>
<div>BB</div>
<div>OPS</div>
</>
)}


{mode==="pitch" && (
<>
<div>ERA</div>
<div>H</div>
<div>W</div>
<div>K</div>
<div>WHIP</div>
<div>IP</div>

<div>–</div>
<div>–</div>
</>
)}


<div>TR</div>
<div>H</div>
<div>P</div>

</div>



{/* ROWS */}

<div className={styles.list}>


{filtered.map(p=>{

const isActive = selected === p.id

return(

<div
key={p.id}
className={`${styles.row} ${isActive ? styles.active : ""}`}
onClick={()=>onSelect(p.id)}
>


<div className={styles.name}>
{displayName(p.name)}
</div>


<div>{p.team}</div>

<div>{p.position}</div>



{/* HITTING */}

{mode==="hit" && p.hitting && (
<>
<div>{p.hitting.AVG?.toFixed(3)}</div>
<div>{p.hitting.R}</div>
<div>{p.hitting.H}</div>
<div>{p.hitting.HR}</div>
<div>{p.hitting.RBI}</div>
<div>{p.hitting.K}</div>
<div>{p.hitting.BB}</div>
<div>{p.hitting.OPS?.toFixed(3)}</div>
</>
)}



{/* PITCHING */}

{mode==="pitch" && p.pitching && (
<>
<div>{p.pitching.ERA?.toFixed(2)}</div>
<div>{p.pitching.H}</div>
<div>{p.pitching.W}</div>
<div>{p.pitching.K}</div>
<div>{p.pitching.WHIP?.toFixed(2)}</div>
<div>{p.pitching.IP}</div>

<div>–</div>
<div>–</div>
</>
)}



{/* SIGNALS */}

<div className={styles.signal}>
{trackIcon(p.signals?.tracked)}
</div>

<div className={styles.signal}>
{heatIcon(p.signals?.heat)}
</div>

<div className={styles.signal}>
{priceIcon(p.signals?.price)}
</div>


</div>

)

})}


</div>

</section>

)

}