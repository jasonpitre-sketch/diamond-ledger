import type { PerformanceData } from "@/data/types/player"

/*
SNAPSHOT
max = 8
focus = actual production
*/

type HitterSnapshotInput = { performance?: PerformanceData | null }

function scoreAvg(v: number) {
  if (v >= 0.305) return 2
  if (v >= 0.29) return 1.8
  if (v >= 0.275) return 1.6
  if (v >= 0.26) return 1.3
  if (v >= 0.245) return 1

  return 0.6
}

function scoreOps(v: number) {
  if (v >= 0.93) return 2
  if (v >= 0.88) return 1.8
  if (v >= 0.82) return 1.6
  if (v >= 0.76) return 1.3
  if (v >= 0.7) return 1

  return 0.6
}

function scoreHrRate(hr: number, ab: number) {
  if (!ab) return 1

  const rate = hr / ab

  if (rate >= 0.07) return 2
  if (rate >= 0.055) return 1.8
  if (rate >= 0.045) return 1.6
  if (rate >= 0.035) return 1.3
  if (rate >= 0.025) return 1

  return 0.6
}

function scoreSbRate(sb: number, attempts: number) {
  if (!attempts) return 1

  const rate = sb / attempts

  if (rate >= 0.8) return 2
  if (rate >= 0.7) return 1.7
  if (rate >= 0.6) return 1.4
  if (rate >= 0.5) return 1.1
  if (rate >= 0.4) return 0.9

  return 0.6
}

function numberOr(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback
}

export function calculatePerformanceHitterSnapshot(player: HitterSnapshotInput): number {
  const s = player?.performance?.snapshot

  if (!s) return 0

  const avg = numberOr(s.avg, 0.25)
  const ops = numberOr(s.ops, 0.72)
  const hr = numberOr(s.hr, 10)
  const ab = numberOr(s.ab, 400)
  const sb = numberOr(s.sb, 5)
  const sbAttempts = numberOr(s.sbAttempts, 8)

  let raw = 0

  raw += scoreAvg(avg)
  raw += scoreOps(ops)
  raw += scoreHrRate(hr, ab)
  raw += scoreSbRate(sb, sbAttempts)

  return Number(raw.toFixed(2))
}
