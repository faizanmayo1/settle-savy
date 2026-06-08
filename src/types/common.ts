/** Shared SettleSavvy primitives used across modules. */

/** Neighborhood / market trend direction — drives the StatusBadge taxonomy. */
export type TrendStatus = 'Improving' | 'Stable' | 'Cooling' | 'Declining'

/** Safety / risk level — drives the RiskBadge taxonomy. */
export type RiskLevel = 'Low' | 'Medium' | 'Elevated' | 'High'

/** Semantic tone used by insight ribbons, callouts and chips. */
export type Tone = 'positive' | 'warning' | 'risk' | 'info' | 'neutral' | 'iris'

/** A single labelled stat shown in callout grids. */
export interface Stat {
  label: string
  value: string
  tone?: Tone
}
