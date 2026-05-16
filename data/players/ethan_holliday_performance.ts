/**
 * Pass 68 — Ethan Holliday Performance (2026-05-14)
 * Source: MiLB.com career stats + advanced career stats
 *
 * 2025 anchor: 18 G partial debut, .239/.357/.380/.737, BABIP .417 (luck-inflated)
 * 2026 current: 28 G through 2026-05-14, .257/.389/.545/.934, BABIP .322 (sustainable)
 * Power surge real: ISO jumped from .141 (2025) to .288 (2026)
 * BB rate elite for age (14.3%); K rate elevated (29.4%) — typical young power profile
 * Pedigree: son of Matt, brother of Jackson — bloodlines weight knowledge layer
 */

export const ethan_holliday_performance = {
  kind: "hitter",

  /* =========================
     SNAPSHOT — 2026 current season (through 2026-05-14)
     PRIMARY SCORING LAYER
  ========================= */
  snapshot: {
    year:     "2026",
    team:     "FRE",
    level:    "A",
    g:        28,
    ab:       101,
    pa:       126,
    r:        22,
    h:        26,
    doubles:  4,
    triples:  2,
    hr:       7,
    rbi:      26,
    bb:       18,
    ibb:      0,
    so:       37,
    k:        37,
    sb:       1,
    cs:       1,
    hbp:      5,
    sf:       2,
    tb:       55,
    avg:      0.257,   // lowercase — IntelStack display (snap?.avg)
    AVG:      0.257,   // uppercase — calculateDLR: readNumber(snapshot, "AVG")
    obp:      0.389,
    slg:      0.545,
    ops:      0.934,
    babip:    0.322    // sustainable — BABIP normalized from 2025 luck-inflated .417
  },

  /* =========================
     SEASON 2025 — anchor (pro debut, partial season)
     HISTORICAL BASELINE
  ========================= */
  season2025: {
    year:     "2025",
    team:     "FRE",
    level:    "A",
    g:        18,
    ab:       71,
    pa:       84,
    r:        14,
    h:        17,
    doubles:  4,
    triples:  0,
    hr:       2,
    rbi:      6,
    bb:       12,
    ibb:      1,
    so:       33,
    k:        33,
    sb:       0,
    cs:       0,
    hbp:      1,
    sf:       0,
    tb:       27,
    avg:      0.239,
    AVG:      0.239,
    obp:      0.357,
    slg:      0.380,
    ops:      0.737,
    babip:    0.417    // luck-inflated — BABIP regression expected and confirmed in 2026
  },

  /* =========================
     CAREER — cumulative MiLB through 2026-05-14 (46 G)
     DISPLAY CONTEXT ONLY
  ========================= */
  career: {
    g:        46,
    ab:       172,
    r:        36,
    h:        43,
    doubles:  8,
    triples:  2,
    hr:       9,
    rbi:      32,
    bb:       30,
    ibb:      1,
    so:       70,
    k:        70,
    sb:       1,
    cs:       1,
    avg:      0.250,
    AVG:      0.250,
    obp:      0.376,
    slg:      0.477,
    ops:      0.853
  },

  /* =========================
     SCOUT — derived rates (2026 season, A-ball)
     No Statcast at A-ball — counting-stat derivations only
  ========================= */
  scout: {
    kRate:       29.4,    // 37 K / 126 PA = 29.4% — elevated, age-appropriate for power profile
                          // Stored as percent (matching Eli Willits convention kRate:14.2)
    bbRate:      14.3,    // 18 BB / 126 PA = 14.3% — elite plate discipline for 19yo
    kMinusBB:    15.1,    // 15.1% — positive K-BB despite high K rate
    iso:         0.288,   // SLG .545 − AVG .257 = .288 — real, significant power
    barrelRate:  null,    // Statcast not available at A-ball
    hardHitPct:  null,    // Statcast not available at A-ball
    avgEV:       null,    // Statcast not available at A-ball
    spray:       "PULL_HEAVY"  // typical young left-handed power profile; unverified by Statcast
  },

  /* =========================
     ANALYST — normalized 0–1 trend signals
  ========================= */
  analyst: {
    xAVG:            0.260,   // BABIP-corrected estimate — .322 BABIP sustainable, slight regression expected
    xSLG:            0.520,   // sustained power projection — 7 HR in 28 G pace projects to 22+ over full season
    plateDiscTrend:  0.80,    // elite BB rate (14.9%) for 19yo — top decile plate approach
    contactTrend:    0.55,    // K rate (29.8%) is the concern — not disqualifying at age 19, but real
    powerTrend:      0.85,    // ISO .268 in 2026 vs .141 in 2025 = genuine power surge, not BABIP artifact
    sprintTrend:     0.40,    // limited speed (1 SB in 45 career G) — not a running threat
    posValue:        0.85,    // SS is premium defensive position — adds value to offensive profile
    consistency:     0.55,    // BABIP volatility between seasons; K rate creates AVG inconsistency risk
    injuryTrend:     0.85,    // no documented injuries; full 45 G career played without DL stints
    velocityTrend:   null     // hitter — N/A
  }
}
