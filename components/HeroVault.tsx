"use client"

import styles from "./HeroVault.module.css"
import { useCallback, useEffect, useRef, useState } from "react"

type Props = {
  playerSelected: boolean
  cardImage?: string
  tier?: string
  dlr?: number
  dlrTier?: string
  onScanComplete?: () => void
}

const preloadImage = (src?: string) =>
  new Promise(resolve => {

    if(!src){
      resolve(true)
      return
    }

    const img = new Image()

    img.src = src

    img.onload = () => resolve(true)
    img.onerror = () => resolve(true)

  })

const displayCardImage = (src?: string) =>
  src?.startsWith("/cards/")
    ? src.replace("/cards/","/cards_display/")
    : src

export default function HeroVault({
  playerSelected,
  cardImage,
  dlr = 0,
  dlrTier = "HOLD",
  onScanComplete
}: Props){
  const displayCard =
    displayCardImage(cardImage)

  const [scan,setScan] = useState(false)
  const [open,setOpen] = useState(false)

  const [showRating,setShowRating] = useState(false)
  const [displayDLR,setDisplayDLR] = useState(0)

  const [pulse,setPulse] = useState(false)

  const [holoActive,setHoloActive] = useState(false)
  const [particlesActive,setParticlesActive] = useState(false)

  const [cardState,setCardState] =
    useState<"hidden"|"entering"|"active">("hidden")

  const [visibleCard,setVisibleCard] =
    useState(displayCard)

  const lastCard =
    useRef<string | undefined>(undefined)

  const vaultInitialized = useRef(false)

  const countInterval =
    useRef<ReturnType<typeof setInterval> | null>(null)

  const startPanelSequence = useCallback(()=>{
    setTimeout(()=>{

      setShowRating(true)

      let current = 0

      const duration = 1200
      const interval = 40

      const steps = duration / interval
      const increment = dlr / steps

      countInterval.current = setInterval(()=>{

        current += increment

        if(current >= dlr){

          current = dlr

          if(countInterval.current){
            clearInterval(countInterval.current)
          }

          setPulse(true)
        }

        setDisplayDLR(Math.round(current))

      },interval)

    },350)
  },[dlr])


  useEffect(()=>{

    if(!playerSelected) return

    if(displayCard === lastCard.current) return

    lastCard.current = displayCard

    setTimeout(()=>{
      setScan(false)
      setShowRating(false)
      setDisplayDLR(0)
      setPulse(false)
      setHoloActive(false)
      setParticlesActive(false)
      setCardState("hidden")
    },0)

    if(!vaultInitialized.current){

      vaultInitialized.current = true

      setTimeout(async()=>{
        await preloadImage(displayCard)
        setVisibleCard(displayCard)
        setOpen(true)
      },120)

    }
    else{

      setTimeout(async()=>{
        await preloadImage(displayCard)
        setVisibleCard(displayCard)
      },120)

    }

    setTimeout(()=> setHoloActive(true),350)
    setTimeout(()=> setParticlesActive(true),550)
    setTimeout(()=> setCardState("entering"),650)

    setTimeout(()=>{
      setCardState("active")
      setScan(true)
    },900)

    setTimeout(()=>{
      setScan(false)
      startPanelSequence()
      onScanComplete?.()
    },2600)

  },[playerSelected,displayCard,onScanComplete,startPanelSequence])


  return(

    <section className={styles.hero}>

      <div className={styles.frame}>

        <div className={styles.doorWrap}>

          <div className={`${styles.doorTop} ${open ? styles.openTop : ""}`}/>
          <div className={`${styles.doorMid} ${open ? styles.openMid : ""}`}/>
          <div className={`${styles.doorBottom} ${open ? styles.openBottom : ""}`}/>

        </div>


        <div className={styles.chamber}>

          <div className={styles.chamberBevel}/>

          {holoActive && <div className={styles.holoSlab}/>}

          {particlesActive && <div className={styles.nanoParticles}/>}

          <div className={styles.mount}>

            <div className={`${styles.cardFX} ${styles[cardState]}`}>

              <img
                src={visibleCard || "/cards/shohei_ohtani.png"}
                className={styles.card}
                alt=""
              />

            </div>

          </div>


          {showRating && (

            <div className={`${styles.ratingWrap} ${pulse ? styles.dlrPulse : ""}`}>

              <div className={styles.ratingLabel}>DLR</div>

              <div className={styles.ratingValue}>{displayDLR}</div>

              <div className={styles.ratingTier}>{dlrTier}</div>

            </div>

          )}


          {/* TOP PLATE */}

          <div className={`${styles.dlPlateWrap} ${open ? styles.dlActive : ""}`}>

            <div className={styles.dlTitle}>
              DIAMOND LEDGER
            </div>

            <div className={styles.dlSub}>
              PLAYER INTELLIGENCE SYSTEM
            </div>

          </div>


          {/* LOWER PLATE */}

          <div className={`${styles.dlPlateWrapLower} ${open ? styles.dlActive : ""}`}>

            <div className={styles.dlTitle}>
              WHERE LEGENDS EMERGE
            </div>

          </div>


          {/* PEDESTAL BASE */}

          <div className={styles.playerPedestal}/>


          {/* NEW ROTATING CORE */}

          <div className={styles.pedestalCoreWrap}>
  <div className={styles.pedestalCore}/>
</div>


          <div className={`${styles.beam} ${scan ? styles.beamActive : ""}`}/>

        </div>

      </div>

    </section>

  )

}
