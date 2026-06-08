import { Navigate, type RouteObject } from 'react-router-dom'

import { AppShell } from '@/layouts/AppShell'
import { AgentCommandCenter } from '@/pages/AgentCommandCenter'
import { AgentMatching } from '@/pages/AgentMatching'
import { CommuteLifestyle } from '@/pages/CommuteLifestyle'
import { ExecutiveDashboard } from '@/pages/ExecutiveDashboard'
import { DecisionFunnel } from '@/pages/DecisionFunnel'
import { HiddenOpportunities } from '@/pages/HiddenOpportunities'
import { HomeFitScore } from '@/pages/HomeFitScore'
import { MarketForecast } from '@/pages/MarketForecast'
import { NeighborhoodIntelligence } from '@/pages/NeighborhoodIntelligence'
import { RelocationCopilot } from '@/pages/RelocationCopilot'
import { ROUTES } from '@/routes/paths'

export const routes: RouteObject[] = [
  {
    path: ROUTES.copilot,
    element: <AppShell />,
    children: [
      { index: true, element: <RelocationCopilot /> },
      { path: ROUTES.neighborhoods.slice(1), element: <NeighborhoodIntelligence /> },
      { path: ROUTES.fit.slice(1), element: <HomeFitScore /> },
      { path: ROUTES.commute.slice(1), element: <CommuteLifestyle /> },
      { path: ROUTES.market.slice(1), element: <MarketForecast /> },
      { path: ROUTES.opportunities.slice(1), element: <HiddenOpportunities /> },
      { path: ROUTES.funnel.slice(1), element: <DecisionFunnel /> },
      { path: ROUTES.agents.slice(1), element: <AgentMatching /> },
      { path: ROUTES.command.slice(1), element: <AgentCommandCenter /> },
      { path: ROUTES.executive.slice(1), element: <ExecutiveDashboard /> },
      { path: '*', element: <Navigate to={ROUTES.copilot} replace /> },
    ],
  },
]
