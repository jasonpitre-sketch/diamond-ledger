import ebayActiveComps from "@/data/market/ebay-active-comps.json"

import type { MarketComp, MarketHistoryInput } from "@/lib/market/history"

const activeComps =
  ebayActiveComps.cards["casey-mize-2018-bowman-draft-chrome-auto"]?.comps ?? []

export const casey_mize_market_history: MarketHistoryInput = {
  cardKey: "casey-mize-2018-bowman-draft-chrome-auto",
  asOf: "2026-05-01",
  notes: "Sold comps are manual seed values. Active listings are live eBay Browse API comps fetched on 2026-05-01.",
  comps: [
    { date: "2026-04-23", grade: "RAW", price: 24, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-05", grade: "RAW", price: 22, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-03-14", grade: "RAW", price: 23, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-19", grade: "PSA9", price: 18, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-03-28", grade: "PSA9", price: 17, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-03-03", grade: "PSA9", price: 19, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-16", grade: "PSA10", price: 82, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-03-31", grade: "PSA10", price: 78, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-03-08", grade: "PSA10", price: 80, kind: "sold", source: "manual", saleType: "unknown" },
    ...(activeComps as MarketComp[])
  ]
}
