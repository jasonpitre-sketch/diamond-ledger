import { computeLegacyMarketFromHistory } from "@/lib/market/history"

import { eli_willits_market_history } from "./eli_willits_market_history"

export const eli_willits_market = computeLegacyMarketFromHistory(eli_willits_market_history)
