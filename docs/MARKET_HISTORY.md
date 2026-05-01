# Market History

Diamond Ledger market reads should be derived from normalized comp history, not hand-entered panel values.

Use one `*_market_history.ts` file per player/card. Each comp should include:

```ts
{
  date: "2026-04-28",
  grade: "PSA9",
  price: 225,
  kind: "sold",
  source: "ebay",
  saleType: "auction",
  title: "Optional original listing title",
  url: "Optional source URL"
}
```

Supported grades are `RAW`, `PSA9`, and `PSA10`. Supported kinds are `sold` and `active`.

`computeLegacyMarketFromHistory` turns those comps into the current market fields:

- `rawAvg`, `psa9Avg`, `psa10Avg`
- `psa10Premium`
- `liquidity`
- `trend`
- `scarcity`
- `depth`
- `volatility`
- `longTerm`
- `stability`
- `confidence`

The current Eli Willits and Casey Mize histories are seed data. Replace their manual comps with exported eBay 90-day solds as soon as available.

## eBay active listings

Production eBay Browse API credentials live in `.env.local`:

```sh
EBAY_CLIENT_ID=...
EBAY_CLIENT_SECRET=...
EBAY_MARKETPLACE_ID=EBAY_US
```

Fetch current active listings with:

```sh
node scripts/fetch-ebay-active-comps.mjs --write
```

This writes `data/market/ebay-active-comps.json` with active listings grouped by card key. Browse API covers active marketplace inventory; 90-day sold history still needs a sold-comp source/export before `MOM`, `SPRD`, and true trend signals become fully accurate.
