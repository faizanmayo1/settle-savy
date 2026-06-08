import {
  BarChart3,
  Compass,
  Gem,
  Home,
  LayoutDashboard,
  ListChecks,
  type LucideIcon,
  Map,
  Route as RouteIcon,
  TrendingUp,
  Users,
} from 'lucide-react'

import { ROUTES, type RoutePath } from './paths'

export type RouteSection = 'Discover' | 'Market Intelligence' | 'Decide' | 'For Agents'

export interface RouteEntry {
  path: RoutePath
  label: string
  eyebrow: string
  description: string
  icon: LucideIcon
  section: RouteSection
  badge?: { text: string; variant?: 'info' | 'positive' | 'warning' | 'risk' | 'secondary' | 'iris' }
  end?: boolean
  built?: boolean
}

export const routeRegistry: RouteEntry[] = [
  {
    path: ROUTES.copilot,
    label: 'Relocation Copilot',
    eyebrow: 'Discover',
    description: 'Natural-language intake that resolves lifestyle intent into ranked neighborhood matches.',
    icon: Compass,
    section: 'Discover',
    badge: { text: 'AI', variant: 'iris' },
    end: true,
    built: true,
  },
  {
    path: ROUTES.neighborhoods,
    label: 'Neighborhood Intelligence',
    eyebrow: 'Discover',
    description: 'A living graph of neighborhoods — safety, schools, appreciation and trend direction.',
    icon: Map,
    section: 'Discover',
  },
  {
    path: ROUTES.fit,
    label: 'Home Fit Score',
    eyebrow: 'Discover',
    description: 'Predict how well a home fits a buyer before they ever visit — explainable, 0–100.',
    icon: Home,
    section: 'Discover',
  },
  {
    path: ROUTES.commute,
    label: 'Commute & Lifestyle',
    eyebrow: 'Discover',
    description: 'Turn commute and lifestyle preferences into quantifiable, tunable intelligence.',
    icon: RouteIcon,
    section: 'Discover',
  },
  {
    path: ROUTES.market,
    label: 'Market Forecast',
    eyebrow: 'Market',
    description: 'Where the market is going — appreciation, inventory and the optimal entry window.',
    icon: TrendingUp,
    section: 'Market Intelligence',
    badge: { text: 'AI', variant: 'iris' },
  },
  {
    path: ROUTES.opportunities,
    label: 'Hidden Opportunities',
    eyebrow: 'Market',
    description: 'Underpriced listings, price-drop prediction and days-on-market anomalies.',
    icon: Gem,
    section: 'Market Intelligence',
  },
  {
    path: ROUTES.funnel,
    label: 'Decision Funnel',
    eyebrow: 'Decide',
    description: 'Shortlist, compare and schedule — with a confidence score on every decision.',
    icon: ListChecks,
    section: 'Decide',
  },
  {
    path: ROUTES.agents,
    label: 'Agent Matching',
    eyebrow: 'Decide',
    description: 'Match buyers to specialist agents on data — expertise, success rate, buyer fit.',
    icon: Users,
    section: 'Decide',
  },
  {
    path: ROUTES.command,
    label: 'Agent Command Center',
    eyebrow: 'For Agents',
    description: 'High-intent lead feed, readiness scoring and suggested outreach timing.',
    icon: LayoutDashboard,
    section: 'For Agents',
    badge: { text: 'Pro', variant: 'secondary' },
  },
  {
    path: ROUTES.executive,
    label: 'Executive Dashboard',
    eyebrow: 'For Agents',
    description: 'Platform-level conversion, agent performance and demand heatmaps.',
    icon: BarChart3,
    section: 'For Agents',
  },
]

export const sectionOrder: RouteSection[] = ['Discover', 'Market Intelligence', 'Decide', 'For Agents']

export function findRouteByPath(pathname: string): RouteEntry | undefined {
  return routeRegistry.find((entry) => entry.path === pathname)
}

export function groupRoutesBySection(): Array<{ section: RouteSection; entries: RouteEntry[] }> {
  return sectionOrder.map((section) => ({
    section,
    entries: routeRegistry.filter((entry) => entry.section === section),
  }))
}
