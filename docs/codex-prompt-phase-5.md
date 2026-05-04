# Codex Prompt: Phase 4.5 + Phase 5

Paste this into Codex.

```txt
Please work on repository `ikeshidr/aruaru-ranking`.

Before editing, read these files:

- AGENTS.md
- SPEC.md
- docs/current-state.md
- docs/phase-4-5-immediate-posts.md
- docs/phase-5-comments.md

Task order:

1. Implement Phase 4.5 if it is not already implemented:
   - Change post submission from pending to approved immediate publishing.
   - Keep public post queries as status = approved and deleted_at is null.
   - Update user-facing copy so it does not mention approval waiting.
   - Add a new migration for RLS/default changes. Do not rewrite old migrations.

2. Implement Phase 5:
   - Add public comment submission on /posts/[id].
   - Comments should appear immediately after submission.
   - Use comments.status = public.
   - Only show comments where status = public and deleted_at is null.
   - Add required RLS/grant migration.
   - Do not implement voting, reporting, admin moderation UI, user login, or replies.

Important:
- Do not use legacy post status `published`.
- Do not use `public` for post status.
- Do not expose Supabase error details to users.
- Files with 'use server' must export async functions only.
- Do not commit `.env.local`, `.next`, `node_modules`, or `supabase/.temp`.
- Preserve existing UI/design unless the task requires a copy change.

After changes:
- Run npm run lint.
- Run npm run build.
- Summarize changed files.
- Summarize manual verification steps.
- Open a PR from branch `phase-5-public-comments`.
```
