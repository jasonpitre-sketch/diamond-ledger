import Link from "next/link"

import styles from "./privacy.module.css"

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/" className={styles.back}>Diamond Ledger</Link>
        <h1>Privacy Policy</h1>
        <p className={styles.meta}>Effective Date: [INSERT DATE] · Last Updated: [INSERT DATE]</p>
        <p>
          Diamond Ledger respects your privacy. This baseline policy explains what
          information we collect, how we use it, and the rights you have over your
          data when using https://diamond-ledger.com and related services.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We may collect account, waitlist, subscription, payment, usage, device,
          cookie, and service analytics information. Payment card details are
          processed by third-party payment providers and are not stored directly by
          Diamond Ledger.
        </p>
        <h2>How We Use Information</h2>
        <p>
          We use information to operate the Service, authenticate accounts, manage
          subscriptions, process payments, communicate updates, improve the product,
          prevent abuse, and comply with legal obligations.
        </p>
        <h2>Sharing</h2>
        <p>
          We do not sell personal information. We share limited information with
          service providers, when legally required, or as part of a business transfer.
        </p>
        <h2>Contact</h2>
        <p>
          Questions or privacy requests can be sent to privacy@diamond-ledger.com.
        </p>
        <p className={styles.note}>
          This is a v1 baseline policy and should be reviewed by qualified counsel
          before commercial launch.
        </p>
      </div>
    </main>
  )
}
