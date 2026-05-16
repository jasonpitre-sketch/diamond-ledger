# PERFORMANCE SCOUT TAXONOMY — DIAMOND LEDGER 2026+

**Status: FROZEN as of 2026-05-09 (Pass 21.5)**
**Authority: This document governs all `*_performance.ts` scout layers**

---

## TAXONOMY A — HITTER SCOUT (AUTHORITATIVE)

All hitter `performance.scout` objects MUST use exactly these five keys:

| Field     | Unit  | IntelStack label | Engine default | Notes                                               |
|-----------|-------|------------------|----------------|-----------------------------------------------------|
| `hardHit` | %     | HH               | 38             | Hard-hit rate (EV ≥ 95 mph). Estimated for college. |
| `barrel`  | %     | BAR              | 8              | Barrel rate. Estimated for college.                 |
| `kRate`   | %     | K%               | 22             | Strikeout rate (K%). Direct from source stats.      |
| `bbRate`  | %     | BB%              | 8              | Walk rate (BB%). Direct from source stats.          |
| `avgEV`   | mph   | EV               | 88             | Average exit velocity. Stated range midpoint.       |

### Forbidden Taxonomy B Keys (NEVER use in hitter scout layers)

The following keys are **PITCHER-ONLY** scout taxonomy. They must never appear in a hitter `performance.scout` object:

- `kPercent` — pitcher strikeout percentage (use `kRate` for hitters)
- `bbPercent` — pitcher walk percentage (use `bbRate` for hitters)
- `kMinusBB` — pitcher K-BB composite metric
- `whiff`    — pitcher swinging-strike rate

These fields belong in the pitcher scout taxonomy only (see TAXONOMY B below).

---

## TAXONOMY B — PITCHER SCOUT

Pitcher `performance.scout` objects use a separate, independent taxonomy. Pitcher files are identified by `kind: "pitcher"` in the performance export object.

Pitcher scout keys (current, not frozen here — governed separately):
- `kRate` — pitcher K rate (null if not directly available from source)
- ERA, WHIP, and velocity fields live in `snapshot` and `scout` named subfields

**Pitcher scout is OUT OF SCOPE for this governance document.**

---

## UI BINDING (IntelStack.tsx — renderPerformanceTier2)

The hitter branch reads exactly these five keys:

```typescript
const hardHit = perf?.scout?.hardHit ?? 38
const barrel  = perf?.scout?.barrel  ?? 8
const kRate   = perf?.scout?.kRate   ?? 22
const bbRate  = perf?.scout?.bbRate  ?? 8
const avgEV   = perf?.scout?.avgEV   ?? 88
```

**Do not rename these keys. Do not add alternate hitter metric panels without updating this document and IntelStack.tsx simultaneously.**

---

## COMPLIANCE STATUS (2026 cohort — audited 2026-05-09)

| Player                 | Kind    | hardHit | barrel | kRate | bbRate | avgEV | Status      |
|------------------------|---------|---------|--------|-------|--------|-------|-------------|
| Roch Cholowsky         | hitter  | ✓ est   | ✓ est  | ✓     | ✓      | ✓     | COMPLIANT   |
| Drew Burress           | hitter  | ✓ est   | ✓ est  | ✓     | ✓      | ✓     | COMPLIANT   |
| Eric Booth Jr.         | hitter  | ✓ est   | ✓ est  | ✓     | ✓      | ✓     | COMPLIANT   |
| Grady Emerson          | hitter  | ✓ est   | ✓ est  | ✓     | ✓      | ✓     | COMPLIANT   |
| Jacob Lombard          | hitter  | ✓ est   | ✓ est  | ✓     | ✓      | ✓     | COMPLIANT   |
| Justin LeBron          | hitter  | ✓ est   | ✓ est  | ✓     | ✓      | ✓     | COMPLIANT   |
| Sawyer Strosnider      | hitter  | ✓ est   | ✓ est  | ✓     | ✓      | ✓     | COMPLIANT   |
| Vahn Lackey            | hitter  | ✓ est   | ✓ est  | ✓     | ✓      | ✓     | COMPLIANT   |
| Jackson Flora          | pitcher | —       | —      | —     | —      | —     | OUT OF SCOPE|
| Gio Rojas              | pitcher | —       | —      | —     | —      | —     | OUT OF SCOPE|

**est** = value is estimated from stated EV/power range (no official Statcast for college players)

---

## MUTATION RULES

1. **Do NOT add new hitter scout keys** without updating IntelStack.tsx and this document simultaneously.
2. **Do NOT rename existing keys.** The UI reads them directly via `perf?.scout?.{key}`.
3. **Do NOT use Taxonomy B keys in hitter files.** They will silently fall through to defaults.
4. **Do NOT remove any of the five required keys.** Missing keys render as defaults (no error thrown).
5. **Do NOT use these fields for engine scoring.** Hitter scout keys feed display only; they are not read by `calculateDLR.ts`.

---

## CHANGE LOG

| Date       | Pass    | Change                                                                 |
|------------|---------|------------------------------------------------------------------------|
| 2026-05-09 | Pass 21 | All 9 new hitter files created with Taxonomy A compliance              |
| 2026-05-09 | Pass 21.5 | Taxonomy A frozen; governance document created; compliance audited   |
