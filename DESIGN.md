# SettleSavvy — Design Language

Light "proptech decision engine" for relocating home-buyers. Approachable yet data-credible: a Zillow-grade consumer surface with a fintech-grade scoring spine. Buyer-facing copilot is the hero; the agent + executive layers are the revenue engine underneath.

## The one rule: teal = structure, iris = AI
- **Teal `#0F766E`** carries everything structural: sidebar + active nav, primary buttons, the wordmark mark, primary chart series, focus rings, "must-have" constraint chips.
- **Iris `#6366F1`** is reserved *exclusively* for intelligence: the Copilot, fit/confidence scores, AI insight ribbons, Buyer-DNA weight bars, the `AIGenerationFlow`, "AI" badges. Iris never carries plain structure — so on screen, iris literally means "the AI produced or scored this."
- Status uses the signal palette only (positive/warning/risk/info) — never the brand colors. Trend taxonomy: **Improving** (positive) · **Stable** (info) · **Cooling** (warning) · **Declining** (risk).

## Typography
- **Hanken Grotesk** for UI/body — warmer and more characterful than Inter, still highly legible.
- **Fraunces** (display serif) for the hero headline and the "Settle" half of the wordmark — a human, real-estate-editorial note. Used sparingly via `font-display`.
- **JetBrains Mono** (`tabular`) for ALL numerics — prices, scores, %, commute minutes, $/ft² — right-aligned in tables. Terminal-grade numeric treatment is a signature.
- Scale: page h2 30px (display) · section title 16–17px · card title 13.5–16px · body 13px · meta 11–12px. Headings 600, tracking `-0.018em`. Eyebrows 11px uppercase, tracking `0.08em`.

## Surfaces & elevation
- Canvas cool near-white `#F6F8F8`; cards pure white; hairline `#E2E8E9`. Radius `0.625rem`.
- Soft layered shadows: `card-sm` default, `card-md` on hover. Restraint over drama.
- **SettleSavvy rule:** a 2px teal→iris gradient hairline (`.accent-rule`) at the top edge of hero / AI cards, used sparingly as a brand signature.
- `.map-grid` — a faint cartographic grid texture behind empty/hero blocks, evoking the "neighborhood map" without a literal map dependency.

## Signature moment — the Buyer-DNA intent resolver (`AIGenerationFlow`)
The hero beat. The buyer types a plain-English brief; "Resolve matches" opens a centered panel that, while *thinking*, washes a teal→iris aurora with a sweeping scanline over a vertical stepper:
*Parsing lifestyle intent → Building your Buyer DNA model → Weighing affordability · commute · safety · schools → Scanning 5,000 neighborhoods · 50,000 listings → Ranking matches & confidence.*
It resolves (~2.7s) into a document-grade **Top-match artifact** (Mueller, 94% fit, factor breakdown, the tradeoff reasoned out), fires a toast, and reveals the full ranked list inline. This is the demo's memorable image.

## Components
- **ScoreRing** — circular SVG gauge for the AI fit score; iris by default (it's an AI score); arc draws in on mount.
- **NeighborhoodMatchCard** — rank chip + score ring + five index meters (safety/schools/afford/lifestyle/growth) + an explainable "Why #n" tradeoff line + commute/appreciation/tag chips. Lead card wears the accent-rule.
- **BuyerDNAPanel** — parsed constraints as iris weight bars, each tagged Must / Prefer; "learns as you refine" footer.
- **AgentSuggestionCard** — compatibility chip (iris score), win-rate / avg-close / CSAT stats, reasoning line, "Book intro call."
- KPI tiles, AI insight ribbons, sortable mono tables, StatusBadge/RiskBadge — shared with the house kit.

## Motion (restrained, premium)
Page-load staggered `animate-fade-in`; per-card stagger on results; hover shadow-lift; nav active-marker bar; ⌘K palette; aurora scan; toasts bottom-right. No gratuitous motion.

## Bespoke flourishes
1. Teal-means-structure / iris-means-AI semantic — coherent and memorable.
2. Display-serif hero + two-tone wordmark (a pin-that-is-a-home with an iris locus node).
3. Terminal mono numerics, right-aligned.
4. The Buyer-DNA aurora-scan resolver.
5. `.map-grid` cartographic texture as a quiet proptech motif.
