import {
  CircleDollarSign,
  Footprints,
  GraduationCap,
  Home,
  Route as RouteIcon,
  ShieldCheck,
} from 'lucide-react'

import type {
  AgentSuggestion,
  BuyerConstraint,
  ChatTurn,
  NeighborhoodMatch,
} from '@/types/copilot'

/** The buyer's natural-language brief — the demo's opening line. */
export const BUYER_BRIEF =
  "I want a 4-bedroom home under $900K with about a 30-minute commute to downtown Austin, strong schools and low crime. We'd love somewhere a little quieter — but still walkable to parks and good coffee."

export const CONVERSATION: ChatTurn[] = [
  {
    id: 't1',
    role: 'assistant',
    text: "Tell me about your move — budget, who's coming, where you work, and what “home” should feel like. I'll translate it into a Buyer DNA model and rank neighborhoods, not just listings.",
  },
  {
    id: 't2',
    role: 'user',
    text: BUYER_BRIEF,
  },
]

/** Assistant summary that appears once matches are resolved. */
export const RESOLVED_SUMMARY =
  'I weighed affordability, commute, safety and schools against your lifestyle priorities across 5,000 Austin-metro neighborhoods. Here are your top 5 — Mueller leads on the walkable, short-commute balance you described, with Crestview a close second on schools.'

/** Refinement chips under the composer. */
export const REFINEMENTS: string[] = [
  'Push commute to 45 min',
  'Prioritize schools over budget',
  'Only walkable neighborhoods',
  'Raise budget to $1.0M',
  'We have a dog — weight parks higher',
]

/** The parsed Buyer DNA model — constraints with AI-assigned weights. */
export const BUYER_DNA: BuyerConstraint[] = [
  { id: 'budget', label: 'Budget', value: '≤ $900K', weight: 0.92, icon: CircleDollarSign, hard: true },
  { id: 'commute', label: 'Commute', value: '≤ 30 min · downtown', weight: 0.85, icon: RouteIcon, hard: true },
  { id: 'schools', label: 'Schools', value: 'Rated 8+/10', weight: 0.8, icon: GraduationCap, hard: false },
  { id: 'safety', label: 'Safety', value: 'Top-quartile, low crime', weight: 0.78, icon: ShieldCheck, hard: false },
  { id: 'home', label: 'Home', value: '4 bd · 2+ ba', weight: 0.58, icon: Home, hard: true },
  { id: 'lifestyle', label: 'Lifestyle', value: 'Quiet · walkable · parks', weight: 0.54, icon: Footprints, hard: false },
]

export const NEIGHBORHOOD_MATCHES: NeighborhoodMatch[] = [
  {
    id: 'mueller',
    rank: 1,
    name: 'Mueller',
    metro: 'Central Austin',
    matchScore: 94,
    confidence: 0.93,
    medianPrice: 812000,
    priceBand: '$760K–$890K',
    commuteMin: 18,
    appreciation18mo: 0.09,
    trend: 'Improving',
    indices: { safety: 88, schools: 84, affordability: 74, lifestyle: 95, appreciation: 84 },
    tradeoff:
      'Top lifestyle-and-commute fit — 18 min to downtown, highly walkable, strong parks. Median sits just above your mid-budget, which the model accepts given the commute win.',
    tags: ['Walkable', 'Parks', 'Transit'],
    listings: 41,
  },
  {
    id: 'crestview',
    rank: 2,
    name: 'Crestview',
    metro: 'North-Central',
    matchScore: 91,
    confidence: 0.9,
    medianPrice: 785000,
    priceBand: '$720K–$860K',
    commuteMin: 20,
    appreciation18mo: 0.11,
    trend: 'Improving',
    indices: { safety: 90, schools: 92, affordability: 79, lifestyle: 86, appreciation: 82 },
    tradeoff:
      'Best schools-to-commute balance inside budget — quiet streets, 20 min in, rail access. Inventory is tightening, so the entry window is narrowing.',
    tags: ['Top schools', 'Rail', 'Quiet'],
    listings: 33,
  },
  {
    id: 'allandale',
    rank: 3,
    name: 'Allandale',
    metro: 'North-Central',
    matchScore: 88,
    confidence: 0.88,
    medianPrice: 880000,
    priceBand: '$820K–$960K',
    commuteMin: 22,
    appreciation18mo: 0.06,
    trend: 'Stable',
    indices: { safety: 93, schools: 95, affordability: 66, lifestyle: 80, appreciation: 70 },
    tradeoff:
      'Highest school and safety scores of your matches — but the median runs near your $900K ceiling and appreciation is slower, so budget headroom is thin.',
    tags: ['Top schools', 'Safe', 'Established'],
    listings: 24,
  },
  {
    id: 'avery-ranch',
    rank: 4,
    name: 'Avery Ranch',
    metro: 'Northwest',
    matchScore: 85,
    confidence: 0.86,
    medianPrice: 720000,
    priceBand: '$650K–$800K',
    commuteMin: 34,
    appreciation18mo: 0.12,
    trend: 'Improving',
    indices: { safety: 91, schools: 93, affordability: 88, lifestyle: 72, appreciation: 88 },
    tradeoff:
      'Exceptional value and schools with the strongest 18-month appreciation (+12%) — but the 34 min commute exceeds your 30 min target, which caps the overall fit.',
    tags: ['Best value', '+12% forecast', 'Master-planned'],
    listings: 52,
  },
  {
    id: 'wells-branch',
    rank: 5,
    name: 'Wells Branch',
    metro: 'North corridor',
    matchScore: 81,
    confidence: 0.83,
    medianPrice: 640000,
    priceBand: '$560K–$710K',
    commuteMin: 28,
    appreciation18mo: 0.08,
    trend: 'Stable',
    indices: { safety: 85, schools: 80, affordability: 93, lifestyle: 70, appreciation: 76 },
    tradeoff:
      'Most affordable match with solid safety and an in-budget commute — but lifestyle skews suburban-quiet rather than the walkable-urban feel you leaned toward.',
    tags: ['Most affordable', 'In-budget commute', 'Family'],
    listings: 47,
  },
]

export const AGENT_SUGGESTIONS: AgentSuggestion[] = [
  {
    id: 'priya',
    name: 'Priya Raman',
    initials: 'PR',
    title: 'Relocation & Central-Austin specialist',
    neighborhoods: 'Mueller · Crestview · Allandale',
    successRate: 0.94,
    avgDaysToClose: 27,
    satisfaction: 0.97,
    compatibility: 96,
    reason:
      'Closed 38 relocations in your top three neighborhoods; specializes in out-of-state, school-first buyers.',
  },
  {
    id: 'marcus',
    name: 'Marcus Hale',
    initials: 'MH',
    title: 'Family & school-district focus',
    neighborhoods: 'Allandale · Avery Ranch',
    successRate: 0.91,
    avgDaysToClose: 31,
    satisfaction: 0.95,
    compatibility: 92,
    reason: 'School-district expert; strong track record on 4-bed family moves under $900K.',
  },
  {
    id: 'dana',
    name: 'Dana Whitfield',
    initials: 'DW',
    title: 'Value & north-corridor specialist',
    neighborhoods: 'Avery Ranch · Wells Branch',
    successRate: 0.89,
    avgDaysToClose: 24,
    satisfaction: 0.93,
    compatibility: 88,
    reason: 'Fastest closings in the north corridor and skilled at surfacing undervalued listings.',
  },
]
