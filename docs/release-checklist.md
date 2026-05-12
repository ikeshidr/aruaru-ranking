# MVP Release Checklist

Use this checklist before promoting the aruaru-ranking MVP to production.

## Supabase

- [ ] Supabase migrations applied.
- [ ] Supabase generated types updated.
- [ ] Admin user created in Supabase Auth.
- [ ] `admin_users` row registered for the admin Auth user.

## Hosting / Environment

- [ ] `NEXT_PUBLIC_SUPABASE_URL` set in Vercel.
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in Vercel.
- [ ] `NEXT_PUBLIC_SITE_URL` set in Vercel to the production origin.

## Verification

- [ ] `npm run verify` passed.
- [ ] Submit → admin approve → public display checked.
- [ ] Vote checked.
- [ ] Comment checked.
- [ ] `sitemap.xml` checked.
- [ ] `robots.txt` checked.
- [ ] Admin pages noindex checked.

## Notes

- Default verification must not mutate production data. Run mutating Playwright checks only against a safe Supabase project with `RUN_MUTATING_E2E=true`.
- Public post listings and sitemap entries must continue to use `status = 'approved'` and `deleted_at is null`.
- Admin routes must remain excluded from sitemap output and marked `noindex`.
