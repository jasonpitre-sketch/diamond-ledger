/**
 * WEEKLY SNAPSHOT CONSTRAINT TEST — Section 5A (2026-05-11)
 * ===========================================================
 * Verifies the UNIQUE(player_id, snapshot_week) constraint on
 * player_dlr_weekly operates correctly for Eli Willits.
 *
 * Tests:
 *   [1] First write succeeds — new row inserted.
 *   [2] Duplicate write same week — row count stays at 1 (upsert, not insert).
 *   [3] Updated values are reflected after second write (DO UPDATE semantics).
 *   [4] Cleanup — test row removed, players.dlr_score reset.
 *
 * The organism must NOT generate duplicate weekly identity rows for
 * the same player/week combination.
 *
 * USAGE (requires NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY):
 *   node scripts/test-weekly-snapshot-constraint.mjs
 *
 * For local dev without Supabase configured, the script exits cleanly
 * with a SKIP result rather than failing.
 */

import { createClient } from "@supabase/supabase-js"

// =============================================================
// CONFIG
// =============================================================

const PLAYER_ID    = "eli_willits"
const TEST_WEEK    = "2026-W99"          // sentinel week — won't collide with real data
const SEASON       = 2026

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY  // read-only safe for test
// For write tests, service role key is required if RLS blocks anon writes.
// Override: SUPABASE_SERVICE_KEY env var if available.
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_KEY ?? SUPABASE_KEY

// =============================================================
// HELPERS
// =============================================================

let passed = 0
let failed = 0

function pass(label) {
  console.log(`  ✓  ${label}`)
  passed++
}

function fail(label, detail) {
  console.error(`  ✗  ${label}`)
  if (detail) console.error(`     → ${detail}`)
  failed++
}

function section(title) {
  console.log(`\n[${title}]`)
}

// =============================================================
// TEST PAYLOADS
// =============================================================

/** First write — baseline DLR values */
const PAYLOAD_A = {
  player_id:              PLAYER_ID,
  snapshot_week:          TEST_WEEK,
  dlr_score:              68.5,
  dlr_tier:               "WATCHLIST",
  confidence_overall:     0.71,
  confidence_knowledge:   0.80,
  confidence_performance: 0.64,
  confidence_media:       0.60,
  confidence_market:      0.50,
  health_class:           "FULLY_REACTIVE",
  base_dlr:               68.5,
  weekly_delta:           1.2,
  monthly_contribution:   0.9,
  weekly_history:         [0.4, 0.8, 1.2, 0.9],
  competition_level:      "MiLB",
  source:                 "manual",
  season:                 SEASON,
  updated_at:             new Date().toISOString()
}

/** Second write — updated DLR (same week, should overwrite row A) */
const PAYLOAD_B = {
  ...PAYLOAD_A,
  dlr_score:        69.2,           // updated
  dlr_tier:         "WATCHLIST",
  weekly_delta:     1.5,            // updated
  monthly_contribution: 1.1,        // updated
  weekly_history:   [0.8, 1.2, 0.9, 1.5],   // updated
  updated_at:       new Date().toISOString()
}

// =============================================================
// MAIN TEST
// =============================================================

async function run() {
  console.log("=== WEEKLY SNAPSHOT CONSTRAINT TEST ===")
  console.log(`Player: ${PLAYER_ID}  Week: ${TEST_WEEK}  Season: ${SEASON}`)

  // ── Environment check ──────────────────────────────────────
  if (!SUPABASE_URL || !SUPABASE_URL.startsWith("https://")) {
    console.log("\n[SKIP] NEXT_PUBLIC_SUPABASE_URL not configured.")
    console.log("  Configure Supabase env vars to run this test.")
    process.exit(0)
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

  // ── Pre-test cleanup (remove any leftover sentinel row) ───
  await supabase
    .from("player_dlr_weekly")
    .delete()
    .eq("player_id", PLAYER_ID)
    .eq("snapshot_week", TEST_WEEK)

  // ─────────────────────────────────────────────────────────
  section("TEST 1: First write — expect single row inserted")
  // ─────────────────────────────────────────────────────────

  const { error: err1 } = await supabase
    .from("player_dlr_weekly")
    .upsert(PAYLOAD_A, { onConflict: "player_id,snapshot_week", ignoreDuplicates: false })

  if (err1) {
    fail("First upsert succeeded", err1.message)
  } else {
    pass("First upsert succeeded")
  }

  // Verify exactly 1 row exists
  const { data: rows1, error: cErr1 } = await supabase
    .from("player_dlr_weekly")
    .select("id, dlr_score, snapshot_week")
    .eq("player_id", PLAYER_ID)
    .eq("snapshot_week", TEST_WEEK)

  if (cErr1) {
    fail("Row count query 1 succeeded", cErr1.message)
  } else if (rows1.length !== 1) {
    fail("Row count = 1 after first write", `got ${rows1.length}`)
  } else {
    pass(`Row count = 1 after first write  (dlr_score=${rows1[0].dlr_score})`)
  }

  // ─────────────────────────────────────────────────────────
  section("TEST 2: Duplicate write — same week, updated values")
  // ─────────────────────────────────────────────────────────

  const { error: err2 } = await supabase
    .from("player_dlr_weekly")
    .upsert(PAYLOAD_B, { onConflict: "player_id,snapshot_week", ignoreDuplicates: false })

  if (err2) {
    fail("Second upsert succeeded (no constraint violation)", err2.message)
  } else {
    pass("Second upsert succeeded (no constraint violation)")
  }

  // ─────────────────────────────────────────────────────────
  section("TEST 3: Row count still 1 — no duplicate row created")
  // ─────────────────────────────────────────────────────────

  const { data: rows2, error: cErr2 } = await supabase
    .from("player_dlr_weekly")
    .select("id, dlr_score, weekly_delta, weekly_history")
    .eq("player_id", PLAYER_ID)
    .eq("snapshot_week", TEST_WEEK)

  if (cErr2) {
    fail("Row count query 2 succeeded", cErr2.message)
  } else if (rows2.length !== 1) {
    fail(
      `Row count = 1 after second write — DUPLICATE DETECTED`,
      `got ${rows2.length} rows — UNIQUE constraint may not be active`
    )
  } else {
    pass(`Row count = 1 after second write — no duplicate (UNIQUE constraint working)`)
  }

  // ─────────────────────────────────────────────────────────
  section("TEST 4: Values reflect second write (DO UPDATE semantics)")
  // ─────────────────────────────────────────────────────────

  if (rows2 && rows2.length === 1) {
    const row = rows2[0]

    if (Math.abs(row.dlr_score - PAYLOAD_B.dlr_score) < 0.01) {
      pass(`dlr_score updated correctly: ${row.dlr_score} (expected ${PAYLOAD_B.dlr_score})`)
    } else {
      fail(
        `dlr_score reflects second write`,
        `got ${row.dlr_score}, expected ${PAYLOAD_B.dlr_score}`
      )
    }

    if (Math.abs((row.weekly_delta ?? 0) - PAYLOAD_B.weekly_delta) < 0.01) {
      pass(`weekly_delta updated correctly: ${row.weekly_delta} (expected ${PAYLOAD_B.weekly_delta})`)
    } else {
      fail(
        `weekly_delta reflects second write`,
        `got ${row.weekly_delta}, expected ${PAYLOAD_B.weekly_delta}`
      )
    }

    const histOk =
      Array.isArray(row.weekly_history) &&
      row.weekly_history.length === PAYLOAD_B.weekly_history.length &&
      row.weekly_history.every((v, i) => Math.abs(v - PAYLOAD_B.weekly_history[i]) < 0.01)

    if (histOk) {
      pass(`weekly_history updated correctly: [${row.weekly_history}]`)
    } else {
      fail(
        `weekly_history reflects second write`,
        `got [${row.weekly_history}], expected [${PAYLOAD_B.weekly_history}]`
      )
    }
  }

  // ─────────────────────────────────────────────────────────
  section("CLEANUP: Remove test sentinel row")
  // ─────────────────────────────────────────────────────────

  const { error: delErr } = await supabase
    .from("player_dlr_weekly")
    .delete()
    .eq("player_id", PLAYER_ID)
    .eq("snapshot_week", TEST_WEEK)

  if (delErr) {
    fail("Cleanup delete succeeded", delErr.message)
  } else {
    pass("Sentinel row removed")
  }

  // ─────────────────────────────────────────────────────────
  section("RESULT")
  // ─────────────────────────────────────────────────────────

  console.log(`\n  Passed: ${passed}  Failed: ${failed}`)

  if (failed > 0) {
    console.error("\n  ✗ CONSTRAINT TEST FAILED")
    process.exit(1)
  } else {
    console.log("\n  ✓ ALL CONSTRAINT TESTS PASSED")
    console.log("  UNIQUE(player_id, snapshot_week) behaves correctly.")
    console.log("  ON CONFLICT DO UPDATE prevents duplicate rows.")
    process.exit(0)
  }
}

run().catch(err => {
  console.error("\n[FATAL]", err)
  process.exit(1)
})
