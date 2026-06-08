export const EXEC_KPIS = {
  activeBuyers: 10240,
  conversionRate: 0.187,
  conversionDelta: 0.021,
  gmv: 1820000000,
  predictionAccuracy: 0.91,
}

export interface ConversionPoint {
  month: string
  conversion: number
  buyers: number
}

export const CONVERSION_TREND: ConversionPoint[] = [
  { month: 'Jan', conversion: 14.8, buyers: 7200 },
  { month: 'Feb', conversion: 15.4, buyers: 7600 },
  { month: 'Mar', conversion: 16.1, buyers: 8100 },
  { month: 'Apr', conversion: 16.0, buyers: 8400 },
  { month: 'May', conversion: 16.9, buyers: 8800 },
  { month: 'Jun', conversion: 17.5, buyers: 9100 },
  { month: 'Jul', conversion: 17.8, buyers: 9400 },
  { month: 'Aug', conversion: 18.3, buyers: 9700 },
  { month: 'Sep', conversion: 18.7, buyers: 10240 },
]

export interface NeighborhoodConversion {
  name: string
  conversion: number
  deals: number
  color: string
}

export const TOP_NEIGHBORHOODS: NeighborhoodConversion[] = [
  { name: 'Crestview', conversion: 24.1, deals: 168, color: '#6366F1' },
  { name: 'Mueller', conversion: 22.6, deals: 201, color: '#0F766E' },
  { name: 'Allandale', conversion: 20.3, deals: 94, color: '#0E92C7' },
  { name: 'Avery Ranch', conversion: 18.9, deals: 142, color: '#D97706' },
  { name: 'Brentwood', conversion: 17.4, deals: 88, color: '#16A34A' },
]

export interface AgentPerf {
  name: string
  initials: string
  deals: number
  conversion: number
  satisfaction: number
  trend: number
  hue: string
}

export const AGENT_LEADERBOARD: AgentPerf[] = [
  { name: 'Priya Raman', initials: 'PR', deals: 58, conversion: 0.29, satisfaction: 0.97, trend: 0.04, hue: '#0F766E' },
  { name: 'Marcus Hale', initials: 'MH', deals: 49, conversion: 0.26, satisfaction: 0.95, trend: 0.02, hue: '#6366F1' },
  { name: 'Dana Whitfield', initials: 'DW', deals: 44, conversion: 0.24, satisfaction: 0.93, trend: 0.03, hue: '#0E92C7' },
  { name: 'Elena Vasquez', initials: 'EV', deals: 31, conversion: 0.22, satisfaction: 0.96, trend: -0.01, hue: '#D97706' },
  { name: 'Tom Becker', initials: 'TB', deals: 38, conversion: 0.21, satisfaction: 0.92, trend: 0.01, hue: '#16A34A' },
]

export interface SegmentGrowth {
  segment: string
  share: number
  growth: number
}

export const FAST_SEGMENTS: SegmentGrowth[] = [
  { segment: 'Out-of-state relocations', share: 0.34, growth: 0.41 },
  { segment: 'School-first families', share: 0.28, growth: 0.22 },
  { segment: 'First-time buyers', share: 0.21, growth: 0.18 },
  { segment: 'Downsizers', share: 0.17, growth: 0.09 },
]

export interface CoverageGap {
  area: string
  demand: number
  agents: number
  note: string
}

export const COVERAGE_GAPS: CoverageGap[] = [
  { area: 'East Riverside corridor', demand: 86, agents: 2, note: 'High buyer demand, thin agent coverage — recruit or reassign.' },
  { area: 'Pflugerville', demand: 74, agents: 3, note: 'Fast-growing value segment underserved at current headcount.' },
  { area: 'Manor', demand: 61, agents: 1, note: 'Emerging demand; one specialist could own the market.' },
]
