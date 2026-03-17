import Link from "next/link"

const systems = [
  {
    id: "SYS-01",
    title: "PROSPECT MINE",
    status: "ACTIVE",
    signal: "▲ CHOLOWSKY // EXIT VELOCITY SPIKE",
    detail:
      "Track emerging bats, movement in rankings, and power indicators before the market fully reacts.",
  },
  {
    id: "SYS-02",
    title: "SIGNAL TRACKING",
    status: "ACTIVE",
    signal: "▲ EMERSON // OPS SURGE",
    detail:
      "Monitor surges, plate discipline gains, heat checks, and player trend acceleration across the system.",
  },
  {
    id: "SYS-03",
    title: "PERFORMANCE ENGINE",
    status: "ACTIVE",
    signal: "■ LEBRON // PROMOTION WATCH",
    detail:
      "Surface call-up pressure, role changes, prospect production, and momentum windows worth acting on.",
  },
  {
    id: "SYS-04",
    title: "LEGACY VAULT",
    status: "ACTIVE",
    signal: "◆ ICONS // LONG-TERM VALUE MATRIX",
    detail:
      "Reserve space for blue-chip names, grail card tracking, legacy holds, and permanent collection intelligence.",
  },
]

const intelCards = [
  {
    label: "LIVE SIGNAL",
    value: "17",
    note: "high-priority player movement flags",
  },
  {
    label: "WATCHLIST",
    value: "50",
    note: "draft + minors + majors unified board",
  },
  {
    label: "COMMAND STATUS",
    value: "ONLINE",
    note: "player intelligence systems operational",
  },
]

export default function HomePage() {
  return (
    <main className="dl-page">
      <div className="dl-bg-grid" />
      <div className="dl-bg-radial dl-bg-radial-1" />
      <div className="dl-bg-radial dl-bg-radial-2" />
      <div className="dl-noise" />

      <section className="hero-shell">
        <div className="hero-topline">
          <span className="diamond-mark" />
          <span>DIAMOND LEDGER</span>
        </div>

        <div className="hero-frame">
          <div className="hero-frame-header">
            <span>PLAYER INTELLIGENCE COMMAND SYSTEM</span>
            <span className="status-pill">SYSTEM ONLINE</span>
          </div>

          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow">TACTICAL BASEBALL INTELLIGENCE</p>
              <h1>
                Prospect signals.
                <br />
                Card conviction.
                <br />
                Command-center clarity.
              </h1>
              <p className="hero-text">
                A futuristic operating layer for draft tracking, prospect
                monitoring, MLB performance signals, and long-term card market
                conviction. Built to feel like a live industrial command deck —
                disciplined, active, and unmistakably yours.
              </p>

              <div className="hero-actions">
                <Link href="/draft" className="btn btn-primary">
                  ENTER DRAFT TRACKER
                </Link>
                <Link href="/player/roch-cholowsky" className="btn btn-secondary">
                  OPEN PLAYER PORTAL
                </Link>
              </div>

              <div className="hero-intel-grid">
                {intelCards.map((card) => (
                  <article key={card.label} className="intel-card">
                    <div className="intel-card-top">
                      <span>{card.label}</span>
                      <span className="mini-led" />
                    </div>
                    <div className="intel-value">{card.value}</div>
                    <p>{card.note}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="hero-console">
              <div className="console-header">
                <span>BRIDGE VIEW</span>
                <span className="console-time">ACTIVE FEED</span>
              </div>

              <div className="console-screen">
                <div className="scan-lines" />
                <div className="console-glow" />

                <div className="console-hud">
                  <div className="hud-corner hud-corner-tl" />
                  <div className="hud-corner hud-corner-tr" />
                  <div className="hud-corner hud-corner-bl" />
                  <div className="hud-corner hud-corner-br" />

                  <div className="hud-title">COMMAND DECK // DIAMOND LEDGER</div>
                  <div className="hud-main-grid">
                    <div className="hud-panel">
                      <span>EXIT VELOCITY</span>
                      <strong>112.4</strong>
                    </div>
                    <div className="hud-panel">
                      <span>OPS SIGNAL</span>
                      <strong>.984</strong>
                    </div>
                    <div className="hud-panel">
                      <span>PROMOTION INDEX</span>
                      <strong>88</strong>
                    </div>
                    <div className="hud-panel">
                      <span>MARKET HEAT</span>
                      <strong>RISING</strong>
                    </div>
                  </div>

                  <div className="hud-bars">
                    <div className="hud-bar">
                      <span>PROSPECT PRESSURE</span>
                      <div><i style={{ width: "76%" }} /></div>
                    </div>
                    <div className="hud-bar">
                      <span>CARD MOMENTUM</span>
                      <div><i style={{ width: "64%" }} /></div>
                    </div>
                    <div className="hud-bar">
                      <span>CALL-UP WATCH</span>
                      <div><i style={{ width: "83%" }} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="systems-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">PRIMARY SYSTEMS</p>
            <h2>Industrial command modules built for baseball intelligence</h2>
          </div>
          <p className="section-copy">
            These become the core homepage anchors and later evolve into full
            product pathways across draft, minors, majors, and card strategy.
          </p>
        </div>

        <div className="systems-grid">
          {systems.map((system) => (
            <article key={system.id} className="system-panel">
              <div className="panel-led" />
              <div className="panel-top">
                <span className="panel-id">{system.id}</span>
                <span className="panel-status">{system.status}</span>
              </div>

              <h3>{system.title}</h3>
              <p className="panel-signal">{system.signal}</p>
              <p className="panel-detail">{system.detail}</p>

              <div className="panel-footer">
                <span>COMMAND MODULE READY</span>
                <span>↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lower-grid">
        <article className="feature-frame">
          <div className="feature-head">
            <span>01 // CORE MISSION</span>
            <span className="mini-led" />
          </div>
          <h3>See the player before the card market fully prices the move</h3>
          <p>
            Diamond Ledger is built to combine player progression, live
            performance context, draft intelligence, and collector conviction in
            one visual operating system.
          </p>
        </article>

        <article className="feature-frame">
          <div className="feature-head">
            <span>02 // DESIGN LANGUAGE</span>
            <span className="mini-led" />
          </div>
          <h3>Spaceship bridge meets industrial performance lab</h3>
          <p>
            Metallic paneling, deep shadows, restrained glow, tactical
            typography, and modular HUD framing create a unique visual identity
            you can scale across the entire site.
          </p>
        </article>

        <article className="feature-frame">
          <div className="feature-head">
            <span>03 // BUILD PATH</span>
            <span className="mini-led" />
          </div>
          <h3>Homepage first. Then modules. Then live intelligence.</h3>
          <p>
            Lock the visual system now, then extend it into player pages, draft
            boards, MLB tracking, card valuation, and your future AI grading
            layer.
          </p>
        </article>
      </section>
    </main>
  )
}