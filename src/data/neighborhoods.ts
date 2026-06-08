import type { RiskLevel, TrendStatus } from '@/types/common'

export interface NeighborhoodProfile {
  id: string
  name: string
  metro: string
  color: string
  trend: TrendStatus
  safetyLevel: RiskLevel
  medianPrice: number
  pricePerSqft: number
  /** Commute to downtown, off-peak vs rush hour (minutes). */
  commute: { offPeak: number; rush: number }
  walkScore: number
  transitScore: number
  schoolRating: number
  /** YoY change in school rating (points). */
  schoolDelta: number
  appreciation18mo: number
  indices: {
    safety: number
    education: number
    affordability: number
    lifestyle: number
    appreciation: number
  }
  /** One-line temporal narrative — "how this neighborhood is changing." */
  changing: string
}

export const NEIGHBORHOODS: NeighborhoodProfile[] = [
  {
    id: 'mueller',
    name: 'Mueller',
    metro: 'Central Austin',
    color: '#0F766E',
    trend: 'Improving',
    safetyLevel: 'Low',
    medianPrice: 812000,
    pricePerSqft: 421,
    commute: { offPeak: 14, rush: 22 },
    walkScore: 88,
    transitScore: 71,
    schoolRating: 8.4,
    schoolDelta: 0.6,
    appreciation18mo: 0.09,
    indices: { safety: 88, education: 84, affordability: 74, lifestyle: 95, appreciation: 84 },
    changing: 'Densifying around the town center — new retail and a rail stop are lifting walkability and demand quarter over quarter.',
  },
  {
    id: 'crestview',
    name: 'Crestview',
    metro: 'North-Central',
    color: '#6366F1',
    trend: 'Improving',
    safetyLevel: 'Low',
    medianPrice: 785000,
    pricePerSqft: 398,
    commute: { offPeak: 16, rush: 26 },
    walkScore: 74,
    transitScore: 68,
    schoolRating: 9.2,
    schoolDelta: 0.3,
    appreciation18mo: 0.11,
    indices: { safety: 90, education: 92, affordability: 79, lifestyle: 86, appreciation: 82 },
    changing: 'Inventory is tightening fast as families trade up for the school zone — months-of-supply has halved since last year.',
  },
  {
    id: 'allandale',
    name: 'Allandale',
    metro: 'North-Central',
    color: '#0E92C7',
    trend: 'Stable',
    safetyLevel: 'Low',
    medianPrice: 880000,
    pricePerSqft: 446,
    commute: { offPeak: 18, rush: 28 },
    walkScore: 69,
    transitScore: 60,
    schoolRating: 9.5,
    schoolDelta: 0.1,
    appreciation18mo: 0.06,
    indices: { safety: 93, education: 95, affordability: 66, lifestyle: 80, appreciation: 70 },
    changing: 'Mature and supply-constrained — prices are holding near the top of the metro with slow, steady appreciation.',
  },
  {
    id: 'avery-ranch',
    name: 'Avery Ranch',
    metro: 'Northwest',
    color: '#D97706',
    trend: 'Improving',
    safetyLevel: 'Low',
    medianPrice: 720000,
    pricePerSqft: 268,
    commute: { offPeak: 26, rush: 41 },
    walkScore: 42,
    transitScore: 34,
    schoolRating: 9.3,
    schoolDelta: 0.5,
    appreciation18mo: 0.12,
    indices: { safety: 91, education: 93, affordability: 88, lifestyle: 72, appreciation: 88 },
    changing: 'A growth corridor — employer expansion nearby is driving the strongest 18-month appreciation of the set, despite the longer commute.',
  },
  {
    id: 'wells-branch',
    name: 'Wells Branch',
    metro: 'North corridor',
    color: '#16A34A',
    trend: 'Stable',
    safetyLevel: 'Medium',
    medianPrice: 640000,
    pricePerSqft: 244,
    commute: { offPeak: 22, rush: 33 },
    walkScore: 52,
    transitScore: 45,
    schoolRating: 8.0,
    schoolDelta: 0.2,
    appreciation18mo: 0.08,
    indices: { safety: 85, education: 80, affordability: 93, lifestyle: 70, appreciation: 76 },
    changing: 'The value play of the corridor — steady demand from first-time and trade-up buyers keeps it liquid and affordable.',
  },
]

export const getNeighborhood = (id: string) => NEIGHBORHOODS.find((n) => n.id === id)

/** Price-index time series (start = 100), quarterly. "Today" sits at index 4 (2025 Q2). */
export const PRICE_INDEX_QUARTERS = ['24 Q1', '24 Q2', '24 Q3', '24 Q4', '25 Q1', '25 Q2', '25 Q3', '25 Q4', '26 Q1', '26 Q2']
export const TODAY_QUARTER = '25 Q2'

export const PRICE_INDEX_SERIES: Array<Record<string, number | string>> = [
  { q: '24 Q1', mueller: 100, crestview: 100, allandale: 100, 'avery-ranch': 100, 'wells-branch': 100 },
  { q: '24 Q2', mueller: 101.4, crestview: 101.8, allandale: 100.7, 'avery-ranch': 102.0, 'wells-branch': 101.1 },
  { q: '24 Q3', mueller: 102.6, crestview: 103.4, allandale: 101.3, 'avery-ranch': 103.9, 'wells-branch': 102.0 },
  { q: '24 Q4', mueller: 103.5, crestview: 104.9, allandale: 101.8, 'avery-ranch': 105.6, 'wells-branch': 102.7 },
  { q: '25 Q1', mueller: 104.6, crestview: 106.3, allandale: 102.4, 'avery-ranch': 107.4, 'wells-branch': 103.6 },
  { q: '25 Q2', mueller: 105.7, crestview: 107.9, allandale: 103.0, 'avery-ranch': 109.3, 'wells-branch': 104.4 },
  { q: '25 Q3', mueller: 107.4, crestview: 110.1, allandale: 103.9, 'avery-ranch': 112.0, 'wells-branch': 105.7 },
  { q: '25 Q4', mueller: 109.2, crestview: 112.5, allandale: 104.8, 'avery-ranch': 114.9, 'wells-branch': 107.0 },
  { q: '26 Q1', mueller: 111.1, crestview: 115.1, allandale: 105.7, 'avery-ranch': 117.9, 'wells-branch': 108.4 },
  { q: '26 Q2', mueller: 112.9, crestview: 117.6, allandale: 106.6, 'avery-ranch': 120.8, 'wells-branch': 109.8 },
]
