# Divy Portfolio + Learning Timeline (Next.js + Bun + Edge)

Edge-first, fast portfolio with a signature **Learning Timeline**.

**Stack:** Next.js (App Router) · Bun · TypeScript (strict) · shadcn/ui v2 · Tailwind · Drizzle ORM + Neon Postgres · MDX + Contentlayer · Auth.js v5 · Vercel Analytics + Speed Insights · Playwright + Vitest · Biome.

## Setup

1. `bun install`
2. Copy `.env.example` to `.env` and fill:
   - `DATABASE_URL` (Neon serverless)
   - `AUTH_SECRET` (use `bunx auth secret`)
   - `RESEND_API_KEY`, `RESEND_FROM`
   - Optional: `GITHUB_ID/SECRET`, `GITHUB_TOKEN`, `OPENAI_API_KEY`
3. `bun run db:push` to create tables
4. `bun run db:seed` for demo content
5. `bun dev` → http://localhost:3000

### Deploy (Vercel)

Use Bun to install and build. Add the same environment variables on Vercel. Push your repo and Vercel will deploy automatically.

## Learning Timeline

Unified feed via adapters (GitHub, courses, coding sites). Toggle `ADAPTER_MODE=mock|live` in `.env`.

Visualizations: calendar heatmap widget (home), radar chart (skill growth), line chart (stack shifts), milestone cards. Filters by tag, source, time range; compare periods toggle. Summaries use OpenAI if available.

## /studio CMS

Private (Auth.js) admin at `/studio`. Gate by `ADMIN_EMAIL` or `role` column. Manage projects, posts (MDX) and timeline entries via server actions & Drizzle.

## AI Search

`/api/search` supports keyword fallback or embeddings (if `OPENAI_API_KEY` set). Run `bun run embeddings:build` to populate the `documents` table from posts and projects.

## Testing & Quality

`bun test` (Vitest), `bun run e2e` (Playwright). Biome for lint/format; Husky pre-commit hooks (optional). GitHub Actions CI at `.github/workflows/ci.yml`.

## Design System

Clean, editorial feel; dark/light/system; **Timeline Focus** theme variant. `tokens.css` holds color tokens. Extend via CSS custom properties. shadcn/ui v2 components under `components/ui/*`.

## Future Upgrades

- Notion adapter for posts/projects.
- Plausible Analytics toggle.
- tRPC or RSC-safe server callers.
- External image CDN (Vercel Images + blobs).
- Upstash Redis for rate limiting.