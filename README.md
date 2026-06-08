# SettleSavvy · Relocation Intelligence

AI Neighborhood Intelligence & Relocation Decision Platform — a pre-sales demo. SettleSavvy replaces keyword property search with a **decision engine**: it reads a buyer's plain-English brief, builds a *Buyer DNA* model, and reasons across affordability, commute, safety and schools to rank **neighborhoods** (not just listings) with explainable confidence.

Buyer-facing copilot is the hero; agent + executive intelligence are the revenue layers underneath.

## Stack
Vite · React 19 · TypeScript · Tailwind · shadcn-style UI · Recharts · lucide-react · React Router. Light "proptech" identity — **teal = structure, iris = AI**. See `DESIGN.md`.

## Run
```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # tsc -b && vite build
```

## Screens (all 10 built)
| # | Screen | What it shows |
|---|--------|--------------|
| 1 | **Relocation Copilot** | NL intake → Buyer-DNA resolver (aurora scan) → ranked neighborhood matches + suggested agents |
| 2 | **Neighborhood Intelligence** | Compare up to 3 neighborhoods — appreciation forecast, school delta, commute variability, walk/transit, temporal change |
| 3 | **Home Fit Score** | 0–100 predictive fit with explainable factor breakdown, price intelligence (hidden gem), 3 stronger alternatives |
| 4 | **Commute & Lifestyle** | Live slider — loosen the commute and watch neighborhoods + better pricing unlock; multi-destination, lifestyle clusters |
| 5 | **Market Forecast** | 18-mo appreciation with confidence band, rate-sensitivity sim, rent-vs-buy, buy-now-vs-wait engine |
| 6 | **Hidden Opportunities** | Underpriced detection, price-drop prediction, DOM anomalies, value scoring |
| 7 | **Decision Funnel** | Journey funnel, AI finalist comparison, decision-confidence ring, hesitation nudge |
| 8 | **Agent Matching** | Compatibility engine — expertise / track-record / buyer-fit breakdown, ranked roster with reasoning |
| 9 | **Agent Command Center** | High-intent lead feed, readiness + conversion scoring, expertise heatmap, follow-up automation |
| 10 | **Executive Dashboard** | Conversion trend, top neighborhoods, agent leaderboard, prediction accuracy, coverage gaps |

## Signature moment
On the Copilot screen, **Resolve matches** runs the Buyer-DNA aurora-scan (constraint-weighing) and resolves into a top-match artifact + ranked list with confidence scores and explainable tradeoffs. Market framing: Austin–Round Rock metro, USD. All data is illustrative.
