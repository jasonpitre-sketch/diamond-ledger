"use client"

import styles from "./HeroVault.module.css"
import { useEffect, useRef, useState } from "react"

type Props = {
  playerSelected: boolean
  cardImage?: string
  tier?: "draft" | "minors" | "majors" | "mvp" | "hof"
  dlr?: number
  dlrTier?: string
  onScanComplete?: () => void
}

const preloadImage = (src?: string) =>
  new Promise(resolve => {
    if(!src){ resolve(true); return }
    const img = new Image()
    img.src = src
    img.onload = () => resolve(true)
    img.onerror = () => resolve(true)
  })

export default function HeroVault({

  playerSelected,
  cardImage,
  tier="draft",
  dlr=92,
  dlrTier="ELITE",
  onScanComplete

}:Props){

const [scan,setScan]=useState(false)
const [open,setOpen]=useState(false)

const [showRating,setShowRating]=useState(false)
const [displayDLR,setDisplayDLR]=useState(0)

const [panel1,setPanel1]=useState(false)
const [panel2,setPanel2]=useState(false)
const [panel3,setPanel3]=useState(false)

const [pulse,setPulse]=useState(false)

const [holoActive,setHoloActive]=useState(false)
const [particlesActive,setParticlesActive]=useState(false)

const [cardState,setCardState]=
useState<"hidden"|"entering"|"active">("hidden")

const [visibleCard,setVisibleCard]=
useState(cardImage)

const lastCard=
useRef<string | undefined>(undefined)

const countInterval=
useRef<NodeJS.Timeout | null>(null)



useEffect(()=>{

if(!playerSelected) return
if(cardImage===lastCard.current) return

lastCard.current=cardImage

setScan(false)
setShowRating(false)
setDisplayDLR(0)

setPanel1(false)
setPanel2(false)
setPanel3(false)

setPulse(false)

setHoloActive(false)
setParticlesActive(false)

setCardState("hidden")



setTimeout(async()=>{

await preloadImage(cardImage)

setVisibleCard(cardImage)

setOpen(true)

},120)



setTimeout(()=>{

setHoloActive(true)

},350)



setTimeout(()=>{

setParticlesActive(true)

},550)



setTimeout(()=>{

setCardState("entering")

},650)



setTimeout(()=>{

setCardState("active")
setScan(true)

},900)



setTimeout(()=>{

setScan(false)

startPanelSequence()

onScanComplete?.()

},3800)

},[playerSelected,cardImage,onScanComplete])



function startPanelSequence(){

setTimeout(()=>{

setPanel1(true)

},400)



setTimeout(()=>{

setShowRating(true)

let current=0

const duration=1500
const interval=45

const steps=duration/interval
const increment=dlr/steps

countInterval.current=
setInterval(()=>{

current+=increment

if(current>=dlr){

current=dlr

if(countInterval.current){

clearInterval(countInterval.current)

}

setPulse(true)

}

setDisplayDLR(Math.round(current))

},interval)

},700)



setTimeout(()=>{

setPanel2(true)

},1600)



setTimeout(()=>{

setPanel3(true)

},2600)

}



return(

<section className={styles.hero}>

<div className={styles.frame}>



<div className={styles.doorWrap}>

<div className={`${styles.doorTop} ${open?styles.openTop:""}`}/>

<div className={`${styles.doorMid} ${open?styles.openMid:""}`}>


</div>

<div className={`${styles.doorBottom} ${open?styles.openBottom:""}`}/>

<div className={styles.ledRow}>
<div className={styles.led}/>
<div className={`${styles.led} ${styles.ledPulse}`}/>
<div className={`${styles.led} ${styles.ledBlink}`}/>
</div>

<div className={styles.floorGlow}/>

</div>



<div className={styles.chamber}>



<div className={styles.rearDepth}>
<div className={styles.rearBeams}/>
</div>

<div className={styles.chamberBevel}/>

<div className={styles.particleField}/>

<div className={styles.chamberFog}/>



{holoActive && <div className={styles.holoSlab}/>}

{particlesActive && <div className={styles.nanoParticles}/>}



<div className={styles.mount}>

<div className={`${styles.cardFX} ${styles[cardState]}`}>

<img
src={visibleCard || "/cards/shohei_ohtani.png"}
className={styles.card}
/>

<div className={styles.cardGlow}/>
<div className={styles.scanLines}/>

</div>

</div>



{showRating&&(

<div className={`${styles.ratingWrap} ${pulse?styles.dlrPulse:""}`}>

<div className={styles.ratingLabel}>DLR</div>

<div className={styles.ratingValue}>{displayDLR}</div>

<div className={styles.ratingTier}>{dlrTier}</div>

</div>

)}



<div className={styles.platformRing}/>

<div className={styles.platformText}>
DLR ANALYSIS PLATFORM
</div>

<div className={`${styles.dlPlateWrap} ${open ? styles.dlActive : ""}`}>

<div className={styles.dlTitle}>
DIAMOND LEDGER
</div>

<div className={styles.dlSub}>
PLAYER INTELLIGENCE SYSTEM
</div>

</div>

<div className={styles.playerPedestal}/>



<div className={`${styles.beam} ${scan?styles.beamActive:""}`}/>

</div>



<div className={styles.base}/>

</div>

</section>

)

}