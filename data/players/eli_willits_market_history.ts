import ebayActiveComps from "@/data/market/ebay-active-comps.json"

import type { MarketComp, MarketHistoryInput } from "@/lib/market/history"

const activeComps =
  ebayActiveComps.cards["eli-willits-2025-bowman-draft-1st"]?.comps ?? []

export const eli_willits_market_history: MarketHistoryInput = {
  cardKey: "eli-willits-2025-bowman-draft-1st",
  asOf: "2026-05-01",
  notes: "Sold comps are manual seed values. Active listings are live eBay Browse API comps fetched on 2026-05-01.",
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
    ...(activeComps as MarketComp[])
  ]
}
