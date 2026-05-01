import { computeLegacyMarketFromHistory } from "@/lib/market/history"

import { casey_mize_market_history } from "./casey_mize_market_history"

export const casey_mize_market = computeLegacyMarketFromHistory(casey_mize_market_history)
