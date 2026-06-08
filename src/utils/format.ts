/**
 * SettleSavvy formatters — USD-first, en-US locale, with real-estate-native
 * helpers (prices, $/sqft, scores, commute minutes, appreciation). Numerics
 * render tabular mono.
 */

const LOCALE = 'en-US'

const usdFull = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const usdCompact = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 2,
})

const numberCompact = new Intl.NumberFormat(LOCALE, {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const numberFull = new Intl.NumberFormat(LOCALE, {
  maximumFractionDigits: 0,
})

const percentFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const dateShort = new Intl.DateTimeFormat(LOCALE, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

/** $899,000 — list price, valuation */
export const formatUSD = (value: number) => usdFull.format(value)

/** $1.24M / $899K — compact price for tiles and chips */
export const formatUSDCompact = (value: number) => usdCompact.format(value)

/** 12.3K / 1.2M — generic numeric compact (listings, profiles) */
export const formatCompact = (value: number) => numberCompact.format(value)

/** 5,050 — grouped integer count */
export const formatNumber = (value: number) => numberFull.format(value)

/** 12.0% — appreciation, growth (input as decimal 0.12) */
export const formatPercent = (value: number) => percentFormatter.format(value)

/** 87 — integer 0–100 score (fit / safety / affordability) */
export const formatScore = (value: number) => `${Math.round(value)}`

/** $452/ft² — price per square foot */
export const formatPSF = (value: number) => `${usdFull.format(value)}/ft²`

/** 28 min — commute time in minutes */
export const formatCommute = (minutes: number) => `${Math.round(minutes)} min`

/** 4 bd · 3 ba — bed/bath summary */
export const formatBeds = (beds: number, baths: number) => `${beds} bd · ${baths} ba`

export const formatDate = (date: Date | string) =>
  dateShort.format(typeof date === 'string' ? new Date(date) : date)

/**
 * Signed delta string with arrow, e.g. ▲ 12.0% / ▼ 0.8%.
 * Consumer picks the colour (positive/negative/neutral).
 */
export const formatDelta = (
  value: number,
  variant: 'percent' | 'number' | 'points' = 'percent',
) => {
  const arrow = value > 0 ? '▲' : value < 0 ? '▼' : '·'
  const abs = Math.abs(value)
  switch (variant) {
    case 'number':
      return `${arrow} ${numberCompact.format(abs)}`
    case 'points':
      return `${arrow} ${numberFull.format(abs)} pts`
    case 'percent':
    default:
      return `${arrow} ${percentFormatter.format(abs)}`
  }
}

/** Tone helper: maps a signed delta to a semantic tone for colour choice. */
export const deltaTone = (
  value: number,
  inversion: 'higher-is-better' | 'lower-is-better' = 'higher-is-better',
): 'positive' | 'negative' | 'neutral' => {
  if (value === 0) return 'neutral'
  const isPositive = inversion === 'higher-is-better' ? value > 0 : value < 0
  return isPositive ? 'positive' : 'negative'
}
