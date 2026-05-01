import type { MarketComp, MarketGrade } from "./history"

const EBAY_SCOPE = "https://api.ebay.com/oauth/api_scope"
const TOKEN_URL = "https://api.ebay.com/identity/v1/oauth2/token"
const SEARCH_URL = "https://api.ebay.com/buy/browse/v1/item_summary/search"

export type EbayBrowseCredentials = {
  clientId: string
  clientSecret: string
}

export type EbaySearchInput = {
  cardKey: string
  query: string
  limit?: number
  marketplaceId?: string
}

type EbayTokenResponse = {
  access_token?: string
  expires_in?: number
  token_type?: string
  error?: string
  error_description?: string
}

type EbayItemSummary = {
  title?: string
  itemWebUrl?: string
  itemAffiliateWebUrl?: string
  price?: {
    value?: string
    currency?: string
  }
  itemCreationDate?: string
  itemEndDate?: string
  buyingOptions?: string[]
}

type EbaySearchResponse = {
  itemSummaries?: EbayItemSummary[]
  total?: number
  warnings?: Array<{ message?: string }>
  errors?: Array<{ message?: string }>
}

function gradeFromTitle(title: string): MarketGrade | null {
  const normalized = title.toUpperCase()

  if (/\bPSA\s*10\b|\bGEM\s*MT\b|\bGEM\s*MINT\b/.test(normalized)) return "PSA10"
  if (/\bPSA\s*9\b|\bMINT\s*9\b/.test(normalized)) return "PSA9"
  if (/\bPSA\b|\bBGS\b|\bSGC\b|\bCGC\b|\bTAG\b/.test(normalized)) return null

  return "RAW"
}

function confidenceFromTitle(title: string, grade: MarketGrade) {
  const normalized = title.toUpperCase()
  let confidence = 0.72

  if (normalized.includes("AUTO") || normalized.includes("AUTOGRAPH")) confidence += 0.08
  if (normalized.includes("1ST") || normalized.includes("1ST BOWMAN")) confidence += 0.06
  if (grade === "RAW" && /\bPSA\b|\bBGS\b|\bSGC\b/.test(normalized)) confidence -= 0.35

  return Math.max(0.35, Math.min(0.95, confidence))
}

function ebayCredentialsHeader(credentials: EbayBrowseCredentials) {
  return Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString("base64")
}

export async function getEbayApplicationToken(credentials: EbayBrowseCredentials) {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${ebayCredentialsHeader(credentials)}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: EBAY_SCOPE
    })
  })
  const payload = (await response.json()) as EbayTokenResponse

  if (!response.ok || !payload.access_token) {
    throw new Error(
      payload.error_description || payload.error || `eBay token request failed: ${response.status}`
    )
  }

  return payload.access_token
}

export async function fetchEbayActiveComps(
  input: EbaySearchInput,
  credentials: EbayBrowseCredentials
): Promise<MarketComp[]> {
  const token = await getEbayApplicationToken(credentials)
  const url = new URL(SEARCH_URL)

  url.searchParams.set("q", input.query)
  url.searchParams.set("limit", String(input.limit ?? 50))
  url.searchParams.set("filter", "priceCurrency:USD")

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-EBAY-C-MARKETPLACE-ID": input.marketplaceId ?? "EBAY_US"
    }
  })
  const payload = (await response.json()) as EbaySearchResponse

  if (!response.ok) {
    const message = payload.errors?.[0]?.message || `eBay browse search failed: ${response.status}`
    throw new Error(message)
  }

  return (payload.itemSummaries ?? []).flatMap((item) => {
    const price = Number(item.price?.value)
    const title = item.title ?? ""
    const grade = gradeFromTitle(title)

    if (!grade || !Number.isFinite(price) || price <= 0) return []

    return [
      {
        date: item.itemCreationDate ?? new Date().toISOString(),
        grade,
        price,
        kind: "active",
        source: "ebay",
        saleType: item.buyingOptions?.includes("AUCTION") ? "auction" : "listing",
        title,
        url: item.itemAffiliateWebUrl ?? item.itemWebUrl,
        confidence: confidenceFromTitle(title, grade)
      } satisfies MarketComp
    ]
  })
}
