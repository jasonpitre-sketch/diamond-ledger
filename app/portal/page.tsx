import { players } from "@/data/players"
import Link from "next/link"

export default function PortalPage({
  searchParams,
}: {
  searchParams: { player?: string }
}) {
  const player = players.find((p) => p.slug === searchParams.player)

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-[10px] text-gray-500 tracking-[0.3em]">
          SYS-06
        </p>

        <div className="flex justify-between items-center mt-2">

          <h2 className="text-lg text-gray-300 tracking-wide">
            COMMAND CENTER
          </h2>

          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
            <span className="text-xs text-gray-500">ONLINE</span>
          </div>

        </div>

      </div>

      {/* PLAYER LOADED */}
      {player ? (
        <div className="mb-8">

          <h1 className="text-xl text-gray-200">
            {player.name}
          </h1>

          <p className="text-gray-500 text-sm">
            {player.position} // {player.school}
          </p>

        </div>
      ) : (
        <p className="text-gray-500 mb-8">
          No player loaded
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* WATCHLIST */}
        <div className="relative p-5 rounded-xl bg-[#111] border border-[#2a2a2a]
          shadow-[inset_0_2px_2px_rgba(255,255,255,0.06),_inset_0_-4px_8px_rgba(0,0,0,0.9)]">

          <p className="text-xs text-gray-500 tracking-[0.3em]">
            WATCHLIST
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Add player to active tracking system
          </p>

          <button className="mt-4 text-xs text-gray-300 border border-[#2a2a2a] px-3 py-1 rounded hover:border-[#3a3a3a]">
            ADD PLAYER
          </button>

        </div>

        {/* MARKET ACTION */}
        <div className="relative p-5 rounded-xl bg-[#111] border border-[#2a2a2a]
          shadow-[inset_0_2px_2px_rgba(255,255,255,0.06),_inset_0_-4px_8px_rgba(0,0,0,0.9)]">

          <p className="text-xs text-gray-500 tracking-[0.3em]">
            MARKET ACTION
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Flag player as buy / hold / sell target
          </p>

          <div className="mt-4 flex gap-2 text-xs">
            <button className="px-3 py-1 border border-green-500 text-green-400 rounded">
              BUY
            </button>
            <button className="px-3 py-1 border border-yellow-500 text-yellow-400 rounded">
              HOLD
            </button>
            <button className="px-3 py-1 border border-red-500 text-red-400 rounded">
              SELL
            </button>
          </div>

        </div>

        {/* NOTES */}
        <div className="relative p-5 rounded-xl bg-[#111] border border-[#2a2a2a]
          shadow-[inset_0_2px_2px_rgba(255,255,255,0.06),_inset_0_-4px_8px_rgba(0,0,0,0.9)]">

          <p className="text-xs text-gray-500 tracking-[0.3em]">
            NOTES
          </p>

          <textarea
            placeholder="Add scouting or card notes..."
            className="mt-4 w-full bg-[#0a0a0a] border border-[#2a2a2a] text-sm text-gray-300 p-2 rounded"
          />

        </div>

      </div>

      {/* BACK */}
      <div className="mt-10">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-300">
          ← Back to Command Deck
        </Link>
      </div>

    </main>
  )
}