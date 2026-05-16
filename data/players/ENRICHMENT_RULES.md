# Diamond Ledger — Enrichment Rules

**Established:** 2026-05-08  
**Authority:** `data/players/ENRICHMENT_RULES.md`  
**Enrichment files:** `enrichPlayer.ts`, `enrichMedia.ts`, `enrichMarket.ts`, `enrichPerformance.ts`, `enrichKnowledge.ts`, `enrichCohort.ts`, `getEnrichmentStatus.ts`

This document is the authoritative specification for the enrichment pipeline. Enrichment improves intelligence density and DLR confidence by injecting safe structural scaffolding where domain data is absent — without fabricating baseball truth.

---

## 1. Enrichment Purpose

Enrichment is the practice of adding minimal, honest structural scaffolding to partially populated players so that:

- The DLR engine can compute a meaningful confidence score (not just 0)
- UI components have renderable data at every layer
- Players are positioned to receive real domain data as it becomes available

Enrichment does NOT:
- Replace real domain files (`*_knowledge.ts`, `*_performance.ts`, `*_media.ts`, `*_market.ts`)
- Improve DLR scores through fabrication
- Guarantee data accuracy

---

## 2. Engine Behavior That Defines Safe Enrichment

Understanding how `calculateDLR.ts` reads each layer determines what enrichment is safe.

### Knowledge layer (`scoreKnowledge`)
- Reads **categorical strings** from `knowledge.bio.snapshot` and `knowledge.bio.analyst`
- Reads **text signal arrays** from `knowledge.scout.snapshot`
- Reads **0–1 numeric tool grades** via `readRoleToolGrades(knowledge.scout.scout, role)`
- Reads **0–1 analyst scores** from `knowledge.scout.analystScores`
- Reads **text signal strings** from `knowledge.career.snapshot` and `knowledge.career.scout`
- Reads **0–1 analyst scores** from `knowledge.career.analystScores`
- Missing fields are excluded from the average (not zeroed) via `scoreFromAlreadyNormalized`

**Safe enrichment:** Inject neutral categorical strings ("neutral", "moderate") and 0.5 numeric defaults for analystScores. These tell the engine "no signal — return baseline."

### Performance layer (`scorePerformance`)
- Reads `performance.snapshot.ERA` (pitcher) / `performance.snapshot.AVG` (hitter)
- Reads `performance.scout.kPercent` (pitcher) / `performance.scout.kRate` (hitter)
- Reads `performance.analyst.xERA` (pitcher) / `performance.analyst.xAVG` (hitter)
- Uses `linearNormalize()` with `AnchorConfig` — anchored against physical baselines
- Missing fields yield `populated: 0`, `score: 0.5` (safeAverage of empty array = 0.5 via `arr.length === 0` fallback)

**NO safe enrichment:** All performance fields are physical stats. Injecting any value (including 0.5) would imply a fabricated physical stat. Even a "neutral" ERA of 4.50 is a fabricated number. Leave performance undefined.

### Media layer (`scoreMedia`)
- Reads 17 pre-normalized 0–1 floats across snapshot (4), scout (5), analyst (8)
- Missing fields are excluded from each sub-average — partial population is scored proportionally
- An entirely absent `media` object yields `confidence: 0.5` (explicit fallback in engine)

**Safe enrichment:** Inject 0.5 neutral floats across all 17 fields. This explicitly signals "no media signal, baseline confidence" while enabling the confidence calculation to run rather than fall back. Neutral values truthfully communicate "unknown."

### Market layer (`scoreMarket`)
- Reads `player.marketSnapshot` ONLY — `player.cardMarket` is NOT consumed by `calculateDLR`
- No `marketSnapshot` → returns `{ snapshot: 0.5, scout: 0.5, analyst: 0.5 }` at confidence 0.5
- `marketSnapshot` requires live eBay data from the market adapter

**No safe enrichment for marketSnapshot:** Requires real market data. Injecting fake marketSnapshot fields would corrupt price signals.

**Limited structural enrichment for cardMarket:** Injecting 0.5 neutral floats on absent `cardMarket` fields creates display-layer data for UI components that read `cardMarket` directly. This does NOT affect DLR scoring (engine ignores `cardMarket`).

---

## 3. Safe Enrichment Types

### Allowed

| Enrichment type | Example | Effect |
|---|---|---|
| Neutral categorical strings | `"neutral"`, `"moderate"` | Engine returns 0.5 for that field |
| Neutral 0–1 analyst scores | `0.5` | Engine averages 0.5 for that slot |
| Neutral 0–1 media floats | `0.5` | Engine averages 0.5 for that slot |
| Neutral 0–1 cardMarket floats | `0.5` | Display-only; DLR unaffected |
| Bio categorical scaffolding | `bio.snapshot.archetype: "moderate"` | Engine returns 0.5 |
| Scout snapshot scaffolding | `scout.snapshot.primaryTool: "moderate"` | Scores ~0.5 |

### Forbidden

| Forbidden enrichment | Reason |
|---|---|
| `performance.snapshot.ERA` or `.AVG` | Physical stat — cannot invent |
| `performance.scout.kPercent` or `.kRate` | Real Statcast data |
| `performance.analyst.xERA` or `.xAVG` | Derived physical stat |
| `knowledge.scout.scout.hit/power/run/arm/field` | Real scouting grades |
| `knowledge.scout.scout.fastball/breaking/command` | Real pitcher tools |
| `marketSnapshot.*` | Requires live eBay data |
| Any WAR, fWAR, bWAR | Projection / derived stat |
| Any grade > 0.6 as a "neutral" value | Fabricates above-average signal |
| Overwriting existing non-null data | Must preserve all real data |

---

## 4. Enrichment Tiers

### Tier A — Fully Enriched Domain Player

A player with all four domain layers populated from real domain files:
- `knowledge` — full bio/scout/career with real scouting grades and analyst scores
- `performance` — real snapshot stats, Statcast scout data, xStat analyst layer
- `media` — 17 real signal values from media domain file
- `cardMarket` — populated from `*_market.ts` (possibly via `computeLegacyMarketFromHistory`)

Examples: `casey_mize`, `alec_bohm`, `eli_willits`

Expected DLR score range: 30–100 (engine has all data to work with)

### Tier B — Partially Enriched Migrated Player

A player migrated from the legacy cohort format and enriched with safe scaffolding:
- `knowledge` — partial (hitter scout tools only from scouting migration); bio/career scaffolded neutral
- `performance` — undefined (cannot migrate or enrich)
- `media` — scaffolded neutral (0.5 across all 17 fields)
- `cardMarket` — partial (8 fields from migration); neutral fill for missing structural fields

Expected DLR score range: 12–30 (performance layer absent)

### Tier C — Structural Baseline Player

A player with only core identity, signals, and no domain layers — just assembled by `createPlayer()` or newly created without migration:
- `knowledge` — undefined or minimal
- `performance` — undefined
- `media` — undefined
- `cardMarket` — undefined

Expected DLR score range: 8–15 (engine runs on defaults only)

---

## 5. Enrichment Status Flags

After enrichment, a player carries an `intelligence` field documenting its enrichment state. This field is display-only and NOT consumed by the DLR engine.

```typescript
player.intelligence = {
  enrichmentTier: "A" | "B" | "C",
  enrichedDomains: string[],    // domains with non-trivial data
  missingDomains: string[],     // domains absent or skeleton-only
  completeness: number,         // 0–1 ratio of populated domain layers
  scaffolded: string[],         // domains that were injected with neutral defaults
}
```

The `intelligence` field is attached outside the frozen `Player` type by the enrichment pipeline. It is an extension annotation — safe to add, never read by the engine.

---

## 6. Enrichment Pipeline Flow

```
migrateLegacyPlayer(player)   ← migration pass (Pass 12)
        ↓
enrichPlayer(player)           ← enrichment pass (Pass 13)
  ├── enrichKnowledge(player)  ← bio/career scaffolding + scout completeness
  ├── enrichMedia(player)      ← neutral 0.5 scaffold for absent media
  ├── enrichMarket(player)     ← neutral cardMarket fill (display only)
  └── enrichPerformance(player) ← validates and warns, never enriches
        ↓
getEnrichmentStatus(player)    ← compute tier + completeness
        ↓
Player with enriched layers + intelligence status flag
```

---

## 7. Enrichment Is Additive Only

**The enrichment pipeline NEVER:**
- Overwrites an existing non-null value
- Removes any field
- Alters DLR scoring constants
- Modifies the DLR engine
- Modifies createPlayer() or migrateLegacyPlayer()

All enrichment is purely additive. A real domain file always overrides a scaffolded value.

---

## 8. What Enrichment Does NOT Solve

- Performance layer absence (40 pts max) — requires real `*_performance.ts` domain files
- Pitcher knowledge absence — requires real tool grades from scouts
- Market scoring (uses `marketSnapshot`, not `cardMarket`) — requires live eBay data
- ERA/AVG capitalization bugs in pre-existing domain files — fix in source files per PLAYER_CONTRACT.md

Enrichment is a bridge, not a destination. The goal is real domain files for every player.
