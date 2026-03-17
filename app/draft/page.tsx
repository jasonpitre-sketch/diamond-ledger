import Link from "next/link"
import { players } from "@/data/players"

export default function DraftPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Draft Tracker</h1>

      <ul>
        {players.map((player) => (
          <li key={player.slug}>
            <Link href={`/player/${player.slug}`}>
              {player.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}