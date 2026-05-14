# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start local dev server (http://127.0.0.1:3000)
npm run lint         # ESLint checks
npm run build        # Production build — must always pass before commit
npm run test:e2e     # Run non-mutating Playwright smoke tests
npm run verify       # lint + build + test:e2e in sequence
```

Run a single Playwright test file:
```bash
npx playwright test tests/smoke.spec.ts
```

Run the mutating comment E2E (only against local/staging Supabase):
```bash
RUN_MUTATING_E2E=true npm run test:e2e -- tests/comment-submit.spec.ts
```

After DB migrations, regenerate TypeScript types (PowerShell):
```powershell
npx supabase gen types typescript --linked | Out-File -FilePath src\lib\supabase\database.types.ts -Encoding utf8
```

After any DB or RLS changes:
```bash
npx supabase db push
```

## Architecture

### Tech stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Supabase PostgreSQL · Vercel deployment

### Directory layout

```
src/
  app/           # Next.js App Router pages and layouts
  components/    # React components, organised by domain
    admin/
    categories/
    comments/
    home/
    posts/
    submit/
    ui/          # Generic presentational primitives
    voting/
  lib/
    actions/     # Server Actions ('use server' files)
    queries/     # Supabase read queries (server-side)
    supabase/    # Two Supabase clients + generated DB types
    validators/  # Input validation (shared between client and server)
    visitor/     # Cookie-based anonymous visitor ID
    voting/      # Vote action state types
    comments/    # Comment action state types
    submit/      # Post submission state types
    admin/       # Admin action state types
  data/          # Static dummy data (used as fallback / dev reference)
supabase/
  migrations/    # SQL migration files — add new timestamped files, never edit existing ones
tests/           # Playwright E2E tests
```

### Supabase client pattern

Two separate clients must be used:

| File | Used by | When |
|---|---|---|
| `src/lib/supabase/client.ts` | Browser components | Client-side interactivity |
| `src/lib/supabase/server.ts` | Server Components, Server Actions | All server-side access |

`createClient()` in `server.ts` is async and reads cookies for session management.

### Server Action rules

- `'use server'` files may only export `async function`s.
- Initial state types, Zod-style validators, and schema definitions live in **separate non-`'use server'` files** (e.g. `src/lib/submit/submitPostState.ts`, `src/lib/validators/post.ts`).
- Never surface raw Supabase error messages to the user — log them server-side and return a generic Japanese message.

### Data and status values

**Posts — public state is `approved`, not `published`:**
- `status = 'approved' AND deleted_at IS NULL` → visible to users
- Do not use `'published'` or `'public'` as post status values.

**Comments — public state is `public`:**
- `status = 'public' AND deleted_at IS NULL` → visible to users
- Comments are not moderated on submit; they are immediately public.

**Votes** are deduplicated server-side using a `visitor_id` cookie (`aruaru_visitor_id`) set by `src/lib/visitor/visitor-id.ts`. This is MVP-level spam prevention, not cryptographic.

### Score formula

```
score = aruaru_count * 2 + funny_count * 1 - nai_count * 1
```

### DB migration rule

Never edit existing migration files. Add new migrations with a timestamp prefix (e.g. `20260515_add_column.sql`).

### Advertising

All ad placements must go through `<AdSlot position="..." />`. Never inline ad code directly in pages.

### Design constraints

- Mobile-first; test at mobile widths before desktop.
- Do not use raw images as backgrounds — recreate with Tailwind CSS.
- White/cream base, orange/coral CTA, rounded cards, gentle shadows.

These values should be defined in `tailwind.config.ts` under `theme.extend` so they are reusable across components.

#### Design tokens

| Token | Value |
|---|---|
| Primary | `#FF7A35` |
| Primary hover | `#FF6420` |
| Primary light | `#FFE8D6` |
| Primary soft | `#FFF4E6` |
| BG | `#FAF8F4` |
| Text | `#2D2D33` |
| Text muted | `#8B8B95` |
| Border | `#F0EDE8` |
| Font family | `M PLUS Rounded 1c` (load via `next/font/google`) |

#### Category colors

| Category | Text | Background |
|---|---|---|
| 学生 | `#FF5A6E` | `#FFE5E9` |
| 仕事 | `#3672FF` | `#E3EAFF` |
| 日常生活 | `#29B164` | `#DEFAEA` |
| 趣味・推し | `#9966FF` | `#EFE5FF` |
| 恋愛 | `#FF5FA3` | `#FFE1EF` |
| 家族・親 | `#D68A2C` | `#FFF0D9` |

#### Medal colors (ranking)

- Gold: `linear-gradient(135deg, #FFD93C 0%, #FFA830 100%)`
- Silver: `linear-gradient(135deg, #DDE2E7 0%, #A8B2BB 100%)`
- Bronze: `linear-gradient(135deg, #E6B08C 0%, #B27A52 100%)`
- 1位には王冠（👑）アイコンをメダル上部に重ねる。

#### Card style

- `border-radius: 24px`
- `box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 4px 20px rgba(45,45,51,0.04)`
- `padding: 24px`

#### Button style

- **Primary**: `background: linear-gradient(135deg, #FF8C42, #FF6420)`, `border-radius: 999px`, shadow付き
- **Secondary**: 白背景, `border: 2px solid #FF7A35`, `border-radius: 999px`
