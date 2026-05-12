# あるあるランキング

「あるあるネタ」を投稿し、投票・コメント・ランキング閲覧できる Next.js / Supabase 製のMVPです。

## Local setup

1. Install dependencies.

   ```bash
   npm install
   ```

2. Copy the example environment file and fill in your Supabase project values.

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server.

   ```bash
   npm run dev
   ```

## Required environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL used by server and browser clients. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key. Never use the service-role key here. |
| `NEXT_PUBLIC_SITE_URL` | Public site origin used for canonical URLs, sitemap.xml, and robots.txt. |

## Common commands

```bash
npm run dev        # Start local development server
npm run lint       # Run lint checks
npm run build      # Build for production
npm run test:e2e   # Run non-mutating Playwright checks
npm run verify     # Run lint, build, and non-mutating Playwright checks
```

`npm run verify` intentionally does not run database-mutating E2E tests.

## Mutating Playwright comment test

Run only against a safe local/staging Supabase project because this submits a real public comment.

```bash
RUN_MUTATING_E2E=true npm run test:e2e -- tests/comment-submit.spec.ts
```

## Supabase type generation

After applying DB migrations, regenerate TypeScript types from the linked Supabase project.

```bash
npx supabase gen types typescript --linked > src/lib/supabase/database.types.ts
```

On Windows PowerShell:

```powershell
npx supabase gen types typescript --linked | Out-File -FilePath src\lib\supabase\database.types.ts -Encoding utf8
```

## Release readiness

Before production deployment, complete `docs/release-checklist.md`.
