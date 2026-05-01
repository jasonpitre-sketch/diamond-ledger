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
