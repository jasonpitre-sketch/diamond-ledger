# PERFORMANCE SNAPSHOT REQUIREMENTS — DIAMOND LEDGER
**Authored: 2026-05-10 | Pass 23**
**Status: FROZEN GOVERNANCE DOCUMENT**

---

## PURPOSE

This document defines the mandatory MVP snapshot fields for all player performance domain files
(`*_performance.ts`). These fields drive the primary panel display in IntelStack's Performance
Snapshot tier and constitute the minimum required data payload for a complete panel read.

---

## AUTHORITATIVE MVP FIELD SETS

### Hitter Snapshot (kind: "hitter")

| Field | Type | IntelStack key | Source requirement |
|-------|------|----------------|--------------------|
| `ab`  | `number \| null` | `snap?.ab`  | Direct source citation required |
| `h`   | `number \| null` | `snap?.h`   | Direct source citation required |
| `hr`  | `number \| null` | `snap?.hr`  | Direct source citation required |
| `rbi` | `number \| null` | `snap?.rbi` | Direct source citation required |
| `bb`  | `number \| null` | `snap?.bb`  | Direct source citation required |
| `k`   | `number \| null` | `snap?.k`   | Direct source citation required |
| `avg` | `number \| null` | `snap?.avg` | Direct source citation required |
| `ops` | `number \| null` | `snap?.ops` | Direct source citation required |

These 8 fields are **frozen MVP requirements**. DO NOT expand this set without a governance pass.

### Pitcher Snapshot (kind: "pitcher")

| Field  | Type | IntelStack key  | Source requirement |
|--------|------|-----------------|--------------------|
| `g`    | `number \| null` | `snap?.g`    | Direct source citation required |
| `ip`   | `number \| null` | `snap?.ip`   | Direct source citation required |
| `h`    | `number \| null` | `snap?.h`    | Direct source citation required (hits allowed) |
| `so`   | `number \| null` | `snap?.so`   | Direct source citation required |
| `era`  | `number \| null` | `snap?.era`  | Direct source citation required |
| `whip` | `number \| null` | `snap?.whip` | Direct source citation required |
| `w`    | `number \| null` | `snap?.w`    | Direct source citation required |
| `l`    | `number \| null` | `snap?.l`    | Direct source citation required |

These 8 fields are **frozen MVP requirements**. DO NOT expand this set without a governance pass.

---

## CASING RULES (PLAYER_CONTRACT.md)

Engine-consumed fields require dual casing:

| Field | Lowercase | Uppercase | Purpose |
|-------|-----------|-----------|---------|
| `avg` / `AVG` | IntelStack display (`snap?.avg`) | DLR engine (`readNumber(snapshot, "AVG")`) | Hitter |
| `era` / `ERA` | IntelStack display (`snap?.era`) | DLR engine (`readNumber(snapshot, "ERA")`) | Pitcher |
| `whip` / `WHIP` | Display | DLR engine (if consumed) | Pitcher |
| `ip` / `IP`   | Display | DLR engine (if consumed) | Pitcher |

All other MVP fields use **lowercase only** — IntelStack reads lowercase exclusively for
display fields (`ab`, `h`, `hr`, `rbi`, `bb`, `k`, `ops`, `g`, `so`, `w`, `l`).

---

## INGESTION RULES

### Rule 1: Direct source citation required for all non-null values

Every non-null MVP field must carry an inline source comment:
```typescript
hr: 23,  // SOURCE: PDF p.4 — "HR: 23"
```

### Rule 2: DO NOT invent, estimate, infer, or synthesize missing stats

If a stat is:
- Not stated in the source → set to `null`
- Only derivable from other stated values (e.g., H from WHIP formula) → set to `null`; document the arithmetic in a comment
- Stated as a percentage but not as a raw count (e.g., BB%: 17% with no PA) → percentage goes to `bbPct`; raw `bb` → `null`

### Rule 3: All MVP fields must be explicitly declared

Every `*_performance.ts` snapshot block must include all 8 MVP fields, even if `null`. This
makes the snapshot self-documenting and prevents false assumptions about completeness.

### Rule 4: Rate fields (BB%, K%) are NOT substitutes for count fields

`bbPct`, `kPct` → display-only rate context. Do NOT substitute for `bb`, `k` counts.
`kRate`, `bbRate` → scout layer Taxonomy A fields. Do NOT substitute for snapshot `k`, `bb`.

### Rule 5: Prep players are expected to have more null fields

High-school and prep players rarely publish full statlines. All null MVP fields for prep players
must carry a comment: `// UNAVAILABLE — [reason] — prep player`.

---

## NULL HANDLING RULES

| Situation | Action |
|-----------|--------|
| Stat not in source PDF | `field: null  // UNAVAILABLE — [reason]` |
| Stat stated as range, not value | `field: null  // UNAVAILABLE — stated as range "[X–Y]"; not exact` |
| Stat derivable via formula | `field: null  // UNAVAILABLE — derivable from [formula] but not directly stated` |
| Prep player (no published statline) | `field: null  // UNAVAILABLE — prep player; no traditional statline` |
| Stat exists for alternate year only | Use correct year in comment; add note in data header |

IntelStack gracefully handles `null` — `typeof snap?.field === "number" ? snap.field : null`
renders as `—` in the panel. Do not use `undefined` or omit fields entirely.

---

## ALIAS REQUIREMENTS

### Hitter AVG — dual key (MANDATORY)

```typescript
avg:   0.353,  // lowercase — IntelStack display: snap?.avg
AVG:   0.353,  // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
```

Both keys must be present and identical whenever AVG is available.

### Pitcher ERA — dual key (MANDATORY)

```typescript
era:   1.50,   // lowercase — IntelStack display: snap?.era
ERA:   1.50,   // uppercase — calculateDLR: readNumber(snapshot, "ERA") ← ENGINE
```

Both keys must be present and identical whenever ERA is available.

---

## 2026 COHORT STATUS (Pass 23.5 — verified ingestion complete)

| Player | Pos | ab | h | hr | rbi | bb | k | avg | ops | Status |
|--------|-----|----|---|----|-----|----|---|-----|-----|--------|
| Roch Cholowsky | SS | **252** | 89 | 23 | 74 | **45** | **30** | 0.353 | 1.190 | **Complete** — all 8 MVP fields (user-confirmed stat line, Pass 23.5) |
| Grady Emerson | SS | **76** | **42** | **7** | **42** | **23** | **2** | **0.553** | **1.706** | **Complete** — all 8 MVP fields (MaxPreps, May 4 2026; source conflict with PDF documented) |
| Vahn Lackey | C | **174** | **64** | **13** | **55** | **40** | **31** | **0.368** | **1.178** | Complete — all 8 MVP fields (D1Baseball, Pass 24) |
| Justin Lebron | SS | null | null | 11 | 30 | null | null | 0.271 | 0.947 | Partial — ab/h/bb/k unavailable (G mismatch between web and PDF) |
| Eric Booth Jr. | OF | null | null | 6 | null | null | null | 0.467 | null | Partial — prep player; ops/ab/h/bb/k/rbi unavailable |
| Jacob Lombard | SS | null | null | null | null | null | null | null | null | Measurables only — no traditional statline in source |
| Drew Burress | OF | null | null | 19 | **62** | **53** | **42** | 0.333 | 1.162 | Partial — ab/h unavailable (multi-step derivation); rbi/bb/k confirmed |
| Sawyer Strosnider | OF | **220** | **77** | 11 | **51** | null | null | 0.350 | 1.070 | Partial — bb/k unavailable; ab/h/rbi confirmed (TCU bio) |

| Player | Pos | g | ip | h | so | era | whip | w | l | Status |
|--------|-----|---|----|---|----|-----|------|---|---|--------|
| Jackson Flora | RHP | null | 24.0 | null | 28 | 1.50 | 1.00 | 4 | 0 | Partial — g/h unavailable; h not directly stated in any source |
| Gio Rojas | LHP | null | null | null | null | null | null | null | null | Prep pitcher — no traditional statline in source |

---

## EXPANSION POLICY

DO NOT add new MVP fields without:
1. Confirming IntelStack reads the new field key (grep `snap?.fieldname`)
2. Updating this document's MVP field tables
3. Auditing all 10 existing 2026 player files for the new field
4. Adding the field (with null if unavailable) to all existing files

DO NOT redefine existing MVP field keys (e.g., rename `so` to `k` for pitchers, or `k` to
`strikeouts` for hitters) without a governance pass and full IntelStack audit.

---

## SYSTEMS OUT OF SCOPE FOR SNAPSHOT

| System | Why excluded |
|--------|-------------|
| `bbPct`, `kPct` | Rate context — display only; not MVP count fields |
| `kRate`, `bbRate` | Scout layer Taxonomy A — separate from snapshot |
| `avgEV`, `barrel`, `hardHit` | Scout layer — Statcast-equivalent; separate from snapshot |
| `xAVG`, `xSLG`, `xERA`, `xFIP` | Analyst layer projections — separate from snapshot |
| `doubles`, `triples`, `sb` | Supplemental counting stats — not MVP fields |
| `baa`, `k9`, `kbb` | Pitcher display context — not MVP fields |

---

## UNIVERSAL ROLLING-WINDOW REQUIREMENT (Pass 32)

As of Pass 32, all players in Diamond Ledger must support rolling performance windows.

### Rolling Window Schema

Rolling data lives on `player.tracker.rolling` — NOT inside `*_performance.ts` files.

```typescript
tracker: {
  // ... existing tracker fields ...
  rolling: {
    days7:  { AB, H, HR, RBI, BB, K, SB, AVG, OPS } | null,  // hitter
    days15: { ... } | null,
    days30: { ... } | null,
    // pitcher variant: { G, IP, W, L, H, SO, ERA, WHIP } | null
  }
}
```

### Null-Safe Stub Requirement

Every player must declare an explicit rolling stub even when live data is unavailable:

```typescript
rolling: { days7: null, days15: null, days30: null },  // live data pending
```

**DO NOT** use bare `rolling: null` — this removes schema discoverability.
**DO NOT** derive rolling windows from season totals or averages.
**DO NOT** fabricate or approximate rolling values.

### Rendering Behavior

IntelStack always renders 7D / 15D / 30D rows for ALL players (Pass 32+).
When data is null, the panel displays `—` via the standard `fmt()` fallback.
Panel structure is stable and consistent regardless of data availability.

### Live-Data Readiness

This architecture is prepared for:
- Daily stat ingestion into `tracker.rolling.days7/15/30`
- Rolling recalculation without schema changes
- DLR volatility response from rolling window signals
- Lifecycle-aware color propagation (already wired — no changes needed)

### No-Fake Policy

Rolling windows must only contain values from a verified live data source.
Season-average approximations, pro-rated estimates, and inferred values are strictly prohibited.

---

## CHANGE LOG

| Date | Pass | Change |
|------|------|--------|
| 2026-05-10 | Pass 23 | Document created; MVP field sets frozen; 10-player 2026 cohort audited; null declarations added to all files |
| 2026-05-10 | Pass 24 | Web stat lookup complete; 5 files updated with official-source data: Roch (h=89 from UCLA), Lackey (all 8 MVP fields from D1Baseball — first fully-complete hitter panel), Burress (g/rbi/bb/k from GT bio), Strosnider (g/ab/h/rbi from TCU bio); governance table updated |
| 2026-05-10 | Pass 23.5 | Verified ingestion: Roch (ab=252/bb=45/k=30 from user-confirmed authoritative stat line; season2026 block created; tracker/careerAverages/hitting updated); Grady (full MaxPreps ingest — ab=76/h=42/hr=7/rbi=42 new; avg/ops/obp/slg updated; source conflict with PDF documented); INGESTION_GOLD_STANDARD.md created; Roch and Grady now both have complete 8-field hitter MVP snapshots |
| 2026-05-11 | Pass 32 | Universal rolling-window foundation: IntelStack now always renders 7D/15D/30D rows for all players with null-safe em-dash fallback. All HS/NCAA player rolling stubs expanded from bare `null` to `{ days7: null, days15: null, days30: null }`. No-fake-rolling policy codified. Live-data readiness confirmed. |

