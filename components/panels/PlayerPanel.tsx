"use client"

import styles from "./PlayerPanel.module.css"

import type { Player } from "@/data/types/player"
import { calculateDLR } from "@/data/dlr/calculateDLR"

import { playersDraft2026 } from "@/data/playersDraft2026"
import { playersDraft2025 } from "@/data/playersDraft2025"
import { playersDraft2018 } from "@/data/playersDraft2018"
import { players } from "@/data/players"

import HeroVault from "@/components/HeroVault"
import IntelStack from "@/components/panels/IntelStack"

import { useMemo } from "react"



type Props = {
  selectedPlayerId: string | null
  mode?: "draft" | "players" | "tracked"
}



export default function PlayerPanel({
  selectedPlayerId,
  mode = "draft"
}: Props) {


  /* =========================
     DATASET
  ========================= */

  const dataset = useMemo<Player[]>(() => {

    const combined = [

      ...playersDraft2026,
      ...playersDraft2025,
      ...playersDraft2018,
      ...players

    ] as Player[]


    if (mode === "draft") {

      return combined.filter(
        p => p.level === "Draft"
      )

    }


    if (mode === "tracked") {

      return combined.filter(
        p => p.signals?.tracked
      )

    }


    return combined

  }, [mode])



  /* =========================
     FIND PLAYER
  ========================= */

  const player = useMemo<Player | null>(() => {

    return dataset.find(
      p => p.id === selectedPlayerId
    ) ?? null

  }, [dataset, selectedPlayerId])



  /* =========================
     CARD IMAGE
  ========================= */

  const cardImage =
    player?.cardImage ??
    "/cards/placeholder.png"



  /* =========================
     DLR PLACEHOLDER
  ========================= */

  const dlrResult = player ? calculateDLR(player) : null
  const dlrScore = dlrResult?.rating ?? 0
  const dlrTier = dlrResult?.tier ?? "HOLD"



  /* =========================
     PLAYER TIER
  ========================= */

  const tier =
    player?.level ??
    player?.tier ??
    "DRAFT"



  /* =========================
     RENDER
  ========================= */

  return (

    <section className={styles.panel}>

      <div className={styles.heroArea}>

        <HeroVault
          playerSelected={Boolean(player)}
          cardImage={cardImage}
          tier={tier}
          dlr={dlrScore}
          dlrTier={dlrTier}
        />

      </div>


      <div className={styles.intelArea}>

        <IntelStack player={player} />

      </div>


    </section>

  )

}
