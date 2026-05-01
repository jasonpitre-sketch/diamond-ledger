"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"

import styles from "./page.module.css"

const accessInbox = "jasonpitre@diamond-ledger.com"

export default function LandingPage() {
  const [email, setEmail] = useState("")

  function scrollToAccess() {
    document.getElementById("access-email")?.focus({ preventScroll: true })
    document.getElementById("access")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })
  }

  function requestAccess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedEmail = email.trim()
    if (!trimmedEmail) return

    const subject = encodeURIComponent("Diamond Ledger request access")
    const body = encodeURIComponent(
      `Please add this email to the Diamond Ledger access list:\n\n${trimmedEmail}`
    )

    window.location.href = `mailto:${accessInbox}?subject=${subject}&body=${body}`
  }

  return (
    <main className={styles.page}>
      <section className={styles.posterShell} aria-label="Diamond Ledger landing page">
        <Image
          src="/hero-vault-v2.png"
          alt="Diamond Ledger player intelligence system landing page"
          width={1023}
          height={1537}
          priority
          className={styles.poster}
        />

        <button
          className={`${styles.requestButton} ${styles.navRequest}`}
          onClick={scrollToAccess}
          type="button"
        >
          Request Access
        </button>

        <div className={styles.heroActions}>
          <button
            className={`${styles.requestButton} ${styles.heroRequest}`}
            onClick={scrollToAccess}
            type="button"
          >
            Request Access
          </button>
          <button
            className={styles.exploreButton}
            onClick={() => {
              document.getElementById("process")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
              })
            }}
            type="button"
          >
            Explore the System <span aria-hidden="true">→</span>
          </button>
        </div>

        <span id="process" className={styles.processAnchor} aria-hidden="true" />

        <form className={styles.accessForm} id="access" onSubmit={requestAccess}>
          <label className={styles.srOnly} htmlFor="access-email">
            Email address
          </label>
          <input
            id="access-email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            type="email"
            value={email}
          />
          <button type="submit" aria-label="Request access" />
        </form>
      </section>
    </main>
  )
}
