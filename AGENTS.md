# LLM Finder

Search and compare AI/LLM models across providers by pricing, context window, reasoning, tool support, modalities, and more.

**Site:** https://llmmodelsfinder.vercel.app
**Data source:** https://models.dev/api.json (fetched server-side on each request)

---

## Tech Stack

| Layer         | Tech                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack)                                            |
| Language      | TypeScript 6                                                                  |
| Styling       | Tailwind CSS 4 (with `@theme` tokens)                                         |
| Fonts         | Trocchi (headings), Space Grotesk (body), JetBrains Mono (code) via next/font |
| Table         | @tanstack/react-table                                                         |
| UI primitives | Radix UI (Select, Slider, Dialog, Popover, Tooltip), CMDK                     |
| Icons         | lucide-react                                                                  |
| Class utils   | clsx + class-variance-authority                                               |
| Lint          | ESLint 9 flat config + prettier                                               |
| Git hooks     | husky + commitlint (conventional commits)                                     |

---

## Architecture

### Data flow

```
Server Component (page.tsx)
  └─ fetchModels() → fetch("https://models.dev/api.json")
  └─ passes Model[] to <ModelFinder initialModels={models} />

Client Component (ModelFinder.tsx)
  └─ useFilters() hook → FilterState
  └─ applyFilters(models, filters) → filtered list
  └─ Pagination (client-side)
  └─ <ModelTable /> (TanStack Table, sortable)
```

- Models are **fetched server-side** on every request (`force-dynamic`, `cache: 'no-store'`).
- All filtering, sorting, and pagination is **client-side**.
- Error state is handled at both server and client (ErrorBoundary).

### Route structure

- `src/app/page.tsx` — single-page app, all functionality on one route.
- `src/app/layout.tsx` — root layout with Header + Footer + TooltipProvider.
- `src/app/globals.css` — Tailwind theme tokens (colors, fonts, shadows, borders).

### Component tree

```
<RootLayout>
  <Header />            — site title, link to models.dev
  <Home (server)>
    <ErrorBoundary>
      <ModelFinder>     — 'use client'
        <SearchInput /> — debounced (300ms)
        <FilterPanel /> — providers, families, modalities, cost ranges, etc.
        <ResultsSummaryBar /> — count + per-page selector
        <ResultsTableSection>
          <ModelTable /> — TanStack Table, sortable, ~25 columns
        </ResultsTableSection>
        <PaginationControls /> — sticky bottom
      </ModelFinder>
    </ErrorBoundary>
    <SeoContent>
      <HeroSection />
      <IntroSection />
      <PopularSearchesSection />
    </SeoContent>
  </Home>
  <Footer />            — credits, links
</RootLayout>
```

### Key components

| Path                                     | Purpose                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| `src/types/models.ts`                    | `Model`, `FilterState`, `ApiResponse` interfaces                           |
| `src/hooks/useFilters.ts`                | Filter state management hook                                               |
| `src/utils/filters.ts`                   | `applyFilters()`, `parseUrlParams()`, `buildUrlParams()`                   |
| `src/utils/formatters.ts`                | `formatCost()`, `formatNumber()`, `formatDate()`, `extractYear()`          |
| `src/utils/pagination/index.ts`          | `getTotalPages()`, `getStartIndex()`, `getEndIndex()`, `getVisiblePages()` |
| `src/utils/validators.ts`                | Input sanitization helpers                                                 |
| `src/components/filters/FilterPanel.tsx` | All filter controls in sidebar                                             |
| `src/components/table/ModelTable.tsx`    | TanStack table with all columns                                            |
| `src/components/seo/`                    | SEO content sections (hero, intro, popular searches)                       |
| `src/components/ui/`                     | Design system primitives (Button, Select, Slider, Tooltip, Combobox)       |
| `src/config/metadata.ts`                 | Next.js Metadata + OpenGraph + Twitter card                                |
| `src/config/fonts.ts`                    | Font loading configuration                                                 |

---

## Design system

- **Neo-brutalism:** thick black borders, sharp shadows, high-contrast colors.
- **Theme tokens** in `globals.css`:
  - `--color-primary: #ffde42` (yellow), `--color-primary-accent: #ff6b35` (orange)
  - `--color-background: #f7f5f0`, `--color-surface: #ffffff`, `--color-border: #000000`
  - `--shadow-neo-*`: flat box-shadows for neo-brutalist depth
  - `--border-width-3`, `--border-width-4`
- **Button variants:** primary, secondary, white, primary-outlined, secondary-outlined (via CVA).
- All components use `cn()` (clsx) for class merging.

---

## Conventions

- Server components by default; add `'use client'` only when needed (hooks, events, browser APIs).
- Imports: `@/` for `src/`, `@public/` for `public/`.
- No semicolons in JSX props, single quotes for strings, trailing commas.
- CSS: Tailwind utility classes only; no CSS modules or styled-components.
- Component props use `interface` (not `type`), exported.
- File names: PascalCase for components, camelCase for utilities.
- Barrel exports from `src/utils/index.ts`.
- All commits must follow conventional commits (enforced by commitlint + husky).

---

## Scripts

| Command            | Purpose                                |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Start dev server (Turbopack)           |
| `npm run build`    | Production build + next-sitemap        |
| `npm run lint`     | ESLint check                           |
| `npm run format`   | Prettier format                        |
| `npm run tsc`      | TypeScript type check                  |
| `npm run indexnow` | Generate sitemap + run IndexNow script |
