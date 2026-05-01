export type PlayerRole = "hitter" | "pitcher"
export type SignalBucket = "low" | "mid" | "high"

type PlayerRoleInput = {
  position?: string
  pos?: string
  performance?: {
    kind?: "hitter" | "pitcher"
  }
}

type ToolAlias = {
  key: string
  aliases: string[]
}

export const SIGNAL_BUCKET_VALUES: Record<SignalBucket, number> = {
  low: 0.03,
  mid: 0.06,
  high: 0.1
}

export const SIGNAL_MAP: Record<string, number> = {
  low: SIGNAL_BUCKET_VALUES.low,
  limited: SIGNAL_BUCKET_VALUES.low,
  bench: SIGNAL_BUCKET_VALUES.low,
  risk: SIGNAL_BUCKET_VALUES.low,
  risky: SIGNAL_BUCKET_VALUES.low,
  raw: SIGNAL_BUCKET_VALUES.low,
  volatile: SIGNAL_BUCKET_VALUES.low,
  uncertain: SIGNAL_BUCKET_VALUES.low,
  slow: SIGNAL_BUCKET_VALUES.low,

  moderate: SIGNAL_BUCKET_VALUES.mid,
  mid: SIGNAL_BUCKET_VALUES.mid,
  solid: SIGNAL_BUCKET_VALUES.mid,
  starter: SIGNAL_BUCKET_VALUES.mid,
  average: SIGNAL_BUCKET_VALUES.mid,
  steady: SIGNAL_BUCKET_VALUES.mid,
  balanced: SIGNAL_BUCKET_VALUES.mid,
  contributor: SIGNAL_BUCKET_VALUES.mid,
  viable: SIGNAL_BUCKET_VALUES.mid,
  normal: SIGNAL_BUCKET_VALUES.mid,

  high: SIGNAL_BUCKET_VALUES.high,
  impact: SIGNAL_BUCKET_VALUES.high,
  elite: SIGNAL_BUCKET_VALUES.high,
  premium: SIGNAL_BUCKET_VALUES.high,
  strong: SIGNAL_BUCKET_VALUES.high,
  ideal: SIGNAL_BUCKET_VALUES.high,
  priority: SIGNAL_BUCKET_VALUES.high,
  accelerating: SIGNAL_BUCKET_VALUES.high,
  projectable: SIGNAL_BUCKET_VALUES.high,
  polished: SIGNAL_BUCKET_VALUES.high,
  likely: SIGNAL_BUCKET_VALUES.high,
  "top 10": SIGNAL_BUCKET_VALUES.high,
  "very high": SIGNAL_BUCKET_VALUES.high,
  "1st overall": SIGNAL_BUCKET_VALUES.high,
  "1-1": SIGNAL_BUCKET_VALUES.high
}

export const ROLE_TOOL_SETS: Record<PlayerRole, ToolAlias[]> = {
  hitter: [
    { key: "hit", aliases: ["hit"] },
    { key: "power", aliases: ["power"] },
    { key: "run", aliases: ["run", "speed"] },
    { key: "arm", aliases: ["arm"] },
    { key: "field", aliases: ["field", "fielding"] }
  ],
  pitcher: [
    { key: "fastball", aliases: ["fastball", "fb"] },
    { key: "breaking", aliases: ["breaking", "break", "brk", "slider", "curveball"] },
    { key: "offspeed", aliases: ["offspeed", "offspd", "splitter", "changeup"] },
    { key: "command", aliases: ["command", "cmd"] },
    { key: "control", aliases: ["control", "overallFV", "overall"] }
  ]
}

export function clampSignal(value: number) {
  return Math.max(0, Math.min(1, value))
}

export function normalizeToolGrade(grade: number | null | undefined) {
  if (grade === null || grade === undefined || Number.isNaN(grade)) return null

  return clampSignal((grade - 20) / 60)
}

export function detectPlayerRole(player: PlayerRoleInput): PlayerRole {
  const position = (player.position ?? player.pos ?? "").toUpperCase()

  if (
    player.performance?.kind === "pitcher" ||
    ["P", "SP", "RP", "RHP", "LHP"].includes(position)
  ) {
    return "pitcher"
  }

  return "hitter"
}

export function readRoleToolGrades(
  tools: Record<string, number | null | undefined> | undefined,
  role: PlayerRole
) {
  return ROLE_TOOL_SETS[role].map(({ key, aliases }) => {
    const raw = aliases
      .map((alias) => tools?.[alias])
      .find((value) => typeof value === "number" && !Number.isNaN(value))

    return {
      key,
      value: typeof raw === "number" ? raw : null,
      normalized: normalizeToolGrade(raw)
    }
  })
}

export function signalValueToNormalized(value: number) {
  return clampSignal(value / SIGNAL_BUCKET_VALUES.high)
}

export function textSignalValue(value: number | string | string[] | null | undefined) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return clampSignal(value) * SIGNAL_BUCKET_VALUES.high
  }

  if (Array.isArray(value)) {
    const mapped = value
      .map((item) => textSignalValue(item))
      .filter((score) => score !== null)

    if (mapped.length === 0) return null

    return mapped.reduce((sum, score) => sum + score, 0) / mapped.length
  }

  if (value === null || value === undefined) return null

  const text = String(value).toLowerCase()
  const match = Object.entries(SIGNAL_MAP)
    .sort(([left], [right]) => right.length - left.length)
    .find(([label]) => text.includes(label))

  return match?.[1] ?? null
}

export function textSignalScore(
  value: number | string | string[] | null | undefined,
  fallback = 0.55
) {
  const signalValue = textSignalValue(value)

  return signalValue === null ? fallback : signalValueToNormalized(signalValue)
}
