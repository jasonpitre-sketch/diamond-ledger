"use client"

import styles from "./page.module.css"

import OuterFrame from "@/components/frame/OuterFrame"

import PlayerList from "@/components/panels/PlayerList"
import HeroVault from "@/components/HeroVault"
import IntelStack from "@/components/panels/IntelStack"

import frameStyles from "@/components/frame/OuterFrame.module.css"

import { useState,useEffect,useMemo } from "react"

import { playersDraft2026 } from "@/data/playersDraft2026"
import { playersDraft2025 } from "@/data/playersDraft2025"
import { playersDraft2018 } from "@/data/playersDraft2018"

import { calculateDLR } from "@/data/dlr/calculateDLR"



/* =========================
SYSTEM MODES
========================= */

type SystemMode =
"knowledge"
| "performance"
| "media"
| "market"


type KnowledgeMode =
"bio"
| "scout"
| "career"

type PlayerRecord = (typeof playersDraft2026 | typeof playersDraft2025 | typeof playersDraft2018)[number]



export default function Page(){



/* =========================
STATE
========================= */

const [selectedPlayerId,setSelectedPlayerId] =
useState<string | null>(null)

const [scanComplete,setScanComplete] =
useState(false)


const [playerUniverse,setPlayerUniverse] =
useState<"draft"|"players"|"tracked">("draft")


const [systemMode,setSystemMode] =
useState<SystemMode>("knowledge")


const [knowledgeMode,setKnowledgeMode] =
useState<KnowledgeMode>("bio")


/* =========================
DATASET
========================= */

const dataset = useMemo<PlayerRecord[]>(()=>{

const allPlayers = [

...playersDraft2026,
...playersDraft2025,
...playersDraft2018

]

if(playerUniverse==="tracked"){
return allPlayers.filter(p=>p.signals?.tracked)
}

return allPlayers

},[playerUniverse])



/* =========================
PLAYER LOOKUP
========================= */

const selectedPlayer: PlayerRecord | null =
selectedPlayerId
? dataset.find((p)=>p.id===selectedPlayerId) ?? null
: null



/* =========================
DLR CALCULATION
========================= */

const dlrResult =
useMemo(()=>selectedPlayer ? calculateDLR(selectedPlayer) : null,[selectedPlayer])

const dlr =
dlrResult?.rating ?? 0

const dlrTier =
dlrResult?.tier ?? "HOLD"

useEffect(()=>{
const reset = window.setTimeout(()=>setScanComplete(false),0)

return ()=>window.clearTimeout(reset)
},[selectedPlayerId])



/* =========================
INTEL PANEL CONTROL
========================= */

const intelMode = systemMode

const infoMode =
systemMode==="knowledge"
? knowledgeMode
: "bio"



/* =========================
RENDER
========================= */

return(

<main className={styles.page}>


<OuterFrame



leftTabs={
<>
<span
className={`${frameStyles.tab} ${
playerUniverse==="draft"
? frameStyles.activeTab
: ""
}`}
onClick={()=>setPlayerUniverse("draft")}
>
DRAFT
</span>

<span
className={`${frameStyles.tab} ${
playerUniverse==="players"
? frameStyles.activeTab
: ""
}`}
onClick={()=>setPlayerUniverse("players")}
>
PLAYERS
</span>

<span
className={`${frameStyles.tab} ${
playerUniverse==="tracked"
? frameStyles.activeTab
: ""
}`}
onClick={()=>setPlayerUniverse("tracked")}
>
TRACKED
</span>
</>
}



centerTabs={
<>
<span
className={`${frameStyles.tab} ${
systemMode==="knowledge"
? frameStyles.activeTab
: ""
}`}
onClick={()=>setSystemMode("knowledge")}
>
KNOWLEDGE
</span>

<span
className={`${frameStyles.tab} ${
systemMode==="performance"
? frameStyles.activeTab
: ""
}`}
onClick={()=>setSystemMode("performance")}
>
PERFORMANCE
</span>

<span
className={`${frameStyles.tab} ${
systemMode==="media"
? frameStyles.activeTab
: ""
}`}
onClick={()=>setSystemMode("media")}
>
MEDIA
</span>

<span
className={`${frameStyles.tab} ${
systemMode==="market"
? frameStyles.activeTab
: ""
}`}
onClick={()=>setSystemMode("market")}
>
MARKET
</span>
</>
}



subTabs={
systemMode==="knowledge" && (
<>
<span
className={`${frameStyles.subTab} ${
knowledgeMode==="bio"
? frameStyles.subActive
: ""
}`}
onClick={()=>setKnowledgeMode("bio")}
>
BIO
</span>

<span
className={`${frameStyles.subTab} ${
knowledgeMode==="scout"
? frameStyles.subActive
: ""
}`}
onClick={()=>setKnowledgeMode("scout")}
>
SCOUT
</span>

<span
className={`${frameStyles.subTab} ${
knowledgeMode==="career"
? frameStyles.subActive
: ""
}`}
onClick={()=>setKnowledgeMode("career")}
>
CAREER
</span>
</>
)
}



rightTabs={null}

>


<div className={styles.layout}>


<div className={styles.leftPanel}>

<PlayerList
selected={selectedPlayerId}
onSelect={setSelectedPlayerId}
mode={playerUniverse}
/>

</div>



<div className={styles.centerWrap}>

<div
className={`
${styles.dataConduit}
${styles.leftConduit}

${selectedPlayer && !scanComplete
? styles.dataActive
: ""}
`}
/>


<HeroVault
playerSelected={!!selectedPlayer}
cardImage={selectedPlayer?.card}
dlr={dlr ?? 0}
dlrTier={dlrTier}
onScanComplete={()=>setScanComplete(true)}
/>


<div
className={`
${styles.dataConduit}
${styles.rightConduit}

${scanComplete
? styles.dataActive
: ""}
`}
/>

</div>



<div className={styles.rightPanel}>

<IntelStack
player={selectedPlayer}
scanComplete={scanComplete}
mode={intelMode}
infoMode={infoMode}
dlrTier={dlrTier}
/>

</div>



</div>

</OuterFrame>

</main>

)

}
