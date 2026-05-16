/**
 * ⚠️  NON-PRODUCTION SANDBOX OUTPUT — DO NOT IMPORT INTO PRODUCTION ⚠️
 *
 * Generated: 2026-05-08
 * Source: data/playersDraft2018.ts (31 players)
 * Pipeline: runCohortDryRun.ts → migrateLegacyPlayer / createPlayer
 * Purpose: Dry-run validation — see COHORT_DRY_RUN_REPORT.md
 *
 * STATUS: This file represents the migration pass output only.
 *         Enrichment output is in enriched_2018_draft.ts.
 *         Production replacement requires a future approved pass.
 *
 * DISCOVERY: The 2018 cohort uses a THIRD legacy format — "minimal inline"
 *   (no scouting block, no dlr block, core identity + signals only).
 *   This format is NOT handled by migrateLegacyPlayer() (which targets
 *   the 2025/2026 scouting+dlr flat format). It routes through createPlayer()
 *   directly with core extraction.
 *
 * MIGRATION RESULTS (from executeDryRun.mjs):
 *   Total:          31
 *   Domain-file:     2  (alec_bohm, casey_mize — no migration needed)
 *   Minimal inline: 29  (new format — createPlayer() path)
 *   Legacy format:   0  (2025/2026 scouting+dlr format not present in 2018)
 *   Succeeded:      31
 *   Failed:          0
 *   Success rate: 100%
 */

// NON-PRODUCTION: players shown in summary form only.
// Full assembled objects are in enriched_2018_draft.ts.
export const MIGRATION_SUMMARY_2018 = {
  cohort:           "2018 Draft",
  generatedAt:      "2026-05-08",
  status:           "NON-PRODUCTION SANDBOX",
  totalPlayers:     31,
  domainFilePlayers: ["alec_bohm", "casey_mize"],
  minimalInlinePlayers: [
    "brady_singer", "nick_madrigal", "matthew_liberatore", "mason_denaburg",
    "brice_turang", "trevor_larnach", "bo_naylor", "xavier_edwards",
    "jeremy_eierman", "steele_walker", "jordan_groshans", "jameson_hannah",
    "jt_ginn", "will_banfield", "tristan_beck", "jordyn_adams",
    "nick_schnell", "jake_mccarthy", "michael_siani", "alek_thomas",
    "parker_meadows", "adam_kloffenstein", "sean_hjelle", "seth_beer",
    "anthony_seigler", "lenny_torres", "blaine_knight", "kris_bubic",
    "griffin_conine"
  ],
  legacyFormatPlayers: [],
  migrationPath: {
    domainFile:    "enrichPlayer() only — already assembled",
    minimalInline: "createPlayer() with direct core extraction",
    legacyFormat:  "migrateLegacyPlayer() — not needed for 2018 cohort",
  },
  newFormatDiscovery: {
    format:      "minimal_inline",
    description: "Core identity + signals only. No scouting block, no dlr block.",
    handledBy:   "migrateLegacyPlayer.ts (Pass 15 — migrateMinimalInlinePlayer branch)",
    migratorStatus: "RESOLVED — detectPlayerFormat() now classifies all three formats. " +
                    "minimal_inline routes through migrateMinimalInlinePlayer() → createPlayer().",
  },
  migrationSuccess: 31,
  migrationFailed:  0,
}
