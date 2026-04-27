import Link from "next/link"

import styles from "../privacy/privacy.module.css"

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/" className={styles.back}>Diamond Ledger</Link>
        <h1>Terms of Service</h1>
        <p className={styles.meta}>Effective Date: [INSERT DATE] · Last Updated: [INSERT DATE]</p>
        <p>
          These Terms govern your use of Diamond Ledger, including the website at
          https://diamond-ledger.com and related services.
        </p>
        <h2>Description of Service</h2>
        <p>
          Diamond Ledger is a player intelligence platform that synthesizes
          scouting, performance, media, and card market data into proprietary
          ratings, valuation indicators, tier classifications, and related signals.
        </p>
        <h2>No Investment Advice</h2>
        <p>
          Diamond Ledger is an information and analytics tool. Nothing on the
          Service constitutes financial, investment, legal, or tax advice. Card
          values fluctuate, and all collecting or selling decisions are made at
          your own risk.
        </p>
        <h2>Intellectual Property</h2>
        <p>
          The Service, including its software, design, scoring methodologies,
          layer structure, title ladder, tier system, and Diamond Ledger branding,
          is owned by Diamond Ledger or its licensors.
        </p>
        <h2>Commercial Use</h2>
        <p>
          Commercial use, redistribution, resale, embedding, or licensing of
          Diamond Ledger outputs requires a separate written agreement.
        </p>
        <h2>Contact</h2>
        <p>Questions can be sent to legal@diamond-ledger.com.</p>
        <p className={styles.note}>
          This is a v1 baseline and should be reviewed by qualified counsel before
          commercial launch.
        </p>
      </div>
    </main>
  )
}
