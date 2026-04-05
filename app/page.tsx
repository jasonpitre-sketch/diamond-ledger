"use client"

import styles from "./page.module.css"

import OuterFrame from "@/components/frame/OuterFrame"

import PlayerList from "@/components/panels/PlayerList"
import HeroVault from "@/components/HeroVault"
import IntelStack from "@/components/panels/IntelStack"

import { useState,useEffect } from "react"

import { players } from "@/data/players"
import { calculateDLR } from "@/data/dlr"

export default function Page(){

const [selectedPlayerId,setSelectedPlayerId] = useState<string | null>(null)

const [scanComplete,setScanComplete] = useState(false)

const [intelMode,setIntelMode] = useState<
"performance" | "media" | "market"
>("performance")

const [dlr,setDlr] = useState<number | null>(null)
const [dlrTier,setDlrTier] = useState<string>("")

const selectedPlayer =
players.find(p => p.id === selectedPlayerId) || null

useEffect(()=>{

setScanComplete(false)

setDlr(null)
setDlrTier("")

if(!selectedPlayer) return

const result = calculateDLR(selectedPlayer)

setDlr(result.rating)
setDlrTier(result.tier)

},[selectedPlayerId])

return(

<main className={styles.page}>

<OuterFrame

modeBar={

<>

<span
className={intelMode==="performance" ? styles.activeTab : ""}
onClick={()=>setIntelMode("performance")}
>

PERFORMANCE

</span>

<span
className={intelMode==="media" ? styles.activeTab : ""}
onClick={()=>setIntelMode("media")}
>

MEDIA

</span>

<span
className={intelMode==="market" ? styles.activeTab : ""}
onClick={()=>setIntelMode("market")}
>

MARKET

</span>

</>

}

>

<div className={styles.layout}>

<PlayerList
selected={selectedPlayerId}
onSelect={setSelectedPlayerId}
/>

<HeroVault
playerSelected={!!selectedPlayer}
cardImage={selectedPlayer?.card}
dlr={dlr ?? undefined}
dlrTier={dlrTier}
onScanComplete={()=>setScanComplete(true)}
/>

<div className={styles.rightPanel}>

<IntelStack
player={selectedPlayer}
scanComplete={scanComplete}
mode={intelMode}
/>

</div>

</div>

</OuterFrame>

</main>

)

}