# Diamond Ledger — Migration Rules

**Established:** 2026-05-08  
**Authority:** `data/players/MIGRATION_RULES.md`  
**Migrator files:** `migrateLegacyPlayer.ts`, `migrateCohort.ts`

This document is the authoritative specification for converting legacy cohort players (inline flat objects in `playersDraft2025.ts` and `playersDraft2026.ts`) to the canonical Diamond Ledger player contract.

---

## Legacy Format Identification

A player object is a **legacy cohort player** if it:

1. Has a `scouting` object at root (not `knowledge`)
2. Has `dlr.performance.trend` (flat signal float, not sub-layer object)
3. Has `bio` as a plain string at root (not `knowledge.bio`)
4. Is missing `knowledge`, `performance` (domain layer), and `media` (domain layer) fields

Detection function in `migrateLegacyPlayer.ts` checks:
```typescript
typeof player.scouting === "object" &&
typeof player.dlr?.performance?.trend === "number"
```

---

## Legacy → Domain Mapping

### 1. Core Identity (direct passthrough)

| Legacy field | Contract field | Notes |
|---|---|---|
| `id` | `core.id` | Required — error if missing |
| `name` | `core.name` | Required — error if missing |
| `team` | `core.team` | Warning if missing |
| `position` | `core.position` | Required — error if missing |
| `tier` | `core.tier` | Normalize `""` → `undefined` (see § Normalization Rules) |
| `level` | `core.level` | Normalize `""` → `undefined` |
| `age` | `core.age` | Passthrough |
| `card` | `core.card` | Passthrough |
| `draftYear` | `core.draftYear` | Passthrough |
| `draftPick` | `core.draftPick` | Passthrough |
| `draftRound` | `core.draftRound` | Passthrough |
| `hitting` | `core.hitting` | Passthrough (legacy display block) |
| `pitching` | `core.pitching` | Passthrough (legacy display block) |

**2026-only flat fields** (no contract slot — attach to `knowledge.bio.snapshot` where possible or discard):

| Legacy field | Disposition |
|---|---|
| `height`, `weight` | → `knowledge.bio.snapshot.height` / `.weight` if providing knowledge, otherwise discard |
| `batThrow` | → `core.bats` / `core.throws` via split (see § Normalization Rules) |
| `birthdate` | → `knowledge.bio.snapshot.birthdate` if providing knowledge, otherwise discard |
| `role`, `status`, `trend` | No contract slot — discard |
| `archetype`, `frameScale`, `devPath` | No contract slot — discard |
| `primaryTool`, `secondaryTool` | No contract slot — discard |
| `pedigree`, `devCurve`, `orgValue` | No contract slot — discard |
| `projection`, `warCeil`, `eta` | No contract slot — discard |
| `signBonus` | No contract slot — discard |
| `wave` | No contract slot — discard |

---

### 2. Scouting Tools → knowledge.scout.scout

The `scouting` object uses the 20–80 scale (same as domain format) but uses `speed` instead of `run`.

**DO apply these renames:**

| Legacy key | Contract key | Notes |
|---|---|---|
| `scouting.hit` | `knowledge.scout.scout.hit` | Hitter-only |
| `scouting.power` | `knowledge.scout.scout.power` | Hitter-only |
| `scouting.speed` | `knowledge.scout.scout.run` | **Rename required** |
| `scouting.arm` | `knowledge.scout.scout.arm` | Hitter-only |
| `scouting.field` | `knowledge.scout.scout.field` | Hitter-only |
| `scouting.overall` | No contract slot — discard | Not a DLR scoring input |

**DO NOT migrate pitcher scouting from legacy format.** Legacy pitchers store hitting tools (hit:0, power:0, speed:0) in `scouting` — these are not pitcher tools. If a player is a pitcher, leave `knowledge` undefined rather than creating a poisoned scout object.

**Role detection for scouting migration:**

```
isPitcher: position includes "P" (case-insensitive), or position is "SP", "RP", "CP", "LHP", "RHP"
isHitter: all other positions (C, 1B, 2B, 3B, SS, LF, CF, RF, DH, OF, IF, UTL)
```

---

### 3. Legacy dlr.cardMarket → cardMarket

The legacy `dlr.cardMarket` fields map directly to the `LegacyCardMarket` contract. **Apply this passthrough:**

| Legacy field | Contract field |
|---|---|
| `dlr.cardMarket.liquidity` | `cardMarket.liquidity` |
| `dlr.cardMarket.scarcity` | `cardMarket.scarcity` |
| `dlr.cardMarket.trend` | `cardMarket.trend` |
| `dlr.cardMarket.volatility` | `cardMarket.volatility` |
| `dlr.cardMarket.depth` | `cardMarket.depth` |
| `dlr.cardMarket.longTerm` | `cardMarket.longTerm` |
| `dlr.cardMarket.stability` | `cardMarket.stability` |
| `dlr.cardMarket.confidence` | `cardMarket.confidence` |
| `dlr.cardMarket.psa10Premium` | No contract slot — discard |

**All cardMarket values must be 0–1.** Clamp any out-of-range float to [0, 1].

Missing price fields (`rawAvg`, `psa9Avg`, `psa10Avg`): leave undefined. Do NOT invent price data.

---

### 4. Legacy dlr.media → media (PARTIAL — do not map)

The legacy `dlr.media` fields do NOT map cleanly to the `MediaData` contract. Field names diverge:

| Legacy field | Contract equivalent | Verdict |
|---|---|---|
| `dlr.media.hype` | ≈ `media.analyst.hypeTrend` | **DO NOT map** — naming ambiguous |
| `dlr.media.marketSize` | No contract slot | **Discard** |
| `dlr.media.highlightFactor` | `media.snapshot.highlightFactor` | **DO NOT map** — layer origin uncertain |
| `dlr.media.mentions` | `media.snapshot.mentions` | **DO NOT map** — layer origin uncertain |
| `dlr.media.buzz` | ≈ `media.snapshot.socialBuzz` | **DO NOT map** — naming ambiguous |
| `dlr.media.stability` | ≈ `media.analyst.mediaStability` | **DO NOT map** — naming ambiguous |
| `dlr.media.velocity` | No contract slot | **Discard** |
| `dlr.media.confidence` | `media.analyst.confidence` | **DO NOT map** — layer origin uncertain |

**Rule:** Leave `media` undefined on all migrated legacy players. Do NOT construct a partial media object from legacy flat fields. The DLR engine applies its default behavior (0 or minimum) for an undefined media layer.

---

### 5. Legacy dlr.performance → performance (FORBIDDEN)

The legacy `dlr.performance` fields are flat summary signals, NOT domain performance stats:

```
trend, ageFactor, consistency, durability, upside, floor, confidence
```

These are NOT snapshot/scout/analyst layer inputs. They do not map to any `PerformanceData` field. **No migration path exists.**

**Rule:** Leave `performance` undefined on all migrated legacy players. Do NOT construct a PerformanceData object from legacy dlr.performance signals. The DLR engine applies its default behavior for an undefined performance layer.

---

### 6. legacy.bio (string) → knowledge (PARTIAL)

`bio` is a plain string biographical paragraph, not a structured `KnowledgeData` object. It cannot be machine-mapped to the knowledge domain layer.

**Rule:** If `scouting` is present AND the player is a hitter, construct a minimal `knowledge` object with only `knowledge.scout.scout` populated (from scouting tool grades, after renaming). All other knowledge sub-layers (`bio`, `career`, `scoutScores`, `analystScores`) are left undefined.

If the player is a pitcher: leave `knowledge` undefined entirely.

---

### 7. Signals (passthrough)

| Legacy field | Contract field |
|---|---|
| `signals.tracked` | `signals.tracked` |
| `signals.heat` | `signals.heat` |
| `signals.price` | `signals.price` |

If no `signals` block: apply `DEFAULT_SIGNALS = { tracked: false, heat: null, price: null }`.

---

### 8. tracker (no legacy equivalent)

Legacy players have no `tracker` block. Leave `tracker` undefined on all migrated players. The movement engine defaults to `baseDLR = 50` for a player with no prior DLR session.

---

### 9. dlr.score and dlr.weeklyHistory

Legacy players have no `dlr.score` (movement engine baseline) and no `dlr.weeklyHistory`. Leave both undefined. The movement engine defaults to `baseDLR = 50` and empty history for new players.

---

## Required Normalization Rules

### Tier normalization
```
""  → undefined
"DRAFT" → "DRAFT"
"MLB" → "MLB"
"AAA" → "AAA"
"AA"  → "AA"
"A"   → "A"
"A+"  → "A+"
"ROK" → "ROK"
```

### batThrow splitting (2026 players)
```
"R/R" → bats: "R", throws: "R"
"L/L" → bats: "L", throws: "L"
"S/R" → bats: "S", throws: "R"
```
Only apply if `bats`/`throws` not already set.

### Tool grade range check
Tool grades must be in [20, 80] per the 20–80 scouting scale. Clamp out-of-range values and emit a warning. A grade of 0 on a hitter scouting field is suspicious (pitcher placeholder) — emit a warning and skip that field.

### 0–1 range check (cardMarket)
All cardMarket passthrough values must be in [0.0, 1.0]. Clamp with a warning.

---

## Role Rules

1. **Never mix hitter and pitcher tool sets.** If a player's position indicates pitcher, do NOT create `knowledge.scout.scout` from legacy scouting. Legacy pitchers had `hit:0, power:0, speed:0` placeholders that are not real tools.
2. **Role detection is position-based.** Use `detectPlayerRole()` from `signalEngine.ts` where possible. Otherwise: position string containing "P", "SP", "RP", "CP", "LHP", "RHP" → pitcher.
3. **`scouting.overall` is NOT a DLR input.** Do not map it to any field.
4. **`scouting.arm` context:** For pitchers, arm strength is a valid tool but legacy format didn't store it separately. Do not reconstruct pitcher arm from hitter arm.

---

## Forbidden Migrations

The following actions are explicitly forbidden during cohort migration:

| Forbidden action | Reason |
|---|---|
| Invent `performance.snapshot` stats | No basis in legacy format — engine would score fake data |
| Invent `performance.scout` Statcast data | No basis in legacy format |
| Invent `performance.analyst` xStats | No basis in legacy format |
| Construct `media` from `dlr.media` | Field-name ambiguity makes mapping unreliable |
| Normalize physical stats (ERA, AVG) to 0–1 | Physical stats must NOT be normalized |
| Map `dlr.performance.trend/ageFactor/etc.` to any PerformanceData field | These are legacy signals, not domain stats |
| Set `dlr.score` to any value | Engine must compute fresh; factory sets undefined |
| Apply `scouting` to pitchers | Legacy pitchers had placeholder hitter values |
| Add scoring constants to migration files | Constants belong in `dlrConfig.ts` |
| Alter DLR weights or tier breaks | Engine is frozen |
| Generate card prices (`rawAvg`, `psa9Avg`, `psa10Avg`) | No price data exists in legacy format |
| Map `scouting.overall` to any field | Not a DLR scoring input |

---

## Migration Output Contract

`migrateLegacyPlayer(player)` returns `CreatePlayerResult`:
```typescript
{
  player: Player   // canonical player — safe to add to cohort
  validation: ValidationResult  // check before publishing
}
```

Migration warnings are surfaced as `ValidationIssue[]` with `severity: "warning"`. Migration failures (missing required fields) appear as `severity: "error"` and set `validation.isValid = false`.

`migrateCohort(players)` returns:
```typescript
{
  validPlayers:   Player[]        // isValid = true
  warnings:       MigrationWarning[]  // isValid = true but has warning issues
  failedPlayers:  FailedMigration[]   // isValid = false
  summary: {
    total:    number
    passed:   number  // no issues
    warnings: number  // valid but has warnings
    failed:   number  // isValid = false
  }
}
```

---

## What Migration Does NOT Do

- Does not write back to `playersDraft2025.ts` or `playersDraft2026.ts` — those files are read-only inputs
- Does not modify any engine files
- Does not produce new domain files (`*_knowledge.ts`, `*_performance.ts`, etc.) — migration assembles in-memory; manual domain files are the long-term fix
- Does not resolve E-003, E-007, E-009 — those are separate passes
- Does not fully replace the need for manual domain files — migrated players will have undefined knowledge/performance/media layers and score lower than players with full domain files
