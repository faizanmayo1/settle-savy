import type { LucideIcon } from 'lucide-react'

import type { TrendStatus } from '@/types/common'

/** The five scored dimensions of a neighborhood, each 0–100. */
export interface NeighborhoodIndices {
  safety: number
  schools: number
  affordability: number
  lifestyle: number
  appreciation: number
}

export interface NeighborhoodMatch {
  id: string
  rank: number
  name: string
  metro: string
  /** AI fit score 0–100. */
  matchScore: number
  /** Model confidence 0–1. */
  confidence: number
  medianPrice: number
  priceBand: string
  commuteMin: number
  /** Projected appreciation over 18 months (decimal). */
  appreciation18mo: number
  trend: TrendStatus
  indices: NeighborhoodIndices
  /** One-line explanation of why it ranks where it does (the tradeoff). */
  tradeoff: string
  tags: string[]
  listings: number
}

/** A single parsed constraint in the Buyer DNA model, with its AI weight. */
export interface BuyerConstraint {
  id: string
  label: string
  value: string
  /** Relative weight the model assigned, 0–1. */
  weight: number
  icon: LucideIcon
  /** True when this constraint is a hard requirement vs a soft preference. */
  hard: boolean
}

export interface AgentSuggestion {
  id: string
  name: string
  initials: string
  title: string
  neighborhoods: string
  /** In-area win rate, 0–1. */
  successRate: number
  avgDaysToClose: number
  /** Buyer satisfaction, 0–1. */
  satisfaction: number
  /** Buyer-agent compatibility, 0–100. */
  compatibility: number
  reason: string
}

export type ChatRole = 'assistant' | 'user'

export interface ChatTurn {
  id: string
  role: ChatRole
  text: string
}
