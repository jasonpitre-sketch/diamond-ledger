/* eslint-disable @typescript-eslint/no-explicit-any */

export function calculatePerformanceSnapshot(player: any) {
  const s = player?.performance?.snapshot

  if (!s) return 0

  const era = s.era ?? 4.2
  const whip = s.whip ?? 1.35
  const so = s.so ?? 0
  const ip = s.ip ?? 0
  const hrAllowed = s.hrAllowed ?? 0

  let score = 0

  if (era <= 2.8) score += 2
  else if (era <= 3.4) score += 1.6
  else if (era <= 4.0) score += 1.3
  else if (era <= 4.6) score += 1
  else score += 0.6

  if (whip <= 1.05) score += 2
  else if (whip <= 1.15) score += 1.6
  else if (whip <= 1.3) score += 1.3
  else if (whip <= 1.45) score += 1
  else score += 0.6

  const kRate = ip > 0 ? so / ip : 0

  if (kRate >= 1.2) score += 2
  else if (kRate >= 1.05) score += 1.6
  else if (kRate >= 0.9) score += 1.3
  else if (kRate >= 0.75) score += 1
  else score += 0.6

  const hrRate = ip > 0 ? hrAllowed / ip : 0.2

  if (hrRate <= 0.08) score += 2
  else if (hrRate <= 0.1) score += 1.6
  else if (hrRate <= 0.12) score += 1.3
  else if (hrRate <= 0.15) score += 1
  else score += 0.6

  return Number(score.toFixed(2))
}
