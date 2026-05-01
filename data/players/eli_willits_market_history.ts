import ebayActiveComps from "@/data/market/ebay-active-comps.json"
import ebayProductResearchSold from "@/data/market/ebay-product-research-sold.json"

import type { MarketComp, MarketHistoryInput } from "@/lib/market/history"
import {
  productResearchRowsToComps,
  type EbayProductResearchCard
} from "@/lib/market/productResearch"

const activeComps =
  ebayActiveComps.cards["eli-willits-2025-bowman-draft-1st"]?.comps ?? []
const productResearchCard =
  ebayProductResearchSold.cards["eli-willits-2025-bowman-draft-1st"] as
    | EbayProductResearchCard
    | undefined
const soldComps = productResearchCard ? productResearchRowsToComps(productResearchCard) : []

export const eli_willits_market_history: MarketHistoryInput = {
  cardKey: "eli-willits-2025-bowman-draft-1st",
  asOf: "2026-05-01",
  notes: "Sold comps are eBay Product Research rows from a 90-day search, volume-weighted by total sold. Active listings are live eBay Browse API comps fetched on 2026-05-01.",
  comps: [
    ...(soldComps as MarketComp[]),
    { date: "2026-04-26", grade: "PSA9", price: 225, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-12", grade: "PSA9", price: 220, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-03-23", grade: "PSA9", price: 230, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-27", grade: "PSA10", price: 590, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-04-15", grade: "PSA10", price: 565, kind: "sold", source: "manual", saleType: "unknown" },
    { date: "2026-03-29", grade: "PSA10", price: 570, kind: "sold", source: "manual", saleType: "unknown" },
    ...(activeComps as MarketComp[])
  ]
}
