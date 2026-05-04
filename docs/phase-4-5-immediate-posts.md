# Phase 4.5: Immediate Post Publishing

## Goal

Change the MVP from pre-approval post submission to immediate public post submission.

Current Phase 4 behavior:

```txt
/submit → posts.status = pending
```

New MVP behavior:

```txt
/submit → posts.status = approved → visible immediately on public pages
```

## Why

The user decided that a pre-approval workflow is too heavy for the MVP. The site should feel responsive and fun. Users should see their submitted “あるある” appear immediately.

Moderation should happen after publication.

## Requirements

### User-Facing Behavior

- `/submit` should submit a post and publish it immediately.
- Success message should not say “承認待ち”.
- Button text should not say “承認待ちとして投稿する”.

Suggested button text:

```txt
投稿する
```

Suggested success message:

```txt
投稿しました！
```

Suggested notice:

```txt
投稿後すぐに公開されます。不適切な投稿は管理者が非表示にする場合があります。
```

### Post Insert Behavior

Inserted posts should satisfy:

```txt
status = approved
vote_count = 0
comment_count = 0
approved_at is not null
rejected_at is null
deleted_at is null
visitor_id is not null
```

### Public Query Behavior

Do not change public query conditions:

```sql
status = 'approved'
and deleted_at is null
```

### RLS / Grant Direction

The current Phase 4 migration may allow only pending insert. Replace that behavior with an additional migration.

Do not rewrite old applied migrations.

Add a new migration that does the equivalent of:

```sql
drop policy if exists posts_public_insert_pending on public.posts;
drop policy if exists posts_public_insert_approved on public.posts;

alter table public.posts
  alter column status set default 'approved';

alter table public.posts
  alter column approved_at set default now();

grant insert (
  category_id,
  body,
  author_name,
  tags,
  visitor_id
) on public.posts to anon, authenticated;

create policy posts_public_insert_approved
on public.posts
for insert
to anon, authenticated
with check (
  status = 'approved'
  and deleted_at is null
  and vote_count = 0
  and comment_count = 0
  and approved_at is not null
  and rejected_at is null
);
```

Adjust the final SQL if the existing schema requires a safer form, but preserve the intent.

### Server Action Direction

Prefer keeping the application insert column list minimal:

```ts
category_id
body
author_name
tags
visitor_id
```

Do not let the browser directly set:

```txt
status
vote_count
comment_count
created_at
updated_at
approved_at
rejected_at
deleted_at
```

## Verification

Run:

```bash
npx supabase db push
npx supabase gen types typescript --linked | Out-File -FilePath src\lib\supabase\database.types.ts -Encoding utf8
npm run lint
npm run build
npm run dev
```

Manual test:

1. Open `/submit`.
2. Submit a post.
3. Confirm the row in SQL:

```sql
select
  id,
  category_id,
  body,
  author_name,
  tags,
  visitor_id,
  status,
  vote_count,
  comment_count,
  approved_at,
  rejected_at,
  deleted_at,
  created_at,
  updated_at
from public.posts
order by created_at desc
limit 5;
```

Expected:

```txt
status = approved
vote_count = 0
comment_count = 0
approved_at is not null
rejected_at is null
deleted_at is null
visitor_id is not null
```

Then confirm the submitted post appears on public pages such as:

- `/`
- `/ranking`
- `/categories/[slug]`
