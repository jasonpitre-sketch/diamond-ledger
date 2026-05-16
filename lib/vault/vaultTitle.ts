/* =============================================================================
   DIAMOND LEDGER — VAULT TITLE ENGINE  (Pass 35)
   -----------------------------------------------------------------------------
   Resolves the dynamic player identity title displayed in HeroVault.

   Philosophy
   ──────────
   Titles are NOT DLR tier labels (HOLD / WATCHLIST / ELITE).
   They represent perceived player intelligence identity — the system's read
   of who this player is right now in their developmental arc.

   Each ecosystem carries its own emotional register:
     HS      — volatile · projection-driven · high-upside
     NCAA    — disciplined · refined · trustworthy
     MiLB    — professional · pressure-driven · refining talent
     ROOKIE  — explosive · unstable · highly reactive
     MLB     — realized · premium · proven

   DLR Band Map
   ────────────
   Seven bands (0 = low → 6 = apex) derived from a DLR 0–100 score.
   Thresholds are intentionally asymmetric: pre-pro players cluster 40–70.

   | Band | DLR range | Identity level |
   |------|-----------|----------------|
   |  0   |  0–29     | low            |
   |  1   | 30–44     | stable         |
   |  2   | 45–54     | contributor    |
   |  3   | 55–64     | regular        |
   |  4   | 65–74     | impact         |
   |  5   | 75–84     | anchor         |
   |  6   | 85–100    | apex           |

   DO NOT
   ──────
   • Do not map DLR tier names (HOLD/WATCHLIST etc.) to vault titles.
   • Do not hardcode titles on individual players.
   • Do not change band thresholds without a governance pass.
   • Do not implement media/market influence here yet.

   Governance: data/dlr/VAULT_TITLE_RULES.md
   ============================================================================= */

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

/** The five title ecosystems. */
export type VaultEcosystem =
  | "hs"
  | "ncaa"
  | "milb"
  | "rookie"
  | "mlb"

/* ─────────────────────────────────────────────────────────────
   DLR BAND RESOLUTION
   DO NOT change thresholds without a governance pass.
   ───────────────────────────────────────────────────────────── */

const BAND_THRESHOLDS = [
  { min: 85, band: 6 },
  { min: 75, band: 5 },
  { min: 65, band: 4 },
  { min: 55, band: 3 },
  { min: 45, band: 2 },
  { min: 30, band: 1 },
  { min:  0, band: 0 },
] as const

function dlrBand(dlr: number): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
  for (const { min, band } of BAND_THRESHOLDS) {
    if (dlr >= min) return band as 0 | 1 | 2 | 3 | 4 | 5 | 6
  }
  return 0
}

/* ─────────────────────────────────────────────────────────────
   TITLE LADDERS
   Indexed by band: [low, stable, contributor, regular, impact, anchor, apex]
   ───────────────────────────────────────────────────────────── */

const LADDERS: Record<VaultEcosystem, readonly [string, string, string, string, string, string, string]> = {

  // HS — volatile · projection-driven · high-upside
  hs: [
    "PROSPECT",
    "EMERGING",
    "ASCENDING",
    "HIGH RISER",
    "PHENOM",
    "BLUE CHIP",
    "BLUE CHIP",
  ],

  // NCAA — disciplined · refined · structured · trustworthy
  ncaa: [
    "EVALUATION",
    "VALIDATED",
    "BREAKOUT",
    "PROVEN",
    "IMPACT",
    "PREMIER",
    "FRANCHISE",
  ],

  // MiLB — professional · pressure-driven · refining talent
  milb: [
    "PROJECT",
    "DEVELOPING",
    "REFINED",
    "ADVANCING",
    "ASCENDING",
    "NEAR READY",
    "READY",
  ],

  // ROOKIE — explosive · unstable · media-sensitive · highly reactive
  rookie: [
    "ADJUSTING",
    "FLASHING",
    "ARRIVING",
    "STABILIZING",
    "BREAKOUT",
    "HEADLINER",
    "SUPERSTAR",
  ],

  // MLB — realized · premium · proven · apex-level
  mlb: [
    "ESTABLISHED",
    "PRODUCER",
    "CONTRIBUTOR",
    "REGULAR",
    "IMPACT",
    "ANCHOR",
    "FRANCHISE",
  ],

} as const

/* ─────────────────────────────────────────────────────────────
   PUBLIC API
   ───────────────────────────────────────────────────────────── */

/**
 * Resolve the player identity title for display in HeroVault.
 *
 * @param ecosystem  Which ladder to pull from (hs / ncaa / milb / rookie / mlb)
 * @param dlr        Current DLR score (0–100)
 * @returns          Identity title string (e.g. "BLUE CHIP", "FRANCHISE", "READY")
 */
export function resolveVaultTitle(
  ecosystem: VaultEcosystem,
  dlr: number
): string {
  return LADDERS[ecosystem][dlrBand(dlr)]
}

/**
 * Derive which ecosystem ladder to use from available player context.
 *
 * Priority:
 *   1. ROOKIE tier override  — transitional volatility identity
 *   2. competitionLevel      — most accurate developmental source
 *   3. playerUniverse tab    — fallback from navigation context
 *   4. default → "hs"        — pre-pro draft board fallback
 *
 * @param playerUniverse     Active tab context (hs / ncaa / draft / minors / majors / tracked)
 * @param competitionLevel   From player.performance.competitionLevel
 * @param tier               Player tier string (ROOKIE, AAA, MLB, etc.)
 */
export function resolveVaultEcosystem(
  playerUniverse: string,
  competitionLevel?: string | null,
  tier?: string | null
): VaultEcosystem {

  // 1. Rookie tier absolute override
  const t = (tier ?? "").toUpperCase()
  if (t === "ROOKIE" || t === "ROK") return "rookie"

  // 2. Competition level from performance data
  const cl = (competitionLevel ?? "").toUpperCase()
  if (cl === "HS")                return "hs"
  if (cl === "NCAA")              return "ncaa"
  if (cl === "MILB" || cl === "MiLB".toUpperCase()) return "milb"
  if (cl === "MLB")               return "mlb"

  // 3. Universe tab context
  const u = (playerUniverse ?? "").toLowerCase()
  if (u === "hs")     return "hs"
  if (u === "ncaa")   return "ncaa"
  if (u === "minors") return "milb"
  if (u === "majors") return "mlb"

  // 4. Default — draft board / tracked → pre-pro HS identity
  return "hs"
}
