# Diamond Ledger Handoff For Claude

## Product Summary

Diamond Ledger is a baseball-card/player intelligence platform. A user selects a baseball player from a tracker table, the player's card appears in a sci-fi vault, and the app shows a Diamond Ledger Rating (`DLR`) plus three right-side intelligence panels.

The product is meant to combine four categories of intelligence:

- `Knowledge`: stable player context: bio, team, draft rank, position, height/weight, handedness, scouting profile, development path, ceiling/floor/risk.
- `Performance`: baseball stats and calculated performance signals: previous-season/career stat lines, hot/cold triggers, power/command indicators, H/AB, HR/AB, pitcher run-control, etc.
- `Media`: attention/hype signals: mentions, headlines, social buzz, narrative strength, public momentum, attention decay.
- `Market`: eventually pure card-market data: raw price, PSA 10 price, sales volume, spread, active listings, sold comps, pop count, liquidity, risk, edge, buy/hold/sell, valuation, confidence, DLR contribution.

The design language is "premium card-back information meets futuristic trading desk." The right panels are named `SNAPSHOT`, `SCOUT`, and `ANALYST`.

## Current Stack

- Framework: Next.js `16.2.1`
- React: `19.2.4`
- Language: TypeScript, but many local data/scoring functions currently use `any`
- Data storage today: static TypeScript files in `/data`, no backend/database yet
- Primary UI entry: `/app/page.tsx`

## High-Level Runtime Flow

Current flow is entirely local/static:

```text
static data files
  data/playersDraft2026.ts
  data/playersDraft2025.ts
  data/playersDraft2018.ts
  data/players/<player>_knowledge.ts
  data/players/<player>_performance.ts
  data/players/<player>_media.ts
  data/players/<player>_market.ts

        ↓ imported directly

app/page.tsx
  - merges draft-year arrays
  - filters player universe: DRAFT / PLAYERS / TRACKED
  - stores selectedPlayerId
  - runs calculateDLR(selectedPlayer)
  - passes selected player into HeroVault and IntelStack

        ↓ props

HeroVault
  - displays selected card
  - animates DLR counter

PlayerList
  - table of players
  - local filters/sorts
  - calculated signal icons

IntelStack
  - right-side panels
  - chooses renderers by mode:
    Knowledge / Performance / Media / Market
  - renders Snapshot / Scout / Analyst tier panels
```

Future intended flow:

```text
external feeds / manual inputs
  MLB stats, MiLB stats, social/media signals, eBay sold comps, PSA population, active listings

        ↓

ingestion jobs / adapters

        ↓

database
  players
  cards
  player_stats_snapshots
  player_signal_timeseries
  media_signal_timeseries
  market_comps
  market_snapshots
  dlr_scores

        ↓

scoring engine
  Knowledge score
  Performance score
  Media score
  Market score
  DLR total
  confidence
  signal explanations

        ↓

API contracts

        ↓

frontend tracker + vault + tier panels
```

## Important Current Files

- `/app/page.tsx`: app shell, tabs, selected player state, DLR calculation, prop wiring.
- `/components/panels/PlayerList.tsx`: tracker table, filters, stat columns, calculated hot/power/value icons.
- `/components/HeroVault.tsx`: central vault/card display and DLR counter.
- `/components/panels/IntelStack.tsx`: right-side panel renderer for Knowledge/Performance/Media/Market.
- `/data/dlr/calculateDLR.ts`: currently imported by `app/page.tsx`, but returns a different shape than page expects.
- `/data/dlr/dlr.ts`: alternative DLR calculator returning `{ rating, tier }`; likely closer to current page contract.
- `/data/dlr/signals/playerSignals.ts`: tracker/performance signal helper and performance stat-table helper.
- `/data/playersDraft2025.ts`, `/data/playersDraft2026.ts`, `/data/playersDraft2018.ts`: current player records.
- `/data/players/eli_willits_*`: representative deeply modeled player.
- `/data/players/casey_mize_*`: representative pitcher with performance data.

## Current Player Shape

There is no single complete canonical schema yet. `data/types/player.ts` is older/minimal:

```ts
export type Player = {
  id: string
  name?: string
  level?: string
  tier?: string
  cardImage?: string
  position?: string
  team?: string
  age?: number
  bats?: string
  throws?: string
  bio?: string
  signals?: {
    tracked?: boolean
    trending_up?: boolean
    trending_down?: boolean
  }
}
```

Actual player records are richer and mostly untyped. Representative record:

```ts
{
  id: "eli_willits",
  tier: "DRAFT",
  name: "Eli Willits",
  team: "WSH",
  org: "WSH",
  position: "SS",
  age: 17,
  draftYear: 2025,
  draftRank: 1,
  draftPick: 1,
  bats: "S",
  throws: "R",
  card: "/cards/2025_draft/eli_willits.png",
  knowledge: eli_willits_knowledge,
  performance: eli_willits_performance,
  media: eli_willits_media,
  signals: { tracked: true, heat: null, price: null },
  pitching: null,
  hitting: {
    AVG: .316,
    H: 130,
    R: null,
    HR: 18,
    RBI: 64,
    BB: null,
    K: null,
    SB: 12,
    OPS: .914
  }
}
```

## Current Embedded Data Layers

### Knowledge

Example `/data/players/eli_willits_knowledge.ts`:

```ts
bio: {
  snapshot: {
    height: "6'1",
    weight: "180",
    bats: "S",
    throws: "R",
    school: "Fort Cobb-Broxton HS"
  },
  scoutScores: {
    arch: .58,
    path: .65,
    frame: .45,
    ath: .72,
    proj: .82
  },
  scout: {
    birthdate: "2007-12-09",
    signBonus: "8.2M",
    archetype: "athletic contact SS",
    devPath: "high school advanced",
    frameScale: "projectable lean"
  },
  analystScores: {
    dev: .72,
    risk: .42,
    value: .82,
    org: .85,
    pedigree: .92
  },
  analyst: {
    serviceTime: 0,
    options: 3,
    injuryIdx: .08,
    pedigree: .92,
    devCurve: .78,
    orgValue: .85,
    assetRisk: .42,
    longValue: .81
  }
}
```

Knowledge is currently nested by:

```text
knowledge.bio.snapshot / scout / analyst
knowledge.scout.snapshot / scout / analyst
knowledge.career.snapshot / scout / analyst
```

### Performance

Hitter example:

```ts
export const eli_willits_performance = {
  kind: "hitter",
  snapshot: {
    g: 61,
    ab: 410,
    avg: 0.316,
    hr: 18,
    rbi: 64,
    slg: 0.581,
    ops: 0.914,
    sb: 12,
    sbAttempts: 15
  },
  scout: {
    kRate: 14.2,
    bbRate: 13.4,
    barrel: 9.1,
    hardHit: 44.8,
    avgEV: 90.6
  },
  analyst: {
    xAVG: 0.292,
    xSLG: 0.487,
    plateDiscTrend: 0.71,
    contactTrend: 0.78,
    injuryTrend: 0.88,
    sprintTrend: 0.74,
    posValue: 0.81,
    consistency: 0.69
  }
}
```

Pitcher example:

```ts
export const casey_mize_performance = {
  kind: "pitcher",
  snapshot: {
    g: 28,
    ip: 149.0,
    wL: "14-6",
    so: 139,
    soBb: 3.86,
    whip: 1.27,
    era: 3.87,
    hrAllowed: 18
  },
  scout: {
    kPercent: 24.8,
    bbPercent: 6.1,
    kMinusBB: 18.7,
    avgEV: 89.4,
    whiff: 27.2
  },
  analyst: {
    xERA: 3.65,
    stuffPlus: 102,
    pitchMixGrade: 0.58,
    veloTrend: 0.55,
    commandTrend: 0.61,
    injuryTrend: 0.63,
    roleStability: 0.78,
    war: 2.4
  }
}
```

### Media

```ts
export const eli_willits_media = {
  snapshot: {
    mentions: .62,
    headlineImpact: .65,
    highlightFactor: .58,
    socialBuzz: .64
  },
  scout: {
    fanRecognition: .58,
    teamVisibility: .62,
    interviewPresence: .55,
    narrativeStrength: .72,
    milestoneAttention: .60
  },
  analyst: {
    prospectPedigree: .80,
    hypeTrend: .70,
    mediaStability: .60,
    storyDurability: .68,
    breakoutProbability: .68,
    publicMomentum: .65,
    attentionDecay: .42,
    confidence: .65
  }
}
```

### Market

There are `cardMarket` objects embedded on many player records:

```ts
cardMarket: {
  psa10Premium: 2.48,
  liquidity: .56,
  scarcity: .89,
  trend: .76,
  volatility: .68,
  depth: .54,
  longTerm: .85,
  stability: .72,
  confidence: .75
}
```

There are also `data/players/*_market.ts` files, but market is not consistently imported into all player records yet. Market is conceptually being changed from three-option labels into pure data rows:

```text
Snapshot: RAW $, PSA10 $, VOL #, SPRD %/$, MOM %
Scout: POP #, LIST #, SOLD #, LIQ score/#, RISK score/%
Analyst: EDGE %, BUY/HOLD/SELL, MOM %, VAL $/%, CONF %, DLR +/-
```

## Raw Signals: Current Storage

Current app stores signals as denormalized values directly on player objects:

```ts
signals: {
  tracked: true,
  heat: null,
  price: null
}
```

Calculated display signals are generated in-memory from the current player row and current view mode:

- `form`: hot/cold/neutral
- `surge`: hot/cold/neutral
- `value`: up/down/flat

There is no time-series storage yet. The intended future need is time-windowed signal history for things like "hot over 15-30 days", based on games played, AB, IP, H/AB, HR/AB, SO/BB, etc.

Recommended future tables:

```text
player_signal_snapshots
  player_id
  date
  source
  stat_window
  ab
  h
  hr
  ip
  so
  bb
  avg
  ops
  era
  whip
  calculated_form
  calculated_surge
  calculated_value
  confidence

market_snapshots
  player_id
  card_key
  date
  raw_avg
  psa10_avg
  active_listings
  sold_count
  spread
  momentum
  liquidity
  risk

dlr_scores
  player_id
  date
  knowledge_score
  performance_score
  media_score
  market_score
  final_dlr
  tier
  confidence
```

## Current DLR / Scoring Situation

There are two DLR calculators.

### 1. Imported by the app: `/data/dlr/calculateDLR.ts`

`app/page.tsx` imports:

```ts
import { calculateDLR } from "@/data/dlr/calculateDLR"
```

But this calculator returns:

```ts
return {
  dlr: Number(finalDLR.toFixed(2)),
  knowledge: {...},
  performance: {...}
}
```

Current app expects:

```ts
const result = calculateDLR(selectedPlayer)
setDlr(result.rating)
setDlrTier(result.tier)
```

So there is a contract mismatch: `result.rating` / `result.tier` are not returned by this imported calculator. Because `HeroVault` has default props, the center display may still show a default-looking score, masking the issue.

### 2. Alternative calculator: `/data/dlr/dlr.ts`

This one returns the expected shape:

```ts
export type DLROutput = {
  rating: number
  tier: string
}
```

And blends:

```ts
rating = clamp(
  performanceScore * .46 +
  mediaScore * .18 +
  marketScore * .36
)
```

This file uses `player.dlr.performance`, `player.dlr.media`, and `player.dlr.cardMarket`. Many player records include this `dlr` object. This is probably closer to the currently intended top-level DLR contract.

### Performance Signal Logic

`/data/dlr/signals/playerSignals.ts` drives table icons and Performance Snapshot explanations.

Hitter logic:

```ts
const form =
  hitRate !== null && hitRate >= .300 ? "hot" :
  avg !== null && avg >= .300 ? "hot" :
  hitRate !== null && hitRate < .240 ? "cold" :
  avg !== null && avg < .240 ? "cold" :
  "neutral"

const surge =
  hrRate !== null && hrRate >= .04 ? "hot" :
  slugging !== null && slugging >= .520 ? "hot" :
  ops !== null && ops >= .850 ? "hot" :
  hrRate !== null && hrRate < .015 && ops !== null && ops < .680 ? "cold" :
  "neutral"

const value =
  (form === "hot" || surge === "hot") && media < .66 ? "up" :
  (form === "cold" || surge === "cold") && media > .7 ? "down" :
  "flat"
```

Pitcher logic uses SO/BB, K/IP, ERA, WHIP, and media pulse.

## Frontend Contract

### `app/page.tsx`

Important state:

```ts
selectedPlayerId: string | null
scanComplete: boolean
playerUniverse: "draft" | "players" | "tracked"
systemMode: "knowledge" | "performance" | "media" | "market"
knowledgeMode: "bio" | "scout" | "career"
dlr: number | null
dlrTier: string
```

Important prop wiring:

```tsx
<PlayerList
  selected={selectedPlayerId}
  onSelect={setSelectedPlayerId}
  mode={playerUniverse}
/>

<HeroVault
  playerSelected={!!selectedPlayer}
  cardImage={selectedPlayer?.card}
  dlr={dlr ?? undefined}
  dlrTier={dlrTier}
  onScanComplete={() => setScanComplete(true)}
/>

<IntelStack
  player={selectedPlayer}
  scanComplete={scanComplete}
  mode={intelMode}
  infoMode={infoMode}
  dlrTier={dlrTier}
/>
```

### `PlayerList` Expected Fields

The tracker expects:

```ts
{
  id: string
  name?: string
  team?: string
  age?: number
  position?: string
  draftYear?: number
  draftRank?: number
  tier?: string
  hitting?: {
    AVG?: number
    H?: number
    HR?: number
    RBI?: number
    BB?: number
    K?: number
    OPS?: number
  }
  pitching?: {
    ERA?: number
    H?: number
    W?: number
    K?: number
    WHIP?: number
    IP?: number
  }
  performance?: {
    kind?: "hitter" | "pitcher"
    snapshot?: Record<string, number | string | null>
    scout?: Record<string, number | string | null>
    analyst?: Record<string, number | string | null>
  }
  media?: {
    snapshot?: Record<string, number | string | null>
    analyst?: Record<string, number | string | null>
  }
  signals?: {
    tracked?: boolean
    heat?: string | null
    price?: string | null
  }
}
```

Current tracker columns:

```text
PLAYER | BAT/CMD | PWR/RUN | VAL |
Hitter: AVG H HR RBI BB K OPS
Pitcher: ERA H W K WHIP IP —
DY | DR | TIER | TM | AGE | POS
```

Universe filters:

```text
DRAFT   -> draftYear === 2026
PLAYERS -> draftYear !== 2026
TRACKED -> signals.tracked
```

Stat view filters:

```text
ALL  -> everyone, hitter stat layout
BATS -> non-pitchers
ARMS -> pitchers only
```

Pitchers are detected by position: `P`, `SP`, `RP`, `RHP`, `LHP`.

### `HeroVault` Expected Fields

```ts
type HeroVaultProps = {
  playerSelected: boolean
  cardImage?: string
  dlr?: number
  dlrTier?: string
  onScanComplete?: () => void
}
```

Notes:

- `HeroVault` currently maps `/cards/...` to `/cards_display/...` for standardized presentation images.
- It animates DLR counter from `0` to `dlr`.
- If `dlr` is undefined, default prop is `92`.
- If `dlrTier` is empty, the visual may not reveal that the DLR contract is broken.

### `IntelStack` Expected Fields

```ts
type IntelStackProps = {
  player: any
  scanComplete: boolean
  mode: "knowledge" | "performance" | "media" | "market"
  infoMode?: "bio" | "scout" | "career"
}
```

`IntelStack` internally reads:

```ts
player.knowledge
player.performance
player.media
player.cardMarket
player.hitting
player.pitching
player.position
player.team
player.org
player.draftYear
player.draftRank
player.card
```

## What Is Wired vs Mocked

### Wired

- Static player datasets are imported and rendered.
- Tracker filtering/sorting works from static data.
- Tracker hot/power/value icons are calculated from `hitting`, `pitching`, `performance.snapshot`, and `media`.
- Center vault card display works.
- Standardized card display layer exists at `/public/cards_display`.
- Right-side Knowledge/Performance/Media panel renderers are mostly wired to static data.
- Eli Willits and Casey Mize have deeper player-specific `knowledge`, `performance`, and `media` files.
- Performance Snapshot has actual stat-table rendering and calculated signal explanations.

### Partially Wired

- DLR scoring: two calculators exist, and the imported one does not match the app's expected `{ rating, tier }` contract.
- Market: there are placeholder/embedded `cardMarket` fields, but the UI should ultimately become pure data rows rather than three-option grids.
- Knowledge Bio Snapshot is currently being redesigned toward a Bowman-card-back inspired identity strip with team accents; this is in progress.
- Right-panel tier row totals (`tier1Rows`, `tier2Rows`, `tier3Rows`) are computed but currently not visibly used in the final render.

### Mocked / Not Yet Built

- No backend API.
- No database.
- No real ingestion.
- No time-series signal storage.
- No eBay/CardPro/PSA integrations.
- No real market comps or live prices.
- No monthly subscription/user layer.
- No persisted user tracking list; `signals.tracked` is static.
- No confidence model for market data quality beyond placeholder fields.

## Recommended Immediate Cleanup Before Backend Design

1. Define one canonical `Player` schema that reflects actual records.
2. Split `Player` from `PlayerSnapshot`, `PerformanceSnapshot`, `MediaSnapshot`, `MarketSnapshot`, `DLRScore`.
3. Decide which DLR calculator is canonical:
   - Either fix `/data/dlr/calculateDLR.ts` to return `{ rating, tier, components }`
   - Or switch `app/page.tsx` to import `/data/dlr/dlr.ts`
4. Convert `Market` UI contract from option-grid rows to numeric rows.
5. Decide raw signal storage:
   - static current player fields for demo
   - time-series snapshots for real product
6. Add a `tracked_players` concept for users/subscriptions later.

## Suggested Future API Shape

```ts
GET /api/players
GET /api/players/:id
GET /api/players/:id/intel
GET /api/players/:id/dlr
GET /api/players/:id/performance?window=30d
GET /api/players/:id/media?window=30d
GET /api/players/:id/market?cardType=bowman-1st-auto
POST /api/tracked-players
DELETE /api/tracked-players/:playerId
```

Example `/api/players/:id/intel` response:

```ts
{
  player: {
    id: "eli_willits",
    name: "Eli Willits",
    team: "WSH",
    org: "WSH",
    position: "SS",
    age: 17,
    draftYear: 2025,
    draftRank: 1,
    card: "/cards_display/2025_draft/eli_willits.png"
  },
  dlr: {
    rating: 92,
    tier: "ELITE",
    confidence: 74,
    components: {
      knowledge: 18,
      performance: 31,
      media: 14,
      market: 29
    }
  },
  tracker: {
    form: "hot",
    surge: "hot",
    value: "up",
    formReason: "H/AB 0.317 is above the bat-heat trigger.",
    surgeReason: "HR/AB 4.4% is inside the power trigger.",
    valueReason: "Performance signal is ahead of media pulse 0.64."
  },
  knowledge: { ... },
  performance: { ... },
  media: { ... },
  market: {
    snapshot: {
      rawAvg: null,
      psa10Avg: null,
      volume: null,
      spread: null,
      momentum: null
    },
    scout: {
      pop: null,
      activeListings: null,
      soldCount: null,
      liquidity: null,
      risk: null
    },
    analyst: {
      edge: null,
      action: null,
      valuation: null,
      confidence: null,
      dlrContribution: null
    }
  }
}
```

## Short Version For Claude

The frontend is a static Next app with player records imported from TypeScript data files. It has a clear visual/product model but not yet a real backend. The biggest architectural work is to turn the current denormalized static records into a schema with time-series performance/media/market snapshots, make DLR a canonical scoring contract, and expose a clean API to the existing UI. Market should be treated as factual numeric data, not scout-style three-choice labels.
