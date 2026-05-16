# Diamond Ledger — Legacy Cohort Audit

**Established:** 2026-05-08  
**Authority:** `data/players/LEGACY_AUDIT.md`  
**Source files audited:** `data/playersDraft2025.ts`, `data/playersDraft2026.ts`

This document records the findings of the Phase 1 inventory for the Pass 12 cohort migration. It is the authoritative reference for known legacy format issues, incompatible fields, unresolved migration risks, and required manual cleanup.

---

## Cohort Inventory

| Cohort | File | Lines | Approximate player count | Format |
|---|---|---|---|---|
| 2025 Draft | `data/playersDraft2025.ts` | 3852 | ~33 | Legacy inline flat |
| 2026 Draft | `data/playersDraft2026.ts` | 3623 | ~70 | Legacy inline flat (extended) |

Both files define players as inline object literals, not as imported domain files. All players are in legacy format — none conform to PLAYER_CONTRACT.md.

---

## Legacy Format Variants

### Variant A — Standard (2025 + early 2026)

Example player: `ethan_holliday` (2025), `roch_cholowsky` (2026 early picks)

Structure:
```typescript
{
  id, name, team, position, tier, level, age, card,
  draftYear, draftPick, draftRound,
  scouting: { hit, power, speed, arm, field, overall },
  bio: "...",                    // plain string
  signals: { tracked, heat, price },
  hitting: { AVG, H, HR, RBI, BB, K, SB, G, AB, PA, OBP, OPS },
  dlr: {
    performance: { trend, ageFactor, consistency, durability, upside, floor, confidence },
    media: { hype, marketSize, highlightFactor, trend, mentions, buzz, stability, velocity, confidence },
    cardMarket: { psa10Premium, liquidity, scarcity, trend, volatility, depth, longTerm, stability, confidence }
  }
}
```

### Variant B — Extended (2026 early picks only)

Same as Variant A plus additional flat fields at root:
```typescript
{
  // All Variant A fields, plus:
  height, weight,           // physical dimensions
  batThrow,                 // "R/R", "L/L", "S/R"
  birthdate,                // "YYYY-MM-DD"
  role, status, trend,      // display strings
  archetype, frameScale, devPath,
  primaryTool, secondaryTool,
  pedigree, devCurve, orgValue,
  projection, warCeil, eta,
  signBonus,
  wave,                     // unknown consumer
}
```

### Variant C — No DLR Block (2026 late picks, ~picks 26+)

Example players: `gavin_grahovac`, `landon_harmon`

Structure — same as Variant A but `dlr` is completely absent:
```typescript
{
  id, name, team, position, tier, level, age, card,
  draftYear, draftPick, draftRound,
  scouting: { hit, power, speed, arm, field, overall },
  bio: "...",
  signals: { tracked, heat, price },
  hitting: { ... }
  // NO dlr field
}
```

**Migration impact:** cardMarket will be undefined. DLR engine defaults to minimum market scores.

---

## Known Issues by Category

### Issue 1: Empty tier/level strings (E-008 related)

Affected players: `landon_harmon`, `angel_cervantes` (confirmed), likely others in 2026 late picks.

```typescript
{ tier: "", level: "", ... }
```

**Migration action:** Normalize `""` → `undefined`. The validator will emit a `"team"` / `"tier"` warning (recommended field absent).

**Manual fix required:** Assign correct tier strings or remove the field entirely.

---

### Issue 2: `scouting.speed` instead of `run`

Affects all legacy players. The scouting object uses `speed` for base-running tool grade, but PLAYER_CONTRACT.md (and the DLR engine via `signalEngine.ts`) expects `run`.

**Migration action:** `migrateLegacyPlayer.ts` renames `speed → run` automatically.

**Manual fix required in new domain files:** Do not use `speed` in future `knowledge.scout.scout` objects.

---

### Issue 3: Pitcher scouting is hitter placeholder data

Legacy pitchers (RHP, LHP) have `scouting: { hit:0, power:0, speed:0, arm:XX, field:50, overall:XX }`. The `hit`, `power`, and `speed` fields are placeholders (0), not real pitcher tools.

Affected 2025 players: `paul_skenes` (if present), any RHP/LHP/SP  
Affected 2026 players: any pitcher picks

**Migration action:** `migrateLegacyPlayer.ts` detects pitcher positions and skips the scouting block entirely (knowledge remains undefined). Migration warning is emitted.

**Manual fix required:** Create proper `*_knowledge.ts` domain files with correct pitcher tool grades (fastball, breaking, offspeed, command, control).

---

### Issue 4: Legacy `dlr.performance` signals are not domain performance stats

The following fields are flat summary signals, NOT valid `PerformanceData` inputs:

```typescript
dlr.performance: {
  trend: 0.72,          // NOT performance.analyst.contactTrend or similar
  ageFactor: 1.24,      // NO contract equivalent
  consistency: 0.66,    // NO contract equivalent  
  durability: 0.80,     // NO contract equivalent
  upside: 0.95,         // NO contract equivalent
  floor: 0.72,          // NO contract equivalent
  confidence: 0.83      // NOT performance.analyst.xAVG confidence
}
```

**Migration action:** These fields are NOT migrated. `performance` remains undefined on all migrated legacy players. Performance layer scores 0.

**Manual fix required:** Create `*_performance.ts` domain files with real snapshot/scout/analyst data for each player.

**Risk:** Until real performance files exist, all migrated legacy players score 0 on the performance layer (40 pts max). DLR scores will be significantly below domain-file players.

---

### Issue 5: Legacy `dlr.media` field names do not match MediaData contract

| Legacy field | Problem |
|---|---|
| `hype` | Could map to `analyst.hypeTrend` but naming is ambiguous |
| `marketSize` | No contract equivalent |
| `highlightFactor` | Could be `snapshot.highlightFactor` but layer origin unknown |
| `mentions` | Could be `snapshot.mentions` but partial |
| `buzz` | Could be `snapshot.socialBuzz` but naming ambiguous |
| `stability` | Could be `analyst.mediaStability` but ambiguous |
| `velocity` | No contract equivalent |
| `confidence` | Could be `analyst.confidence` |

**Migration action:** The entire media layer is NOT migrated. `media` remains undefined. Media layer scores 0.

**Manual fix required:** Create `*_media.ts` domain files for each player.

---

### Issue 6: `dlr.cardMarket.psa10Premium` has no contract slot

The `psa10Premium` field exists in legacy format (a multiplier, not a price point) but has no equivalent in `LegacyCardMarket`.

**Migration action:** `psa10Premium` is discarded during migration. Warning is NOT emitted (silent discard — low priority).

---

### Issue 7: Legacy `bio` is a plain string

`bio` is a biographical paragraph string at root level, not a `KnowledgeData` structure. It cannot be parsed into `knowledge.bio.snapshot`, `knowledge.bio.scout`, etc.

**Migration action:** `bio` is discarded. `knowledge.bio` is not populated.

**Manual fix required:** Create proper `*_knowledge.ts` files with structured bio data.

---

### Issue 8: 2026 extended flat fields have no contract slots

Fields like `height`, `weight`, `batThrow`, `birthdate`, `role`, `status`, `archetype`, `frameScale`, `devPath`, `primaryTool`, `secondaryTool`, `pedigree`, `devCurve`, `orgValue`, `projection`, `warCeil`, `eta`, `signBonus`, `wave`, `trend` have no direct contract equivalents or are display-only.

**Migration action:** `batThrow` is parsed to split `bats`/`throws` if those fields are absent. All others are silently discarded.

**If these fields have UI consumers:** The consumers must be updated to read from `knowledge.*` domain files once those exist. The legacy flat fields will not be present on migrated players.

---

### Issue 9: No `tracker` on any legacy player

All legacy players lack the `tracker` field. This means:
- `sampleConfidence(tracker)` returns the fallback trust (0.6 at 0 AB/IP)
- `calculateDLRMovement()` uses `baseDLR = 50` (undefined dlr.score default)
- The performance layer trust multiplier is at minimum

**Migration action:** `tracker` is left undefined. No fabrication.

**Manual fix required:** Populate `tracker` with current-season live stats as they accumulate.

---

### Issue 10: `wave` field — unknown consumer

The `wave: 0` field appears on some 2026 players. No consuming component has been identified in the codebase.

**Migration action:** `wave` is silently discarded.

**Follow-up required:** Search codebase for `wave` consumers. If found, add a contract slot. If not found, confirm discard.

---

## Data Completeness by Layer (Migrated Players)

After migration via `migrateLegacyPlayer.ts`, the expected layer completeness is:

| Layer | Completeness | Notes |
|---|---|---|
| Core identity | ✅ Full | id, name, team, position, tier (normalized), age, card, draftYear, draftPick |
| Signals | ✅ Full | tracked, heat, price — passed through |
| Legacy display stats | ✅ Full | hitting / pitching blocks passed through |
| Scouting tools (hitters) | ⚠️ Partial | hit/power/run/arm/field populated from scouting; no analystScores/scoutScores/bio/career |
| performance | ❌ None | Cannot migrate from dlr.performance flat signals |
| media | ❌ None | Cannot migrate from dlr.media flat signals |
| cardMarket | ⚠️ Partial | 8 of 11 fields populated; no rawAvg/psa9Avg/psa10Avg |
| tracker | ❌ None | No legacy equivalent |
| careerAverages | ❌ None | No legacy equivalent |

---

## Expected DLR Score Impact

A fully migrated legacy player with no domain files will score approximately:

| Layer | Score | Reason |
|---|---|---|
| knowledge | 0–4/18 | Only scout tools present (hitters); no bio/career/analystScores |
| performance | 0/40 | Entire layer undefined |
| media | 0/18 | Entire layer undefined |
| market | ~12–18/24 | 8 cardMarket fields populated |
| **Total** | **~12–22/100** | Well below domain-file players |

This is the expected baseline for migrated players. DLR scores will improve as `*_performance.ts`, `*_media.ts`, and full `*_knowledge.ts` domain files are created.

---

## Migration Risk Summary

| Risk | Severity | Affected Players | Mitigation |
|---|---|---|---|
| Performance layer always 0 | High | All | Create *_performance.ts files |
| Media layer always 0 | High | All | Create *_media.ts files |
| Pitcher knowledge not migrated | Medium | All pitchers | Create *_knowledge.ts files |
| Empty tier string normalized away | Low | ~2–5 | Assign correct tier manually |
| No tracker → minimum sample confidence | Medium | All | Populate tracker when live data available |
| `wave` field lost | Low | Some 2026 | Verify no UI consumer |
| 2026 flat fields discarded | Low | ~70 | Update UI consumers when domain files exist |

---

## Required Manual Cleanup (Long-Term)

In priority order:

1. **Create `*_performance.ts` files for all legacy players** — highest DLR impact (40 pts)
2. **Create `*_media.ts` files for all legacy players** — second highest (18 pts)
3. **Create `*_knowledge.ts` files for all legacy players** — completes the knowledge layer
4. **Fix known ERA/AVG capitalization issues** (casey_mize_performance, alec_bohm_performance, eli_willits_performance)
5. **Assign correct tier strings** to players with `tier: ""`
6. **Populate `tracker` fields** as current-season data accumulates
7. **Investigate `wave` field consumers** — confirm discard or add contract slot
8. **Delete tombstoned files** (E-009, separate pass)

---

## Files Requiring No Migration

The following player files already use domain format and do NOT go through the migrator:

- `casey_mize.ts` + domain files (`*_knowledge`, `*_performance`, `*_media`, `*_market`, `*_market_history`)
- `alec_bohm.ts` + domain files (known issue: `avg` → `AVG` in performance snapshot)
- `eli_willits.ts` + domain files (known issue: `avg` → `AVG` in performance snapshot)

These players are assembled via `createPlayer()` directly and validated by `playerValidator.ts`.
