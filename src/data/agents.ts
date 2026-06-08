export type Specialization = 'Relocation' | 'Family & schools' | 'Value' | 'Luxury' | 'First-time' | 'Investment'

export interface AgentProfile {
  id: string
  name: string
  initials: string
  title: string
  specialization: Specialization
  neighborhoods: string[]
  successRate: number
  avgDaysToClose: number
  satisfaction: number
  activeBuyers: number
  /** Overall buyer-agent compatibility, 0–100. */
  compatibility: number
  breakdown: { neighborhoodExpertise: number; trackRecord: number; buyerTypeFit: number }
  reason: string
  hue: string
}

export const AGENTS: AgentProfile[] = [
  {
    id: 'priya',
    name: 'Priya Raman',
    initials: 'PR',
    title: 'Relocation & Central-Austin specialist',
    specialization: 'Relocation',
    neighborhoods: ['Mueller', 'Crestview', 'Allandale'],
    successRate: 0.94,
    avgDaysToClose: 27,
    satisfaction: 0.97,
    activeBuyers: 7,
    compatibility: 96,
    breakdown: { neighborhoodExpertise: 98, trackRecord: 94, buyerTypeFit: 96 },
    reason: 'Closed 38 relocations in your top three neighborhoods; specializes in out-of-state, school-first buyers like you.',
    hue: '#0F766E',
  },
  {
    id: 'marcus',
    name: 'Marcus Hale',
    initials: 'MH',
    title: 'Family & school-district focus',
    specialization: 'Family & schools',
    neighborhoods: ['Allandale', 'Avery Ranch', 'Crestview'],
    successRate: 0.91,
    avgDaysToClose: 31,
    satisfaction: 0.95,
    activeBuyers: 9,
    compatibility: 92,
    breakdown: { neighborhoodExpertise: 90, trackRecord: 92, buyerTypeFit: 94 },
    reason: 'School-district expert with a strong record on 4-bed family moves under $900K.',
    hue: '#6366F1',
  },
  {
    id: 'dana',
    name: 'Dana Whitfield',
    initials: 'DW',
    title: 'Value & north-corridor specialist',
    specialization: 'Value',
    neighborhoods: ['Avery Ranch', 'Wells Branch'],
    successRate: 0.89,
    avgDaysToClose: 24,
    satisfaction: 0.93,
    activeBuyers: 11,
    compatibility: 88,
    breakdown: { neighborhoodExpertise: 86, trackRecord: 90, buyerTypeFit: 88 },
    reason: 'Fastest closings in the north corridor and skilled at surfacing undervalued listings.',
    hue: '#0E92C7',
  },
  {
    id: 'elena',
    name: 'Elena Vasquez',
    initials: 'EV',
    title: 'Luxury & architectural homes',
    specialization: 'Luxury',
    neighborhoods: ['Allandale', 'Tarrytown'],
    successRate: 0.9,
    avgDaysToClose: 38,
    satisfaction: 0.96,
    activeBuyers: 5,
    compatibility: 79,
    breakdown: { neighborhoodExpertise: 74, trackRecord: 91, buyerTypeFit: 72 },
    reason: 'Excellent on premium homes, but most of your top neighborhoods sit below her core price band.',
    hue: '#D97706',
  },
  {
    id: 'tom',
    name: 'Tom Becker',
    initials: 'TB',
    title: 'First-time & trade-up buyers',
    specialization: 'First-time',
    neighborhoods: ['Wells Branch', 'Crestview'],
    successRate: 0.86,
    avgDaysToClose: 29,
    satisfaction: 0.92,
    activeBuyers: 14,
    compatibility: 76,
    breakdown: { neighborhoodExpertise: 78, trackRecord: 84, buyerTypeFit: 70 },
    reason: 'Patient with first-time buyers; lighter track record on relocation-specific logistics.',
    hue: '#16A34A',
  },
  {
    id: 'aisha',
    name: 'Aisha Bello',
    initials: 'AB',
    title: 'Investment & multi-family',
    specialization: 'Investment',
    neighborhoods: ['Wells Branch', 'Avery Ranch'],
    successRate: 0.88,
    avgDaysToClose: 22,
    satisfaction: 0.9,
    activeBuyers: 8,
    compatibility: 68,
    breakdown: { neighborhoodExpertise: 72, trackRecord: 88, buyerTypeFit: 54 },
    reason: 'Strong analytically, but an investor focus is a weaker fit for a primary-residence, lifestyle-led buyer.',
    hue: '#41525B',
  },
]
