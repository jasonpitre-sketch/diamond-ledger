import ebayActiveComps from "@/data/market/ebay-active-comps.json"
import ebayProductResearchSold from "@/data/market/ebay-product-research-sold.json"

import type { MarketComp, MarketHistoryInput } from "@/lib/market/history"
import {
  productResearchRowsToComps,
  type EbayProductResearchCard
} from "@/lib/market/productResearch"

const activeComps =
  ebayActiveComps.cards["casey-mize-2018-bowman-draft-chrome-auto"]?.comps ?? []
const productResearchCard =
  ebayProductResearchSold.cards["casey-mize-2018-bowman-draft-chrome-auto"] as
    | EbayProductResearchCard
    | undefined
const soldComps = productResearchCard ? productResearchRowsToComps(productResearchCard) : []

export const casey_mize_market_history: MarketHistoryInput = {
  cardKey: "casey-mize-2018-bowman-draft-chrome-auto",
  asOf: "2026-05-01",
  notes: "Sold comps are eBay Product Research rows from a 90-day search, volume-weighted by total sold. Active listings are live eBay Browse API comps fetched on 2026-05-01.",
  comps: [
    ...(soldComps as MarketComp[]),
    ...(activeComps as MarketComp[])
  ]
}
