/* eslint-disable @typescript-eslint/no-explicit-any */

function scoreXERA(v: number) {
  if (v <= 2.8) return 3
  if (v <= 3.3) return 2.6
  if (v <= 3.8) return 2.2
  if (v <= 4.2) return 1.6
  if (v <= 4.6) return 1

  return 0.6
}

function scoreStuff(v: number) {
  if (v >= 115) return 3
  if (v >= 110) return 2.6
  if (v >= 105) return 2.2
  if (v >= 100) return 1.8
  if (v >= 95) return 1.2

  return 0.6
}

function scale(v?: number) {
  return (v ?? 0.5) * 3
}

function scoreWar(v: number) {
  if (v >= 6) return 3
  if (v >= 5) return 2.7
  if (v >= 4) return 2.4
  if (v >= 3) return 2
  if (v >= 2) return 1.6
  if (v >= 1) return 1.2
  if (v >= 0) return 0.8

  return 0.4
}

export function calculatePerformancePitcherAnalyst(player: any) {
  const a = player?.performance?.analyst

  if (!a) return 0

  let raw = 0

  raw += scoreXERA(a.xERA ?? 4.2)
  raw += scoreStuff(a.stuffPlus ?? 95)

  raw += scale(a.pitchMixGrade)
  raw += scale(a.veloTrend)
  raw += scale(a.commandTrend)
  raw += scale(a.injuryTrend)
  raw += scale(a.roleStability)

  raw += scoreWar(a.war ?? 2.4)

  return Number(((raw / 24) * 18).toFixed(2))
}
