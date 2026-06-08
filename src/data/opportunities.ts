export type OpportunityType = 'Underpriced' | 'Price-drop likely' | 'Stale listing' | 'Hidden value'

export interface Opportunity {
  id: string
  address: string
  neighborhood: string
  price: number
  fairValue: number
  beds: number
  baths: number
  sqft: number
  daysOnMarket: number
  /** Median DOM for the area — context for anomaly. */
  areaMedianDom: number
  type: OpportunityType
  /** 0–100 — how much undervaluation / opportunity the model sees. */
  valueScore: number
  hue: string
  signal: string
}

export const FEATURED: Opportunity = {
  id: 'cherrywood-1204',
  address: '1204 Cherrywood Road',
  neighborhood: 'Cherrywood',
  price: 695000,
  fairValue: 847000,
  beds: 4,
  baths: 2,
  sqft: 2180,
  daysOnMarket: 38,
  areaMedianDom: 14,
  type: 'Underpriced',
  valueScore: 94,
  hue: '#0F766E',
  signal: 'Priced 18% below comparable homes within a 0.5-mile radius — an estate sale that hasn’t been re-listed at market.',
}

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'reagan-3410',
    address: '3410 Reagan Terrace',
    neighborhood: 'Crestview',
    price: 742000,
    fairValue: 805000,
    beds: 3,
    baths: 2,
    sqft: 1960,
    daysOnMarket: 31,
    areaMedianDom: 12,
    type: 'Price-drop likely',
    valueScore: 88,
    hue: '#6366F1',
    signal: '31 days on market vs a 12-day median — model predicts a 4–6% cut within 2 weeks.',
  },
  {
    id: 'berkman-4600',
    address: '4600 Berkman Drive',
    neighborhood: 'Mueller',
    price: 769000,
    fairValue: 802000,
    beds: 4,
    baths: 3,
    sqft: 2360,
    daysOnMarket: 21,
    areaMedianDom: 9,
    type: 'Hidden value',
    valueScore: 84,
    hue: '#0E92C7',
    signal: 'Unpermitted finished basement adds ~280 ft² the listing doesn’t price in.',
  },
  {
    id: 'ridgeline-908',
    address: '908 Ridgeline Pass',
    neighborhood: 'Avery Ranch',
    price: 658000,
    fairValue: 712000,
    beds: 4,
    baths: 3,
    sqft: 2540,
    daysOnMarket: 44,
    areaMedianDom: 18,
    type: 'Stale listing',
    valueScore: 82,
    hue: '#D97706',
    signal: 'Poor listing photos and 44 days stale — strong negotiation leverage on a sound home.',
  },
  {
    id: 'brentwood-2207',
    address: '2207 Brentwood Street',
    neighborhood: 'Brentwood',
    price: 728000,
    fairValue: 781000,
    beds: 3,
    baths: 2,
    sqft: 1880,
    daysOnMarket: 27,
    areaMedianDom: 11,
    type: 'Underpriced',
    valueScore: 80,
    hue: '#16A34A',
    signal: 'Priced 7% under recent comps; seller relocating on a tight timeline.',
  },
  {
    id: 'wells-1530',
    address: '1530 Wells Port Drive',
    neighborhood: 'Wells Branch',
    price: 599000,
    fairValue: 642000,
    beds: 4,
    baths: 2,
    sqft: 2210,
    daysOnMarket: 35,
    areaMedianDom: 16,
    type: 'Price-drop likely',
    valueScore: 78,
    hue: '#0F766E',
    signal: 'Two prior cuts and rising DOM — a third reduction is likely imminent.',
  },
]
