import type { ComputedLegacyMarket } from "@/lib/market/history"
import type { MarketSnapshot } from "@/lib/market/types"

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
  snapshot?: LayerRecord<NullableNumber | string>
}

export type MediaData = FlatLayerSet

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

export type PlayerSignals = {
  tracked?: boolean
  heat?: string | null
  price?: string | null
  trending_up?: boolean
  trending_down?: boolean
}

export type PlayerStats = Record<string, number | string | null | undefined>

export type LegacyScoreGroup = {
  snapshotScores?: LayerRecord<NullableNumber>
  scoutScores?: LayerRecord<NullableNumber>
  analystScores?: LayerRecord<NullableNumber>
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
  media?: MediaData
  cardMarket?: LegacyCardMarket
  marketSnapshot?: MarketSnapshot
  signals?: PlayerSignals
  dlr?: {
    performance?: LayerRecord<NullableNumber>
    media?: LayerRecord<NullableNumber>
    cardMarket?: LegacyCardMarket
  }
}
