// =============================
// 3-TIER SCALE MAPPER
// =============================

export function map3(
  value: number,
  low: string,
  mid: string,
  high: string
) {
  if (value <= 0.33) return low
  if (value <= 0.66) return mid
  return high
}

// =============================
// PLAYER STAGE
// =============================

export function mapStage(age: number, mlbGames?: number) {
  if (mlbGames && mlbGames > 200) return "established"
  if (age >= 24) return "mid"
  return "early"
}

// =============================
// SAFETY WRAPPER
// =============================

export function safeMap3(
  value: number | undefined | null,
  low: string,
  mid: string,
  high: string
) {
  if (value === undefined || value === null) return mid
  return map3(value, low, mid, high)
}
