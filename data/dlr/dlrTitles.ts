import {
  type AllSubScores,
  type CellId,
  type KnowledgePage,
  type LayerName,
  type SubComponent,
  clamp01,
  getCellMaxPoints
} from "./dlrConfig"

export type TitleTier = {
  tier: number
  minScore: number
  maxScore: number
  title: string
  meaning: string
}

export const TITLE_LADDER: TitleTier[] = [
  { tier: 1, minScore: 0, maxScore: 0.083, title: "DORMANT", meaning: "No meaningful signal." },
  { tier: 2, minScore: 0.083, maxScore: 0.167, title: "FAINT", meaning: "Below the threshold of relevance." },
  { tier: 3, minScore: 0.167, maxScore: 0.25, title: "LIMITED", meaning: "Weak - well below average." },
  { tier: 4, minScore: 0.25, maxScore: 0.333, title: "TRAILING", meaning: "Underperforming peers." },
  { tier: 5, minScore: 0.333, maxScore: 0.417, title: "DEVELOPING", meaning: "Some signal, not yet there." },
  { tier: 6, minScore: 0.417, maxScore: 0.5, title: "STEADY", meaning: "Roughly average." },
  { tier: 7, minScore: 0.5, maxScore: 0.583, title: "SOLID", meaning: "Above-average performer." },
  { tier: 8, minScore: 0.583, maxScore: 0.667, title: "STRONG", meaning: "Plus territory." },
  { tier: 9, minScore: 0.667, maxScore: 0.75, title: "SURGING", meaning: "Plus-plus, accelerating." },
  { tier: 10, minScore: 0.75, maxScore: 0.833, title: "DOMINANT", meaning: "Elite-adjacent." },
  { tier: 11, minScore: 0.833, maxScore: 0.917, title: "APEX", meaning: "Top of class." },
  { tier: 12, minScore: 0.917, maxScore: 1.001, title: "LEGENDARY", meaning: "Best of best - rare." }
]

export const CELL_FLAVOR_OVERRIDES: Record<string, Partial<Record<number, string>>> = {}

export type CellSummary = {
  id: CellId
  label: string
  subScore: number
  cellScore: number
  tier: number
  title: string
  meaning: string
  contribution: number
  contributionLabel: string
  maxPoints: number
}

const PAGES: KnowledgePage[] = ["bio", "scout", "career"]
const SUBS: SubComponent[] = ["snapshot", "scout", "analyst"]

export function getTitleTier(subScore: number): TitleTier {
  const clamped = clamp01(subScore)

  for (const titleTier of TITLE_LADDER) {
    if (clamped >= titleTier.minScore && clamped < titleTier.maxScore) {
      return titleTier
    }
  }

  return TITLE_LADDER[TITLE_LADDER.length - 1]
}

function cellOverrideKey(cell: CellId) {
  if (cell.layer === "knowledge") return `knowledge.${cell.page}.${cell.sub}`

  return `${cell.layer}.${cell.sub}`
}

export function getCellTitle(cell: CellId, subScore: number) {
  const baseTier = getTitleTier(subScore)
  const override = CELL_FLAVOR_OVERRIDES[cellOverrideKey(cell)]?.[baseTier.tier]

  return {
    tier: baseTier.tier,
    title: override ?? baseTier.title,
    meaning: baseTier.meaning
  }
}

export function computeCellContribution(cell: CellId, subScore: number) {
  return clamp01(subScore) * getCellMaxPoints(cell)
}

export function formatContribution(points: number) {
  const rounded = Math.round(points * 10) / 10
  const sign = rounded >= 0 ? "+" : ""

  return `${sign}${rounded.toFixed(1)}`
}

export function formatCellScore(subScore: number) {
  return Math.round(clamp01(subScore) * 100)
}

function cap(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function buildLabel(cell: CellId) {
  if (cell.layer === "knowledge") {
    return `Knowledge - ${cap(cell.page)} - ${cap(cell.sub)}`
  }

  return `${cap(cell.layer)} - ${cap(cell.sub)}`
}

export function buildCellSummary(cell: CellId, subScore: number): CellSummary {
  const titleData = getCellTitle(cell, subScore)
  const contribution = computeCellContribution(cell, subScore)

  return {
    id: cell,
    label: buildLabel(cell),
    subScore,
    cellScore: formatCellScore(subScore),
    tier: titleData.tier,
    title: titleData.title,
    meaning: titleData.meaning,
    contribution,
    contributionLabel: formatContribution(contribution),
    maxPoints: getCellMaxPoints(cell)
  }
}

export function buildAllCellSummaries(scores: AllSubScores): CellSummary[] {
  const summaries: CellSummary[] = []

  for (const page of PAGES) {
    for (const sub of SUBS) {
      summaries.push(
        buildCellSummary({ layer: "knowledge", page, sub }, scores.knowledge[page][sub])
      )
    }
  }

  for (const sub of SUBS) {
    summaries.push(buildCellSummary({ layer: "performance", sub }, scores.performance[sub]))
    summaries.push(buildCellSummary({ layer: "media", sub }, scores.media[sub]))
    summaries.push(buildCellSummary({ layer: "market", sub }, scores.market[sub]))
  }

  return summaries
}

export function filterByLayer(summaries: CellSummary[], layer: LayerName) {
  return summaries.filter((summary) => summary.id.layer === layer)
}

export function filterByKnowledgePage(summaries: CellSummary[], page: KnowledgePage) {
  return summaries.filter(
    (summary) => summary.id.layer === "knowledge" && summary.id.page === page
  )
}
