export interface Lead {
  id: string
  name: string
  initials: string
  /** Buyer readiness, 0–100. */
  readiness: number
  /** Conversion probability, 0–1. */
  conversion: number
  budget: string
  target: string
  /** Highest-signal recent behavior. */
  signal: string
  /** Suggested next action. */
  action: string
  /** Best outreach timing. */
  timing: string
  hue: string
}

export const LEADS: Lead[] = [
  {
    id: 'maya',
    name: 'Maya Donnelly',
    initials: 'MD',
    readiness: 94,
    conversion: 0.91,
    budget: '≤ $900K',
    target: 'Mueller · Crestview',
    signal: 'Viewed Mueller 3× in 5 days; compared finalists this morning.',
    action: 'Offer a same-day tour of 1908 Zach Scott',
    timing: 'Now — peak intent',
    hue: '#0F766E',
  },
  {
    id: 'okafor',
    name: 'Daniel Okafor',
    initials: 'DO',
    readiness: 92,
    conversion: 0.88,
    budget: '≤ $1.1M',
    target: 'Allandale',
    signal: 'Pre-approval uploaded; saved 4 Allandale listings.',
    action: 'Send 2 new Allandale matches + financing intro',
    timing: 'Today, before 6pm',
    hue: '#6366F1',
  },
  {
    id: 'reyes',
    name: 'Sofia Reyes',
    initials: 'SR',
    readiness: 91,
    conversion: 0.86,
    budget: '≤ $780K',
    target: 'Crestview',
    signal: 'Requested commute analysis twice; high lifestyle-fit scores.',
    action: 'Share the Crestview entry-window forecast',
    timing: 'This evening',
    hue: '#0E92C7',
  },
  {
    id: 'chen',
    name: 'Wei Chen',
    initials: 'WC',
    readiness: 90,
    conversion: 0.84,
    budget: '≤ $850K',
    target: 'Avery Ranch',
    signal: 'Returned 3× to one undervalued listing; no tour booked.',
    action: 'Nudge with a confidence-boost comparison',
    timing: 'Tomorrow morning',
    hue: '#D97706',
  },
  {
    id: 'patel',
    name: 'Anika Patel',
    initials: 'AP',
    readiness: 90,
    conversion: 0.83,
    budget: '≤ $920K',
    target: 'Mueller',
    signal: 'School-zone deep-dive completed; shortlist of 5.',
    action: 'Invite to Saturday Mueller open-house route',
    timing: 'Within 48 hours',
    hue: '#16A34A',
  },
  {
    id: 'kim',
    name: 'Grace Kim',
    initials: 'GK',
    readiness: 71,
    conversion: 0.52,
    budget: '≤ $700K',
    target: 'Wells Branch',
    signal: 'Early research; broad price range, no pre-approval yet.',
    action: 'Send financing primer; keep warm',
    timing: 'Next week',
    hue: '#41525B',
  },
]

export interface ExpertiseCell {
  neighborhood: string
  /** Win rate in-area, 0–1. */
  winRate: number
  deals: number
}

export const EXPERTISE: ExpertiseCell[] = [
  { neighborhood: 'Mueller', winRate: 0.95, deals: 22 },
  { neighborhood: 'Crestview', winRate: 0.91, deals: 16 },
  { neighborhood: 'Allandale', winRate: 0.88, deals: 11 },
  { neighborhood: 'Avery Ranch', winRate: 0.79, deals: 8 },
  { neighborhood: 'Wells Branch', winRate: 0.72, deals: 5 },
  { neighborhood: 'Brentwood', winRate: 0.84, deals: 9 },
]

export const COMMAND_KPIS = {
  highIntentLeads: 5,
  pipelineValue: 4600000,
  avgConversion: 0.84,
  avgReadiness: 88,
}
