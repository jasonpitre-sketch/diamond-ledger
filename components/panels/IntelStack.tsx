"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

import styles from "./IntelStack.module.css"
import { map3 } from "@/data/intel/mapper"
import TierPanel_1 from "./TierPanel_1"
import TierPanel_2 from "./TierPanel_2"
import TierPanel_3 from "./TierPanel_3"

import { calculateScoutScoutRows } from "@/data/dlr/knowledge/calculateScoutScoutRows"

import {
  calculateKnowledgeBioAnalyst,
  calculateKnowledgeCareerAnalyst
} from "@/data/dlr/knowledge/calculateAnalyst"

import {
  calculateKnowledgeBioSnapshot,
  calculateKnowledgeScoutSnapshot,
  calculateKnowledgeCareerSnapshot
} from "@/data/dlr/knowledge/calculateSnapshot"

import {
  calculateKnowledgeBioScout,
  calculateKnowledgeCareerScout
} from "@/data/dlr/knowledge/calculateScout"

import { calculatePerformanceSnapshot } from "@/data/dlr/performance/calculatePerformanceSnapshot"
import { calculatePerformancePitcherScout } from "@/data/dlr/performance/calculatePerformancePitcherScout"
import { calculatePerformancePitcherAnalyst } from "@/data/dlr/performance/calculatePerformancePitcherAnalyst"
import { calculatePerformanceHitterSnapshot } from "@/data/dlr/performance/calculatePerformanceHitterSnapshot"
import { calculatePerformanceHitterScout } from "@/data/dlr/performance/calculatePerformanceHitterScout"
import { calculatePerformanceHitterAnalyst } from "@/data/dlr/performance/calculatePerformanceHitterAnalyst"
import { mediaSnapshotMeaning } from "@/data/dlr/media/mediaSnapshotMeaning"
import { mediaScoutMeaning } from "@/data/dlr/media/mediaScoutMeaning"
import { mediaAnalystMeaning } from "@/data/dlr/media/mediaAnalystMeaning"
import {
  calculatePlayerSignals,
  getPerformanceStatTable,
  type SignalDirection,
  type SignalTone
} from "@/data/dlr/signals/playerSignals"
import { calculateDLR } from "@/data/dlr/calculateDLR"
import {
  buildAllCellSummaries,
  type CellSummary
} from "@/data/dlr/dlrTitles"

type Props = {
  player: any
  scanComplete?: boolean
  mode?: "knowledge" | "performance" | "media" | "market"
  infoMode?: "bio" | "scout" | "career"
  dlrTier?: string
}

type PanelRow = {
  label: string
  value: number
  max: number
}

type ScaleOption = {
  label: string
  active: boolean
  tooltip?: string
}

type ScaleRowProps = {
  label: string
  labelTooltip?: string
  options: ScaleOption[]
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function ScaleRow({
  label,
  labelTooltip,
  options
}: ScaleRowProps) {
  return (
    <div className={styles.scaleGrid}>
      <div className={styles.tooltipWrap}>
        <div className={styles.key}>{label.replace(/:$/,"")}:</div>
        {labelTooltip ? (
          <div className={styles.tooltipBubble}>{labelTooltip}</div>
        ) : null}
      </div>

      {options.map((option) => (
        <div
          key={option.label}
          className={`${styles.opt} ${option.active ? styles.green : ""}`}
        >
          <div className={styles.tooltipWrap}>
            <span>{option.label}</span>
            {option.tooltip ? (
              <div className={styles.tooltipBubble}>{option.tooltip}</div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}


function resolveThreeWay(
  scoreValue: unknown,
  fallbackValue: unknown,
  lowLabel: string,
  midLabel: string,
  highLabel: string
) {
  const validLabels = [lowLabel, midLabel, highLabel]

  if (typeof scoreValue === "number" && Number.isFinite(scoreValue)) {
    return map3(scoreValue, lowLabel, midLabel, highLabel)
  }

  if (typeof scoreValue === "string" && validLabels.includes(scoreValue)) {
    return scoreValue
  }

  if (typeof fallbackValue === "number" && Number.isFinite(fallbackValue)) {
    return map3(fallbackValue, lowLabel, midLabel, highLabel)
  }

  if (typeof fallbackValue === "string" && validLabels.includes(fallbackValue)) {
    return fallbackValue
  }

  return midLabel
}

function valueBucket(value: unknown) {
  const score = typeof value === "number" && Number.isFinite(value) ? value : 0.5

  if (score < 0.55) return "low"
  if (score < 0.72) return "mid"
  return "high"
}

function mediaScaleOptions(
  value: unknown,
  lowLabel: string,
  midLabel: string,
  highLabel: string,
  meaningFn?: (value: number) => string
) {
  const bucket = valueBucket(value)
  const score = typeof value === "number" && Number.isFinite(value) ? value : 0.5
  const scoreText = score.toFixed(2)
  const meaning = meaningFn ? meaningFn(score) : null

  const optionTooltip = (
    optionBucket: "low" | "mid" | "high",
    range: string
  ) => {
    if (bucket === optionBucket && meaning) {
      return `${scoreText} - ${meaning}`
    }

    if (bucket === optionBucket) {
      return `${scoreText} - ${range}`
    }

    return range
  }

  return [
    {
      label: lowLabel,
      active: bucket === "low",
      tooltip: optionTooltip("low", "Below .55")
    },
    {
      label: midLabel,
      active: bucket === "mid",
      tooltip: optionTooltip("mid", ".55 to .71")
    },
    {
      label: highLabel,
      active: bucket === "high",
      tooltip: optionTooltip("high", ".72 and above")
    }
  ]
}

function formIcon(tone: SignalTone) {
  if (tone === "hot") return "🔥"
  if (tone === "cold") return "❄"
  return "•"
}

function surgeIcon(tone: SignalTone) {
  if (tone === "hot") return "⚡"
  if (tone === "cold") return "↓"
  return "•"
}

function valueIcon(direction: SignalDirection) {
  if (direction === "up") return "◇"
  if (direction === "down") return "▼"
  return "→"
}

const teamAccentColors: Record<string, { display: string; dark: string; light: string }> = {
  ARI: { display: "ARI", dark: "#7a1f32", light: "#e3b04b" },
  ATH: { display: "ATH", dark: "#003831", light: "#efb21e" },
  ATL: { display: "ATL", dark: "#13274f", light: "#ce1141" },
  BAL: { display: "BAL", dark: "#1d1d1d", light: "#df4601" },
  BOS: { display: "BOS", dark: "#0d2b56", light: "#bd3039" },
  CHC: { display: "CHC", dark: "#0e3386", light: "#cc3433" },
  CHW: { display: "CHW", dark: "#111111", light: "#c4ced4" },
  CWS: { display: "CHW", dark: "#111111", light: "#c4ced4" },
  CIN: { display: "CIN", dark: "#111111", light: "#c6011f" },
  CLE: { display: "CLE", dark: "#00385d", light: "#e50022" },
  COL: { display: "COL", dark: "#33006f", light: "#c4ced4" },
  DET: { display: "DET", dark: "#0c2340", light: "#fa4616" },
  HOU: { display: "HOU", dark: "#002d62", light: "#eb6e1f" },
  KC: { display: "KC", dark: "#004687", light: "#bd9b60" },
  LAA: { display: "LAA", dark: "#003263", light: "#ba0021" },
  LAD: { display: "LAD", dark: "#005a9c", light: "#ef3e42" },
  MIA: { display: "MIA", dark: "#00a3e0", light: "#ef3340" },
  MIL: { display: "MIL", dark: "#12284b", light: "#ffc52f" },
  MIN: { display: "MIN", dark: "#002b5c", light: "#d31145" },
  NYM: { display: "NYM", dark: "#002d72", light: "#ff5910" },
  NYY: { display: "NYY", dark: "#0c2340", light: "#c4ced4" },
  OAK: { display: "OAK", dark: "#003831", light: "#efb21e" },
  PHI: { display: "PHI", dark: "#002d72", light: "#e81828" },
  PIT: { display: "PIT", dark: "#111111", light: "#fdb827" },
  SD: { display: "SD", dark: "#2f241d", light: "#ffc425" },
  SEA: { display: "SEA", dark: "#0c2c56", light: "#00a3ad" },
  SF: { display: "SF", dark: "#27251f", light: "#fd5a1e" },
  STL: { display: "STL", dark: "#0c2340", light: "#c41e3a" },
  TB: { display: "TB", dark: "#092c5c", light: "#8fbce6" },
  TEX: { display: "TEX", dark: "#003278", light: "#c0111f" },
  TOR: { display: "TOR", dark: "#134a8e", light: "#e8291c" },
  WSH: { display: "WSH", dark: "#14225a", light: "#ab0003" }
}

function getTeamAccent(team?: string) {
  const code = team?.toUpperCase() ?? "DLR"
  return teamAccentColors[code] ?? {
    display: code,
    dark: "#16304f",
    light: "#9fd0ff"
  }
}

export default function IntelStack({
  player,
  scanComplete = false,
  mode = "knowledge",
  infoMode = "bio"
}: Props) {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  const prevPlayer = useRef<any>(null)
  const prevScan = useRef(false)
  const playerActive = Boolean(player)

  const k =
    player?.knowledge ?? {
      bio: { snapshot: {}, scout: {}, analyst: {} },
      scout: { snapshot: {}, scout: {}, analyst: {} },
      career: { snapshot: {}, scout: {}, analyst: {} }
    }

  const perf =
    player?.performance ?? {
      snapshot: {},
      scout: {},
      analyst: {}
    }

  const m =
    player?.media ?? {
      snapshot: {},
      scout: {},
      analyst: {}
    }

  const c = player?.cardMarket ?? {}

  const primaryTool = k?.scout?.snapshot?.primaryTool || []
  const roleType = k?.scout?.snapshot?.roleType || []
  const physicalProjection = k?.scout?.snapshot?.physicalProjection || []
  const riskProfile = k?.scout?.snapshot?.riskProfile || []

  const pos = String(player?.position ?? player?.pos ?? "").toUpperCase()

  const isPitcher =
    perf?.kind === "pitcher" ||
    pos === "RHP" ||
    pos === "LHP" ||
    pos === "SP" ||
    pos === "RP" ||
    pos === "P"

  const performanceTable = getPerformanceStatTable(player)
  const performanceSignals = calculatePlayerSignals(player,isPitcher ? "pitch" : "hit")
  const dlrResult = player ? calculateDLR(player) : null
  const cellSummaries =
    dlrResult ? buildAllCellSummaries(dlrResult.subScores) : []

  const getCellSummary = (sub: "snapshot" | "scout" | "analyst") =>
    cellSummaries.find((summary) => {
      if (summary.id.layer !== mode) return false

      if (summary.id.layer === "knowledge") {
        return summary.id.page === infoMode && summary.id.sub === sub
      }

      return summary.id.sub === sub
    }) ?? null

  const getPanelWrapClass = (tier: 1 | 2 | 3) => {
    const tierClass =
      tier === 1
        ? styles.tier1Wrap
        : tier === 2
          ? styles.tier2Wrap
          : styles.tier3Wrap

    if (mode !== "knowledge") {
      return cx(styles.panelWrap, tierClass)
    }

    const knowledgeClass =
      infoMode === "bio"
        ? tier === 1
          ? styles.bioSnapshot
          : tier === 2
            ? styles.bioScout
            : styles.bioAnalyst
        : infoMode === "scout"
          ? tier === 1
            ? styles.scoutSnapshot
            : tier === 2
              ? styles.scoutScout
              : styles.scoutAnalyst
          : tier === 1
            ? styles.careerSnapshot
            : tier === 2
              ? styles.careerScout
              : styles.careerAnalyst

    return cx(styles.panelWrap, tierClass, knowledgeClass)
  }

  const scoutScoutRows: any = calculateScoutScoutRows(k)
  const warValue = perf?.analyst?.war ?? 2.4

  const snapshotDLR = isPitcher
    ? calculatePerformanceSnapshot(player)
    : calculatePerformanceHitterSnapshot(player)

  const scoutDLR = isPitcher
    ? calculatePerformancePitcherScout(player)
    : calculatePerformanceHitterScout(player)

  const analystDLR = isPitcher
    ? calculatePerformancePitcherAnalyst(player)
    : calculatePerformanceHitterAnalyst(player)

  const mediaSnapshotDLR =
    (m.snapshot?.mentions ?? 0) +
    (m.snapshot?.headlineImpact ?? 0) +
    (m.snapshot?.highlightFactor ?? 0) +
    (m.snapshot?.socialBuzz ?? 0)

  const mediaScoutDLR =
    (m.scout?.fanRecognition ?? 0) +
    (m.scout?.teamVisibility ?? 0) +
    (m.scout?.interviewPresence ?? 0) +
    (m.scout?.narrativeStrength ?? 0) +
    (m.scout?.milestoneAttention ?? 0)

  const mediaAnalystDLR =
    (m.analyst?.prospectPedigree ?? 0) * 0.75 +
    (m.analyst?.hypeTrend ?? 0) * 0.75 +
    (m.analyst?.mediaStability ?? 0) * 0.75 +
    (m.analyst?.storyDurability ?? 0) * 0.75 +
    (m.analyst?.breakoutProbability ?? 0) * 0.75 +
    (m.analyst?.publicMomentum ?? 0) * 0.75 +
    (m.analyst?.attentionDecay ?? 0) * 0.75 +
    (m.analyst?.confidence ?? 0) * 0.75

  const marketSnapshotDLR =
    Math.min(4, (
      (Math.min(c.psa10Premium ?? 2, 3.5) / 3.5) +
      (c.liquidity ?? 0) +
      (c.trend ?? 0) +
      (1 - (c.volatility ?? 0.5))
    ))

  const marketScoutDLR =
    (c.scarcity ?? 0) +
    (c.liquidity ?? 0) +
    (c.depth ?? 0) +
    (c.stability ?? 0) +
    (1 - (c.volatility ?? 0.5))

  const marketAnalystDLR =
    ((c.longTerm ?? 0) +
      (c.confidence ?? 0) +
      (c.trend ?? 0) +
      (c.scarcity ?? 0) +
      (c.liquidity ?? 0) +
      (c.stability ?? 0) +
      (1 - (c.volatility ?? 0.5)) +
      (c.depth ?? 0)) * 0.75

  const tier1Rows: PanelRow[] =
    mode === "performance"
      ? [{ label: "SNAPSHOT", value: snapshotDLR, max: 8 }]
      : mode === "market"
        ? [{ label: "MARKET", value: marketSnapshotDLR, max: 4 }]
      : mode === "media"
        ? [{ label: "MEDIA", value: mediaSnapshotDLR, max: 4 }]
        : infoMode === "bio"
          ? [{ label: "BIO", value: calculateKnowledgeBioSnapshot(), max: 1 }]
          : infoMode === "scout"
            ? [{ label: "SCOUT", value: calculateKnowledgeScoutSnapshot(), max: 1 }]
            : [{ label: "CAREER", value: calculateKnowledgeCareerSnapshot(), max: 1 }]

  const tier2Rows: PanelRow[] =
    mode === "performance"
      ? [{ label: "SCOUT", value: scoutDLR, max: 12 }]
      : mode === "market"
        ? [{ label: "MARKET", value: marketScoutDLR, max: 5 }]
      : mode === "media"
        ? [{ label: "MEDIA", value: mediaScoutDLR, max: 5 }]
        : infoMode === "bio"
          ? [{ label: "BIO", value: calculateKnowledgeBioScout(k), max: 2 }]
          : infoMode === "scout"
            ? [{ label: "SCOUT", value: scoutScoutRows?.total ?? 0, max: 2 }]
            : [{ label: "CAREER", value: calculateKnowledgeCareerScout(k), max: 2 }]

  function analystValue(v?: string) {
    if (!v) return 0.18

    if (
      v === "franchise" ||
      v === "ideal" ||
      v === "strong" ||
      v === "improving" ||
      v === "likely" ||
      v === "stable" ||
      v === "falling"
    ) return 0.38

    if (
      v === "impact" ||
      v === "reliable" ||
      v === "plausible" ||
      v === "moderate" ||
      v === "stylistic" ||
      v === "workable" ||
      v === "steady"
    ) return 0.30

    return 0.18
  }

  const scoutAnalystDLR = (() => {
    const a = k?.scout?.analyst

    if (!a) return 0

    const values = [
      analystValue(a.ceiling),
      analystValue(a.floor),
      analystValue(a.roleProb),
      analystValue(a.skillTrend),
      analystValue(a.volatility),
      analystValue(a.comparable),
      analystValue(a.orgFit),
      analystValue(a.riskTrend)
    ]

    const total = values.reduce((s, v) => s + v, 0)
    return Number(Math.min(3, total).toFixed(2))
  })()

  const tier3Rows: PanelRow[] =
    mode === "performance"
      ? [{ label: "ANALYST", value: analystDLR, max: 24 }]
      : mode === "market"
        ? [{ label: "MARKET", value: marketAnalystDLR, max: 6 }]
      : mode === "media"
        ? [{ label: "MEDIA", value: mediaAnalystDLR, max: 6 }]
        : infoMode === "bio"
          ? [{ label: "BIO", value: calculateKnowledgeBioAnalyst(k), max: 3 }]
          : infoMode === "scout"
            ? [{ label: "SCOUT", value: scoutAnalystDLR, max: 3 }]
            : [{ label: "CAREER", value: calculateKnowledgeCareerAnalyst(k), max: 3 }]

  useEffect(() => {
    if (player !== prevPlayer.current) {
      setOpen1(false)
      setOpen2(false)
      setOpen3(false)
      prevPlayer.current = player
    }
  }, [player])

  useEffect(() => {
    if (scanComplete && !prevScan.current) {
      setTimeout(() => setOpen1(true), 180)
      setTimeout(() => setOpen2(true), 420)
      setTimeout(() => setOpen3(true), 720)
    }

    prevScan.current = scanComplete
  }, [scanComplete])

  const bioScoutScores = player?.bio?.scoutScores ?? {}
  const bioAnalystScores = player?.bio?.analystScores ?? {}
  const scoutAnalystScores = player?.scout?.analystScores ?? {}
  const careerSnapshotScores = player?.career?.snapshotScores ?? {}
  const careerScoutScores = player?.career?.scoutScores ?? {}
  const careerAnalystScores = player?.career?.analystScores ?? {}

  const bioArchetype = resolveThreeWay(
    bioScoutScores.archetype,
    k?.bio?.scout?.archetype,
    "control",
    "balanced",
    "power"
  )

  const bioPath = resolveThreeWay(
    bioScoutScores.devPath,
    k?.bio?.scout?.devPath,
    "raw",
    "progressing",
    "polished"
  )

  const bioFrame = resolveThreeWay(
    bioScoutScores.frame,
    k?.bio?.scout?.frame,
    "lean",
    "solid",
    "durable"
  )

  const bioAthleticism = resolveThreeWay(
    bioScoutScores.athleticism,
    k?.bio?.scout?.athleticism,
    "limited",
    "adequate",
    "dynamic"
  )

  const bioProjection = resolveThreeWay(
    bioScoutScores.projection,
    k?.bio?.scout?.projection,
    "low",
    "moderate",
    "high"
  )

  const devLevel = resolveThreeWay(
    bioAnalystScores.dev,
    k?.bio?.analyst?.devCurve,
    "slow",
    "steady",
    "accelerating"
  )

  const riskLevel = resolveThreeWay(
    bioAnalystScores.risk,
    k?.bio?.analyst?.assetRisk,
    "high",
    "moderate",
    "controlled"
  )

  const valueLevel = resolveThreeWay(
    bioAnalystScores.value,
    k?.bio?.analyst?.longValue,
    "uncertain",
    "viable",
    "strong"
  )

  const orgLevel = resolveThreeWay(
    bioAnalystScores.org,
    k?.bio?.analyst?.orgValue,
    "depth",
    "contributor",
    "priority"
  )

  const pedLevel = resolveThreeWay(
    bioAnalystScores.pedigree,
    k?.bio?.analyst?.pedigree,
    "low",
    "solid",
    "premium"
  )

  const serviceLevel = resolveThreeWay(
    bioAnalystScores.serviceTime,
    k?.bio?.analyst?.serviceTime,
    "early",
    "mid",
    "established"
  )

  const optionsLevel = resolveThreeWay(
    bioAnalystScores.options,
    k?.bio?.analyst?.options,
    "flexible",
    "neutral",
    "limited"
  )

  const healthLevel = resolveThreeWay(
    bioAnalystScores.health,
    k?.bio?.analyst?.injuryIdx,
    "durable",
    "moderate",
    "fragile"
  )

  const scoutCeiling = resolveThreeWay(
    scoutAnalystScores.ceiling,
    k?.scout?.analyst?.ceiling,
    "role",
    "impact",
    "franchise"
  )

  const scoutFloor = resolveThreeWay(
    scoutAnalystScores.floor,
    k?.scout?.analyst?.floor,
    "bench",
    "contributor",
    "reliable"
  )

  const scoutRole = resolveThreeWay(
    scoutAnalystScores.roleProb,
    k?.scout?.analyst?.roleProb,
    "unlikely",
    "plausible",
    "likely"
  )

  const scoutTrend = resolveThreeWay(
    scoutAnalystScores.skillTrend,
    k?.scout?.analyst?.skillTrend,
    "flat",
    "stable",
    "improving"
  )

  const scoutVol = resolveThreeWay(
    scoutAnalystScores.volatility,
    k?.scout?.analyst?.volatility,
    "erratic",
    "moderate",
    "stable"
  )

  const scoutComp = resolveThreeWay(
    scoutAnalystScores.comparable,
    k?.scout?.analyst?.comparable,
    "loose",
    "stylistic",
    "strong"
  )

  const scoutOrg = resolveThreeWay(
    scoutAnalystScores.orgFit,
    k?.scout?.analyst?.orgFit,
    "poor",
    "workable",
    "ideal"
  )

  const scoutRisk = resolveThreeWay(
    scoutAnalystScores.riskTrend,
    k?.scout?.analyst?.riskTrend,
    "rising",
    "steady",
    "falling"
  )

  const careerPath = resolveThreeWay(
    careerSnapshotScores.path,
    k?.career?.snapshot?.developmentPath,
    "HS",
    "college",
    "intl"
  )

  const careerOrg = resolveThreeWay(
    careerSnapshotScores.org,
    k?.career?.snapshot?.orgInvestment,
    "low",
    "moderate",
    "high"
  )

  const careerEta = resolveThreeWay(
    careerSnapshotScores.eta,
    k?.career?.snapshot?.timelineSignal,
    "slow",
    "normal",
    "fast"
  )

  const careerPed = resolveThreeWay(
    careerScoutScores.pedigree,
    k?.career?.snapshot?.draftPedigree,
    "low",
    "solid",
    "elite"
  )

  const careerScoutPath = resolveThreeWay(
    careerScoutScores.path,
    k?.career?.snapshot?.developmentPath,
    "raw",
    "progressing",
    "polished"
  )

  const careerScoutOrg = resolveThreeWay(
    careerScoutScores.org,
    k?.career?.snapshot?.orgInvestment,
    "low",
    "moderate",
    "high"
  )

  const careerScoutEta = resolveThreeWay(
    careerScoutScores.eta,
    k?.career?.snapshot?.timelineSignal,
    "slow",
    "normal",
    "fast"
  )

  const careerTrack = resolveThreeWay(
    careerScoutScores.track,
    k?.career?.scout?.track,
    "slow",
    "steady",
    "accelerating"
  )

  const careerCeiling = resolveThreeWay(
    careerAnalystScores.ceiling,
    k?.career?.analyst?.amateurCeiling,
    "limited",
    "viable",
    "premium"
  )

  const careerValue = resolveThreeWay(
    careerAnalystScores.value,
    k?.career?.analyst?.draftValue,
    "low",
    "solid",
    "premium"
  )

  const careerAsc = resolveThreeWay(
    careerAnalystScores.ascent,
    k?.career?.analyst?.ascentSpeed,
    "slow",
    "steady",
    "fast"
  )

  const careerSetbacks = resolveThreeWay(
    careerAnalystScores.setbacks,
    k?.career?.analyst?.setbacks,
    "risk",
    "moderate",
    "clean"
  )

  const careerRecovery = resolveThreeWay(
    careerAnalystScores.recovery,
    k?.career?.analyst?.recoveryTrack,
    "weak",
    "stable",
    "strong"
  )

  const careerOrgPatience = resolveThreeWay(
    careerAnalystScores.org,
    k?.career?.analyst?.orgPatience,
    "low",
    "steady",
    "elite"
  )

  const careerArc = resolveThreeWay(
    careerAnalystScores.arc,
    k?.career?.analyst?.careerArc,
    "flat",
    "upward",
    "impact"
  )

  const careerLongValue = resolveThreeWay(
    careerAnalystScores.longValue,
    k?.career?.analyst?.longView,
    "uncertain",
    "viable",
    "strong"
  )

  const renderPerformanceTier1 = () => {
    const formLabel = isPitcher ? "CMD" : "BAT"
    const surgeLabel = isPitcher ? "RUN" : "PWR"

    return (
      <div className={styles.performanceSnapshotContent} data-intel-content="performance-snapshot">
        <div className={styles.statTable}>
          <div className={styles.statTableRow}>
            {performanceTable.headers.map((header) => (
              <div key={header} className={styles.statHead}>{header}</div>
            ))}
          </div>

          {performanceTable.rows.map((row) => (
            <div key={row.label} className={styles.statTableRow}>
              <div className={styles.statLabel}>{row.label}</div>
              {row.values.map((value,index) => (
                <div key={`${row.label}-${index}`} className={styles.statValue}>{value}</div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.signalExplainGrid}>
          <div className={styles.signalExplain}>
            <div className={styles.signalExplainTop}>
              <span className={cx(styles.signalIcon, performanceSignals.form === "hot" && styles.signalHot, performanceSignals.form === "cold" && styles.signalCold)}>
                {formIcon(performanceSignals.form)}
              </span>
              <span>{formLabel}</span>
            </div>
            <div>{performanceSignals.formReason}</div>
          </div>

          <div className={styles.signalExplain}>
            <div className={styles.signalExplainTop}>
              <span className={cx(styles.signalIcon, performanceSignals.surge === "hot" && styles.signalSurge, performanceSignals.surge === "cold" && styles.signalDown)}>
                {surgeIcon(performanceSignals.surge)}
              </span>
              <span>{surgeLabel}</span>
            </div>
            <div>{performanceSignals.surgeReason}</div>
          </div>

          <div className={styles.signalExplain}>
            <div className={styles.signalExplainTop}>
              <span className={cx(styles.signalIcon, performanceSignals.value === "up" && styles.signalValue, performanceSignals.value === "down" && styles.signalDown)}>
                {valueIcon(performanceSignals.value)}
              </span>
              <span>VAL</span>
            </div>
            <div>{performanceSignals.valueReason}</div>
          </div>
        </div>
      </div>
    )
  }

  const renderPerformanceTier2 = () => {
    if (isPitcher) {
      const kPercent = perf?.scout?.kPercent ?? 20
      const bbPercent = perf?.scout?.bbPercent ?? 8
      const kMinusBB = perf?.scout?.kMinusBB ?? 12
      const whiff = perf?.scout?.whiff ?? 24
      const avgEV = perf?.scout?.avgEV ?? 90

      return (
        <div className={styles.scoutScoutContent} data-intel-content="scout-scout">
          <ScaleRow
            label="K%"
            labelTooltip="Strikeout rate"
            options={[
              { label: "low", active: kPercent < 24, tooltip: "Below 24%" },
              { label: "solid", active: kPercent >= 24 && kPercent < 30, tooltip: "24% to 29%" },
              { label: "elite", active: kPercent >= 30, tooltip: "30% and above" }
            ]}
          />

          <ScaleRow
            label="BB%"
            labelTooltip="Walk rate"
            options={[
              { label: "risk", active: bbPercent > 8, tooltip: "Above 8%" },
              { label: "solid", active: bbPercent > 5 && bbPercent <= 8, tooltip: "5.1% to 8%" },
              { label: "elite", active: bbPercent <= 5, tooltip: "5% or lower" }
            ]}
          />

          <ScaleRow
            label="K-BB"
            labelTooltip="Strikeout rate minus walk rate"
            options={[
              { label: "low", active: kMinusBB < 15, tooltip: "Below 15%" },
              { label: "solid", active: kMinusBB >= 15 && kMinusBB < 22, tooltip: "15% to 21%" },
              { label: "elite", active: kMinusBB >= 22, tooltip: "22% and above" }
            ]}
          />

          <ScaleRow
            label="WHIFF"
            labelTooltip="Swing-and-miss rate"
            options={[
              { label: "low", active: whiff < 26, tooltip: "Below 26%" },
              { label: "solid", active: whiff >= 26 && whiff < 32, tooltip: "26% to 31%" },
              { label: "elite", active: whiff >= 32, tooltip: "32% and above" }
            ]}
          />

          <ScaleRow
            label="EV"
            labelTooltip="Average exit velocity allowed"
            options={[
              { label: "risk", active: avgEV > 90, tooltip: "Above 90 mph" },
              { label: "solid", active: avgEV > 86 && avgEV <= 90, tooltip: "86.1 to 90.0 mph" },
              { label: "elite", active: avgEV <= 86, tooltip: "86 mph or lower" }
            ]}
          />
        </div>
      )
    }

    const hardHit = perf?.scout?.hardHit ?? 38
    const barrel = perf?.scout?.barrel ?? 8
    const kRate = perf?.scout?.kRate ?? 22
    const bbRate = perf?.scout?.bbRate ?? 8
    const avgEV = perf?.scout?.avgEV ?? 88

    return (
      <div className={styles.scoutScoutContent} data-intel-content="scout-scout">
        <ScaleRow
          label="HH"
          labelTooltip="Hard-hit rate"
          options={[
            { label: "low", active: hardHit < 42, tooltip: "Below 42%" },
            { label: "solid", active: hardHit >= 42 && hardHit < 50, tooltip: "42% to 49%" },
            { label: "elite", active: hardHit >= 50, tooltip: "50% and above" }
          ]}
        />

        <ScaleRow
          label="BAR"
          labelTooltip="Barrel rate"
          options={[
            { label: "low", active: barrel < 10, tooltip: "Below 10%" },
            { label: "solid", active: barrel >= 10 && barrel < 14, tooltip: "10% to 13%" },
            { label: "elite", active: barrel >= 14, tooltip: "14% and above" }
          ]}
        />

        <ScaleRow
          label="K%"
          labelTooltip="Strikeout rate"
          options={[
            { label: "elite", active: kRate <= 14, tooltip: "14% or lower" },
            { label: "solid", active: kRate > 14 && kRate <= 20, tooltip: "14.1% to 20%" },
            { label: "risk", active: kRate > 20, tooltip: "Above 20%" }
          ]}
        />

        <ScaleRow
          label="BB%"
          labelTooltip="Walk rate"
          options={[
            { label: "risk", active: bbRate < 8, tooltip: "Below 8%" },
            { label: "solid", active: bbRate >= 8 && bbRate < 14, tooltip: "8% to 13%" },
            { label: "elite", active: bbRate >= 14, tooltip: "14% and above" }
          ]}
        />

        <ScaleRow
          label="EV"
          labelTooltip="Average exit velocity"
          options={[
            { label: "low", active: avgEV < 89, tooltip: "Below 89 mph" },
            { label: "solid", active: avgEV >= 89 && avgEV < 93, tooltip: "89 to 92.9 mph" },
            { label: "elite", active: avgEV >= 93, tooltip: "93 mph and above" }
          ]}
        />
      </div>
    )
  }

  const renderPerformanceTier3 = () => {
    if (isPitcher) {
      const xERA = perf?.analyst?.xERA ?? 4.2
      const stuffPlus = perf?.analyst?.stuffPlus ?? 95
      const pitchMixGrade = perf?.analyst?.pitchMixGrade ?? 0.5
      const veloTrend = perf?.analyst?.veloTrend ?? 0.5
      const commandTrend = perf?.analyst?.commandTrend ?? 0.5
      const injuryTrend = perf?.analyst?.injuryTrend ?? 0.5
      const roleStability = perf?.analyst?.roleStability ?? 0.5
      const war = perf?.analyst?.war ?? 2.4

      return (
        <div className={styles.scoutAnalystContent} data-intel-content="scout-analyst">
          <ScaleRow
            label="xERA"
            labelTooltip="Expected earned run average"
            options={[
              { label: "risk", active: xERA > 3.8, tooltip: "Above 3.80" },
              { label: "solid", active: xERA > 2.8 && xERA <= 3.8, tooltip: "2.81 to 3.80" },
              { label: "elite", active: xERA <= 2.8, tooltip: "2.80 or lower" }
            ]}
          />

          <ScaleRow
            label="STF+"
            labelTooltip="Stuff Plus"
            options={[
              { label: "low", active: stuffPlus < 105, tooltip: "Below 105" },
              { label: "solid", active: stuffPlus >= 105 && stuffPlus < 115, tooltip: "105 to 114" },
              { label: "elite", active: stuffPlus >= 115, tooltip: "115 and above" }
            ]}
          />

          <ScaleRow
            label="MIX"
            labelTooltip="Pitch mix quality"
            options={[
              { label: "flat", active: pitchMixGrade < 0.5, tooltip: "Below .50" },
              { label: "solid", active: pitchMixGrade >= 0.5 && pitchMixGrade < 0.7, tooltip: ".50 to .69" },
              { label: "plus", active: pitchMixGrade >= 0.7, tooltip: ".70 and above" }
            ]}
          />

          <ScaleRow
            label="VELO"
            labelTooltip="Velocity trend"
            options={[
              { label: "down", active: veloTrend < 0.45, tooltip: "Below .45" },
              { label: "steady", active: veloTrend >= 0.45 && veloTrend < 0.7, tooltip: ".45 to .69" },
              { label: "up", active: veloTrend >= 0.7, tooltip: ".70 and above" }
            ]}
          />

          <ScaleRow
            label="CMD"
            labelTooltip="Command trend"
            options={[
              { label: "risk", active: commandTrend < 0.5, tooltip: "Below .50" },
              { label: "solid", active: commandTrend >= 0.5 && commandTrend < 0.7, tooltip: ".50 to .69" },
              { label: "plus", active: commandTrend >= 0.7, tooltip: ".70 and above" }
            ]}
          />

          <ScaleRow
            label="HLTH"
            labelTooltip="Health and durability outlook"
            options={[
              { label: "risk", active: injuryTrend < 0.4, tooltip: "Below .40" },
              { label: "solid", active: injuryTrend >= 0.4 && injuryTrend < 0.7, tooltip: ".40 to .69" },
              { label: "durable", active: injuryTrend >= 0.7, tooltip: ".70 and above" }
            ]}
          />

          <ScaleRow
            label="ROLE"
            labelTooltip="Role stability"
            options={[
              { label: "fragile", active: roleStability < 0.5, tooltip: "Below .50" },
              { label: "likely", active: roleStability >= 0.5 && roleStability < 0.8, tooltip: ".50 to .79" },
              { label: "locked", active: roleStability >= 0.8, tooltip: ".80 and above" }
            ]}
          />

          <ScaleRow
            label="WAR"
            labelTooltip="Wins above replacement"
            options={[
              { label: "low", active: war < 2, tooltip: "Below 2.0" },
              { label: "solid", active: war >= 2 && war < 5, tooltip: "2.0 to 4.9" },
              { label: "impact", active: war >= 5, tooltip: "5.0 and above" }
            ]}
          />
        </div>
      )
    }

    const xAVG = perf?.analyst?.xAVG ?? 0.26
    const xSLG = perf?.analyst?.xSLG ?? 0.43
    const plateDiscTrend = perf?.analyst?.plateDiscTrend ?? 0.5
    const contactTrend = perf?.analyst?.contactTrend ?? 0.5
    const injuryTrend = perf?.analyst?.injuryTrend ?? 0.5
    const sprintTrend = perf?.analyst?.sprintTrend ?? 0.5
    const posValue = perf?.analyst?.posValue ?? 0.5
    const consistency = perf?.analyst?.consistency ?? 0.5

    return (
      <div className={styles.scoutAnalystContent} data-intel-content="scout-analyst">
        <ScaleRow
          label="xAVG"
          labelTooltip="Expected batting average"
          options={[
            { label: "risk", active: xAVG < 0.275, tooltip: "Below .275" },
            { label: "solid", active: xAVG >= 0.275 && xAVG < 0.305, tooltip: ".275 to .304" },
            { label: "elite", active: xAVG >= 0.305, tooltip: ".305 and above" }
          ]}
        />

        <ScaleRow
          label="xSLG"
          labelTooltip="Expected slugging percentage"
          options={[
            { label: "light", active: xSLG < 0.46, tooltip: "Below .460" },
            { label: "solid", active: xSLG >= 0.46 && xSLG < 0.54, tooltip: ".460 to .539" },
            { label: "impact", active: xSLG >= 0.54, tooltip: ".540 and above" }
          ]}
        />

        <ScaleRow
          label="DISC"
          labelTooltip="Plate discipline trend"
          options={[
            { label: "risk", active: plateDiscTrend < 0.5, tooltip: "Below .50" },
            { label: "solid", active: plateDiscTrend >= 0.5 && plateDiscTrend < 0.72, tooltip: ".50 to .71" },
            { label: "elite", active: plateDiscTrend >= 0.72, tooltip: ".72 and above" }
          ]}
        />

        <ScaleRow
          label="CONT"
          labelTooltip="Contact trend"
          options={[
            { label: "risk", active: contactTrend < 0.5, tooltip: "Below .50" },
            { label: "solid", active: contactTrend >= 0.5 && contactTrend < 0.72, tooltip: ".50 to .71" },
            { label: "elite", active: contactTrend >= 0.72, tooltip: ".72 and above" }
          ]}
        />

        <ScaleRow
          label="HLTH"
          labelTooltip="Health and durability outlook"
          options={[
            { label: "risk", active: injuryTrend < 0.45, tooltip: "Below .45" },
            { label: "solid", active: injuryTrend >= 0.45 && injuryTrend < 0.75, tooltip: ".45 to .74" },
            { label: "durable", active: injuryTrend >= 0.75, tooltip: ".75 and above" }
          ]}
        />

        <ScaleRow
          label="RUN"
          labelTooltip="Sprint and athletic impact"
          options={[
            { label: "low", active: sprintTrend < 0.5, tooltip: "Below .50" },
            { label: "solid", active: sprintTrend >= 0.5 && sprintTrend < 0.75, tooltip: ".50 to .74" },
            { label: "impact", active: sprintTrend >= 0.75, tooltip: ".75 and above" }
          ]}
        />

        <ScaleRow
          label="POS"
          labelTooltip="Positional value"
          options={[
            { label: "risk", active: posValue < 0.55, tooltip: "Below .55" },
            { label: "solid", active: posValue >= 0.55 && posValue < 0.85, tooltip: ".55 to .84" },
            { label: "elite", active: posValue >= 0.85, tooltip: ".85 and above" }
          ]}
        />

        <ScaleRow
          label="CONS"
          labelTooltip="Consistency of performance"
          options={[
            { label: "volatile", active: consistency < 0.55, tooltip: "Below .55" },
            { label: "solid", active: consistency >= 0.55 && consistency < 0.8, tooltip: ".55 to .79" },
            { label: "elite", active: consistency >= 0.8, tooltip: ".80 and above" }
          ]}
        />
      </div>
    )
  }

  const renderMediaTier1 = () => (
    <div className={styles.scoutSnapshotContent} data-intel-content="scout-snapshot">
      <ScaleRow
        label="MENT"
        labelTooltip="Media mention volume"
        options={mediaScaleOptions(
          m?.snapshot?.mentions,
          "quiet",
          "visible",
          "hot",
          mediaSnapshotMeaning.mentions
        )}
      />

      <ScaleRow
        label="HEAD"
        labelTooltip="Headline impact and news visibility"
        options={mediaScaleOptions(
          m?.snapshot?.headlineImpact,
          "rare",
          "steady",
          "lead",
          mediaSnapshotMeaning.headlineFrequency
        )}
      />

      <ScaleRow
        label="HLIT"
        labelTooltip="Highlight circulation and clip appeal"
        options={mediaScaleOptions(
          m?.snapshot?.highlightFactor,
          "low",
          "buzz",
          "viral",
          mediaSnapshotMeaning.highlightFactor
        )}
      />

      <ScaleRow
        label="SOC"
        labelTooltip="Social discussion and online attention"
        options={mediaScaleOptions(
          m?.snapshot?.socialBuzz,
          "quiet",
          "active",
          "surge",
          mediaSnapshotMeaning.socialBuzz
        )}
      />
    </div>
  )

  const renderMediaTier2 = () => (
    <div className={styles.scoutScoutContent} data-intel-content="scout-scout">
      <ScaleRow
        label="REC"
        labelTooltip="Fan recognition and collector familiarity"
        options={mediaScaleOptions(
          m?.scout?.fanRecognition,
          "low",
          "known",
          "name",
          mediaScoutMeaning.fanRecognition
        )}
      />

      <ScaleRow
        label="TEAM"
        labelTooltip="Team and organizational visibility"
        options={mediaScaleOptions(
          m?.scout?.teamVisibility,
          "low",
          "vis",
          "spot",
          mediaSnapshotMeaning.teamVisibility
        )}
      />

      <ScaleRow
        label="INT"
        labelTooltip="Interview presence and media availability"
        options={mediaScaleOptions(
          m?.scout?.interviewPresence,
          "rare",
          "some",
          "reg",
          mediaSnapshotMeaning.interviewPresence
        )}
      />

      <ScaleRow
        label="NARR"
        labelTooltip="Strength of the player storyline"
        options={mediaScaleOptions(
          m?.scout?.narrativeStrength,
          "thin",
          "build",
          "strong",
          mediaScoutMeaning.narrativeStrength
        )}
      />

      <ScaleRow
        label="MILE"
        labelTooltip="Milestone-driven attention"
        options={mediaScaleOptions(
          m?.scout?.milestoneAttention,
          "low",
          "notable",
          "major",
          mediaSnapshotMeaning.milestoneAttention
        )}
      />
    </div>
  )

  const renderMediaTier3 = () => (
    <div className={styles.scoutAnalystContent} data-intel-content="scout-analyst">
      <ScaleRow
        label="PED"
        labelTooltip="Prospect pedigree narrative"
        options={mediaScaleOptions(
          m?.analyst?.prospectPedigree,
          "low",
          "solid",
          "elite",
          mediaScoutMeaning.prospectPedigree
        )}
      />

      <ScaleRow
        label="HYPE"
        labelTooltip="Current hype trend"
        options={mediaScaleOptions(
          m?.analyst?.hypeTrend,
          "cool",
          "steady",
          "rising",
          mediaSnapshotMeaning.hypeTrend
        )}
      />

      <ScaleRow
        label="STAB"
        labelTooltip="Stability of media attention"
        options={mediaScaleOptions(
          m?.analyst?.mediaStability,
          "volatile",
          "steady",
          "stable",
          mediaAnalystMeaning.mediaStability
        )}
      />

      <ScaleRow
        label="STORY"
        labelTooltip="Durability of the player's story"
        options={mediaScaleOptions(
          m?.analyst?.storyDurability,
          "short",
          "lasting",
          "durable",
          mediaScoutMeaning.storylineDurability
        )}
      />

      <ScaleRow
        label="BRK"
        labelTooltip="Breakout narrative probability"
        options={mediaScaleOptions(
          m?.analyst?.breakoutProbability,
          "low",
          "possible",
          "strong",
          mediaScoutMeaning.breakoutProbability
        )}
      />

      <ScaleRow
        label="MOM"
        labelTooltip="Public attention momentum"
        options={mediaScaleOptions(
          m?.analyst?.publicMomentum,
          "flat",
          "moving",
          "surging",
          mediaScoutMeaning.publicMomentum
        )}
      />

      <ScaleRow
        label="DECAY"
        labelTooltip="Attention decay risk"
        options={mediaScaleOptions(
          m?.analyst?.attentionDecay,
          "low",
          "moderate",
          "high",
          mediaAnalystMeaning.attentionDecayResistance
        )}
      />

      <ScaleRow
        label="CONF"
        labelTooltip="Confidence in the media signal"
        options={mediaScaleOptions(
          m?.analyst?.confidence,
          "thin",
          "usable",
          "strong"
        )}
      />
    </div>
  )

  const renderMarketTier1 = () => {
    return (
      <div className={styles.scoutSnapshotContent} data-intel-content="scout-snapshot">
        <ScaleRow label="RAW" labelTooltip="Recent raw-card sold average or median from live marketplace comps." options={[
          { label: "low", active: false, tooltip: "Below expected raw comp range." },
          { label: "fair", active: false, tooltip: "Inside expected raw comp range." },
          { label: "high", active: false, tooltip: "Above expected raw comp range." }
        ]} />

        <ScaleRow label="PSA10" labelTooltip="Recent PSA 10 sold average and premium compared with raw card value." options={[
          { label: "soft", active: false, tooltip: "Weak graded premium versus raw." },
          { label: "fair", active: false, tooltip: "Normal graded premium versus raw." },
          { label: "hot", active: false, tooltip: "Strong graded premium versus raw." }
        ]} />

        <ScaleRow label="VOL" labelTooltip="Recent sold volume and active listing activity for the player/card market." options={[
          { label: "thin", active: false, tooltip: "Low sales/listing activity." },
          { label: "steady", active: false, tooltip: "Usable sales/listing activity." },
          { label: "active", active: false, tooltip: "High sales/listing activity." }
        ]} />

        <ScaleRow label="SPRD" labelTooltip="Spread between low, median, and high recent comps or ask-versus-sold gap." options={[
          { label: "tight", active: false, tooltip: "Clean and consistent comp range." },
          { label: "normal", active: false, tooltip: "Normal market spread." },
          { label: "wide", active: false, tooltip: "Choppy pricing or wide comp spread." }
        ]} />

        <ScaleRow label="MOM" labelTooltip="Short-term price momentum based on recent comp movement." options={[
          { label: "cool", active: false, tooltip: "Recent prices are fading." },
          { label: "steady", active: false, tooltip: "Recent prices are holding." },
          { label: "rising", active: false, tooltip: "Recent prices are moving up." }
        ]} />
      </div>
    )
  }

  const renderMarketTier2 = () => {
    return (
      <div className={styles.scoutScoutContent} data-intel-content="scout-scout">
        <ScaleRow label="POP" labelTooltip="PSA/BGS/SGC population pressure, especially PSA 10 supply." options={[
          { label: "crowded", active: false, tooltip: "Supply may be heavy." },
          { label: "normal", active: false, tooltip: "Supply is in a normal range." },
          { label: "scarce", active: false, tooltip: "Supply appears constrained." }
        ]} />

        <ScaleRow label="LIST" labelTooltip="Current active listings across raw, graded, numbered, and parallel cards." options={[
          { label: "thin", active: false, tooltip: "Few useful active listings." },
          { label: "normal", active: false, tooltip: "Normal listing depth." },
          { label: "heavy", active: false, tooltip: "Many available listings." }
        ]} />

        <ScaleRow label="SOLD" labelTooltip="Recent completed sales count and sale velocity." options={[
          { label: "slow", active: false, tooltip: "Few recent completed sales." },
          { label: "steady", active: false, tooltip: "Healthy recent completed sales." },
          { label: "fast", active: false, tooltip: "High recent sale velocity." }
        ]} />

        <ScaleRow label="LIQ" labelTooltip="How easily a user can enter or exit the market without major price friction." options={[
          { label: "weak", active: false, tooltip: "Harder to buy or sell cleanly." },
          { label: "stable", active: false, tooltip: "Reasonable liquidity." },
          { label: "liquid", active: false, tooltip: "Easy to buy or sell cleanly." }
        ]} />

        <ScaleRow label="RISK" labelTooltip="Combined pricing risk from volatility, thin comps, inflated asks, and weak sale depth." options={[
          { label: "low", active: false, tooltip: "Cleaner market risk." },
          { label: "moderate", active: false, tooltip: "Normal market risk." },
          { label: "high", active: false, tooltip: "High market risk." }
        ]} />
      </div>
    )
  }

  const renderMarketTier3 = () => {
    return (
      <div className={styles.scoutAnalystContent} data-intel-content="scout-analyst">
        <ScaleRow label="EDGE" labelTooltip="Calculated difference between current market price and Diamond Ledger expected value." options={[
          { label: "none", active: false, tooltip: "No obvious pricing edge." },
          { label: "watch", active: false, tooltip: "Possible edge forming." },
          { label: "strong", active: false, tooltip: "Meaningful pricing edge." }
        ]} />

        <ScaleRow label="BUY" labelTooltip="Buy posture generated from price, liquidity, performance, media, and market setup." options={[
          { label: "avoid", active: false, tooltip: "Do not chase at current market." },
          { label: "patient", active: false, tooltip: "Only buy at the right number." },
          { label: "active", active: false, tooltip: "Market supports active buying." }
        ]} />

        <ScaleRow label="HOLD" labelTooltip="Hold strength when the player already sits in a user's tracked portfolio." options={[
          { label: "weak", active: false, tooltip: "Hold case is weak." },
          { label: "neutral", active: false, tooltip: "Hold case is balanced." },
          { label: "strong", active: false, tooltip: "Hold case is strong." }
        ]} />

        <ScaleRow label="SELL" labelTooltip="Sell pressure from inflated pricing, volatility, fading signals, or weak liquidity." options={[
          { label: "wait", active: false, tooltip: "No urgent sell pressure." },
          { label: "trim", active: false, tooltip: "Consider trimming into strength." },
          { label: "exit", active: false, tooltip: "Strong sell or avoid signal." }
        ]} />

        <ScaleRow label="MOM" labelTooltip="Market momentum from recent comp trend and sale velocity." options={[
          { label: "cooling", active: false, tooltip: "Market is cooling." },
          { label: "steady", active: false, tooltip: "Market is steady." },
          { label: "rising", active: false, tooltip: "Market is rising." }
        ]} />

        <ScaleRow label="VAL" labelTooltip="Current valuation quality versus expected DLR value and comparable players." options={[
          { label: "rich", active: false, tooltip: "Price appears expensive." },
          { label: "fair", active: false, tooltip: "Price appears fair." },
          { label: "discount", active: false, tooltip: "Price appears discounted." }
        ]} />

        <ScaleRow label="CONF" labelTooltip="Confidence level based on data quantity, recency, and quality of comps." options={[
          { label: "thin", active: false, tooltip: "Data sample is thin." },
          { label: "usable", active: false, tooltip: "Data sample is usable." },
          { label: "strong", active: false, tooltip: "Data sample is strong." }
        ]} />

        <ScaleRow label="DLR" labelTooltip="Market contribution toward the total Diamond Ledger Rating." options={[
          { label: "drag", active: false, tooltip: "Market data pulls DLR down." },
          { label: "support", active: false, tooltip: "Market data supports DLR." },
          { label: "driver", active: false, tooltip: "Market data drives DLR higher." }
        ]} />
      </div>
    )
  }

  const renderKnowledgeTier1 = () => {
    if (infoMode === "bio") {
      const teamAccent = getTeamAccent(player?.org ?? player?.team)
      const bioStyle = {
        "--teamDark": teamAccent.dark,
        "--teamLight": teamAccent.light
      } as CSSProperties
      const height = k?.bio?.snapshot?.height ?? player?.height ?? "-"
      const weight = k?.bio?.snapshot?.weight ?? player?.weight ?? "-"
      const bats = k?.bio?.snapshot?.bats ?? player?.bats ?? "-"
      const throws = k?.bio?.snapshot?.throws ?? player?.throws ?? "-"
      const birthdate = k?.bio?.scout?.birthdate ?? player?.birthdate ?? "-"
      const position = player?.position ?? "-"
      const draftRank = player?.draftRank ?? player?.draftPick ?? "-"
      const draftYear = player?.draftYear ?? "-"

      return (
        <div
          className={styles.bioSnapshotContent}
          data-intel-content="bio-snapshot"
          style={bioStyle}
        >
          <div className={styles.bioIdentityStrip}>
            <div className={styles.bioTeamBadge}>{teamAccent.display}</div>
            <div className={styles.bioNamePlate}>
              <div className={styles.bioName}>{player?.name ?? "PLAYER"}</div>
              <div className={styles.bioMetaLine}>
                {teamAccent.display} · {position} · DRAFT {draftYear}
              </div>
            </div>
          </div>

          <div className={styles.bioFactGrid}>
            <div><span>DOB</span>{birthdate}</div>
            <div><span>HT</span>{height}</div>
            <div><span>WT</span>{weight}</div>
            <div><span>B/T</span>{bats}/{throws}</div>
            <div><span>DR</span>{draftRank}</div>
            <div><span>POS</span>{position}</div>
          </div>
        </div>
      )
    }

    if (infoMode === "scout") {
      return (
        <div className={styles.scoutSnapshotContent} data-intel-content="scout-snapshot">
          <ScaleRow
            label="TOOLS:"
            labelTooltip={isPitcher ? "Primary pitch traits driving the profile" : "Primary offensive tools driving the profile"}
            options={
              isPitcher
                ? [
                    { label: "velo", active: primaryTool.includes("velo") },
                    { label: "movement", active: primaryTool.includes("movement") },
                    { label: "command", active: primaryTool.includes("command") }
                  ]
                : [
                    { label: "contact", active: primaryTool.includes("contact") },
                    { label: "power", active: primaryTool.includes("power") },
                    { label: "speed", active: primaryTool.includes("speed") }
                  ]
            }
          />

          <ScaleRow
            label="ROLE:"
            labelTooltip="Projected on-field role"
            options={[
              { label: "bench", active: roleType.includes("bench") },
              { label: "starter", active: roleType.includes("starter") },
              { label: "impact", active: roleType.includes("impact") }
            ]}
          />

          <ScaleRow
            label="BUILD:"
            labelTooltip="Physical projection and body outlook"
            options={[
              { label: "limited", active: physicalProjection.includes("limited") },
              { label: "solid", active: physicalProjection.includes("solid") },
              { label: "projectable", active: physicalProjection.includes("projectable") }
            ]}
          />

          <ScaleRow
            label="RISK:"
            labelTooltip="Overall volatility of the scouting profile"
            options={[
              { label: "low", active: riskProfile.includes("low") },
              { label: "moderate", active: riskProfile.includes("moderate") },
              { label: "high", active: riskProfile.includes("high") }
            ]}
          />
        </div>
      )
    }

    return (
      <div className={styles.careerSnapshotContent} data-intel-content="career-snapshot">
        <div>
          DRAFT: {k?.career?.scout?.draftPedigree ?? "-"} &nbsp;&nbsp;
          BONUS: {k?.bio?.scout?.signBonus ?? "-"}
        </div>

        <ScaleRow
          label="PATH"
          labelTooltip="Amateur path to pro ball"
          options={[
            { label: "HS", active: careerPath === "HS" },
            { label: "COLLEGE", active: careerPath === "college" },
            { label: "INTL", active: careerPath === "intl" }
          ]}
        />

        <ScaleRow
          label="ORG"
          labelTooltip="Organizational investment level"
          options={[
            { label: "low", active: careerOrg === "low" },
            { label: "moderate", active: careerOrg === "moderate" },
            { label: "high", active: careerOrg === "high" }
          ]}
        />

        <ScaleRow
          label="ETA"
          labelTooltip="Expected pace to upper levels or MLB"
          options={[
            { label: "slow", active: careerEta === "slow" },
            { label: "normal", active: careerEta === "normal" },
            { label: "fast", active: careerEta === "fast" }
          ]}
        />
      </div>
    )
  }

  const renderKnowledgeTier2 = () => {
    if (infoMode === "bio") {
      return (
        <div className={styles.bioScoutContent} data-intel-content="bio-scout">
          <ScaleRow label="ARCH" labelTooltip="Pitcher or hitter profile archetype" options={[
            { label: "control", active: bioArchetype === "control" },
            { label: "balanced", active: bioArchetype === "balanced" },
            { label: "power", active: bioArchetype === "power" }
          ]} />

          <ScaleRow label="PATH" labelTooltip="Current development path" options={[
            { label: "raw", active: bioPath === "raw" },
            { label: "progressing", active: bioPath === "progressing" },
            { label: "polished", active: bioPath === "polished" }
          ]} />

          <ScaleRow label="FRAME" labelTooltip="Body type and durability projection" options={[
            { label: "lean", active: bioFrame === "lean" },
            { label: "solid", active: bioFrame === "solid" },
            { label: "durable", active: bioFrame === "durable" }
          ]} />

          <ScaleRow label="ATH" labelTooltip="Athleticism relative to role" options={[
            { label: "limited", active: bioAthleticism === "limited" },
            { label: "adequate", active: bioAthleticism === "adequate" },
            { label: "dynamic", active: bioAthleticism === "dynamic" }
          ]} />

          <ScaleRow label="PROJ" labelTooltip="Long-term physical and skills projection" options={[
            { label: "low", active: bioProjection === "low" },
            { label: "moderate", active: bioProjection === "moderate" },
            { label: "high", active: bioProjection === "high" }
          ]} />
        </div>
      )
    }

    if (infoMode === "scout") {
      return (
        <div className={styles.scoutScoutContent} data-intel-content="scout-scout">
          {isPitcher ? (
            <>
              <ScaleRow label="FB" labelTooltip="Fastball grade" options={[
                { label: "low", active: k?.scout?.scout?.fastball <= 45 },
                { label: "avg", active: k?.scout?.scout?.fastball >= 50 && k?.scout?.scout?.fastball <= 60 },
                { label: "imp", active: k?.scout?.scout?.fastball >= 65 }
              ]} />

              <ScaleRow label="SL" labelTooltip="Slider grade" options={[
                { label: "low", active: k?.scout?.scout?.slider <= 45 },
                { label: "avg", active: k?.scout?.scout?.slider >= 50 && k?.scout?.scout?.slider <= 60 },
                { label: "imp", active: k?.scout?.scout?.slider >= 65 }
              ]} />

              <ScaleRow label="SP" labelTooltip="Splitter grade" options={[
                { label: "low", active: k?.scout?.scout?.splitter <= 45 },
                { label: "avg", active: k?.scout?.scout?.splitter >= 50 && k?.scout?.scout?.splitter <= 60 },
                { label: "imp", active: k?.scout?.scout?.splitter >= 65 }
              ]} />

              <ScaleRow label="CMD" labelTooltip="Command grade" options={[
                { label: "low", active: k?.scout?.scout?.command <= 45 },
                { label: "avg", active: k?.scout?.scout?.command >= 50 && k?.scout?.scout?.command <= 60 },
                { label: "imp", active: k?.scout?.scout?.command >= 65 }
              ]} />

              <ScaleRow label="OVR" labelTooltip="Overall future value" options={[
                { label: "low", active: k?.scout?.scout?.overallFV <= 45 },
                { label: "avg", active: k?.scout?.scout?.overallFV >= 50 && k?.scout?.scout?.overallFV <= 60 },
                { label: "imp", active: k?.scout?.scout?.overallFV >= 65 }
              ]} />
            </>
          ) : (
            <>
              <ScaleRow label="HIT" labelTooltip="Hit tool grade" options={[
                { label: "low", active: k?.scout?.scout?.hit <= 45 },
                { label: "avg", active: k?.scout?.scout?.hit >= 50 && k?.scout?.scout?.hit <= 60 },
                { label: "imp", active: k?.scout?.scout?.hit >= 65 }
              ]} />

              <ScaleRow label="PWR" labelTooltip="Power grade" options={[
                { label: "low", active: k?.scout?.scout?.power <= 45 },
                { label: "avg", active: k?.scout?.scout?.power >= 50 && k?.scout?.scout?.power <= 60 },
                { label: "imp", active: k?.scout?.scout?.power >= 65 }
              ]} />

              <ScaleRow label="RUN" labelTooltip="Run tool grade" options={[
                { label: "low", active: k?.scout?.scout?.run <= 45 },
                { label: "avg", active: k?.scout?.scout?.run >= 50 && k?.scout?.scout?.run <= 60 },
                { label: "imp", active: k?.scout?.scout?.run >= 65 }
              ]} />

              <ScaleRow label="ARM" labelTooltip="Arm strength grade" options={[
                { label: "low", active: k?.scout?.scout?.arm <= 45 },
                { label: "avg", active: k?.scout?.scout?.arm >= 50 && k?.scout?.scout?.arm <= 60 },
                { label: "imp", active: k?.scout?.scout?.arm >= 65 }
              ]} />

              <ScaleRow label="FLD" labelTooltip="Fielding grade" options={[
                { label: "low", active: k?.scout?.scout?.field <= 45 },
                { label: "avg", active: k?.scout?.scout?.field >= 50 && k?.scout?.scout?.field <= 60 },
                { label: "imp", active: k?.scout?.scout?.field >= 65 }
              ]} />
            </>
          )}
        </div>
      )
    }

    return (
      <div className={styles.careerScoutContent} data-intel-content="career-scout">
        <ScaleRow
          label="PED"
          labelTooltip="Draft or amateur pedigree"
          options={[
            { label: "low", active: careerPed === "low" },
            { label: "solid", active: careerPed === "solid" },
            { label: "elite", active: careerPed === "elite" }
          ]}
        />

        <ScaleRow
          label="PATH"
          labelTooltip="Development path quality"
          options={[
            { label: "raw", active: careerScoutPath === "raw" },
            { label: "progressing", active: careerScoutPath === "progressing" },
            { label: "polished", active: careerScoutPath === "polished" }
          ]}
        />

        <ScaleRow
          label="ORG"
          labelTooltip="How strongly the organization is backing the player"
          options={[
            { label: "low", active: careerScoutOrg === "low" },
            { label: "moderate", active: careerScoutOrg === "moderate" },
            { label: "high", active: careerScoutOrg === "high" }
          ]}
        />

        <ScaleRow
          label="ETA"
          labelTooltip="Expected speed of advancement"
          options={[
            { label: "slow", active: careerScoutEta === "slow" },
            { label: "normal", active: careerScoutEta === "normal" },
            { label: "fast", active: careerScoutEta === "fast" }
          ]}
        />

        <ScaleRow
          label="TRK"
          labelTooltip="Current developmental trajectory"
          options={[
            { label: "slow", active: careerTrack === "slow" },
            { label: "steady", active: careerTrack === "steady" },
            { label: "accelerating", active: careerTrack === "accelerating" }
          ]}
        />
      </div>
    )
  }

  const renderKnowledgeTier3 = () => {
    if (infoMode === "bio") {
      return (
        <div className={styles.bioAnalystContent} data-intel-content="bio-analyst">
          <ScaleRow label="SRV" labelTooltip="Service-time and roster status" options={[
            { label: "early", active: serviceLevel === "early" },
            { label: "mid", active: serviceLevel === "mid" },
            { label: "established", active: serviceLevel === "established" }
          ]} />

          <ScaleRow label="OPT" labelTooltip="Roster option flexibility" options={[
            { label: "flexible", active: optionsLevel === "flexible" },
            { label: "neutral", active: optionsLevel === "neutral" },
            { label: "limited", active: optionsLevel === "limited" }
          ]} />

          <ScaleRow label="HLTH" labelTooltip="Health and availability outlook" options={[
            { label: "durable", active: healthLevel === "durable" },
            { label: "moderate", active: healthLevel === "moderate" },
            { label: "fragile", active: healthLevel === "fragile" }
          ]} />

          <ScaleRow label="PED" labelTooltip="Prospect or amateur pedigree" options={[
            { label: "low", active: pedLevel === "low" },
            { label: "solid", active: pedLevel === "solid" },
            { label: "premium", active: pedLevel === "premium" }
          ]} />

          <ScaleRow label="DEV" labelTooltip="Development curve direction" options={[
            { label: "slow", active: devLevel === "slow" },
            { label: "steady", active: devLevel === "steady" },
            { label: "accelerating", active: devLevel === "accelerating" }
          ]} />

          <ScaleRow label="ORG" labelTooltip="Organizational value and priority" options={[
            { label: "depth", active: orgLevel === "depth" },
            { label: "contributor", active: orgLevel === "contributor" },
            { label: "priority", active: orgLevel === "priority" }
          ]} />

          <ScaleRow label="RSK" labelTooltip="Overall asset risk" options={[
            { label: "high", active: riskLevel === "high" },
            { label: "moderate", active: riskLevel === "moderate" },
            { label: "controlled", active: riskLevel === "controlled" }
          ]} />

          <ScaleRow label="VAL" labelTooltip="Long-term player value" options={[
            { label: "uncertain", active: valueLevel === "uncertain" },
            { label: "viable", active: valueLevel === "viable" },
            { label: "strong", active: valueLevel === "strong" }
          ]} />
        </div>
      )
    }

    if (infoMode === "scout") {
      return (
        <div className={styles.scoutAnalystContent} data-intel-content="scout-analyst">
          <ScaleRow label="CEIL" labelTooltip="Top-end projected outcome" options={[
            { label: "role", active: scoutCeiling === "role" },
            { label: "impact", active: scoutCeiling === "impact" },
            { label: "franchise", active: scoutCeiling === "franchise" }
          ]} />

          <ScaleRow label="FLR" labelTooltip="Most realistic floor outcome" options={[
            { label: "bench", active: scoutFloor === "bench" },
            { label: "contributor", active: scoutFloor === "contributor" },
            { label: "reliable", active: scoutFloor === "reliable" }
          ]} />

          <ScaleRow label="ROLE" labelTooltip="Likelihood of reaching the projected role" options={[
            { label: "unlikely", active: scoutRole === "unlikely" },
            { label: "plausible", active: scoutRole === "plausible" },
            { label: "likely", active: scoutRole === "likely" }
          ]} />

          <ScaleRow label="TREND" labelTooltip="Direction of skill development" options={[
            { label: "flat", active: scoutTrend === "flat" },
            { label: "stable", active: scoutTrend === "stable" },
            { label: "improving", active: scoutTrend === "improving" }
          ]} />

          <ScaleRow label="VOL" labelTooltip="Volatility of the profile" options={[
            { label: "erratic", active: scoutVol === "erratic" },
            { label: "moderate", active: scoutVol === "moderate" },
            { label: "stable", active: scoutVol === "stable" }
          ]} />

          <ScaleRow label="COMP" labelTooltip="Strength of the player comparison" options={[
            { label: "loose", active: scoutComp === "loose" },
            { label: "stylistic", active: scoutComp === "stylistic" },
            { label: "strong", active: scoutComp === "strong" }
          ]} />

          <ScaleRow label="ORG" labelTooltip="Fit with the organization and development model" options={[
            { label: "poor", active: scoutOrg === "poor" },
            { label: "workable", active: scoutOrg === "workable" },
            { label: "ideal", active: scoutOrg === "ideal" }
          ]} />

          <ScaleRow label="RISK" labelTooltip="Whether overall risk is rising, steady, or falling" options={[
            { label: "rising", active: scoutRisk === "rising" },
            { label: "steady", active: scoutRisk === "steady" },
            { label: "falling", active: scoutRisk === "falling" }
          ]} />
        </div>
      )
    }

    return (
      <div className={styles.careerAnalystContent} data-intel-content="career-analyst">
        <ScaleRow
          label="CEIL"
          labelTooltip="Top-end long-term outcome"
          options={[
            { label: "limited", active: careerCeiling === "limited" },
            { label: "viable", active: careerCeiling === "viable" },
            { label: "premium", active: careerCeiling === "premium" }
          ]}
        />

        <ScaleRow
          label="VALUE"
          labelTooltip="Projected draft or prospect value"
          options={[
            { label: "low", active: careerValue === "low" },
            { label: "solid", active: careerValue === "solid" },
            { label: "premium", active: careerValue === "premium" }
          ]}
        />

        <ScaleRow
          label="ASC"
          labelTooltip="Speed of ascent through development"
          options={[
            { label: "slow", active: careerAsc === "slow" },
            { label: "steady", active: careerAsc === "steady" },
            { label: "fast", active: careerAsc === "fast" }
          ]}
        />

        <ScaleRow
          label="SETB"
          labelTooltip="Risk of setbacks or interruptions"
          options={[
            { label: "risk", active: careerSetbacks === "risk" },
            { label: "moderate", active: careerSetbacks === "moderate" },
            { label: "clean", active: careerSetbacks === "clean" }
          ]}
        />

        <ScaleRow
          label="REC"
          labelTooltip="Recovery and rebound outlook"
          options={[
            { label: "weak", active: careerRecovery === "weak" },
            { label: "stable", active: careerRecovery === "stable" },
            { label: "strong", active: careerRecovery === "strong" }
          ]}
        />

        <ScaleRow
          label="ORG"
          labelTooltip="Organizational patience and runway"
          options={[
            { label: "low", active: careerOrgPatience === "low" },
            { label: "steady", active: careerOrgPatience === "steady" },
            { label: "elite", active: careerOrgPatience === "elite" }
          ]}
        />

        <ScaleRow
          label="ARC"
          labelTooltip="Projected career arc"
          options={[
            { label: "flat", active: careerArc === "flat" },
            { label: "upward", active: careerArc === "upward" },
            { label: "impact", active: careerArc === "impact" }
          ]}
        />

        <ScaleRow
          label="VAL"
          labelTooltip="Long-view future value"
          options={[
            { label: "uncertain", active: careerLongValue === "uncertain" },
            { label: "viable", active: careerLongValue === "viable" },
            { label: "strong", active: careerLongValue === "strong" }
          ]}
        />
      </div>
    )
  }

  const renderStatusLEDs = (isOpen: boolean) => (
    <div className={cx(styles.statusLED, isOpen && styles.statusLEDOn)}>
      <span className={cx(styles.statusDot, styles.statusGold)} />
      <span className={cx(styles.statusDot, styles.statusRed)} />
      <span className={cx(styles.statusDot, styles.statusGreen)} />
    </div>
  )

  const renderCellReadout = (
    summary: CellSummary | null,
    isOpen: boolean,
    tier: 1 | 2 | 3
  ) => {
    if (!summary) return null

    const tierClass =
      tier === 1
        ? styles.cellReadoutTier1
        : tier === 2
          ? styles.cellReadoutTier2
          : styles.cellReadoutTier3

    return (
      <div
        className={cx(styles.cellReadout, tierClass, isOpen && styles.cellReadoutOn)}
        title={`${summary.meaning} Score ${summary.cellScore}. Tier ${summary.tier}.`}
      >
        <span className={styles.cellReadoutTitle}>{summary.title}</span>
        <span className={styles.cellReadoutContribution}>
          {summary.contributionLabel}
        </span>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.stack}>
        <div className={getPanelWrapClass(1)}>
          {renderStatusLEDs(open1)}
          {renderCellReadout(getCellSummary("snapshot"), open1, 1)}
          <TierPanel_1
            open={open1}
            active={playerActive}
            title="SNAPSHOT"
          >
            {mode === "performance" ? (
              renderPerformanceTier1()
            ) : mode === "media" ? (
              renderMediaTier1()
            ) : mode === "market" ? (
              renderMarketTier1()
            ) : (
              renderKnowledgeTier1()
            )}
          </TierPanel_1>
        </div>

        <div className={getPanelWrapClass(2)}>
          {renderStatusLEDs(open2)}
          {renderCellReadout(getCellSummary("scout"), open2, 2)}
          <TierPanel_2 open={open2} active={playerActive} title="SCOUT">
            {mode === "performance" ? (
              renderPerformanceTier2()
            ) : mode === "media" ? (
              renderMediaTier2()
            ) : mode === "market" ? (
              renderMarketTier2()
            ) : (
              renderKnowledgeTier2()
            )}
          </TierPanel_2>
        </div>

        <div className={getPanelWrapClass(3)}>
          {renderStatusLEDs(open3)}
          {renderCellReadout(getCellSummary("analyst"), open3, 3)}
          <TierPanel_3 open={open3} active={playerActive} title="ANALYST">
            {mode === "performance" ? (
              renderPerformanceTier3()
            ) : mode === "media" ? (
              renderMediaTier3()
            ) : mode === "market" ? (
              renderMarketTier3()
            ) : (
              renderKnowledgeTier3()
            )}
          </TierPanel_3>
        </div>
      </div>
    </div>
  )
}
