import type { MarketHistoryInput } from "@/lib/market/history"

export const eli_willits_market_history: MarketHistoryInput = {
  cardKey: "eli-willits-2025-bowman-draft-1st",
  asOf: "2026-05-01",
  notes: "Initial manual seed. Replace with eBay 90-day sold export when available.",
  comps: [
    { date: "2026-04-28", grade: "RAW", price: 210, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-20", grade: "RAW", price: 198, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-09", grade: "RAW", price: 206, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-26", grade: "PSA9", price: 225, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-12", grade: "PSA9", price: 220, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-03-23", grade: "PSA9", price: 230, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-27", grade: "PSA10", price: 590, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-15", grade: "PSA10", price: 565, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-03-29", grade: "PSA10", price: 570, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-05-01", grade: "RAW", price: 215, kind: "active", source: "manual", saleType: "listing" },
    { date: "2026-05-01", grade: "PSA9", price: 240, kind: "active", source: "manual", saleType: "listing" },
    { date: "2026-05-01", grade: "PSA10", price: 625, kind: "active", source: "manual", saleType: "listing" }
  ]
}
