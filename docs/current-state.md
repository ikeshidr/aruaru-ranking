# Current State

## Repository

- Repository: `ikeshidr/aruaru-ranking`
- Default branch: `main`
- Current stack: Next.js 15.3.2, TypeScript, Supabase

## Completed / Merged

### Phase 3

Phase 3 public data pages were merged into `main`.

Implemented public pages and query layers include:

- `/`
- `/ranking`
- `/categories`
- `/categories/[slug]`
- `/posts/[id]`
- `/submit`
- `/admin/login`
- `/admin`
- `/terms`
- `/privacy`
- `/guidelines`
- `/contact`
- `src/lib/queries/categories.ts`
- `src/lib/queries/posts.ts`
- `src/lib/queries/comments.ts`

Phase 3 public query rule:

```sql
posts.status = 'approved'
and posts.deleted_at is null
```

## Phase 4 Branch State

Branch:

```txt
phase-4-submit-posts
```

The Phase 4 branch implemented `/submit` post submission.

Observed local verification:

- `/submit` can submit a post.
- The submitted row was inserted into `public.posts`.
- `status = pending`
- `vote_count = 0`
- `comment_count = 0`
- `visitor_id` was stored.
- Empty `author_name` falls back to `匿名さん`.
- `tags = []`
- Pending posts did not appear on `/ranking`.
- Pending posts did not appear on `/categories/nurse`.

Important fixes already made in Phase 4:

- Server Action initial state was moved out of the `'use server'` file.
- `src/lib/actions/posts.ts` exports only `submitPostAction`.
- User-facing Supabase errors were changed to generic messages.
- `SubmitPostForm.tsx` now has fallback values for initial state.

## Product Direction Change

The user prefers removing the pre-approval requirement for the MVP.

New preferred MVP behavior:

```txt
Post submission should publish immediately.
Comment submission should publish immediately.
Admin screens should be used for after-the-fact moderation, not approval-first workflow.
```

This means Phase 4.5 should likely convert post submission from:

```txt
status = pending
```

to:

```txt
status = approved
```

while preserving moderation fields such as:

- `status`
- `approved_at`
- `rejected_at`
- `deleted_at`

## Known Caveats

- Do not use old post status `published`.
- Do not use `public` for post status.
- Comments may use `public`.
- The local Supabase project needed seed categories for testing.
- `.env.local` must remain uncommitted.
- `supabase/.temp/` must remain uncommitted.
