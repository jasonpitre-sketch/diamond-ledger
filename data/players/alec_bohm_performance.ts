/**
 * Pass 78 — 2026 MLB Season Replay (2026-05-15)
 * Source: MLB Stats API (sport 1, player 664761)
 * 40 games replayed game-by-game through P60 hitter cascade
 * Weekly DLR snapshots W13-W20 written to Supabase tagged engine_version "P60"
 * April monthly settlement included
 * Tracker rolling windows seeded from real per-game computation
 *
 * Narrative arc: career-worst April slump (.150 stretch) →
 * emerging recovery (7D .444 / OPS 1.307 through May 14)
 *
 * First full MLB hitter replay in production.
 */

/**
 * Pass 65 — Performance data refreshed 2026-05-14
 * Source: Official MLB career stats + splits views (as of 2026-05-13)
 *
 * 2025 anchor: .287 / 29 BB / 82 SO over 464 AB (120 GP — complete 2025 season)
 * 2026 in-season: .186 / 11 BB / 23 SO through 39 games — toughest start of his career
 * Recent rolling: 7G .304 (recovery beginning), 15G .241, 30G .189
 *
 * NOTE: Honest organism state — Bohm is genuinely struggling.
 * DLR will read low until 30D rolling absorbs more recent recovery.
 * Do not "fix" the low DLR by inflating data. The system is correctly
 * reflecting reality.
 *
 * Prior version (pre-Pass 65): snapshot held 152 GP / 580 AB / .285 AVG — likely
 * reflected 2024 season data mislabeled as 2025. Corrected here.
 *
 * CASING RULES (PLAYER_CONTRACT.md):
 *   avg / AVG  — both present.
 *   avg  → lowercase: consumed by IntelStack UI display (snap?.avg)
 *   AVG  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "AVG")
 *
 * DATA CONFIDENCE:
 *   DIRECTLY SOURCED (2025 anchor): GP, AB, R, H, RBI, BB, SO, AVG — MLB official stats page.
 *   DIRECTLY SOURCED (2026 in-season): GP, AB, R, H, RBI, BB, SO, AVG — MLB official stats page.
 *   DIRECTLY SOURCED (career): GP, AB, R, H, RBI, BB, SO, AVG — MLB official stats page.
 *   ESTIMATED: OBP, SLG, OPS (not provided in source — derived/approximated for display).
 *   CARRY-FORWARD: HR, doubles, triples, sb — not updated with new source in Pass 65 scope.
 *   STATIC (scout): Statcast metrics unchanged — no new source. Manual review post-season.
 */
export const alec_bohm_performance = {
  kind: "hitter",

  // Pass 65 — MLB competition level added.
  // Previously absent → engine defaulted to neutral maturity=0.88.
  // Correctly set: maturityConfidence("MLB") = 1.0.
  competitionLevel: "MLB",

  /* =========================
     SNAPSHOT (2025 season anchor)
     Engine reads: AVG only. All other fields display context.
     Pass 65: corrected from stale 152 GP/580 AB data to verified
     2025 full season (120 GP, 464 AB, .287 AVG).
  ========================= */
  snapshot: {
    year: "2025",  // 2025 full season — primary scoring anchor
    team: "PHI",

    g:   120,   // SOURCE: MLB career stats — "GP: 120" (Pass 65)
    ab:  464,   // SOURCE: MLB career stats — "AB: 464" (Pass 65)
    r:   53,    // SOURCE: MLB career stats — "R: 53"
    h:   133,   // SOURCE: MLB career stats — "H: 133"
                // Cross-check: 133/464 = .2866 ≈ .287 ✓
    rbi: 59,    // SOURCE: MLB career stats — "RBI: 59"
    bb:  29,    // SOURCE: MLB career stats — "BB: 29"
    k:   82,    // SOURCE: MLB career stats — "SO: 82"

    // DUAL KEY — PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg: 0.287,  // lowercase — IntelStack display: snap?.avg
    AVG: 0.287,  // uppercase — calculateDLR engine readNumber(snapshot, "AVG") ← ENGINE

    // DISPLAY-ONLY estimated/carry-forward — engine reads AVG only:
    obp: 0.328,  // ESTIMATED: (H+BB+HBP) / PA ≈ (133+29+5)/510 ≈ .328
    slg: 0.410,  // ESTIMATED: consistent with contact-power profile; not from source
    ops: 0.738,  // ESTIMATED: obp + slg ≈ .328 + .410

    hr:      11,   // CARRY-FORWARD — HR not provided in Pass 65 source
    doubles: 28,   // CARRY-FORWARD — 2B not provided in Pass 65 source
    triples:  2,   // CARRY-FORWARD — 3B not provided in Pass 65 source
    sb:       2,   // CARRY-FORWARD — SB not provided in Pass 65 source
    sbAttempts: 3  // CARRY-FORWARD
  },

  /* =========================
     SEASON 2025 — named anchor block
     Mirrors snapshot above; preserved for lifecycle display (IntelStack ANCHOR row).
  ========================= */
  season2025: {
    year: "2025",
    team: "PHI",
    // SOURCE: Official MLB career stats page — Pass 65 (2026-05-14)
    g:   120,
    ab:  464,
    r:   53,
    h:   133,
    rbi: 59,
    bb:  29,
    k:   82,

    avg: 0.287,
    AVG: 0.287,   // engine alias — display-only here (engine reads snapshot block)
    obp: 0.328,   // ESTIMATED — not in source; see snapshot comment
    slg: 0.410,   // ESTIMATED
    ops: 0.738,   // ESTIMATED

    hr: 11        // CARRY-FORWARD
  },

  /* =========================
     SEASON 2026 — in-season totals (through 5/14/2026)
     Not used as primary snapshot. Engine reads snapshot block above.
     Tracker in alec_bohm.ts reflects this line.
  ========================= */
  season2026: {
    year: "2026",
    team: "PHI",
    // SOURCE: MLB Stats API gameLog — Pass 78 (2026-05-15)
    g:    40,
    ab:   144,
    r:    11,
    h:    28,
    rbi:  20,
    bb:   11,
    k:    24,
    sb:   0,

    avg: 0.194,   // lowercase — display alias. 28/144 = .194
    AVG: 0.194,   // uppercase — engine alias (engine reads snapshot, not season2026)
    obp: 0.256,
    slg: 0.285,
    ops: 0.541,

    hr: 3
  },

  /* =========================
     CAREER LINE — cumulative through 5/13/2026
     SOURCE: Official MLB career stats page — Pass 65 (2026-05-14)
     Covers 2020 MLB debut through 2026-05-13 (current season partial).
     Display-only — NEVER used in DLR scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerLine: {
    g:    758,    // SOURCE: MLB career stats — "GP: 758"
    ab:   2862,   // SOURCE: MLB career stats — "AB: 2862"
    r:    348,    // SOURCE: MLB career stats — "R: 348"
    h:    779,    // SOURCE: MLB career stats — "H: 779"
    rbi:  415,    // SOURCE: MLB career stats — "RBI: 415"
    bb:   198,    // SOURCE: MLB career stats — "BB: 198"
    k:    562,    // SOURCE: MLB career stats — "SO: 562"
    avg:  0.272,  // DIRECTLY SOURCED — 779/2862 = .2722 ✓

    // Not provided in source — derived or carry-forward:
    hr:   84,     // DERIVED: prior careerAverages.HR(71) + 2025 est(11) + 2026 est(3) ≈ 84
    obp:  0.330,  // CARRY-FORWARD approximate
    slg:  0.415,  // CARRY-FORWARD approximate
    ops:  0.745   // CARRY-FORWARD approximate
  },

  /* =========================
     SCOUT (Statcast — prior-year static layer)
     2025 season Statcast baseline. Engine reads these statically.
     Not updated in Pass 65 — no new Statcast source available.
     Mark for refresh with full 2025 season Statcast data.
  ========================= */
  scout: {
    kRate:   18.0,  // 2025 K% — static; engine reads scout layer without rolling blend
    bbRate:   7.0,  // 2025 BB%
    barrel:   8.0,  // 2025 Barrel% — ESTIMATED (not updated in Pass 65)
    hardHit: 42.0,  // 2025 HardHit% — ESTIMATED (not updated in Pass 65)
    avgEV:   89.0   // 2025 Avg EV — ESTIMATED (not updated in Pass 65)
  },

  /* =========================
     ANALYST (trend signals)
     Updated Pass 65 to reflect honest 2026 organism state.
     All values derived from 2026 rate stats vs career profile.
  ========================= */
  analyst: {
    xAVG: 0.275,  // unchanged — MLB Statcast projection (prior version); display-only
    xSLG: 0.430,  // unchanged — carry-forward; display-only

    // UPDATED Pass 65:
    plateDiscTrend: 0.58,   // 2026: BB/PA = 11/154 = .071 vs career .069 — roughly flat
                            // Slight uptick vs prior year; not a concern signal yet

    contactTrend:   0.68,   // 2026: K% = 23/140 = 16.4% — IMPROVED from career 19.6%
                            // Positive: making more contact in 2026 despite low AVG
                            // Unlucky BABIP (expected) not a contact regression signal

    injuryTrend:    0.72,   // No documented injuries causing 2026 slump; organism healthy
                            // Cold stretch is performance, not health. Held stable.

    sprintTrend:    0.45,   // Unchanged — limited/adequate speed profile, age 27

    posValue:       0.60,   // Unchanged — 3B positional value (adequate)

    consistency:    0.48    // REVISED DOWN from 0.68: .186 AVG through 39 games is
                            // historically bad for Bohm. Cold start suppresses this signal.
                            // 7G recovery (.304) too early to lift. Will recover as AVG climbs.
  }
}
