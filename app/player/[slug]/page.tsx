import { players } from "@/data/players"
import Link from "next/link"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PlayerPage({ params }: Props) {

  const { slug } = await params

  const player = players.find((p) => p.slug === slug)

  if (!player) {
    notFound()
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          background: "#0f172a",
          color: "white",
          padding: "25px",
          borderRadius: "10px",
          marginBottom: "25px"
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "6px" }}>
          {player.name}
        </h1>

        <div style={{ fontSize: "18px", opacity: 0.9 }}>
          {player.position} | {player.team}
        </div>

        <div
          style={{
            marginTop: "12px",
            display: "flex",
            gap: "18px",
            flexWrap: "wrap",
            fontSize: "14px"
          }}
        >
          <div>Age: {player.age}</div>
          <div>School: {player.school}</div>
          <div>Talent: {player.talent}</div>
          <div>Bats: {player.bats ?? "-"}</div>
          <div>Throws: {player.throws ?? "-"}</div>
          <div>Level: {player.level ?? "Draft"}</div>
        </div>
      </div>

      {/* CONTENT GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px"
        }}
      >

        {/* BIO */}

        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h2>Player Overview</h2>

          <p>
            {player.bio ??
              "Player profile coming soon. This section will include development story, scouting notes, and career progression."}
          </p>
        </div>

        {/* TIMELINE */}

        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h2>Career Timeline</h2>

          <ul>
            <li>Draft</li>
            <li>A Ball</li>
            <li>AA</li>
            <li>AAA</li>
            <li>MLB ETA</li>
          </ul>
        </div>

        {/* STATS */}

        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h2>Season Stats</h2>

          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>G</th>
                <th>AVG</th>
                <th>HR</th>
                <th>RBI</th>
                <th>OPS</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SCOUTING */}

        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h2>Scouting Grades</h2>

          <table>
            <tbody>
              <tr>
                <td>Hit</td>
                <td>60</td>
              </tr>

              <tr>
                <td>Power</td>
                <td>55</td>
              </tr>

              <tr>
                <td>Speed</td>
                <td>50</td>
              </tr>

              <tr>
                <td>Arm</td>
                <td>60</td>
              </tr>

              <tr>
                <td>Defense</td>
                <td>60</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* BACK */}

      <div style={{ marginTop: "30px" }}>
        <Link href="/draft">← Back to Draft Tracker</Link>
      </div>

    </div>
  )
}