# Diamond Ledger Player Contract

**Established:** 2026-05-08  
**Authority:** `data/players/PLAYER_CONTRACT.md`  
**Pipeline files:** `createPlayer.ts`, `playerValidator.ts`

This document is the authoritative specification for every player file in Diamond Ledger. All future players MUST conform to this contract. Existing players should be migrated to fix known inconsistencies (see Known Issues below).

---

## Player Assembly Flow

```
*_knowledge.ts   →  knowledge object
*_performance.ts →  performance object
*_media.ts       →  media object
*_market.ts      →  cardMarket object
          ↓
  root player file  (assembles all 4 + core identity + tracker + careerAverages)
          ↓
  cohort array      (spread player + draftYear, draftPick, card path)
          ↓
  calculateDLR(player)  ← engine reads player directly, never from player.dlr.*
```

Domain files are independent. The root player object assembles them. The DLR engine reads `player.knowledge`, `player.performance`, `player.media`, `player.cardMarket` **directly** — never through `player.dlr`.

---

## Required Root Structure

### Identity (all required — errors if missing)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique. Snake_case. e.g. `"casey_mize"` |
| `name` | `string` | Display name. e.g. `"Casey Mize"` |
| `position` | `string` | Determines scoring role. e.g. `"RHP"`, `"SS"`, `"3B"` |

### Profile (recommended — warnings if missing)

| Field | Type | Notes |
|---|---|---|
| `team` | `string` | 3-letter MLB org. e.g. `"DET"` |
| `tier` | `string` | `"MLB"`, `"AA"`, `"A"`, `"DRAFT"` |
| `level` | `string` | Same as tier in most cases |
| `age` | `number` | Current age |
| `bats` | `string` | `"R"`, `"L"`, `"S"` |
| `throws` | `string` | `"R"`, `"L"` |

### Domain Layers (recommended — warnings if missing, DLR defaults to 0 or 0.5)

| Field | Type | Notes |
|---|---|---|
| `knowledge` | `KnowledgeData` | From `*_knowledge.ts` |
| `performance` | `PerformanceData` | From `*_performance.ts` |
| `media` | `MediaData` | From `*_media.ts` |
| `cardMarket` | `LegacyCardMarket` | From `*_market.ts` |

### Live Data

| Field | Type | Notes |
|---|---|---|
| `tracker` | `PlayerTracker` | Live current-season stats. See Tracker Contract. |
| `careerAverages` | `PlayerCareer` | Display-only context. NEVER used in scoring. |
| `signals` | `PlayerSignals` | `{ tracked, heat, price }` |
| `dlr` | `PlayerDLR` | Persisted engine state. See DLR Field Rules. |

---

## Required Sub-Layers

### knowledge

Each of the three sub-sections (bio / scout / career) follows the same four-layer pattern:

```
knowledge.bio
  ├── snapshot    { height, weight, bats, throws, school }        — display strings
  ├── scoutScores { arch, path, frame, ath, proj }                — 0–1 normalized
  ├── scout       { birthdate, signBonus, archetype, devPath, ... }— text strings
  └── analystScores { dev, risk, value, org, pedigree }           — 0–1 normalized

knowledge.scout
  ├── snapshot    { primaryTool[], roleType[], physicalProjection[], riskProfile[] }
  ├── scout       HITTER: { hit, power, run, arm, field }         — 20–80 scale
  │               PITCHER: { fastball, breaking, offspeed, command, control }  — 20–80 scale
  ├── analystScores { ceiling, floor }                            — 0–1 normalized
  └── analyst     { ceiling, floor, comparable, orgFit, ... }     — 0–1 or string

knowledge.career
  ├── snapshot    { draftPedigree, developmentPath, orgInvestment, timelineSignal } — text
  ├── scout       { projectionPath, draftPedigree, orgCommitment, ... }             — text
  ├── analystScores { timeline, peak, path, org, value, floor, ceil }               — 0–1 normalized
  └── analyst     { amateurCeiling, draftValue, ascentSpeed, setbacks, ... }        — 0–1
```

**Role separation is mandatory:**
- Hitter `knowledge.scout.scout` → `hit`, `power`, `run`, `arm`, `field`
- Pitcher `knowledge.scout.scout` → `fastball`, `breaking`, `offspeed`, `command`, `control`
- **Do NOT mix tool sets.** The scoring engine will misclassify a player if pitcher tools appear on a hitter or vice versa.

---

### performance

```
performance
  ├── kind        "hitter" | "pitcher"   — REQUIRED. Role declaration.
  ├── snapshot    { [stats] }             — See naming rules below
  ├── scout       { [Statcast/advanced] } — See naming rules below
  └── analyst     { [xStats + trends] }  — xStats: physical values. Trends: 0–1 normalized.
```

**CRITICAL: performance.snapshot field naming**

The DLR engine reads performance fields with specific capitalization. Using the wrong case means the field scores as 0 (null → no contribution).

| Role | Engine reads | Player file must use | Common mistake |
|---|---|---|---|
| Pitcher | `ERA` | `ERA` (uppercase) | ~~`era`~~ |
| Hitter | `AVG` | `AVG` (uppercase) | ~~`avg`~~ |

**Authoritative field names by role:**

**Pitcher snapshot** (engine reads these exact keys):
```
ERA, whip, ip, so, g, w, l, bb, h, hrAllowed
```
→ `ERA` is the only uppercase snapshot field. All others are lowercase.

**Hitter snapshot** (engine reads these exact keys):
```
AVG, obp, slg, ops, hr, rbi, runs, bb, k, pa, g, ab, h, doubles, triples, sb, sbAttempts
```
→ `AVG` is the only uppercase snapshot field. All others are lowercase.

**Pitcher scout** (engine reads `kPercent` for scoring):
```
kPercent, bbPercent, kMinusBB, avgEV, whiff
```

**Hitter scout** (engine reads `kRate` for scoring):
```
kRate, bbRate, barrel, hardHit, avgEV
```

**Pitcher analyst** (engine reads `xERA` for scoring):
```
xERA            — physical value (e.g. 3.65), NOT 0–1
stuffPlus       — physical value (e.g. 102), NOT 0–1
pitchMixGrade   — 0–1 normalized
veloTrend       — 0–1 normalized
commandTrend    — 0–1 normalized
injuryTrend     — 0–1 normalized
roleStability   — 0–1 normalized
```

**Hitter analyst** (engine reads `xAVG` for scoring):
```
xAVG            — physical value (e.g. 0.275), NOT 0–1
xSLG            — physical value (e.g. 0.430), NOT 0–1
plateDiscTrend  — 0–1 normalized
contactTrend    — 0–1 normalized
injuryTrend     — 0–1 normalized
sprintTrend     — 0–1 normalized
posValue        — 0–1 normalized
consistency     — 0–1 normalized
```

---

### media

All media fields are 0–1 pre-normalized floats. No exceptions.

```
media
  ├── snapshot { mentions, headlineImpact, highlightFactor, socialBuzz }           — 0–1
  ├── scout    { fanRecognition, teamVisibility, interviewPresence,
  │              narrativeStrength, milestoneAttention }                            — 0–1
  └── analyst  { prospectPedigree, hypeTrend, mediaStability, storyDurability,
                 breakoutProbability, publicMomentum, attentionDecay, confidence } — 0–1
```

---

### cardMarket (legacy path)

```
cardMarket
  — rawAvg, psa9Avg, psa10Avg   — price points (dollars)
  — liquidity                   — 0–1 (snapshot layer input)
  — trend                       — 0–1 (snapshot layer input)
  — volatility                  — 0–1 (snapshot layer input)
  — scarcity                    — 0–1 (scout layer input)
  — depth                       — 0–1 (scout layer input)
  — stability                   — 0–1 (scout layer input)
  — longTerm                    — 0–1 (analyst layer input)
  — confidence                  — 0–1 (analyst layer input)
```

The legacy `cardMarket` path is active. The `marketSnapshot` path (live eBay data) is wired but not yet populated for most players.

---

## Tracker Contract

```
tracker: {
  AB?:  number   ← hitter mode switch. sampleConfidence uses abConfidence().
  IP?:  number   ← pitcher mode switch. sampleConfidence uses ipConfidence().
  PA?:  number
  G?:   number

  // Live current-season accumulating totals — scoring inputs
  R?, H?, HR?, RBI?, BB?, K?, SB?   // hitter
  W?, L?, ERA?, WHIP?, SO?           // pitcher

  // Derived rates — display
  AVG?, OBP?, OPS?

  // SHORT-TERM SIGNALS — display only, NEVER feed scoring
  lastGame?: { date, AB/IP, H, HR/ER, ... }
  last7?:    { AB, SB, ... }

  // ROLLING PERIOD DISPLAY — display only, NEVER feed scoring
  rolling?: {
    days7?, days15?, days30?
  }

  // Sample-source split
  mlbAB?:  number
  minorAB?: number
  everReachedMLBSample?: boolean
}
```

**Tracker rules:**

1. **LIVE ONLY** — tracker holds current-season accumulating stats. Reset at season start.
2. **AB present → hitter mode.** `sampleConfidence()` routes to `abConfidence(AB)`.
3. **IP present → pitcher mode.** `sampleConfidence()` routes to `ipConfidence(IP)`.
4. **AB takes precedence** if both AB and IP are present (two-way player edge case).
5. **rolling windows are display-only.** They are never read by the DLR engine.
6. **lastGame and last7 are display-only.** Never read by the DLR engine.
7. **NEVER backfill historical data into tracker.** Tracker is a live accumulating window only.
8. **tracker feeds two systems:** `calculateDLRMovement()` (movement confidence) and `sampleConfidence()` (performance scoring trust).
9. **tracker does NOT directly set DLR scores.** It adjusts confidence weighting only.
10. **mlbAB / minorAB / everReachedMLBSample** — required by `resolvePlayerState()` for level-transition logic.

---

## DLR Field Rules

```
player.dlr: {
  score?:          number   ← PERSISTED previous DLR rating (baseDLR in movement engine)
  weeklyHistory?:  number[] ← PERSISTED weekly delta history (feeds deltaMonthly)

  // Legacy backrefs — kept for compatibility. NOT read by calculateDLR().
  performance?:    PerformanceData
  media?:          MediaData
  cardMarket?:     LegacyCardMarket
}
```

**Important distinction:**
- `player.dlr.score` and `player.dlr.weeklyHistory` **are** consumed by `calculateDLRMovement()` as `baseDLR` and `weeklyHistory`.
- `player.dlr.performance`, `player.dlr.media`, `player.dlr.cardMarket` are **legacy backrefs** only. `calculateDLR()` reads `player.performance`, `player.media`, `player.cardMarket` directly. The backrefs exist for compatibility and are not scored a second time.
- A new player with no prior DLR session will have `dlr.score = undefined` → `calculateDLRMovement()` defaults to `baseDLR = 50`.

---

## Naming Rules Summary

**DO use:**
```
performance.snapshot.AVG        (hitter — uppercase)
performance.snapshot.ERA        (pitcher — uppercase)
performance.scout.kRate         (hitter)
performance.scout.kPercent      (pitcher)
performance.analyst.xAVG        (hitter)
performance.analyst.xERA        (pitcher)
knowledge.scout.scout.hit       (hitter tools — lowercase)
knowledge.scout.scout.fastball  (pitcher tools — lowercase)
tracker.AB                      (uppercase)
tracker.IP                      (uppercase)
tracker.AVG                     (uppercase)
```

**DO NOT use:**
```
performance.snapshot.avg        ← engine reads AVG, this scores 0
performance.snapshot.era        ← engine reads ERA, this scores 0
performance.scout.strikeoutRate ← non-standard
performance.scout.walkRate      ← non-standard
```

---

## DLR Engine Rules for Player Authors

1. **Engine is frozen.** Player files extend data only — they never alter scoring architecture.
2. **Add new optional fields freely.** The engine ignores unknown fields. Never remove existing fields — they may be consumed by UI components.
3. **Do not add a second `dlr` computation.** The engine (`calculateDLR`) is called by the UI, not by player files.
4. **Do not put weights, thresholds, or scoring constants in player files.** Those belong in `dlrConfig.ts`.
5. **All analystScores and normalized trend fields must be 0–1.** Physical stats (ERA, AVG, xERA, xAVG, stuffPlus) are NOT 0–1. Do not normalize physical stats.
6. **knowledge.scout.scout tool grades use the 20–80 scouting scale**, not 0–1. The engine normalizes them via `normalizeToolGrade()` in `signalEngine.ts` using `(grade - 20) / 60`.

---

## Known Issues (Legacy Players)

These are pre-existing inconsistencies. Fix when updating a player file, or use `playerValidator.ts` to identify them.

| Issue | Affected | Fix |
|---|---|---|
| `performance.snapshot.era` / `ERA` dual-key | `casey_mize_performance.ts` | RESOLVED Pass 17 — both `era` (UI display) and `ERA` (engine scoring) present. Do not remove either. |
| `performance.snapshot.avg` / `AVG` dual-key | `alec_bohm_performance.ts`, `eli_willits_performance.ts` | RESOLVED Pass 17 — both `avg` (UI display) and `AVG` (engine scoring) present. Do not remove either. |
| Draft cohort arrays use old flat format (E-008) | `playersDraft2025.ts` inline players, `playersDraft2026.ts` | Migrate to domain-file format |
| `player.dlr.performance/media/cardMarket` backrefs are not consumed by `calculateDLR()` | All players | Low priority — remove only when confirmed no consumer |
| `hitting`/`pitching` legacy stat blocks on root use uppercase keys (AVG, HR) inconsistent with `performance.snapshot` lowercase | All players | Accepted inconsistency — legacy display fields only |

---

## File Naming Convention

```
data/players/
  {player_id}.ts               — root assembly file
  {player_id}_knowledge.ts     — bio / scout / career
  {player_id}_performance.ts   — snapshot / scout / analyst
  {player_id}_media.ts         — snapshot / scout / analyst (all 0–1)
  {player_id}_market.ts        — cardMarket fields
  {player_id}_market_history.ts — legacy sold comps (optional)
```

Player IDs: lowercase, underscores, e.g. `casey_mize`, `eli_willits`.
