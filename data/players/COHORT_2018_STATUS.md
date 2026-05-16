# 2018 Draft Cohort — Production Status

**Established:** 2026-05-08  
**Passes completed:** 12–16  
**Status:** PRODUCTION-SAFE | PARTIALLY ENRICHED

---

## Current Status

| Area | Status |
|---|---|
| Migration | ✅ Complete — 31/31 players migrated, 0 failures |
| Enrichment | ✅ Structural scaffolding applied — media and knowledge neutrals injected |
| Production export | ✅ `data/players/cohorts/2018/index.ts` active |
| DLR scoring | ⚠️ Partial — Tier A players score 52–53, Tier C players cluster at 50 |
| Performance domain files | ❌ Missing for 29 players — highest-priority remaining work |
| Media domain files | ❌ Missing for all 31 players (scaffold neutrals injected) |
| Market snapshots | ❌ Live eBay adapter not populated for any 2018 player |

---

## Architecture

### Player Assembly Flow

```
playersDraft2018.ts           (raw source — 31 entries)
  │
  ├── 2 domain-file players   detectPlayerFormat() → "domain"
  │   (alec_bohm, casey_mize) → pass through → enrichPlayer()
  │
  └── 29 minimal inline       detectPlayerFormat() → "minimal_inline"
      players                 → migrateLegacyPlayer()
                              → migrateMinimalInlinePlayer()
                              → createPlayer()
                              → enrichPlayer()
                                    ↓
                         build2018Cohort()          [data/players/build2018Cohort.ts]
                                    ↓
                         cohort2018 export          [data/players/cohorts/2018/index.ts]
                                    ↓
                         calculateDLR(player)       [UI layer — not called by pipeline]
```

### Format Discovery (Pass 14)

The 2018 cohort introduced a third player format not present in the 2025/2026 cohorts:

| Format | Count | Description |
|---|---|---|
| `"domain"` | 2 | Full domain files (knowledge / performance / media / market) |
| `"minimal_inline"` | 29 | Core identity + signals only. No scouting, no DLR block. |
| `"legacy_scouting"` | 0 | 2025/2026 flat scouting+DLR inline format. Not present in 2018. |
| `"unknown"` | 0 | Unrecognized format. Zero after Pass 15 fix. |

---

## Migration Path

### Domain-File Players (alec_bohm, casey_mize)

Already assembled with full domain layers. No migration required.
- `detectPlayerFormat()` → `"domain"`
- Route: `enrichPlayer()` directly
- Enrichment tier: **A**

### Minimal Inline Players (29 players)

Core identity + signals only inline objects. No scouting grades. No DLR block.
- `detectPlayerFormat()` → `"minimal_inline"`
- Route: `migrateLegacyPlayer()` → `migrateMinimalInlinePlayer()` → `createPlayer()`
- `createPlayer()` assembles a structurally valid Tier C baseline player
- Domain layers intentionally left `undefined` (no fabrication)
- `enrichPlayer()` injects neutral scaffolding for media and knowledge
- Enrichment tier: **C**

---

## Enrichment Status

### What was enriched (safe neutral scaffold injected)

| Domain | What was injected | Notes |
|---|---|---|
| `media.snapshot` | All 4 fields at 0.5 | No real media data → neutral baseline |
| `media.scout` | All 5 fields at 0.5 | No real media data → neutral baseline |
| `media.analyst` | All 8 fields at 0.5 | No real media data → neutral baseline |
| `knowledge.bio` | Neutral categorical strings | Text fields only — no tool grades |
| `knowledge.career` | Neutral categorical strings | Text fields only |

### What was NOT enriched (intentionally absent)

| Domain | Why |
|---|---|
| `performance` | Forbidden — injecting ERA/AVG/xERA/xAVG fabricates physical truth |
| `knowledge.scout.scout` | Forbidden — scouting tool grades require actual evaluation |
| `marketSnapshot` | Requires live eBay adapter connection |

---

## DLR Scoring Analysis

Expected DLR scores at current enrichment level:

| Player | Tier | Expected DLR | Notes |
|---|---|---|---|
| casey_mize | A | ~53 | Full domain files present |
| alec_bohm | A | ~52 | Full domain files present |
| All others (29) | C | ~50 | Neutral scaffold only — performance 0 pts |

**Root cause of DLR=50 for Tier C players:**
- Performance layer worth 40/100 DLR points is entirely absent
- Media layer scaffolded to neutral 0.5 → contributes ~9/18 pts
- Market layer absent (no marketSnapshot, cardMarket signals neutral) → ~12/24 pts
- Knowledge scaffolded neutrally → ~9/18 pts
- Total before performance ≈ 30/60 non-performance points → normalized ≈ 50

**This is correct behavior.** The neutral scaffold accurately represents "no signal known" for these players. DLR will differentiate players when real `*_performance.ts` files are created.

---

## Frozen Systems (Untouched)

Pass 16 did not modify any of the following:

| System | File | Frozen since |
|---|---|---|
| DLR composition | `data/dlr/dlrConfig.ts` | Pass 1 |
| DLR scoring entry point | `data/dlr/calculateDLR.ts` | Pass 1 |
| Sample confidence | `data/dlr/confidence.ts` | Pass 9 |
| Movement engine | `data/dlr/calculateDLRMovement.ts` | Pass 1 |
| DLR state | `data/dlr/dlrStateEngine.ts` | Pass 1 |
| Signal and role detection | `data/dlr/signalEngine.ts` | Pass 1 |
| Market wave | `lib/market/wave.ts` | Pass 5 |
| Market scoring | `lib/market/scoring.ts` | Pass 5 |
| Market decision | `lib/market/action.ts` | Pass 5 |
| UI components | `app/vault/`, `components/` | All passes |
| Production cohort sources | `playersDraft2018.ts`, etc. | All passes |
| Sandbox outputs | `data/players/sandbox/` | All passes |

---

## Intentionally Incomplete Systems

These gaps are documented and intentional. They are NOT bugs in the pipeline.

### 1. Performance Domain Files — 29 Players

**Gap:** No `*_performance.ts` files exist for the 29 minimal inline players.  
**Impact:** 40 DLR points unavailable. All 29 players score ~50.  
**Fix:** Create real performance domain files per PLAYER_CONTRACT.md.  
**Priority:** Highest — single largest DLR impact.

Active MLB players needing files first:
- `brady_singer` (KC, RHP)
- `nick_madrigal` (CWS, 2B)
- `matthew_liberatore` (STL, LHP)
- `brice_turang` (MIL, SS)
- `trevor_larnach` (MIN, OF)
- `bo_naylor` (CLE, C)
- `xavier_edwards` (MIA, 2B)
- `jake_mccarthy` (ARI, OF)
- `alek_thomas` (ARI, OF)
- `parker_meadows` (DET, OF)

### 2. Media Domain Files — All 31 Players

**Gap:** No `*_media.ts` files exist. Scaffold neutrals (0.5) are in place.  
**Impact:** 18 DLR media points all score at half-value (~9 pts each).  
**Fix:** Create real media domain files for active, high-profile players.  
**Priority:** Medium — 9-point DLR ceiling improvement per player.

### 3. Knowledge Tool Grades — 29 Players

**Gap:** No real scouting tool grades for minimal inline players.  
**Impact:** `knowledge.scout.scout` empty → knowledge scoring uses bio/career neutrals only.  
**Fix:** Create `*_knowledge.ts` files with real 20–80 scale tool grades.  
  - Hitters: `hit`, `power`, `run`, `arm`, `field`
  - Pitchers: `fastball`, `breaking`, `offspeed`, `command`, `control`  
**Priority:** Medium — required for accurate knowledge-layer scoring.

### 4. Market Snapshots — All 31 Players

**Gap:** `player.marketSnapshot` not populated. Legacy `cardMarket` signals scaffolded to neutral 0.5.  
**Impact:** Market scoring uses `scoreMarket()` legacy path. All 31 players score ~12/24 market points.  
**Fix:** Connect live eBay adapter for 2018 players. See `lib/market/adapter.ts`.  
**Priority:** Lower — market data is the most volatile and adapter connection is a separate system.

### 5. ERA/AVG Capitalization — RESOLVED (Pass 17)

**Fix applied:** Uppercase aliases added alongside preserved lowercase keys.
- `casey_mize_performance.ts`: `ERA: 3.87` added (alongside `era: 3.87`)
- `alec_bohm_performance.ts`: `AVG: 0.285` added (alongside `avg: 0.285`)
- `eli_willits_performance.ts`: `AVG: 0.300` added (alongside `avg: 0.300`)

**Why dual keys:** `IntelStack.tsx` reads `snap?.era` / `snap?.avg` (lowercase) for display.
`calculateDLR.ts` reads `"ERA"` / `"AVG"` (uppercase) for scoring. Both must coexist.

**DLR impact:** Snapshot sub-score (8 pts) now activates for all three players.
Validator casing errors resolved — `hasKey(snap, "era") && !hasKey(snap, "ERA")` is now false.

---

## Remaining Manual Work (Priority Order)

1. **Create `*_performance.ts` files for top active 2018 players** — highest DLR impact
2. ~~**Fix `era` → `ERA` in `casey_mize_performance.ts`**~~ — DONE (Pass 17, dual-key alias)
3. ~~**Fix `avg` → `AVG` in `alec_bohm_performance.ts`**~~ — DONE (Pass 17, dual-key alias)
4. **Create `*_knowledge.ts` files with real tool grades for key players**
5. **Create `*_media.ts` files for active high-profile players**
6. **Connect eBay marketSnapshot adapter for 2018 players**
7. **Migrate 2025/2026 inline cohort players** (E-008 — separate pass, legacy_scouting format)
8. **Hard-delete tombstoned files** (E-009 — after confirming 0 imports)

---

## Files Created by Pass 16

| File | Purpose |
|---|---|
| `data/players/build2018Cohort.ts` | Single authoritative builder for 2018 draft class |
| `data/players/cohorts/2018/index.ts` | Production cohort export (`cohort2018`, `players2018`) |
| `data/players/cohorts/cohortSummary.ts` | Pure utility: `getCohortStats(players)` |
| `data/players/COHORT_2018_STATUS.md` | This document |

---

## Files Modified by Pass 16

None. Pass 16 created new files only.

---

## Production Checklist

- [x] Migration: 31/31 players, 0 failures, 0 unknown formats
- [x] Enrichment: safe neutral scaffold, no fabricated baseball truth
- [x] Validation: all 31 players pass `validatePlayer()` (warnings only, no errors)
- [x] Engine systems: frozen — calculateDLR.ts, dlrConfig.ts, signalEngine.ts unchanged
- [x] Source arrays: `playersDraft2018.ts` unchanged — pipeline is non-destructive
- [x] Sandbox outputs: preserved in `data/players/sandbox/`
- [x] Production export: `cohort2018` available at `data/players/cohorts/2018`
- [ ] Performance files: needed for 29 Tier C players
- [ ] Media files: needed for all 31 players
- [ ] Knowledge tool grades: needed for 29 players
- [ ] Market snapshots: requires live eBay adapter connection
