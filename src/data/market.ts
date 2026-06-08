export interface ForecastPoint {
  month: string
  /** Actual price index up to "now", then null. */
  actual: number | null
  /** Forecast mid index from "now" forward. */
  mid: number | null
  /** Lower bound of the forecast band (absolute index). */
  low: number | null
  /** Band width (high − low) for the stacked-area trick. */
  band: number | null
}

/** Avery Ranch price index — actual to month 6 (now), forecast for 18 months. */
export const FORECAST: ForecastPoint[] = [
  { month: 'Jan', actual: 100.0, mid: null, low: null, band: null },
  { month: 'Feb', actual: 101.1, mid: null, low: null, band: null },
  { month: 'Mar', actual: 102.4, mid: null, low: null, band: null },
  { month: 'Apr', actual: 103.6, mid: null, low: null, band: null },
  { month: 'May', actual: 104.9, mid: null, low: null, band: null },
  { month: 'Jun', actual: 106.2, mid: 106.2, low: 106.2, band: 0 },
  { month: 'Jul', actual: null, mid: 107.4, low: 106.9, band: 1.1 },
  { month: 'Aug', actual: null, mid: 108.7, low: 107.6, band: 2.3 },
  { month: 'Sep', actual: null, mid: 110.0, low: 108.3, band: 3.5 },
  { month: 'Oct', actual: null, mid: 111.3, low: 109.0, band: 4.7 },
  { month: 'Nov', actual: null, mid: 112.5, low: 109.6, band: 5.9 },
  { month: 'Dec', actual: null, mid: 113.8, low: 110.2, band: 7.2 },
  { month: "Jan'", actual: null, mid: 115.0, low: 110.7, band: 8.5 },
  { month: "Feb'", actual: null, mid: 116.1, low: 111.1, band: 9.8 },
  { month: "Mar'", actual: null, mid: 117.0, low: 111.4, band: 11.0 },
  { month: "Apr'", actual: null, mid: 117.7, low: 111.6, band: 12.0 },
  { month: "May'", actual: null, mid: 118.4, low: 111.8, band: 13.0 },
  { month: "Jun'", actual: null, mid: 119.0, low: 111.9, band: 14.0 },
]

export interface RateScenario {
  rate: number
  monthly: number
  affordabilityShift: string
}

/** Mortgage P&I on a $720K home, 20% down ($576K loan), 30-yr. */
export const LOAN_PRINCIPAL = 576000

export function monthlyPayment(annualRatePct: number, principal = LOAN_PRINCIPAL, years = 30) {
  const r = annualRatePct / 100 / 12
  const n = years * 12
  if (r === 0) return principal / n
  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

export const RENT_VS_BUY = {
  monthlyRent: 3150,
  monthlyOwnership: 4280,
  breakevenMonths: 41,
  fiveYearAdvantage: 86000,
}

export const MARKET_SIGNALS = {
  appreciation18mo: 0.12,
  inventoryMonths: 1.8,
  inventoryTrend: -0.34,
  demandIndex: 78,
  supplyIndex: 41,
  volatility: 'Low',
  optimalWindowDays: 60,
}
