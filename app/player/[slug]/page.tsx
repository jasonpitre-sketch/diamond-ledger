import { players } from "@/data/players"
import Link from "next/link"

export default function PlayerPage({
  params,
}: {
  params: { slug: string }
}) {
  // 🔥 FIX: force read properly
  const slug = params.slug

  const player = players.find((p) => p.slug === slug)

  if (!player) {
    return (
      <div className="p-10 text-white bg-black min-h-screen">
        <h1 className="text-2xl font-bold">Player Not Found</h1>
        <p className="text-gray-400 mt-2">Slug: {slug || "undefined"}</p>

        <div className="mt-6">
          <p className="text-gray-400 text-sm">Available Players:</p>
          {players.map((p) => (
            <div key={p.slug}>{p.slug}</div>
          ))}
        </div>

        <Link href="/" className="text-blue-400 underline block mt-6">
          Back Home
        </Link>
      </div>
    )
  }

  const stats = player.stats?.[0]

  return (
    <main className="min-h-screen bg-[#0a0f14] text-white p-8">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-4xl font-bold">{player.name}</h1>
          <p className="text-gray-400">
            {player.position} • {player.school} • Age {player.age}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-[#11181f] p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <p className="text-sm text-gray-300">Level: {player.level}</p>
            <p className="text-sm text-gray-300">ETA: {player.eta}</p>
            <p className="text-sm text-gray-400 mt-4">{player.bio}</p>
          </div>

          <div className="bg-[#11181f] p-6 rounded-xl border border-gray-700 col-span-2">
            <h2 className="text-xl font-semibold mb-4">2025 Stats</h2>

            {stats ? (
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-sm">AVG</p>
                  <p className="text-xl font-bold">{stats.avg}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">HR</p>
                  <p className="text-xl font-bold">{stats.hr}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">RBI</p>
                  <p className="text-xl font-bold">{stats.rbi}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">OPS</p>
                  <p className="text-xl font-bold">{stats.ops}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No stats available</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-400 underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}