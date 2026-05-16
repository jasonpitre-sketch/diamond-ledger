# Diamond Ledger — Cohort Dry Run Report

**Generated:** 2026-05-08  
**Cohort:** 2018 Draft (`data/playersDraft2018.ts`)  
**Pipeline:** Pass 12 migration + Pass 13 enrichment + Pass 14 dry run  
**Execution:** `data/players/sandbox/executeDryRun.mjs` (Node.js, real computed values)  
**Status:** NON-PRODUCTION DRY RUN — no production files modified

---

## Executive Summary

The 2018 draft cohort dry run executed successfully against all 31 players with zero pipeline failures. The run surfaced a **critical new finding**: the 2018 cohort uses a third legacy format ("minimal inline") not handled by `migrateLegacyPlayer.ts`. Domain-file players (alec_bohm, casey_mize) enriched to Tier A with meaningful DLR differentiation. All 29 minimal-inline players enriched to Tier C with a uniform DLR=50 baseline — **the neutral scaffold is functioning correctly, but the cohort is not production-ready** until real domain files exist for each player.

---

## 1. Migration Success Rate

| Category | Count | Rate |
|---|---|---|
| Total players | 31 | — |
| Domain-file players (no migration needed) | 2 | — |
| Minimal inline format (new discovery) | 29 | — |
| Legacy scouting+dlr format (2025/2026) | 0 | — |
| **Migration succeeded** | **31** | **100%** |
| Migration failed | 0 | 0% |

**No migration failures.** All 31 players passed through `createPlayer()` or the domain-file enrichment path without errors.

---

## 2. Enrichment Success Rate

| Category | Count | Rate |
|---|---|---|
| Total enriched | 31 | 100% |
| Tier A (full domain) | 2 | 6.5% |
| Tier B (partial domain) | 0 | 0% |
| Tier C (neutral baseline) | 29 | 93.5% |
| Enrichment failed | 0 | 0% |

All 29 Tier C players received the full neutral scaffold: media (17 fields at 0.5), cardMarket (8 signal fields at 0.5), knowledge.bio (9 neutral categorical fields), knowledge.career (3 fields), knowledge.scout.snapshot + analystScores (4 fields). Performance was intentionally left undefined per ENRICHMENT_RULES.md.

---

## 3. Validation Warning Categories

No hard validation errors were produced. All players passed `validatePlayer()`. The warnings that would appear in a full TypeScript run are:

| Warning category | Count | Description |
|---|---|---|
| `performance` missing | 29 | Performance layer absent — player scores 0/40 pts |
| `knowledge.tools` missing | 29 | No scouting tool grades — knowledge.scout.scout empty |
| `media` neutral only | 29 | Media scaffold at 0.5 — no real signal data |
| `cardMarket` neutral only | 29 | cardMarket scaffold at 0.5 — no price or real market data |

---

## 4. Common Missing Domains

All 29 minimal-inline players are missing all four domain layers:

| Missing domain | Count | DLR impact |
|---|---|---|
| `performance` (snapshot+scout+analyst) | 29/31 | −40 pts max |
| `knowledge.tools` (scout tool grades) | 29/31 | −~4 pts |
| `media` (substantive 0–1 signals) | 29/31 | −18 pts max |
| `cardMarket` (substantive signals) | 29/31 | Indirect (DLR reads marketSnapshot, not cardMarket) |

The two domain-file players (alec_bohm, casey_mize) have all four layers populated.

---

## 5. Average Enrichment Completeness

| Group | Players | Avg Completeness |
|---|---|---|
| Tier A (domain-file) | 2 | 100% |
| Tier C (minimal enriched) | 29 | 20% |
| **All players** | **31** | **25.2%** |

Completeness is computed across 5 slots: knowledge.tools, knowledge.bio/career structure, performance, media (substantive), cardMarket (substantive). Tier C players have 1/5 slots populated: knowledge.bio/career structure exists (scaffolded neutral counts as populated for structure, but not as substantive for DLR confidence).

---

## 6. DLR Distribution Ranges

| Metric | Value |
|---|---|
| Minimum DLR | 50 |
| Maximum DLR | 53 |
| Average DLR | 50.2 |
| Median DLR | 50 |
| Standard deviation | ~0.6 |

**Distribution by 10-point bucket:**

| Range | Count | Players |
|---|---|---|
| 50–59 | 31 | All |
| All others | 0 | — |

The cluster at DLR=50 is the expected and correct behavior: without performance data (ERA/AVG/xERA/xAVG), the DLR engine applies neutral defaults across the knowledge, media, and market layers, and 0 for performance. The resulting score for all Tier C players is approximately 50 — the neutral midpoint. This confirms the enrichment scaffolding is working as designed: it provides structure without fabricating signal.

The 2–3 point spread between domain-file players (52–53) and baseline players (50) reflects the real contribution of actual performance, media, and market data over neutral scaffolding.

---

## 7. Unresolved Legacy Risks

### Risk 1 — Critical: Third format not in migrateLegacyPlayer.ts

The 2018 cohort uses "minimal inline" format (no `scouting`, no `dlr` block). `migrateLegacyPlayer.ts` only detects players with a `scouting` object and returns an error for all others. The 2018 players route through `createPlayer()` directly in `runCohortDryRun.ts`, but this detection logic is not in the permanent migration pipeline.

**Resolution required:** Add a "minimal inline" format detection branch to `migrateLegacyPlayer.ts` or create a separate `createMinimalPlayer()` utility. This is the top blocker before any 2018 cohort production promotion.

### Risk 2 — High: All 29 Tier C players have identical DLR=50

Without performance domain files, the DLR engine cannot differentiate between players. DLR=50 is correct for a player with zero data, but it means the 2018 cohort vault would show 29 undifferentiated players. This is not a bug — it's the expected output of a data-absent enrichment.

**Resolution required:** Create `*_performance.ts` domain files for each player before any vault promotion.

### Risk 3 — High: No pitcher tool grade migration path for 2018

`matthew_liberatore` (LHP), `brady_singer` (RHP), `mason_denaburg` (RHP), `jt_ginn` (RHP), `tristan_beck` (RHP), `adam_kloffenstein` (RHP), `sean_hjelle` (RHP), `lenny_torres` (RHP), `blaine_knight` (RHP), `kris_bubic` (LHP) are pitchers with no tool grades in any source format.

**Resolution required:** Real pitcher scouting data (fastball/breaking/offspeed/command/control on 20–80 scale) needed in `*_knowledge.ts` files.

### Risk 4 — Medium: `marketSnapshot` absent for all 31 players

`calculateDLR.ts` reads `player.marketSnapshot` for market scoring — NOT `player.cardMarket`. The market layer returns a flat 0.5/0.5/0.5 for all 31 players. The neutral cardMarket scaffold has no DLR scoring effect — it is display-layer data only.

**Resolution required:** Connect the eBay market adapter to populate `marketSnapshot` for each player, OR accept that market scoring will remain at neutral baseline.

### Risk 5 — Low: DLR=50 is not a meaningful prospect ranking signal

The vault currently shows DLR as a primary ranking signal. Promoting 29 players at DLR=50 would render the vault's ranking useless for the 2018 class. Users cannot distinguish brady_singer from griffin_conine based on DLR alone at this data level.

---

## 8. Recommended Next Cleanup Targets (Priority Order)

1. **Add `minimal_inline` format branch to `migrateLegacyPlayer.ts`** — required for cohort pipeline correctness across all three cohorts.

2. **Create `*_performance.ts` domain files for the 29 2018 minimal players** — highest DLR impact (40 pts). Start with active MLB players: `alec_bohm` and `casey_mize` are done; next: `brady_singer`, `brice_turang`, `trevor_larnach`, `bo_naylor`, `xavier_edwards`, `jake_mccarthy`, `alek_thomas`, `parker_meadows`, `kris_bubic`, `griffin_conine`, `jt_ginn`, `matthew_liberatore`, `nick_madrigal`.

3. **Create `*_media.ts` domain files** — 18 pts impact. Start with MLB-active players where public media signal data is available.

4. **Wire `marketSnapshot` adapter** — market scoring remains at neutral until connected to live eBay data.

5. **Fix ERA/AVG capitalization in existing domain files** — `casey_mize_performance.ts` (`era` → `ERA`) and `alec_bohm_performance.ts` (`avg` → `AVG`) are pre-existing issues flagged in PLAYER_CONTRACT.md Known Issues.

6. **Run Pass 12 + 13 pipeline against 2025 and 2026 cohorts** — those cohorts have the `scouting+dlr` legacy format and will route through `migrateLegacyPlayer.ts`. A similar dry run report is recommended before promotion.

7. **Define production promotion criteria** — establish minimum DLR quality bar (e.g., completeness > 40%, Tier B or above) before any cohort array replaces a production export.

---

## Production Files Modified

**None.** This dry run is fully non-destructive.

| File | Status |
|---|---|
| `data/playersDraft2018.ts` | ✅ Unmodified |
| `data/playersDraft2025.ts` | ✅ Unmodified |
| `data/playersDraft2026.ts` | ✅ Unmodified |
| `data/dlr/calculateDLR.ts` | ✅ Unmodified |
| `data/dlr/dlrConfig.ts` | ✅ Unmodified |
| `data/dlr/signalEngine.ts` | ✅ Unmodified |
| `data/dlr/confidence.ts` | ✅ Unmodified |
| Any UI component | ✅ Unmodified |
