# LLM Finder

Search and compare AI/LLM models across providers by pricing, context window, reasoning, tool support, modalities, and more.

**Site:** https://findllm.vercel.app
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
| UI primitives | Radix UI (Select, Slider, Tooltip, Slot), CMDK (Combobox pattern only)        |
| Icons         | lucide-react                                                                  |
| Class utils   | clsx + tailwind-merge + class-variance-authority                              |
| Lint          | ESLint 9 flat config + prettier                                               |
| Git hooks     | husky + commitlint (conventional commits)                                     |

---

## Architecture

### Data flow

```
Server Component (page.tsx)
  └─ fetchRawData() → fetch("https://models.dev/api.json")
  └─ parseProviderModels() → transformModel() for each entry
  └─ passes Model[] to <ModelFinder initialModels={models} />

Client Component (ModelFinder.tsx)
  └─ useFilters() hook → FilterState
  └─ applyFilters(models, filters) → filtered list
       └─ filterBySearch() · filterByExactMatch() · filterByCost()
       └─ filterByContext() · filterByKnowledgeYear() · filterByReleaseYear()
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
  <Header />                          — site title + github link
  <Home (server)>
    <ErrorBoundary>
      <ModelFinder>                   — 'use client', main orchestrator
        <Container>
          <div class="grid 2-col">
            <div class="left-col">
              <ResultsSummaryBar />    — count + per-page selector
              <ResultsTableSection>
                <ModelTable />         — TanStack table, ~23 columns
                  renderTableHeader()
                  renderTableBody()
                  column factories: providerColumn, nameColumn, costColumn,
                    booleanBadgeColumn, modalityColumn, limitColumn, textColumn
              </ResultsTableSection>
              <PaginationControls />  — sticky bottom with PageButton
            </div>
            <div class="right-col sticky">
              <SearchInput />          — debounced (300ms)
              <FilterPanel>
                sections:
                  SelectFiltersSection       — provider, family, modality
                  BooleanFiltersSection      — toolCall, reasoning, free (uses renderBooleanSelect)
                  RangeFiltersSection        — input/output cost, context window, years
                    PriceRangeSlider + RangeInputs
                    YearSelectFilter
                filters:
                  FilterGroup
                  PriceRangeSlider
                  SearchableSelect
                  constants/rangeFilters
              </FilterPanel>
            </div>
          </div>
        </Container>
      </ModelFinder>
    </ErrorBoundary>
    <SeoContent>
      <HeroSection />
      <IntroSection />
    </SeoContent>
  </Home>
  <Footer />                           — credits, links
</RootLayout>
```

### Key components

- `src/types/models.ts` — `Model`, `FilterState`, `ApiResponse` interfaces
- `src/hooks/useFilters.ts` — Filter state management hook
- `src/utils/filters.ts` — `applyFilters()` and filter predicates (`filterBySearch`, `filterByExactMatch`, `filterByCost`, `filterByContext`, `filterByKnowledgeYear`, `filterByReleaseYear`), plus `booleanValue()`, `booleanDisplay()`
- `src/utils/formatters.ts` — `formatCost()`, `formatNumber()`, `extractYear()`
- `src/components/filters/FilterPanel.tsx` — All filter controls in sidebar
- `src/components/filters/PriceRangeSlider.tsx` — Price/context range slider with `RangeInputs` sub-component
- `src/components/filters/sections/BooleanFiltersSection.tsx` — `renderBooleanSelect()` helper for yes/no/any selects
- `src/components/filters/sections/RangeFiltersSection.tsx` — `PriceRangeFilter` + `YearSelectFilter` helpers
- `src/components/table/ModelTable.tsx` — TanStack table with `renderTableHeader()`, `renderTableBody()`, column factories (`providerColumn`, `nameColumn`, `costColumn`, `booleanBadgeColumn`, `modalityColumn`, `limitColumn`, `textColumn`)
- `src/components/model-finder/PaginationControls.tsx` — `PageButton` sub-component for page navigation
- `src/components/seo/` — SEO content sections (hero, intro)
- `src/components/ui/` — Design system primitives (Button, Select, Slider, Tooltip, Combobox, CopyButton, BulletList)
- `src/components/ui/Combobox.tsx` — Searchable combobox with `ComboboxDropdown` sub-component
- `src/config/metadata.ts` — Next.js Metadata + OpenGraph + Twitter card
- `src/config/fonts.ts` — Font loading configuration

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
- **Package manager: `bun` only.** Never use `npm` or `npx`. Use `bun add`, `bun remove`, `bunx`, `bun run`.
- **Never use `npx`** — use `bunx` instead (e.g. `bunx tsc --noEmit`, `bunx depcheck`).
- **Never run sensitive git commands** — no `git push`, `git pull`, `git reset`, `git stash`, `git rebase`, `git merge`, or force-push operations.
- Only stage and commit changes; leave remote operations to the user.

---

## JSDoc Style Rules

All JSDoc must follow these exact patterns. Consistency is enforced.

### Functions & Components

```ts
/**
 * Brief description of what the function/component does.
 * Use present tense, third person.
 *
 * @param {Type} paramName - Description of the parameter.
 * @param {Type} [optionalParam] - Optional parameter description.
 *
 * @returns {Type} Description of the return value.
 */
```

- **@param** — One per parameter, type in `{}`, name, dash, description.
- **Optional params** use `[]` brackets, e.g. `[className]`.
- **@returns** — Always include the return type and description.
- Components that return JSX use `{JSX.Element}` as the return type.
- Always include a blank line between `@param` block, `@returns`, and the description.

### Interfaces

```ts
/**
 * Props for ComponentName component.
 *
 * @interface ComponentNameProps
 * @property {Type} propName - Description of the property.
 * @property {Type} [optionalProp] - Description of optional property.
 */
interface ComponentNameProps {
  propName: Type;
  optionalProp?: Type;
}
```

- **@interface** — Matches the interface name.
- **@property** — One per property, type in `{}`, name, dash, description.
- **Optional properties** use `[]` brackets.

### Constants & Variables

```ts
/**
 * Brief description of the constant's purpose.
 *
 * @type {Type}
 */
const CONSTANT_NAME: Type = value;
```

- **@type** — Always specify the type.
- Constants use PascalCase for exported config, camelCase for local variables.

### Sub-components / Helpers

Helper functions within the same file follow the same function JSDoc rules. Use `@interface` for their props if they accept a params object.

---

## Scripts

| Command            | Purpose                                |
| ------------------ | -------------------------------------- |
| `bun run dev`      | Start dev server (Turbopack)           |
| `bun run build`    | Production build + next-sitemap        |
| `bun run lint`     | ESLint check                           |
| `bun run format`   | Prettier format                        |
| `bun run tsc`      | TypeScript type check                  |
| `bun run indexnow` | Generate sitemap + run IndexNow script |

> **Always use `bun run <script>` or `bunx <command>` — never `npm run` or `npx`.**
