import Link from "next/link"

export default function HomePage() {
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      {/* HEADER */}

      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
          💎 Diamond Ledger
        </h1>

        <p style={{ fontSize: "18px", color: "#555" }}>
          The record of players, performance, and future value.
        </p>
      </div>

      {/* GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px"
        }}
      >

        {/* DRAFT */}

        <Link href="/draft" style={{ textDecoration: "none" }}>
          <div style={cardStyle("#0ea5e9")}>
            <h2>Draft Tracker</h2>
            <p>Track top prospects entering pro baseball.</p>
          </div>
        </Link>

        {/* MINORS */}

        <Link href="/minors" style={{ textDecoration: "none" }}>
          <div style={cardStyle("#22c55e")}>
            <h2>Minor Leagues</h2>
            <p>Follow development and rising talent.</p>
          </div>
        </Link>

        {/* MAJORS */}

        <Link href="/majors" style={{ textDecoration: "none" }}>
          <div style={cardStyle("#f59e0b")}>
            <h2>Major Leagues</h2>
            <p>Track performance at the highest level.</p>
          </div>
        </Link>

        {/* HOF */}

        <Link href="/hof" style={{ textDecoration: "none" }}>
          <div style={cardStyle("#a855f7")}>
            <h2>Hall of Fame</h2>
            <p>Explore legends and career legacy.</p>
          </div>
        </Link>

        {/* PLAYER ENGINE */}

        <Link href="/player/roch-cholowsky" style={{ textDecoration: "none" }}>
          <div style={cardStyle("#ef4444")}>
            <h2>Ledger Entry</h2>
            <p>Dive into a player’s full record and trajectory.</p>
          </div>
        </Link>

        {/* FUTURE USER PORTAL */}

        <Link href="/portal" style={{ textDecoration: "none" }}>
          <div style={cardStyle("#14b8a6")}>
            <h2>Your Dashboard</h2>
            <p>Track your players, cards, and signals.</p>
          </div>
        </Link>

      </div>
    </main>
  )
}

/* CARD STYLE FUNCTION */

function cardStyle(color: string) {
  return {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    borderTop: `6px solid ${color}`,
    cursor: "pointer",
    transition: "all 0.2s ease",
  }
}