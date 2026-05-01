import {
  signalValueToNormalized,
  textSignalScore
} from "@/data/dlr/signalEngine"

type NullableNumber = number | null | undefined
type NullableValue = NullableNumber | string | string[] | null | undefined

type KnowledgeBioInput = {
  snapshot?: Record<string, NullableValue>
  scoutScores?: Record<string, NullableNumber>
  scout?: Record<string, NullableValue>
  analystScores?: Record<string, NullableNumber>
  analyst?: Record<string, NullableValue>
}

export type BioScoreResult = {
  score: number
  populated: number
  expected: number
}

type BioRulesInput = {
  bio?: KnowledgeBioInput
}

export const BIO_SCOUT_FIELDS = [
  { key: "arch", labels: ["control", "balanced", "power"] },
  { key: "path", labels: ["raw", "progressing", "polished"] },
  { key: "frame", labels: ["lean", "solid", "durable"] },
  { key: "ath", labels: ["limited", "adequate", "dynamic"] },
  { key: "proj", labels: ["low", "moderate", "high"] }
] as const

export const BIO_ANALYST_FIELDS = [
  { key: "service", labels: ["established", "mid", "early"] },
  { key: "options", labels: ["limited", "neutral", "flexible"] },
  { key: "health", labels: ["fragile", "moderate", "durable"] },
  { key: "pedigree", labels: ["low", "solid", "premium"] },
  { key: "dev", labels: ["slow", "steady", "accelerating"] },
  { key: "org", labels: ["depth", "contributor", "priority"] },
  { key: "risk", labels: ["high", "moderate", "controlled"] },
  { key: "value", labels: ["uncertain", "viable", "strong"] }
] as const

function scoreAverage(values: Array<number | null>): BioScoreResult {
  const populatedValues = values.filter((value): value is number =>
    value !== null && value !== undefined && Number.isFinite(value)
  )

  if (populatedValues.length === 0) {
    return { score: 0, populated: 0, expected: values.length }
  }

  return {
    score: populatedValues.reduce((sum, value) => sum + value, 0) / populatedValues.length,
    populated: populatedValues.length,
    expected: values.length
  }
}

function readNumber(
  source: Record<string, NullableValue> | undefined,
  key: string
) {
  const value = source?.[key]

  return typeof value === "number" && Number.isFinite(value) ? value : null
}

function normalizeNumber(value: NullableNumber) {
  if (value === null || value === undefined || Number.isNaN(value)) return null

  return Math.max(0, Math.min(1, value))
}

function invertScore(value: NullableNumber) {
  const normalized = normalizeNumber(value)

  return normalized === null ? null : 1 - normalized
}

function scoreCompleteness(values: NullableValue[]) {
  if (values.length === 0) return null

  const populated = values.filter((value) => {
    if (Array.isArray(value)) return value.length > 0
    return value !== null && value !== undefined && String(value).trim() !== ""
  }).length

  return populated / values.length
}

function serviceTimeScore(value: NullableValue) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null
  if (value <= 1) return signalValueToNormalized(0.1)
  if (value <= 4) return signalValueToNormalized(0.06)

  return signalValueToNormalized(0.03)
}

function optionsScore(value: NullableValue) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null
  if (value >= 2) return signalValueToNormalized(0.1)
  if (value === 1) return signalValueToNormalized(0.06)

  return signalValueToNormalized(0.03)
}

export function bucketLabelFromScore(
  value: NullableNumber,
  labels: readonly [string, string, string],
  invert = false
) {
  const normalized = invert ? invertScore(value) : normalizeNumber(value)

  if (normalized === null) return labels[1]
  if (normalized < 0.5) return labels[0]
  if (normalized < 0.75) return labels[1]

  return labels[2]
}

export function scoreKnowledgeBioSnapshot(bio: KnowledgeBioInput | undefined): BioScoreResult {
  return scoreAverage([
    scoreCompleteness([
      bio?.snapshot?.height,
      bio?.snapshot?.weight,
      bio?.snapshot?.bats,
      bio?.snapshot?.throws,
      bio?.snapshot?.school
    ])
  ])
}

export function scoreKnowledgeBioScout(bio: KnowledgeBioInput | undefined): BioScoreResult {
  return scoreAverage([
    readNumber(bio?.scoutScores, "arch"),
    readNumber(bio?.scoutScores, "path"),
    readNumber(bio?.scoutScores, "frame"),
    readNumber(bio?.scoutScores, "ath"),
    readNumber(bio?.scoutScores, "proj")
  ])
}

export function scoreKnowledgeBioAnalyst(bio: KnowledgeBioInput | undefined): BioScoreResult {
  return scoreAverage([
    serviceTimeScore(bio?.analyst?.serviceTime),
    optionsScore(bio?.analyst?.options),
    invertScore(readNumber(bio?.analyst, "injuryIdx")),
    readNumber(bio?.analystScores, "pedigree"),
    readNumber(bio?.analystScores, "dev"),
    readNumber(bio?.analystScores, "org"),
    invertScore(readNumber(bio?.analystScores, "risk") ?? readNumber(bio?.analyst, "assetRisk")),
    readNumber(bio?.analystScores, "value") ?? readNumber(bio?.analyst, "longValue")
  ])
}

export function scoreKnowledgeBio(input: BioRulesInput) {
  return {
    snapshot: scoreKnowledgeBioSnapshot(input.bio),
    scout: scoreKnowledgeBioScout(input.bio),
    analyst: scoreKnowledgeBioAnalyst(input.bio)
  }
}

export function resolveBioScoutLabel(
  bio: KnowledgeBioInput | undefined,
  key: (typeof BIO_SCOUT_FIELDS)[number]["key"]
) {
  const field = BIO_SCOUT_FIELDS.find((item) => item.key === key)

  if (!field) return ""

  return bucketLabelFromScore(readNumber(bio?.scoutScores, key), field.labels)
}

export function resolveBioAnalystLabel(
  bio: KnowledgeBioInput | undefined,
  key: (typeof BIO_ANALYST_FIELDS)[number]["key"]
) {
  const field = BIO_ANALYST_FIELDS.find((item) => item.key === key)

  if (!field) return ""

  if (key === "service") {
    return bucketLabelFromScore(serviceTimeScore(bio?.analyst?.serviceTime), field.labels)
  }

  if (key === "options") {
    return bucketLabelFromScore(optionsScore(bio?.analyst?.options), field.labels)
  }

  if (key === "health") {
    return bucketLabelFromScore(readNumber(bio?.analyst, "injuryIdx"), field.labels, true)
  }

  if (key === "risk") {
    return bucketLabelFromScore(
      readNumber(bio?.analystScores, "risk") ?? readNumber(bio?.analyst, "assetRisk"),
      field.labels,
      true
    )
  }

  if (key === "pedigree") return bucketLabelFromScore(readNumber(bio?.analystScores, "pedigree"), field.labels)
  if (key === "dev") return bucketLabelFromScore(readNumber(bio?.analystScores, "dev"), field.labels)
  if (key === "org") return bucketLabelFromScore(readNumber(bio?.analystScores, "org"), field.labels)
  if (key === "value") return bucketLabelFromScore(readNumber(bio?.analystScores, "value"), field.labels)

  return field.labels[1]
}

export function resolveTextBioLabel(
  value: NullableValue,
  labels: readonly [string, string, string]
) {
  return bucketLabelFromScore(textSignalScore(value), labels)
}
