import Link from "next/link"

import styles from "./page.module.css"

const layers = [
  {
    points: "18 pts",
    title: "Knowledge",
    body: "Bio, scouting profile, pedigree, dev path. The static evaluation."
  },
  {
    points: "40 pts",
    title: "Performance",
    body: "Real stats from MLB and the minors. Surface, rate, predictive."
  },
  {
    points: "18 pts",
    title: "Media",
    body: "Attention, narrative, hype velocity, public momentum."
  },
  {
    points: "24 pts",
    title: "Market",
    body: "Card prices, liquidity, valuation signal. Where money meets reality."
  }
]

const audiences = [
  {
    title: "Prospect investors",
    body: "Scout grades alone aren't enough anymore. See where performance, media, and market diverge, and act before the rest of the hobby catches up."
  },
  {
    title: "Active flippers",
    body: "Buy/Hold/Sell signals on every tracked card, with the underlying data exposed at the premium tier so you understand why, not just what."
  },
  {
    title: "Long-term collectors",
    body: "Track a watchlist of players from amateur ball to MLB. Watch their DLR evolve as projection becomes reality, or doesn't."
  }
]

export default function LandingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <nav className={styles.nav}>
          <div className={styles.brand}>DIAMOND LEDGER</div>
          <div className={styles.navLinks}>
            <Link href="/vault">Vault</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </nav>

        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Player Intelligence System</p>
          <h1>
            Stop guessing.
            <span>Start scoring.</span>
          </h1>
          <p className={styles.heroCopy}>
            Diamond Ledger synthesizes scouting, performance, media, and card
            market data into a single intelligence rating for every player.
            Built for serious collectors and investors who treat prospect cards
            like the asset class they&apos;ve become.
          </p>

          <div className={styles.badges}>
            <span>DLR Composite Rating</span>
            <span>Buy / Hold / Sell Signals</span>
            <span>Bowman 1st Auto Focus</span>
          </div>

          <form className={styles.waitlist}>
            <input
              aria-label="Email address"
              placeholder="you@example.com"
              type="email"
            />
            <button type="button">Request access</button>
          </form>
        </div>
      </section>

      <section className={styles.layers}>
        <div className={styles.sectionHead}>
          <p>Four layers of intelligence.</p>
          <h2>One rating.</h2>
        </div>
        <div className={styles.layerGrid}>
          {layers.map((layer) => (
            <article key={layer.title} className={styles.layer}>
              <div>{layer.points}</div>
              <h3>{layer.title}</h3>
              <p>{layer.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.audience}>
        <div className={styles.sectionHead}>
          <p>Built for collectors</p>
          <h2>who buy with conviction.</h2>
        </div>
        <div className={styles.audienceGrid}>
          {audiences.map((audience) => (
            <article key={audience.title}>
              <h3>{audience.title}</h3>
              <p>{audience.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>Get early access.</h2>
        <p>
          Diamond Ledger launches soon. Join the waitlist for early access,
          founding-member pricing, and updates as we ship.
        </p>
        <form className={styles.waitlist}>
          <input
            aria-label="Email address"
            placeholder="you@example.com"
            type="email"
          />
          <button type="button">Request access</button>
        </form>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 Diamond Ledger. All rights reserved.</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="mailto:contact@diamond-ledger.com">Contact</Link>
        </div>
      </footer>
    </main>
  )
}
