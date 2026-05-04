# Phase 5: Public Comments

## Goal

Allow users to submit comments on public approved posts.

Comments should appear immediately after submission. Do not make comments approval-based for the MVP.

## Preconditions

Before implementing Phase 5 comments, handle Phase 4.5 immediate post publishing if it has not been done yet.

Expected post direction:

```txt
/submit creates approved posts
approved posts are visible immediately
```

## User-Facing Behavior

On `/posts/[id]`:

- Show a comment form.
- Users can submit a comment body.
- Author name is optional.
- Empty author name becomes:

```txt
匿名さん
```

- After successful submission, the comment should appear on the post detail page.
- User-facing errors should be generic.
- Do not expose Supabase or RLS error details to users.

Suggested success message:

```txt
コメントを投稿しました！
```

Suggested notice:

```txt
不適切なコメントは管理者が非表示にする場合があります。
```

## Validation

Recommended validation:

- `postId`: required UUID
- `body`: required
- `body`: reasonable length limit, for example 1 to 500 characters
- `authorName`: optional
- `authorName`: fallback to `匿名さん`
- `authorName`: reasonable length limit, for example 20 characters

## Data Rules

Insert into `public.comments`.

Expected values:

```txt
status = public
deleted_at is null
visitor_id is not null
```

Do not allow comments on posts that are not public.

The Server Action should verify the target post exists and is public:

```sql
posts.status = 'approved'
and posts.deleted_at is null
```

## Query Rules

Public comments should be queried with:

```sql
status = 'public'
and deleted_at is null
```

Recommended ordering:

```sql
created_at asc
```

## RLS / Grant Direction

Add a new migration for comment submission if needed.

Do not rewrite already-applied migrations.

Recommended policy direction:

```sql
grant insert (
  post_id,
  author_name,
  body,
  visitor_id
) on public.comments to anon, authenticated;

drop policy if exists comments_public_insert_public on public.comments;

create policy comments_public_insert_public
on public.comments
for insert
to anon, authenticated
with check (
  status = 'public'
  and deleted_at is null
);
```

If `comments.status` does not default to `public`, add a default in a migration:

```sql
alter table public.comments
  alter column status set default 'public';
```

## Comment Count

If a trigger/function already updates `posts.comment_count`, use it.

If not, add a DB-level trigger or function to keep `posts.comment_count` in sync.

Expected behavior:

- After inserting a public comment, the parent post's `comment_count` increases.
- Hidden/deleted comments should not be counted, or this should be documented if deferred.

## Files Likely to Change

Possible files:

- `src/app/posts/[id]/page.tsx`
- `src/components/comments/CommentForm.tsx`
- `src/components/comments/CommentList.tsx`
- `src/lib/actions/comments.ts`
- `src/lib/submit/commentState.ts`
- `src/lib/queries/comments.ts`
- `supabase/migrations/*_allow_public_comment_submission.sql`

Names can vary, but keep responsibilities clear.

## Out of Scope

Do not implement in Phase 5:

- Voting
- Reports
- Admin moderation UI
- User login
- Comment editing
- Threaded replies
- Notifications

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

1. Open an approved post detail page.
2. Submit a comment.
3. Confirm the row in SQL:

```sql
select
  id,
  post_id,
  author_name,
  body,
  visitor_id,
  status,
  deleted_at,
  created_at,
  updated_at
from public.comments
order by created_at desc
limit 5;
```

Expected:

```txt
status = public
deleted_at is null
visitor_id is not null
author_name = 匿名さん when empty
```

4. Confirm the comment appears on `/posts/[id]`.
5. Confirm `posts.comment_count` increases.
