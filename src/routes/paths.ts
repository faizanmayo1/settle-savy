/**
 * SettleSavvy route constants. All page links and redirects MUST import from
 * here — never hard-code a route string in a page or component.
 */
export const ROUTES = {
  copilot: '/',
  neighborhoods: '/neighborhoods',
  fit: '/fit',
  commute: '/commute',
  market: '/market',
  opportunities: '/opportunities',
  funnel: '/funnel',
  agents: '/agents',
  command: '/command',
  executive: '/executive',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
