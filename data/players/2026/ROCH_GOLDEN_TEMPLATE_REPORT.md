# ROCH CHOLOWSKY — GOLDEN TEMPLATE REPORT
**Pass 18 | 2026-05-08 | Tier A Domain-File Player**

---

## Overview

Roch Cholowsky is the first full **Tier A** 2026 Draft intelligence player in Diamond Ledger. His five domain files constitute the **golden template** for the remaining 9 top-10 draft class players. All architecture decisions made here are intentional and should be replicated verbatim where applicable.

---

## Files Created

| File | Role | Size |
|---|---|---|
| `data/players/2026/roch_cholowsky_knowledge.ts` | Bio, scout tools, career path | Tier A domain |
| `data/players/2026/roch_cholowsky_performance.ts` | Snapshot stats, Statcast-equivalent, xStats | Tier A domain |
| `data/players/2026/roch_cholowsky_media.ts` | Media attention signals (all 0–1) | Tier A domain |
| `data/players/2026/roch_cholowsky_market.ts` | Card market pricing and signals | Tier A domain |
| `data/players/2026/roch_cholowsky.ts` | Root assembly — imports all four domain files | Root player |

---

## Source Material

**Primary source:** Diamond Ledger 2026 Draft Intelligence PDF, pages 3–5.

| Page | Content Used |
|---|---|
| p.3 | Bio (age, B/T, height/weight, school), draft projection, comparable players (Trea Turner / Corey Seager), character notes, injury history language, plate discipline narrative, position notes |
| p.4 | Full season stats (2025 and 2026 partial), tool grades (20–80 scale), exit velocity range, BB%, K%, ISO, WAR |
| p.5 | Media/marketing section (coverage outlets, narratives, NIL, social), card market/hobby section (price ranges, investment grade, trajectory comps) |

---

## Data Confidence Classification

Every field in all five domain files is tagged with one of four confidence levels. The rules are:

| Tag | Meaning |
|---|---|
| **DIRECTLY SOURCED** | Exact figure or exact phrase from PDF — no interpretation |
| **DERIVED** | Normalized 0–1 float computed from PDF language (qualitative → quantitative) |
| **ESTIMATED** | Numeric approximation where source gives a range or comparable but not the exact value |
| **PROJECTION** | Forward-looking MLB-level adjustment; no official MLB Statcast for college players |

### Field-by-field confidence audit

#### `roch_cholowsky_performance.ts`

| Field | Tag | Source |
|---|---|---|
| `snapshot.g` | DIRECTLY SOURCED | PDF p.4 — "G: 59" |
| `snapshot.avg` / `snapshot.AVG` | DIRECTLY SOURCED | PDF p.4 — ".353" |
| `snapshot.obp` | DIRECTLY SOURCED | PDF p.4 — "OBP: .480" |
| `snapshot.slg` | DIRECTLY SOURCED | PDF p.4 — "SLG: .710" |
| `snapshot.ops` | DIRECTLY SOURCED | PDF p.4 — "OPS: 1.190" |
| `snapshot.hr` | DIRECTLY SOURCED | PDF p.4 — "HR: 23" |
| `snapshot.rbi` | DIRECTLY SOURCED | PDF p.4 — "RBI: 74" |
| `snapshot.sb` | DIRECTLY SOURCED | PDF p.4 — "SB: 7" |
| `snapshot.bbPct` | DIRECTLY SOURCED | PDF p.4 — "BB%: 13.2%" |
| `snapshot.kPct` | DIRECTLY SOURCED | PDF p.4 — "K%: 14.1%" |
| `snapshot.iso` | DIRECTLY SOURCED | PDF p.4 — "ISO: .357" |
| `snapshot.war` | DIRECTLY SOURCED | PDF p.4 — "WAR: 6.49" |
| `scout.kRate` | DIRECTLY SOURCED | Same as kPct — direct transfer |
| `scout.bbRate` | DIRECTLY SOURCED | Same as bbPct — direct transfer |
| `scout.avgEV` | ESTIMATED | Midpoint of "108–112 mph" stated range (PDF p.4) |
| `scout.barrel` | ESTIMATED | Derived from EV profile; not explicitly stated |
| `scout.hardHit` | ESTIMATED | Derived from EV profile; not explicitly stated |
| `analyst.xAVG` | PROJECTION | MLB-level contact adjustment from 65 hit tool + .353 BA; no official Statcast |
| `analyst.xSLG` | PROJECTION | MLB-level power adjustment from 60 power tool + .710 SLG; no official Statcast |
| `analyst.plateDiscTrend` | DERIVED | "BB = K in 2026 — almost unheard-of at this level" (PDF p.3) |
| `analyst.contactTrend` | DERIVED | .353 / .352 two-season consistency |
| `analyst.injuryTrend` | DERIVED | "no significant injury history to date" (PDF p.3) |
| `analyst.sprintTrend` | DERIVED | 55 run grade; "plays faster than raw time suggests" (PDF p.3) |
| `analyst.posValue` | DERIVED | "no credible reason to move him off shortstop" (PDF p.3) |
| `analyst.consistency` | DERIVED | .353 → .352 across two seasons |

#### `roch_cholowsky_knowledge.ts`

| Field | Tag | Source |
|---|---|---|
| `bio.snapshot.*` | DIRECTLY SOURCED | PDF p.3 bio block |
| `scout.scout.hit` | DIRECTLY SOURCED | PDF p.4 — "65 HIT" |
| `scout.scout.power` | DIRECTLY SOURCED | PDF p.4 — "60 POWER" |
| `scout.scout.run` | DIRECTLY SOURCED | PDF p.4 — "55 RUN" |
| `scout.scout.arm` | DIRECTLY SOURCED | PDF p.4 — "60 ARM" |
| `scout.scout.field` | DIRECTLY SOURCED | PDF p.4 — "65 FIELD" |
| `scout.analyst.comparable` | DIRECTLY SOURCED | PDF p.3 — "Trea Turner / Corey Seager" |
| `bio.scout.signBonus` | DIRECTLY SOURCED | PDF p.3 — "~$9.0M slot value" |
| All `scoutScores`, `analystScores` 0–1 floats | DERIVED | Computed from PDF qualitative language per ENRICHMENT_RULES.md |

#### `roch_cholowsky_media.ts`

All 17 fields are **DERIVED** from PDF p.5 media/marketing language. No explicit numeric values in source. Values reflect qualitative strength of language ("substantial national media coverage", "consensus #1", "multiple best SS in a decade narrative pieces", etc.).

#### `roch_cholowsky_market.ts`

> **All values in this file are projected hobby intelligence. No live market exists pre-Bowman release (May 13, 2026). No sold comps, PSA populations, eBay histories, or Card Ladder data were used.**

| Field | Tag | Source |
|---|---|---|
| `rawAvg` | PROJECTED | Conservative midpoint of projected "$150–$400 opening range" (PDF p.5) |
| `psa10Avg` | PROJECTED | Conservative floor of projected "$500+ if he goes #1" (PDF p.5) |
| `psa9Avg` | PROJECTED/ESTIMATED | Derived from raw range + grade tier premium convention; not stated in source |
| `trend` | PROJECTED/DERIVED | "Bobby Witt Jr. 2019 trajectory" comp language (PDF p.5) |
| `volatility` | PROJECTED/DERIVED | HIGH — "pick position dependent, pre-draft hype" explicitly flagged in PDF |
| `longTerm` | DERIVED | "Long-term investment grade: AAA" — directly stated (PDF p.5) |
| `liquidity`, `scarcity`, `depth` | PROJECTED | Anticipated collector demand based on draft position + PDF language |
| `stability` | PROJECTED | Low — pre-draft, pre-signing uncertainty explicitly flagged in PDF |
| `confidence` | PROJECTED | Hobby intelligence confidence; not transactional confirmation |

---

## Template Architecture Rules

The following patterns are **mandatory** for all 2026 top-10 players built from this template.

### Rule 1: Dual-key casing in `performance.snapshot`

```typescript
// Both keys MUST be present. Do not remove either.
avg:   0.353,   // lowercase — IntelStack display: snap?.avg
AVG:   0.353,   // uppercase — calculateDLR engine: readNumber(snapshot, "AVG")
```

For pitchers: `era` + `ERA` both present. For hitters: `avg` + `AVG` both present. Values are identical. This is the resolved pattern from PLAYER_CONTRACT.md Known Issues.

### Rule 2: Pre-draft tracker — no AB

```typescript
tracker: {
  // AB intentionally absent — pre-draft player has no professional sample.
  // sampleConfidence() defaults to 0.6 minimum baseline. Correct behavior.
  G:   42,
  AVG: 0.352,
  // ... college display stats only
  mlbAB:                0,
  minorAB:              0,
  everReachedMLBSample: false
}
```

Setting `AB` would feed `sampleConfidence()` with college numbers (wrong scale). Leave it absent for all pre-draft players.

### Rule 3: `team: "TBD"` until signed

```typescript
team: "TBD",   // Final org not confirmed until draft (July 2026)
```

Do not set a team from mock draft projections. Update to actual org post-signing.

### Rule 4: `cardMarket` is projected hobby intelligence — not live transactional data

2026 draft players do not yet have established Bowman 1st auto markets. The `cardMarket` domain contains **projected market intelligence** only. It must never include:

- Fabricated sold listings
- PSA population data
- eBay histories or Card Ladder comps
- `marketSnapshot` objects (reserved for live eBay adapter data post-release)

All `cardMarket` values must be derived from:
- Draft position and report language
- Hobby expectation conventions for the pick slot
- Comparable prospect hype tier language cited in the source PDF

Inline comments must tag every projected value as `PROJECTED` or `PROJECTED/ESTIMATED`. The word "SOURCE" in an inline comment on a market field means the value traces to PDF report language — not to a live transaction.

The `scoreMarket()` function in `calculateDLR.ts` reads only `player.marketSnapshot`. When `marketSnapshot` is absent, it returns neutral `{ snapshot: 0.5, scout: 0.5, analyst: 0.5 }` — a fixed 12/24 DLR contribution regardless of `cardMarket` values. All `cardMarket` fields are display-layer only, consumed by IntelStack market panels. Market DLR activation requires a live eBay `marketSnapshot` wired post-Bowman release.

### Rule 5: `tier` and `level` for draft players

```typescript
tier:  "Draft",
level: "Draft",
```

Do not assign a standard level (Rookie, A, AA, etc.) to pre-draft players.

### Rule 6: `kind: "hitter"` or `kind: "pitcher"` required

The first field in every `_performance.ts` file must declare role:

```typescript
export const roch_cholowsky_performance = {
  kind: "hitter",   // REQUIRED — hitter role declaration (PLAYER_CONTRACT.md)
  ...
}
```

The DLR engine branches on this field to determine whether to read `AVG` or `ERA`.

### Rule 7: Field tagging discipline

Every non-trivial field in every domain file must carry an inline comment stating:
- The confidence tag (DIRECTLY SOURCED / DERIVED / ESTIMATED / PROJECTION)
- The specific PDF reference if directly sourced

This is the single most important quality gate for the template system.

---

## Validation Results

### Lint
```
25 warnings, 0 errors
```
Baseline unchanged. No new errors introduced.

### Typecheck
```
23 pre-existing errors, 0 new errors
```
All 23 errors existed before Pass 18. Zero new type errors from any Roch Cholowsky file.

---

## DLR Inspection Output

Computed via sandbox `inspectRoch.mjs` using frozen `calculateDLR.ts` engine.

```
DLR RATING: 67
DLR TIER:   RISING STAR
CONFIDENCE: 0.653

Performance: 30.32 / 40
  snapshot  AVG=0.353 → normalized=0.9562 → 7.65 / 8
  scout     kRate=14.1 → normalized=0.7227 → 8.67 / 12
  analyst   xAVG=0.300 → normalized=0.7000 → 14.00 / 20

Media: 15.65 / 18
  snapshot  avg(mentions,headlineImpact,highlightFactor,socialBuzz) = 0.8375 → 3.35 / 4
  scout     avg(fanRecognition,teamVisibility,interviewPresence,narrativeStrength,milestoneAttention) = 0.8480 → 5.09 / 6
  analyst   avg of all analyst fields = 0.9012 → 7.21 / 8

Market: 12.00 / 24
  Neutral — no marketSnapshot present.
  All 0.5 × weights: 0.5×5 + 0.5×7 + 0.5×12 = 12.00

Knowledge: 9.18 / 18
  bio:    3.118
  scout:  3.402
  career: 2.661
```

**DLR ceiling without market activation:** ~79 (if all market signals scored at face value)
**DLR ceiling with live marketSnapshot:** 85–88 range (estimated, based on market signal quality)

---

## DLR Layer Analysis

### Performance (30.32/40) — Strong
Roch's 2025 season stats are elite by any measure. The AVG=0.353 normalizes to 0.956 against the MLB anchor range (0.200–0.360), near the theoretical maximum. The projected xAVG=0.300 for MLB-level performance is conservative but defensible — Trea Turner's career xAVG (.290–.310) provides the comp anchor. The kRate=14.1 normalizes comfortably. This layer will hold post-debut if the MLB transition is clean.

### Media (15.65/18) — Very Strong
The media layer is Roch's highest-performing layer by percentage (86.9%). The "consensus #1 overall" + "best SS in a decade" narrative stack produces near-maximum scores in narrativeStrength (0.92), milestoneAttention (0.90), breakoutProbability (0.92), and storyDurability (0.90). These values will decay moderately post-draft unless MLB debut produces comparable milestone density.

### Market (12.00/24) — Suppressed by architecture
The frozen engine ceiling. This is not a reflection of Roch's actual card market position — the PDF explicitly designates him as the marquee name in 2026 Bowman with AAA investment grade. Market DLR will activate when a live eBay `marketSnapshot` is wired to his player object. Expected activated market score: ~20–22/24 based on longTerm:0.90, trend:0.88, liquidity:0.85.

### Knowledge (9.18/18) — Solid baseline
The knowledge layer reflects the three-page scoring architecture (bio/scout/career). The 9.18 baseline is correct for a player with confirmed tool grades and full analyst scores but no professional service time. The bio and scout snapshot text layers contribute minimally by design — the engine scores text signals conservatively. Knowledge will increase modestly as Roch accumulates service time and organizational context.

---

## Unresolved Manual Review Items

The following items are flagged for future passes once real data becomes available:

| ID | Field | Issue | Trigger |
|---|---|---|---|
| MR-001 | `scout.barrel`, `scout.hardHit` | ESTIMATED from EV range — not official Statcast | Post-MLB debut |
| MR-002 | `analyst.xAVG`, `analyst.xSLG` | PROJECTION — no official MLB Statcast for college | Post-MLB debut |
| MR-003 | `tracker.*` | 2026 college season stats through mid-May; will need final-season update | End of 2026 NCAA season |
| MR-004 | `team` | "TBD" — White Sox projected, not confirmed | July 2026 draft |
| MR-005 | `cardMarket.*` prices | Pre-release estimates; 2026 Bowman releases May 13, 2026 | Post-release market data |
| MR-006 | `marketSnapshot` | Not wired — market DLR is neutral 12/24 | When eBay adapter connected |
| MR-007 | `knowledge.bio.analyst.serviceTime` | 0 — will increase after debut | Post-signing |

---

## How This Template Guides the Next 9 Players

The remaining 2026 top-10 draft class players should be built following this exact structure:

**Step 1 — File scaffold.** Create five files: `{id}_knowledge.ts`, `{id}_performance.ts`, `{id}_media.ts`, `{id}_market.ts`, `{id}.ts`. All in `data/players/2026/`.

**Step 2 — Knowledge first.** Source tool grades directly from the PDF tool table. Do not derive or estimate tool grades — only accept grades explicitly printed in the source. If a grade is not in the PDF, set it to a mid-tier default and tag it ESTIMATED with a manual review note.

**Step 3 — Performance dual-key from the start.** Never create a performance file with lowercase-only `avg` or `era`. Apply the dual-key pattern at file creation time.

**Step 4 — Tracker discipline.** Pre-draft players: no `AB`, no `PA`. College season stats in display fields only. `mlbAB: 0`, `minorAB: 0`, `everReachedMLBSample: false` on every pre-draft player.

**Step 5 — Market: projected intelligence only.** 2026 draft players have no established Bowman 1st auto market. Use only projected values derived from draft position, PDF report language, and comparable hype tier conventions. Never fabricate sold comps, PSA populations, eBay histories, Card Ladder data, or `marketSnapshot` objects. Tag every market field `PROJECTED` or `PROJECTED/ESTIMATED`. Use the conservative end of any stated price range. cardMarket is display-only; do not treat any cardMarket values as DLR contributors.

**Step 6 — Team TBD until signed.** All 10 players should have `team: "TBD"` until the draft (July 2026).

**Step 7 — Validate each player individually.** Run lint and typecheck after each player's files are complete. Do not batch-create all 9 and validate at the end.

**Step 8 — Tag every field.** Every numeric float must carry a comment identifying its confidence classification (DIRECTLY SOURCED, DERIVED, ESTIMATED, PROJECTION) and the specific PDF page if directly sourced.

---

## Pass 18 Completion Status

| Phase | Status |
|---|---|
| 1 — Inventory | ✅ Complete |
| 2 — Knowledge domain | ✅ Complete |
| 3 — Performance domain | ✅ Complete |
| 4 — Media domain | ✅ Complete |
| 5 — Market domain | ✅ Complete |
| 6 — Root player file | ✅ Complete |
| 7 — Lint validation | ✅ 25 warnings, 0 errors |
| 8 — DLR inspection | ✅ Rating: 67, Tier: RISING STAR |
| 9 — Golden template report | ✅ This document |

**Pass 18: COMPLETE.**

---

*Generated: 2026-05-08 | Pass 18 | Diamond Ledger surgical stabilization audit*
