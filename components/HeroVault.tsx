"use client"

import styles from "./HeroVault.module.css"
import { useCallback, useEffect, useRef, useState } from "react"
import { getDLRPhase, DLR_PHASE_STYLE, LIFECYCLE_STYLE, getLifecycleStage } from "@/data/dlr/dlrPhase"

type Props = {
  playerSelected: boolean
  cardImage?: string
  tier?: string
  dlr?: number
  dlrTier?: string

  /** Dynamic player identity title resolved by resolveVaultTitle() in page.tsx.
   *  Replaces the static dlrTier label in the vault display.
   *  Falls back to dlrTier if not provided. */
  vaultTitle?: string


  // ð¥ NEW (safe additions)
  dlrDelta?: number
  dlrState?: string
  dlrTrend?: "UP" | "DOWN" | "FLAT"

  /** Lifecycle stage drives DLR display colour (HS/NCAA/MiLB/MLB) */
  lifecycleStage?: string | null

  onScanComplete?: () => void
}

function resolveVaultLevel(tier?: string): "MLB" | "MINOR" | "DRAFT" {
  if (!tier) return "DRAFT"
  const t = tier.toUpperCase()
  if (t === "MLB") return "MLB"
  if (["AAA", "AA", "A+", "A", "ROK"].includes(t)) return "MINOR"
  return "DRAFT"
}

function getVaultImage(tier?: string): string {
  const level = resolveVaultLevel(tier)
  if (level === "MLB") return "/ui/vault/major_Vault.png"
  if (level === "MINOR") return "/ui/vault/draft_Vault.png"
  return "/ui/vault/minor_Vault.png"
}


const preloadImage = (src?: string) =>
  new Promise(resolve => {
    if (!src) {
      resolve(true)
      return
    }

    const img = new Image()
    img.src = src

    img.onload = () => resolve(true)
    img.onerror = () => resolve(true)
  })

export default function HeroVault({
  playerSelected,
  cardImage,
  tier,
  dlr = 0,
  dlrTier = "HOLD",

  // ð¥ NEW DEFAULTS
  dlrDelta = 0,
  dlrState = "",
  dlrTrend = "FLAT",

  lifecycleStage,
  vaultTitle,

  onScanComplete
}: Props) {

  // Derive DLR phase from player tier â drives ring + number color
  const phase = getDLRPhase(tier)
  const phaseStyle = DLR_PHASE_STYLE[phase]

  // Lifecycle stage overrides phase colour when present.
  // HS → aqua  |  NCAA → tactical blue  |  MiLB → slate  |  MLB → emerald
  const resolvedLifecycleStage = getLifecycleStage(lifecycleStage)
  const displayStyle = resolvedLifecycleStage && LIFECYCLE_STYLE[resolvedLifecycleStage]
    ? LIFECYCLE_STYLE[resolvedLifecycleStage]
    : phaseStyle

  const [scan, setScan] = useState(false)
  const [open, setOpen] = useState(false)

  const [showRating, setShowRating] = useState(false)
  const [displayDLR, setDisplayDLR] = useState(0)

  const [pulse, setPulse] = useState(false)

  const [holoActive, setHoloActive] = useState(false)
  const [particlesActive, setParticlesActive] = useState(false)

  const [cardState, setCardState] =
    useState<"hidden" | "entering" | "active">("hidden")

  const [visibleCard, setVisibleCard] =
    useState<string | undefined>(undefined)

  const vaultInitialized = useRef(false)

  const countInterval =
    useRef<ReturnType<typeof setInterval> | null>(null)

  const lastPlayerKey = useRef<string | null>(null)
  const lastDLR = useRef<number | null>(null)

  /* =========================
     CLEANUP
  ========================= */

  const clearDLRInterval = () => {
    if (countInterval.current) {
      clearInterval(countInterval.current)
      countInterval.current = null
    }
  }

  /* =========================
     DLR ANIMATION
  ========================= */

  const startPanelSequence = useCallback(() => {

    clearDLRInterval()

    // DECIMAL DLR ANIMATION (Pass 22) — target preserves composeDLR decimal precision.
    // DO NOT re-introduce Math.round(dlr) here without updating DLR_CONTRIBUTION_RULES.md.
    const target = dlr

    setTimeout(() => {

      setShowRating(true)

      let current = 0

      const duration = 1200
      const interval = 40

      const steps = duration / interval
      const increment = target / steps

      countInterval.current = setInterval(() => {

        current += increment

        if (current >= target) {

          current = target

          clearDLRInterval()
          setPulse(true)
        }

        // One decimal place — smooth continuous count.
        setDisplayDLR(Math.round(current * 10) / 10)

      }, interval)

    }, 350)

  }, [dlr])

  /* =========================
     DESELECT / REBOOT
     Fires when the player is cleared (tab switch, filter change).
     Closes the doors and resets all state so the next selection
     runs the full open sequence fresh.
  ========================= */

  useEffect(() => {

    if (playerSelected) return

    clearDLRInterval()
    setScan(false)
    setShowRating(false)
    setDisplayDLR(0)
    setPulse(false)
    setHoloActive(false)
    setParticlesActive(false)
    setCardState("hidden")
    setVisibleCard(undefined)
    setOpen(false)
    vaultInitialized.current = false
    lastPlayerKey.current = null
    lastDLR.current = null

  }, [playerSelected])   // eslint-disable-line react-hooks/exhaustive-deps

  /* =========================
     MAIN SEQUENCE
  ========================= */

  useEffect(() => {

    if (!playerSelected) return

    const playerKey = `${cardImage}-${dlr}`

    if (
      lastPlayerKey.current === playerKey &&
      lastDLR.current === dlr
    ) return

    lastPlayerKey.current = playerKey
    lastDLR.current = dlr

    clearDLRInterval()

    setScan(false)
    setShowRating(false)
    setDisplayDLR(0)
    setPulse(false)
    setHoloActive(false)
    setParticlesActive(false)
    setCardState("hidden")

    const runSequence = async () => {

      await preloadImage(cardImage)

      setVisibleCard(cardImage)

      if (!vaultInitialized.current) {
        vaultInitialized.current = true
        setOpen(true)
      }

      setTimeout(() => setHoloActive(true), 350)
      setTimeout(() => setParticlesActive(true), 550)
      setTimeout(() => setCardState("entering"), 650)

      setTimeout(() => {
        setCardState("active")
        setScan(true)
      }, 900)

      setTimeout(() => {
        setScan(false)
        startPanelSequence()
        onScanComplete?.()
      }, 2600)
    }

    runSequence()

    return () => {
      clearDLRInterval()
    }

  }, [playerSelected, cardImage, dlr, startPanelSequence, onScanComplete])

  /* =========================
     RENDER
  ========================= */

  return (

    <section className={styles.hero}>

      <div className={styles.frame}>

        <div className={styles.doorWrap}>
          <div className={`${styles.doorTop} ${open ? styles.openTop : ""}`} />
          <div className={`${styles.doorMid} ${open ? styles.openMid : ""}`} />
          <div className={`${styles.doorBottom} ${open ? styles.openBottom : ""}`} />
        </div>

        <div className={styles.chamber}>

          <div className={styles.chamberBevel} />

          {holoActive && <div className={styles.holoSlab} />}
          {particlesActive && <div className={styles.nanoParticles} />}

          <div className={styles.mount}>
            <div className={`${styles.cardFX} ${styles[cardState]}`}>
              <img
                src={visibleCard || "/cards/placeholder.png"}
                className={styles.card}
                alt=""
              />
            </div>
          </div>

          {/* ð¥ UPDATED DLR DISPLAY */}
          {showRating && (
            <div
              className={`
                ${styles.ratingWrap}
                ${pulse ? styles.dlrPulse : ""}
                ${dlrTrend === "UP" ? styles.dlrUp : ""}
                ${dlrTrend === "DOWN" ? styles.dlrDown : ""}
              `}
              style={{
                color: displayStyle.color,
                textShadow: displayStyle.textShadow
              }}
            >

              {/* SMALL DLR — only render when delta is meaningful (non-zero) */}
              {Math.abs(dlrDelta) > 0.005 && (
              <div className={styles.dlrDelta}>
                {dlrTrend === "UP" && "â² "}
                {dlrTrend === "DOWN" && "â¼ "}
                {dlrDelta.toFixed(2)} dlr
              </div>
              )}

              {/* MAIN */}
              <div className={styles.ratingLabel}>DLR</div>
              <div className={styles.ratingValue}>{displayDLR.toFixed(1)}</div>

              {/* VAULT TITLE — dynamic identity title resolved by resolveVaultTitle(). Falls back to dlrTier. */}
              <div className={styles.ratingTier}>{vaultTitle ?? dlrTier}</div>

              {/* STATE */}
              {dlrState && (
                <div className={styles.dlrState}>
                  {dlrState}
                </div>
              )}

            </div>
          )}

          <div className={`${styles.dlPlateWrap} ${open ? styles.dlActive : ""}`}>
            <div className={styles.dlTitle}>DIAMOND LEDGER</div>
            <div className={styles.dlSub}>PLAYER INTELLIGENCE SYSTEM</div>
          </div>

          <div className={`${styles.dlPlateWrapLower} ${open ? styles.dlActive : ""}`}>
            <div className={styles.dlTitle}>WHERE LEGENDS EMERGE</div>
          </div>

          <div className={styles.playerPedestal} style={{ backgroundImage: `url(${getVaultImage(tier)})` }} />

          <div className={styles.pedestalCoreWrap}>
            <div className={styles.pedestalCore} />
          </div>

          <div className={`${styles.beam} ${scan ? styles.beamActive : ""}`} />

        </div>

      </div>

    </section>
  )
}