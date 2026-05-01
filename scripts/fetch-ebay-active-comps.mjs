#!/usr/bin/env node
import { Buffer } from "node:buffer"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const TOKEN_URL = "https://api.ebay.com/identity/v1/oauth2/token"
const SEARCH_URL = "https://api.ebay.com/buy/browse/v1/item_summary/search"
const SCOPE = "https://api.ebay.com/oauth/api_scope"

const trackedCards = [
  {
    cardKey: "eli-willits-2025-bowman-draft-1st",
    query: "Eli Willits 2025 Bowman Draft 1st card"
  },
  {
    cardKey: "casey-mize-2018-bowman-draft-chrome-auto",
    query: "Casey Mize 2018 Bowman Draft Chrome auto card"
  }
]

function loadDotEnv(path) {
  if (!existsSync(path)) return

  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!match || match[1].startsWith("#")) continue
    const value = match[2].replace(/^["']|["']$/g, "")
    process.env[match[1]] ??= value
  }
}

function gradeFromTitle(title) {
  const normalized = title.toUpperCase()

  if (/\bPSA\s*10\b|\bGEM\s*MT\b|\bGEM\s*MINT\b/.test(normalized)) return "PSA10"
  if (/\bPSA\s*9\b|\bMINT\s*9\b/.test(normalized)) return "PSA9"
  if (/\bPSA\b|\bBGS\b|\bSGC\b|\bCGC\b|\bTAG\b/.test(normalized)) return null

  return "RAW"
}

function confidenceFromTitle(title, grade) {
  const normalized = title.toUpperCase()
  let confidence = 0.72

  if (normalized.includes("AUTO") || normalized.includes("AUTOGRAPH")) confidence += 0.08
  if (normalized.includes("1ST") || normalized.includes("1ST BOWMAN")) confidence += 0.06
  if (grade === "RAW" && /\bPSA\b|\bBGS\b|\bSGC\b/.test(normalized)) confidence -= 0.35

  return Math.max(0.35, Math.min(0.95, confidence))
}

async function getToken(clientId, clientSecret) {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: SCOPE
    })
  })
  const payload = await response.json()

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || `Token request failed: ${response.status}`)
  }

  return payload.access_token
}

async function searchActiveComps(token, card) {
  const url = new URL(SEARCH_URL)
  url.searchParams.set("q", card.query)
  url.searchParams.set("limit", process.env.EBAY_BROWSE_LIMIT ?? "50")
  url.searchParams.set("filter", "priceCurrency:USD")

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-EBAY-C-MARKETPLACE-ID": process.env.EBAY_MARKETPLACE_ID ?? "EBAY_US"
    }
  })
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.errors?.[0]?.message || `Search failed: ${response.status}`)
  }

  return (payload.itemSummaries ?? []).flatMap((item) => {
    const title = item.title ?? ""
    const grade = gradeFromTitle(title)
    const price = Number(item.price?.value)

    if (!grade || !Number.isFinite(price) || price <= 0) return []

    return [{
      date: item.itemCreationDate ?? new Date().toISOString(),
      grade,
      price,
      kind: "active",
      source: "ebay",
      saleType: item.buyingOptions?.includes("AUCTION") ? "auction" : "listing",
      title,
      url: item.itemAffiliateWebUrl ?? item.itemWebUrl,
      confidence: confidenceFromTitle(title, grade)
    }]
  })
}

loadDotEnv(resolve(process.cwd(), ".env.local"))

const clientId = process.env.EBAY_CLIENT_ID
const clientSecret = process.env.EBAY_CLIENT_SECRET

if (!clientId || !clientSecret) {
  throw new Error("Missing EBAY_CLIENT_ID or EBAY_CLIENT_SECRET in .env.local")
}

const token = await getToken(clientId, clientSecret)
const result = {
  fetchedAt: new Date().toISOString(),
  source: "ebay-browse-active",
  cards: {}
}

for (const card of trackedCards) {
  result.cards[card.cardKey] = {
    query: card.query,
    comps: await searchActiveComps(token, card)
  }
}

const outputPath = process.argv.includes("--write")
  ? resolve(process.cwd(), "data/market/ebay-active-comps.json")
  : null

if (outputPath) {
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`)
  console.log(`Wrote ${outputPath}`)
} else {
  console.log(JSON.stringify(result, null, 2))
}
