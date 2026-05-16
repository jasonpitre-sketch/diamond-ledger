/**
 * P60-DIAG — ELI WILLITS DLR DIAGNOSTIC SCRIPT
 * READ-ONLY. No writes. No DB mutations.
 * Run: npx tsx --tsconfig tsconfig.json scripts/diag-eli-dlr.mts
 */

import { calculateDLR } from "../data/dlr/calculateDLR"
import { eli_willits } from "../data/players/eli_willits"
import {
  FLAT_LAYER_POINTS,
  KNOWLEDGE_PAGE_POINTS,
  LAYER_MAX_POINTS
} from "../data/dlr/dlrConfig"

// ─── TASK 2: RAW calculateDLR (no hydration) ────────────────────────────────

function printBreakdown(label: string, result: ReturnType<typeof calculateDLR>) {
  console.log(`\n${"=".repeat(60)}`)
  console.log(label)
  console.log("=".repeat(60))
  console.log(`\nFINAL RATING:   ${result.rating} / 100`)
  console.log(`TIER:           ${result.tier}`)

  const ss = result.subScores
  const comp = result.components

  // ── KNOWLEDGE LAYER ──────────────────────────────────────────
  const kPts = LAYER_MAX_POINTS.knowledge
  const kContrib = comp.knowledge * kPts
  console.log(`\n--- KNOWLEDGE LAYER (max ${kPts} pts) ---`)
  for (const page of ["bio", "scout", "career"] as const) {
    for (const sub of ["snapshot", "scout", "analyst"] as const) {
      const score = ss.knowledge[page][sub]
      const max = KNOWLEDGE_PAGE_POINTS[page][sub]
      const pts = (score * max).toFixed(3)
      console.log(`  ${page.padEnd(8)} / ${sub.padEnd(8)}:  ${pts.padStart(6)} / ${max}  (cellScore: ${score.toFixed(4)})`)
    }
  }
  console.log(`  Layer subtotal:   ${kContrib.toFixed(3)} / ${kPts}  (component: ${comp.knowledge.toFixed(4)})`)

  // ── PERFORMANCE LAYER ────────────────────────────────────────
  const pPts = LAYER_MAX_POINTS.performance
  const pContrib = comp.performance * pPts
  console.log(`\n--- PERFORMANCE LAYER (max ${pPts} pts) ---`)
  for (const sub of ["snapshot", "scout", "analyst"] as const) {
    const score = ss.performance[sub]
    const max = FLAT_LAYER_POINTS.performance[sub]
    const pts = (score * max).toFixed(3)
    console.log(`  ${sub.padEnd(10)}:  ${pts.padStart(6)} / ${max}  (cellScore: ${score.toFixed(4)})`)
  }
  console.log(`  Layer subtotal:   ${pContrib.toFixed(3)} / ${pPts}  (component: ${comp.performance.toFixed(4)})`)

  // ── MEDIA LAYER ──────────────────────────────────────────────
  const mPts = LAYER_MAX_POINTS.media
  const mContrib = comp.media * mPts
  console.log(`\n--- MEDIA LAYER (max ${mPts} pts) ---`)
  for (const sub of ["snapshot", "scout", "analyst"] as const) {
    const score = ss.media[sub]
    const max = FLAT_LAYER_POINTS.media[sub]
    const pts = (score * max).toFixed(3)
    console.log(`  ${sub.padEnd(10)}:  ${pts.padStart(6)} / ${max}  (cellScore: ${score.toFixed(4)})`)
  }
  console.log(`  Layer subtotal:   ${mContrib.toFixed(3)} / ${mPts}  (component: ${comp.media.toFixed(4)})`)

  // ── MARKET LAYER ─────────────────────────────────────────────
  const mkPts = LAYER_MAX_POINTS.market
  const mkContrib = comp.market * mkPts
  console.log(`\n--- MARKET LAYER (max ${mkPts} pts) ---`)
  for (const sub of ["snapshot", "scout", "analyst"] as const) {
    const score = ss.market[sub]
    const max = FLAT_LAYER_POINTS.market[sub]
    const pts = (score * max).toFixed(3)
    console.log(`  ${sub.padEnd(10)}:  ${pts.padStart(6)} / ${max}  (cellScore: ${score.toFixed(4)})`)
  }
  console.log(`  Layer subtotal:   ${mkContrib.toFixed(3)} / ${mkPts}  (component: ${comp.market.toFixed(4)})`)

  // ── TOTALS CHECK ──────────────────────────────────────────────
  const rawTotal = kContrib + pContrib + mContrib + mkContrib
  console.log(`\n--- RAW TOTAL ---`)
  console.log(`  Knowledge:     ${kContrib.toFixed(3)}`)
  console.log(`  Performance:   ${pContrib.toFixed(3)}`)
  console.log(`  Media:         ${mContrib.toFixed(3)}`)
  console.log(`  Market:        ${mkContrib.toFixed(3)}`)
  console.log(`  Sum:           ${rawTotal.toFixed(3)}`)
  console.log(`  rating (1dp):  ${result.rating}`)

  // ── CONFIDENCE ───────────────────────────────────────────────
  const c = result.confidence
  console.log(`\n--- CONFIDENCE ---`)
  console.log(`  Overall:       ${c.overall.toFixed(4)}`)
  console.log(`  Knowledge:     ${c.knowledge.toFixed(4)}`)
  console.log(`  Performance:   ${c.performance.toFixed(4)}`)
  console.log(`  Media:         ${c.media.toFixed(4)}`)
  console.log(`  Market:        ${c.market.toFixed(4)}`)

  // ── OBSERVABILITY ────────────────────────────────────────────
  const obs = result.observability
  if (obs) {
    console.log(`\n--- OBSERVABILITY ---`)
    console.log(`  hasRolling:         ${obs.hasRolling}`)
    console.log(`  healthClass:        ${obs.healthClass}`)
    console.log(`  snapshotRolling:    ${obs.performanceFallback.snapshotRolling}`)
    console.log(`  scoutRolling:       ${obs.performanceFallback.scoutRolling}`)
    console.log(`  analystRolling:     ${obs.performanceFallback.analystRolling}`)
    console.log(`  anyFallback:        ${obs.performanceFallback.anyFallback}`)
    console.log(`  allFallback:        ${obs.performanceFallback.allFallback}`)
  }
}

// ── TASK 2 — Raw call ────────────────────────────────────────────────────────

console.log("\n╔══════════════════════════════════════════════════════════╗")
console.log("║  P60-DIAG — ELI WILLITS DLR DIAGNOSTIC                  ║")
console.log("╚══════════════════════════════════════════════════════════╝")

console.log("\n[TASK 2] Raw calculateDLR(eli_willits) — no hydration injected")
console.log(`Player object keys present: ${Object.keys(eli_willits).join(", ")}`)
console.log(`tracker present: ${!!eli_willits.tracker}`)
console.log(`tracker.rolling present: ${!!eli_willits.tracker?.rolling}`)
console.log(`marketSnapshot present: ${"marketSnapshot" in eli_willits}`)
console.log(`cardMarket present: ${"cardMarket" in eli_willits}`)

const rawResult = calculateDLR(eli_willits)
printBreakdown("=== ELI WILLITS — RAW calculateDLR OUTPUT (no hydration) ===", rawResult)

// ── TASK 3 — Hydrated call (simulate what vault SHOULD do) ──────────────────

console.log("\n\n[TASK 3] Hydrated call — injecting persistedScore=50, monthlySettledScore=50.26")

// applyPersistedDLR and applyMonthlySettlement from hydrateDLR only affect
// player.dlr.persistedScore and player.dlr.monthlySettledScore.
// calculateDLR does NOT read player.dlr at all — it only reads:
//   player.knowledge, player.performance, player.media, player.tracker, player.marketSnapshot
// So hydration injection would NOT change calculateDLR output.
// This is the diagnostic finding.

const hydratedPlayer = {
  ...eli_willits,
  dlr: {
    ...(eli_willits.dlr ?? {}),
    persistedScore: 50.00,
    monthlySettledScore: 50.26
  }
}

const hydratedResult = calculateDLR(hydratedPlayer)

console.log(`\npersistedScore injected:        50.00`)
console.log(`monthlySettledScore injected:   50.26`)

printBreakdown("=== ELI WILLITS — HYDRATED calculateDLR OUTPUT (with Supabase anchors) ===", hydratedResult)

// ── TASK 4 — Vault read path summary ────────────────────────────────────────

console.log("\n\n[TASK 4] VAULT READ PATH TRACE")
console.log("─".repeat(60))
console.log("app/vault/page.tsx")
console.log("  imports eli_willits via playersDraft2026 (assembled array) ✓")
console.log("  calls calculateDLR(selectedPlayer) at line 144")
console.log("  passes calculateDLR result.rating to HeroVault at line 387")
console.log("  hydration calls found: NONE")
console.log("    → fetchPersistedDLR: NOT CALLED")
console.log("    → fetchMonthlySettlement: NOT CALLED")
console.log("    → applyPersistedDLR: NOT CALLED")
console.log("    → applyMonthlySettlement: NOT CALLED")
console.log("  NOTE: page.tsx is a 'use client' component.")
console.log("  NOTE: hydrateDLR.ts functions are SERVER-SIDE ONLY.")
console.log("  NOTE: No useEffect or server action bridges the gap.")

// ── TASK 5 — Comparison + Diagnosis ─────────────────────────────────────────

console.log("\n\n[TASK 5] DIAGNOSTIC CONCLUSIONS")
console.log("─".repeat(60))
console.log(`Q1. Raw calculateDLR(eli_willits) rating: ${rawResult.rating}`)
console.log(`Q2. Does raw rating match vault 17.0? ${rawResult.rating === 17.0 ? "YES — vault reads raw composition" : `CHECK — raw = ${rawResult.rating}`}`)
console.log(`Q3. Low/zero cells: see full breakdown above`)
console.log(`Q4. fetchPersistedDLR called in vault: NO`)
console.log(`Q5. Hydrated result rating: ${hydratedResult.rating} (hydration doesn't flow through calculateDLR)`)
console.log(`Q6. Gap explained by hydration alone? See above — calculateDLR does NOT read player.dlr`)
