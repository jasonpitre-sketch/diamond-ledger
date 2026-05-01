import { DLR_CONFIG } from "./dlrConfig"

export const ANALYST_VALUE_MAP: Record<string, number> = {
  franchise: DLR_CONFIG.weights.analystHigh,
  ideal: DLR_CONFIG.weights.analystHigh,
  strong: DLR_CONFIG.weights.analystHigh,
  improving: DLR_CONFIG.weights.analystHigh,
  likely: DLR_CONFIG.weights.analystHigh,
  stable: DLR_CONFIG.weights.analystHigh,
  falling: DLR_CONFIG.weights.analystHigh,

  impact: DLR_CONFIG.weights.analystMid,
  reliable: DLR_CONFIG.weights.analystMid,
  plausible: DLR_CONFIG.weights.analystMid,
  moderate: DLR_CONFIG.weights.analystMid,
  stylistic: DLR_CONFIG.weights.analystMid,
  workable: DLR_CONFIG.weights.analystMid,
  steady: DLR_CONFIG.weights.analystMid,

  default: DLR_CONFIG.weights.analystLow
}

export function analystValue(value: unknown) {
  if (typeof value !== "string" || !value) return ANALYST_VALUE_MAP.default

  return ANALYST_VALUE_MAP[value] ?? ANALYST_VALUE_MAP.default
}
