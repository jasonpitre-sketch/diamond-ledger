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
import { resolveVaultTitle, resolveVaultEcosystem } from "@/lib/vault/vaultTitle"
import type { Player } from "@/data/types/player"



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

type PlayerRecordWithLifecycle = PlayerRecord & {
  performance?: { competitionLevel?: string | null }
  tier?: string
  level?: string
}

function getCompetitionLevel(player: PlayerRecord | null | undefined){
  return (player as PlayerRecordWithLifecycle | null | undefined)?.performance?.competitionLevel ?? undefined
}

function getTierOrLevel(player: PlayerRecord | null | undefined){
  const record = player as PlayerRecordWithLifecycle | null | undefined
  return record?.tier ?? record?.level
}


export default function Page(){



/* =========================
STATE
========================= */

const [selectedPlayerId,setSelectedPlayerId] =
useState<string | null>(null)

const [scanComplete,setScanComplete] =
useState(false)


const [playerUniverse,setPlayerUniverse] =
useState<"hs"|"ncaa"|"draft"|"minors"|"majors"|"tracked">("draft")


const [systemMode,setSystemMode] =
useState<SystemMode>("knowledge")


const [knowledgeMode,setKnowledgeMode] =
useState<KnowledgeMode>("bio")

// Performance intelligence context — lifted from PlayerList so IntelStack switches in sync.
// "bats" = hitting intelligence active; "arms" = pitching intelligence active.
// DLR remains unified — only the displayed performance panels change.
const [performanceContext,setPerformanceContext] =
useState<"bats"|"arms">("bats")


/* =========================
DATASET
========================= */

const dataset = useMemo<PlayerRecord[]>(()=>{

const allPlayers = [

...playersDraft2026,
...playersDraft2025,
...playersDraft2018

]

// HS ecosystem — prep/high-school players classified by competitionLevel
if(playerUniverse==="hs"){
return playersDraft2026.filter(p=>
  (getCompetitionLevel(p) ?? "").toUpperCase() === "HS"
) as PlayerRecord[]
}

// NCAA ecosystem — college players classified by competitionLevel
if(playerUniverse==="ncaa"){
return playersDraft2026.filter(p=>
  (getCompetitionLevel(p) ?? "").toUpperCase() === "NCAA"
) as PlayerRecord[]
}

// DRAFT — active current-year intelligence board (mixed HS + NCAA)
if(playerUniverse==="draft"){
return playersDraft2026
}

if(playerUniverse==="minors"){
return playersDraft2025
}

if(playerUniverse==="majors"){
return playersDraft2018
}

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

const vaultTitle = useMemo(()=>{
if(!selectedPlayer) return undefined
const ecosystem = resolveVaultEcosystem(
  playerUniverse,
  getCompetitionLevel(selectedPlayer),
  getTierOrLevel(selectedPlayer)
)
return resolveVaultTitle(ecosystem, dlr)
},[selectedPlayer, playerUniverse, dlr])

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

{/* HS — Prep/high-school ecosystem (aqua accent) */}
<span
className={`${frameStyles.tab} ${playerUniverse==="hs" ? frameStyles.activeTab : ""}`}
style={playerUniverse==="hs" ? {
  borderColor: "#c8a564",
  boxShadow:   "0 0 0 1px rgba(200,165,100,.32), 0 0 16px rgba(200,165,100,.28), inset 0 1px 0 rgba(255,255,255,.22), inset 0 -18px 35px rgba(0,0,0,.95)"
} : undefined}
onClick={()=>{ setPlayerUniverse("hs"); setSelectedPlayerId(null); setScanComplete(false) }}
>
HS
</span>

{/* NCAA — College ecosystem (DLR aerospace teal) */}
<span
className={`${frameStyles.tab} ${playerUniverse==="ncaa" ? frameStyles.activeTab : ""}`}
style={playerUniverse==="ncaa" ? {
  borderColor: "#3eb489",
  boxShadow:   "0 0 0 1px rgba(62,180,137,.32), 0 0 16px rgba(62,180,137,.28), inset 0 1px 0 rgba(255,255,255,.22), inset 0 -18px 35px rgba(0,0,0,.95)"
} : undefined}
onClick={()=>{ setPlayerUniverse("ncaa"); setSelectedPlayerId(null); setScanComplete(false) }}
>
NCAA
</span>

{/* DRAFT — Active intelligence board (neutral command tone) */}
<span
className={`${frameStyles.tab} ${playerUniverse==="draft" ? frameStyles.activeTab : ""}`}
onClick={()=>{ setPlayerUniverse("draft"); setSelectedPlayerId(null); setScanComplete(false) }}
>
DRAFT
</span>

{/* MiLB — MiLB professional development (slate/titanium accent) */}
<span
className={`${frameStyles.tab} ${playerUniverse==="minors" ? frameStyles.activeTab : ""}`}
style={playerUniverse==="minors" ? {
  borderColor: "#2d72d4",
  boxShadow:   "0 0 0 1px rgba(45,114,212,.32), 0 0 16px rgba(45,114,212,.28), inset 0 1px 0 rgba(255,255,255,.22), inset 0 -18px 35px rgba(0,0,0,.95)"
} : undefined}
onClick={()=>{ setPlayerUniverse("minors"); setSelectedPlayerId(null); setScanComplete(false) }}
>
MiLB
</span>

{/* MLB — MLB verified elite (emerald accent) */}
<span
className={`${frameStyles.tab} ${playerUniverse==="majors" ? frameStyles.activeTab : ""}`}
style={playerUniverse==="majors" ? {
  borderColor: "#b8e8ff",
  boxShadow:   "0 0 0 1px rgba(184,232,255,.32), 0 0 16px rgba(184,232,255,.28), inset 0 1px 0 rgba(255,255,255,.22), inset 0 -18px 35px rgba(0,0,0,.95)"
} : undefined}
onClick={()=>{ setPlayerUniverse("majors"); setSelectedPlayerId(null); setScanComplete(false) }}
>
MLB
</span>

{/* TRACKED — Cross-ecosystem watchlist (neutral) */}
<span
className={`${frameStyles.tab} ${playerUniverse==="tracked" ? frameStyles.activeTab : ""}`}
onClick={()=>{ setPlayerUniverse("tracked"); setSelectedPlayerId(null); setScanComplete(false) }}
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
systemMode==="knowledge"
? (
<>
<span
className={`${frameStyles.subTab} ${knowledgeMode==="bio" ? frameStyles.subActive : ""}`}
onClick={()=>setKnowledgeMode("bio")}
>
BIO
</span>

<span
className={`${frameStyles.subTab} ${knowledgeMode==="scout" ? frameStyles.subActive : ""}`}
onClick={()=>setKnowledgeMode("scout")}
>
SCOUT
</span>

<span
className={`${frameStyles.subTab} ${knowledgeMode==="career" ? frameStyles.subActive : ""}`}
onClick={()=>setKnowledgeMode("career")}
>
CAREER
</span>
</>
)
: null
}



rightTabs={null}

>


<div className={styles.layout}>


<div className={styles.leftPanel}>

<PlayerList
selected={selectedPlayerId}
onSelect={setSelectedPlayerId}
mode={playerUniverse}
performanceContext={performanceContext}
onPerformanceContextChange={setPerformanceContext}
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
tier={getTierOrLevel(selectedPlayer)}
dlr={dlr ?? 0}
dlrTier={dlrTier}
vaultTitle={vaultTitle}
lifecycleStage={getCompetitionLevel(selectedPlayer)}
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
player={selectedPlayer as Player | null}
scanComplete={scanComplete}
mode={intelMode}
infoMode={infoMode}
dlrTier={dlrTier}
performanceContext={performanceContext}
precomputedDlr={dlrResult}
/>

</div>



</div>

</OuterFrame>

</main>

)

}
