export type Player = {

  id: string

  name?: string

  level?: string

  tier?: string
  stage?: "AMATEUR" | "MINORS" | "MLB"
  mlbDebutYear?: number

  cardImage?: string

  position?: string

  team?: string
  org?: string

  age?: number
  draftYear?: number
  draftRank?: number
  draftPick?: number

  bats?: string

  throws?: string

  bio?: string
  knowledge?: unknown
  performance?: unknown
  media?: unknown
  cardMarket?: unknown

  signals?: {

    tracked?: boolean

    trending_up?: boolean

    trending_down?: boolean

  }

}
