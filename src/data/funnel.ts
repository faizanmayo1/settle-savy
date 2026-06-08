export interface FunnelStage {
  key: string
  label: string
  count: number
  /** Drop-off to the next stage, 0–1 (last stage = 0). */
  dropoff: number
}

export const FUNNEL: FunnelStage[] = [
  { key: 'interest', label: 'Interest', count: 24, dropoff: 0.75 },
  { key: 'shortlist', label: 'Shortlist', count: 6, dropoff: 0.5 },
  { key: 'compare', label: 'Compare', count: 3, dropoff: 0.33 },
  { key: 'schedule', label: 'Schedule', count: 2, dropoff: 0.5 },
  { key: 'decision', label: 'Decision', count: 1, dropoff: 0 },
]

export interface CompareRow {
  label: string
  /** Values per listing id, plus optional "best" id for highlight. */
  values: Record<string, string>
  best?: string
  /** Whether a higher displayed value is better (affects nothing visually, doc only). */
}

export const DECISION_CONFIDENCE = 72
export const HESITATION_SIGNAL =
  'Maya has viewed Mueller three times in five days and re-opened the same two listings without scheduling — a classic hesitation pattern the model flags before drop-off.'
