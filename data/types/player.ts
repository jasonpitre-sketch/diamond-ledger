import type { ComputedLegacyMarket } from "@/lib/market/history"
import type { MarketSnapshot } from "@/lib/market/types"
import type { MarketArchetypeName } from "@/data/market/marketArchetypes"

type NullableNumber = number | null | undefined
type NullableValue = NullableNumber | string | string[] | null | undefined

export type LayerRecord<T = NullableValue> = Record<string, T>

export type KnowledgeLayerSet = {
  snapshot?: LayerRecord
  scout?: LayerRecord
  scoutScores?: LayerRecord<NullableNumber>
  analyst?: LayerRecord
  analystScores?: LayerRecord<NullableNumber>
}

export type KnowledgeData = {
  bio?: KnowledgeLayerSet
  scout?: KnowledgeLayerSet
  career?: KnowledgeLayerSet
}

export type FlatLayerSet<T = NullableNumber> = {
  snapshot?: LayerRecord<T>
  scout?: LayerRecord<T>
  analyst?: LayerRecord<T>
}

export type PerformanceData = Omit<FlatLayerSet, "snapshot"> & {
  kind?: "hitter" | "pitcher" | string
  /** Competition level for maturity confidence weighting (Pass 24).
   *  Valid values: "MLB" | "MiLB" | "NCAA" | "HS"
   *  Applied as a multiplier to all three performance sub-scores in scorePerformance().
   *  See data/dlr/MATURITY_CONFIDENCE_RULES.md for full specification. */
  competitionLevel?: "MLB" | "MiLB" | "NCAA" | "HS" | string
  snapshot?: LayerRecord<NullableNumber | string>
  delta?: number | null
  score?: number | null
}

export type MediaData = FlatLayerSet & {
  score?: number | null
}

export type LegacyCardMarket = Partial<ComputedLegacyMarket> & {
  psa10Premium?: number | null
  liquidity?: number | null
  trend?: number | null
  scarcity?: number | null
  depth?: number | null
  volatility?: number | null
  longTerm?: number | null
  stability?: number | null
  confidence?: number | null
}

export type MomentumTrend = "rising" | "falling" | "flat"

export type MomentumSignal = {
  trend?: MomentumTrend | string | null
  strength?: number | null
}

export type PlayerSignals = {
  tracked?: boolean
  heat?: string | null
  price?: string | null
  trending_up?: boolean
  trending_down?: boolean
  momentum?: MomentumSignal
}

export type PlayerStats = Record<string, number | string | null | undefined>

export type LegacyScoreGroup = {
  snapshotScores?: LayerRecord<NullableNumber>
  scoutScores?: LayerRecord<NullableNumber>
  analystScores?: LayerRecord<NullableNumber>
}

/* =========================
   DLR contract on Player
   ========================= */

/* Last game played — short-term display signal.
   NEVER feeds Snapshot scoring or DLR. */
export type LastGame = {
  date?: string | null
  // hitter fields
  AB?: number | null
  H?: number | null
  HR?: number | null
  RBI?: number | null
  BB?: number | null
  K?: number | null
  SB?: number | null
  // pitcher fields
  IP?: number | null
  ER?: number | null
  SO?: number | null
}

/* Rolling 7-day stats — short-term display signal.
   NEVER feeds Snapshot scoring or DLR. */
export type Last7 = {
  AVG?: number | null
  OPS?: number | null
  AB?: number | null
  SB?: number | null
}

export type PlayerTracker = {
  /* Sample-size counters — the hitter/pitcher switch.
     AB present  → hitter mode
     IP present  → pitcher mode */
  AB?: number | null
  IP?: number | null
  PA?: number | null
  G?: number | null

  /* Live current-season hitter totals (accumulating, reset monthly).
     Source for Performance Snapshot scoring. */
  R?: number | null
  H?: number | null
  HR?: number | null
  RBI?: number | null
  BB?: number | null
  K?: number | null
  SB?: number | null

  /* Derived rates — hitter. */
  AVG?: number | null
  OBP?: number | null
  OPS?: number | null

  /* Live current-season pitcher totals. */
  W?: number | null
  L?: number | null
  ERA?: number | null
  WHIP?: number | null
  SO?: number | null

  /* Short-term display signals — live but not scoring inputs. */
  lastGame?: LastGame
  last7?: Last7

  /* Rolling period stats — Pass 44: now feeds DLR scoring via playerBridge.blendPerformance().
   * Also drives signal engine (lib/signals/signalEngine.ts) for BAT/PWR/CMD/RUN/VAL display.
   * See: data/dlr/REACTIVE_ORGANISM_RULES.md for blend weights and delta math. */
  rolling?: {
    days7?:  {
      // hitter
      AB?: number; H?: number; HR?: number; RBI?: number; BB?: number; K?: number; SB?: number; AVG?: number; OPS?: number;
      // pitcher
      G?: number; IP?: number; W?: number; L?: number; SO?: number; ERA?: number; WHIP?: number;
    } | null
    days15?: {
      AB?: number; H?: number; HR?: number; RBI?: number; BB?: number; K?: number; SB?: number; AVG?: number; OPS?: number;
      G?: number; IP?: number; W?: number; L?: number; SO?: number; ERA?: number; WHIP?: number;
    } | null
    days30?: {
      AB?: number; H?: number; HR?: number; RBI?: number; BB?: number; K?: number; SB?: number; AVG?: number; OPS?: number;
      G?: number; IP?: number; W?: number; L?: number; SO?: number; ERA?: number; WHIP?: number;
    } | null
  } | null

  /* Split AB by data source — required by resolvePlayerState. */
  mlbAB?: number | null
  minorAB?: number | null

  /* Latching memory bit: set true the first time mlbAB ≥ 75 and never unset.
     Drives the mlb_locked rule (demoted vets keep their MLB DLR). */
  everReachedMLBSample?: boolean
}

export type DLRMovementMonthly = {
  lastUpdated?: string | null
  performanceDelta?: number | null
  sampleConfidence?: number | null
  adjustment?: number | null
}

export type DLRMovement = {
  baseDLR?: number | null
  currentDLR?: number | null
  running?: number | null
  monthly?: DLRMovementMonthly
}

export type DLRHistoryEntry = {
  date: string
  previous: number
  new: number
  change: number
}

export type PlayerDLR = {
  score?: number | null
  /**
   * Monthly Memory Layer — Monthly Settlement Anchor (Section 3A / 4A).
   *
   * monthlySettledScore is the organism's highest-confidence memory anchor
   * when fresh. It is the weighted consolidation of weekly DLR rows for the
   * current or immediately prior calendar month.
   *
   * STALENESS RULE: populated ONLY when settlement_month is current or prior
   * calendar month. Older settlements → null → weekly layer takes priority.
   * Staleness check lives in lib/dlr/hydrateDLR.ts:fetchMonthlySettlement().
   *
   * Movement-anchor priority in calculateDLRMovement.ts:
   *   1. monthlySettledScore ← fresh monthly settlement (highest confidence)
   *   2. persistedScore      ← weekly committed baseline (Section 2A)
   *   3. score               ← in-session computed fallback
   *   4. 50                  ← cold-start emergency fallback
   *
   * WRITE: data/dlr/settleMonthlyDLR.ts
   * READ:  lib/dlr/hydrateDLR.ts:fetchMonthlySettlement() with staleness check.
   * See: data/dlr/DLR_MONTHLY_SETTLEMENT_RULES.md
   */
  monthlySettledScore?: number | null
  /**
   * Section 2A — Persisted DLR Read Path Contract.
   *
   * persistedScore is the organism's durable weekly memory anchor:
   * the last committed DLR value written to Supabase players.dlr_score
   * by writeWeeklySnapshot() and hydrated onto the player object
   * BEFORE the scoring pipeline runs.
   *
   * Movement-anchor priority: see monthlySettledScore above.
   *
   * WRITE: data/dlr/writeWeeklySnapshot.ts
   * READ:  lib/dlr/hydrateDLR.ts:fetchPersistedDLR()
   * NEVER: query Supabase directly inside calculateDLRMovement.ts.
   * See: data/dlr/PERSISTED_READ_PATH_RULES.md for full contract.
   */
  persistedScore?: number | null
  weeklyHistory?: number[]
  performance?: PerformanceData | LayerRecord<NullableNumber>
  media?: MediaData | LayerRecord<NullableNumber>
  cardMarket?: LegacyCardMarket
  market?: { score?: number | null } & Record<string, unknown>
}

export type PlayerVault = {
  awards?: { allStar?: number; mvp?: number } & Record<string, number | undefined>
  visualTier?: string
}

export type PlayerMeta = {
  lastUpdated?: string | null
  season?: string | number | null
  confidence?: number | null
}

/* ─────────────────────────────────────────────────────────────
   CAREER LINEAGE TYPES  (Pass 37)
   Display-only — NEVER used for scoring.
   See data/dlr/CAREER_SNAPSHOT_RULES.md for full specification.
   ───────────────────────────────────────────────────────────── */

/** Hitting totals for a single developmental stage. Display-only. */
export type CareerStageHitting = {
  G?:   number | null
  AB?:  number | null
  H?:   number | null
  HR?:  number | null
  RBI?: number | null
  BB?:  number | null
  K?:   number | null
  SB?:  number | null
  AVG?: number | null
  OBP?: number | null
  SLG?: number | null
  OPS?: number | null
}

/** Pitching totals for a single developmental stage. Display-only. */
export type CareerStagePitching = {
  G?:    number | null
  GS?:   number | null
  IP?:   number | null
  W?:    number | null
  L?:    number | null
  ERA?:  number | null
  WHIP?: number | null
  SO?:   number | null
  BB?:   number | null
  /** K/9 — derived for display; not sourced directly. */
  K9?:   number | null
}

/** A single stage entry in a player's developmental lineage.
 *  label examples: "HS" | "NCAA" | "A-BALL" | "AA" | "AAA" | "MiLB" | "MLB"
 *  hitting and pitching are mutually exclusive for most players;
 *  dual-domain players (requiresDualDomain: true) may populate both. */
export type CareerLineageStage = {
  label:     string
  hitting?:  CareerStageHitting  | null
  pitching?: CareerStagePitching | null
}

/**
 * Career lineage — stage-keyed developmental progression history.
 *
 * Purpose: "How did this player get here?"
 * Rendered by the Career Snapshot panel (KNOWLEDGE › CAREER sub-mode, Tier 1).
 *
 * Distinct from careerAverages (single aggregate row).
 * stages[] is ordered chronologically: earliest → most recent.
 * Totals are per-stage — NOT blended across stages.
 * DO NOT use for DLR scoring.
 * See data/dlr/CAREER_SNAPSHOT_RULES.md.
 */
export type CareerLineage = {
  stages: CareerLineageStage[]
}

/* Career averages — display-only context. NEVER used for scoring. */
export type PlayerCareer = {
  // hitter
  AVG?: number | null
  OPS?: number | null
  H?: number | null
  HR?: number | null
  RBI?: number | null
  BB?: number | null
  K?: number | null
  AB?: number | null
  G?: number | null
  // pitcher
  W?: number | null
  L?: number | null
  ERA?: number | null
  IP?: number | null
  SO?: number | null
  WHIP?: number | null
}

export type Player = {
  id: string
  name?: string
  level?: string
  tier?: string
  stage?: "AMATEUR" | "MINORS" | "MLB" | string
  mlbDebutYear?: number
  mlbYears?: number
  serviceYears?: number
  card?: string
  cardImage?: string
  position?: string
  pos?: string
  team?: string
  org?: string
  age?: number
  birthdate?: string
  draftYear?: number
  draftRank?: number
  draftPick?: number
  bats?: string
  throws?: string
  height?: string | number
  weight?: string | number
  school?: string
  bio?: string
  scout?: LegacyScoreGroup
  career?: LegacyScoreGroup
  scouting?: PlayerStats
  hitting?: PlayerStats | null
  pitching?: PlayerStats | null
  knowledge?: KnowledgeData
  performance?: PerformanceData
  /**
   * Secondary performance domain for dual-domain (two-way) players.
   *
   * For a P/DH player:  performance = pitching (primary domain, DLR engine input)
   *                     dualDomainPerformance = hitting (secondary domain, BATS context)
   * For an OF/P player: performance = hitting (primary domain, DLR engine input)
   *                     dualDomainPerformance = pitching (secondary domain, ARMS context)
   *
   * The DLR engine reads performance only.
   * BATS/ARMS context switching may read dualDomainPerformance in a future pass.
   * DO NOT use dualDomainPerformance for DLR scoring until weighted dual-role is implemented.
   * See data/dlr/DUAL_DOMAIN_RULES.md for full specification.
   */
  dualDomainPerformance?: PerformanceData
  /**
   * Dual-domain intelligence flag.
   * Set true when a player requires both hitting AND pitching performance structures
   * because official sources meaningfully present both statistical domains.
   *
   * Detection triggers (Collector agent):
   *   - Official position listed as P/DH, P/OF, P/IF
   *   - Official "two-way player" designation
   *   - Meaningful pitching stats AND meaningful hitting stats co-present in source data
   *
   * This flag does NOT change DLR scoring.
   * It gates dual-domain ingestion checks and context-switching readiness.
   * See data/dlr/DUAL_DOMAIN_RULES.md for full specification.
   */
  requiresDualDomain?: boolean
  media?: MediaData
  cardMarket?: LegacyCardMarket
  marketSnapshot?: MarketSnapshot
  /**
   * Pre-Bowman market personality archetype.
   * Drives projected hobby intelligence display (display layer only).
   * Does NOT feed DLR scoring — scoreMarket() reads marketSnapshot only.
   * Activates projected market helpers in projectedMarketHelpers.ts.
   */
  marketArchetype?: MarketArchetypeName
  signals?: PlayerSignals
  tracker?: PlayerTracker
  careerAverages?: PlayerCareer
  /**
   * Career lineage — stage-keyed developmental progression history.
   * Rendered by the Career Snapshot panel in IntelStack (KNOWLEDGE › CAREER, Tier 1).
   * stages[] ordered chronologically: earliest → most recent.
   * Display-only. DO NOT use for DLR scoring.
   * See data/dlr/CAREER_SNAPSHOT_RULES.md.
   */
  careerLineage?: CareerLineage
  dlr?: PlayerDLR
  dlrMovement?: DLRMovement
  dlrHistory?: DLRHistoryEntry[]
  vault?: PlayerVault
  meta?: PlayerMeta
}
