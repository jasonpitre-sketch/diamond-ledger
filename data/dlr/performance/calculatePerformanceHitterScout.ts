/* eslint-disable @typescript-eslint/no-explicit-any */

/*
SCOUT
max = 12
focus = measurable tools
*/

function scoreHardHit(v: number) {
  if (v >= 50) return 2.6
  if (v >= 46) return 2.3
  if (v >= 42) return 2
  if (v >= 38) return 1.6
  if (v >= 34) return 1.2

  return 0.8
}

function scoreBarrel(v: number) {
  if (v >= 14) return 2.6
  if (v >= 12) return 2.3
  if (v >= 10) return 2
  if (v >= 8) return 1.6
  if (v >= 6) return 1.2

  return 0.8
}

function scoreKRate(v: number) {
  if (v <= 14) return 2.4
  if (v <= 17) return 2.2
  if (v <= 20) return 2
  if (v <= 24) return 1.6
  if (v <= 28) return 1.2

  return 0.8
}

function scoreBbRate(v: number) {
  if (v >= 14) return 2.4
  if (v >= 12) return 2.2
  if (v >= 10) return 2
  if (v >= 8) return 1.6
  if (v >= 6) return 1.2

  return 0.8
}

function scoreAvgEV(v: number) {
  if (v >= 93) return 2
  if (v >= 91) return 1.8
  if (v >= 89) return 1.6
  if (v >= 87) return 1.3
  if (v >= 85) return 1

  return 0.7
}

export function calculatePerformanceHitterScout(player: any) {
  const s = player?.performance?.scout

  if (!s) return 0

  let raw = 0

  raw += scoreHardHit(s.hardHit ?? 38)
  raw += scoreBarrel(s.barrel ?? 8)
  raw += scoreKRate(s.kRate ?? 22)
  raw += scoreBbRate(s.bbRate ?? 8)
  raw += scoreAvgEV(s.avgEV ?? 88)

  return Number(raw.toFixed(2))
}
