import type { MarketComp, MarketGrade, MarketSaleType } from "./history"

export type EbayProductResearchRow = {
  title: string
  grade: MarketGrade
  avgSoldPrice: number
  saleType: string
  avgShipping?: number
  freeShipping?: string
  totalSold?: number
  itemSales?: number
  bids?: string
  dateLastSold?: string
}

export type EbayProductResearchCard = {
  query: string
  window: string
  summary?: Record<string, unknown>
  rows: EbayProductResearchRow[]
}

const MONTHS: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12"
}

function parseEbayDate(value: string | undefined) {
  const match = value?.match(/^([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})$/)
  if (!match) return new Date().toISOString().slice(0, 10)

  return `${match[3]}-${MONTHS[match[1]]}-${match[2].padStart(2, "0")}`
}

function saleTypeFrom(value: string): MarketSaleType {
  if (/auction/i.test(value)) return "auction"
  if (/fixed|buy/i.test(value)) return "bin"

  return "unknown"
}

function isWrongContainer(title: string) {
  return /\b(box|sealed|hobby|jumbo|case|pack|break|breaker)\b/i.test(title)
}

function isBulkLot(title: string) {
  return /\b(lot|qty|x\s*\d+|\d+\s*card)\b/i.test(title)
}

export function productResearchRowsToComps(
  card: EbayProductResearchCard,
  options?: {
    allowLots?: boolean
  }
): MarketComp[] {
  return card.rows.flatMap((row) => {
    if (!Number.isFinite(row.avgSoldPrice) || row.avgSoldPrice <= 0) return []
    if (isWrongContainer(row.title)) return []
    if (!options?.allowLots && isBulkLot(row.title)) return []

    return [
      {
        date: parseEbayDate(row.dateLastSold),
        grade: row.grade,
        price: row.avgSoldPrice,
        kind: "sold",
        source: "ebay",
        saleType: saleTypeFrom(row.saleType),
        title: row.title,
        confidence: row.grade === "RAW" ? 0.74 : 0.82,
        quantity: Math.max(1, Math.floor(row.totalSold ?? 1))
      } satisfies MarketComp
    ]
  })
}
