# DBスキーマ設計（Task 2）

最終更新: 2026-05-03

## 1. 目的

この設計は、以下をMVPで扱うためのSupabase PostgreSQLスキーマです。

- あるある投稿
- 投票
- コメント（即時公開）
- カテゴリ（親子構造）
- タグ
- 通報

将来的なログイン導入（Supabase Auth）にも対応できるよう、`user_id` は nullable で持たせています。

---

## 2. テーブル一覧

### `profiles`（任意追加）
- **目的**: 将来ログイン機能追加時の表示名・ロール管理。
- **主なカラム**: `id(auth.users.id)`, `display_name`, `role`, `is_active`, `created_at`, `updated_at`。

### `categories`
- **目的**: 親カテゴリ・子カテゴリを同一テーブルで管理。
- **主なカラム**:
  - `parent_id`（自己参照）
  - `type`（`occupation`, `animal`, `region`, `hobby`, `school`, `parenting`, `fishing`, `other`）
  - `name`, `slug`, `description`, `sort_order`, `status`
- **ポイント**: 職業特化に固定せず、カテゴリタイプで横展開可能。

### `posts`
- **目的**: あるある投稿本体。
- **主なカラム**:
  - `category_id`
  - `user_id`（nullable）
  - `anonymous_id`, `session_id`
  - `body`, `author_name`, `status`
  - `aruaru_count`, `wakaru_count`, `funny_count`, `nai_count`, `comment_count`, `score`
  - `report_count`, `published_at`, `created_at`, `updated_at`
- **ポイント**: MVP方針に合わせて新規投稿は初期値 `published`（即時反映）。荒れ対策は `reports` と管理者による `hidden/deleted` 運用で対応。

### `votes`
- **目的**: 投稿への投票履歴。
- **主なカラム**:
  - `post_id`, `vote_type`
  - `user_id`（nullable）
  - `anonymous_id`, `session_id`, `vote_hash`
  - `created_at`
- **ポイント**:
  - 投票種別は `aruaru`, `wakaru`, `nai`, `funny`。
  - 同一投稿・同一投票タイプへの多重投票を抑止するため、識別子別に部分ユニークインデックスを定義。

### `comments`
- **目的**: 投稿へのコメント。
- **主なカラム**:
  - `post_id`
  - `user_id`（nullable）
  - `anonymous_id`, `session_id`
  - `body`, `author_name`, `status`, `report_count`
  - `created_at`, `updated_at`
- **ポイント**: MVP方針どおり、初期ステータスを `published`。

### `reports`
- **目的**: 投稿/コメントの通報受付。
- **主なカラム**:
  - `target_type`（`post` or `comment`）
  - `post_id`, `comment_id`（排他的にどちらか1つ）
  - `reason`, `detail`, `status`
  - `reporter_user_id`, `reporter_anonymous_id`, `reporter_session_id`
  - `handled_by`, `handled_at`, `created_at`, `updated_at`
- **ポイント**: `CHECK` 制約で `target_type` と参照先の整合性を担保。

### `tags`
- **目的**: タグマスタ。
- **主なカラム**: `name`, `slug`, `created_at`, `updated_at`。

### `post_tags`
- **目的**: 投稿とタグの多対多連携。
- **主なカラム**: `post_id`, `tag_id`, `created_at`。
- **ポイント**: `(post_id, tag_id)` 複合PK。

### `moderation_logs`（任意追加）
- **目的**: 管理者操作の監査ログ（将来の管理画面向け）。
- **主なカラム**: `target_type`, `target_id`, `action`, `note`, `actor_user_id`, `created_at`。

---

## 3. リレーション

- `categories.parent_id -> categories.id`（親子カテゴリ）
- `posts.category_id -> categories.id`
- `votes.post_id -> posts.id`
- `comments.post_id -> posts.id`
- `reports.post_id -> posts.id`
- `reports.comment_id -> comments.id`
- `post_tags.post_id -> posts.id`
- `post_tags.tag_id -> tags.id`

---

## 4. インデックス方針

主要な画面アクセスを想定して以下を作成しています。

- カテゴリ一覧・並び順: `categories(parent_id, sort_order, created_at)`
- 投稿一覧（カテゴリ別・公開状態別）: `posts(category_id, status, created_at)`
- ランキング表示: `posts(status, score, created_at)`
- 公開順表示: `posts(status, published_at)`
- コメント一覧: `comments(post_id, status, created_at)`
- 通報管理: `reports(status, created_at)`
- 投票集計・照会: `votes(post_id, created_at)`, `votes(vote_type, created_at)`

---

## 5. RLS初期方針

厳密運用前の「安全寄りMVP設定」です。

- `SELECT`
  - `categories`: activeのみ
  - `posts`: publishedのみ
  - `comments`: published かつ親投稿もpublished
  - `tags` / `post_tags`: 読み取り可
- `INSERT`（匿名利用を許可）
  - `posts`: `published` のみ + カウント初期値固定（`report_count/aruaru_count/wakaru_count/funny_count/nai_count/comment_count/score = 0`）+ `published_at is null`
  - `votes`: 識別子（`user_id/anonymous_id/session_id/vote_hash`）のいずれか必須
  - `comments`: `published` のみ + `report_count=0`
  - `reports`: `open` のみ + `handled_by/handled_at` はnull
- `UPDATE` / `DELETE`
  - 一般公開向けポリシーは作成しない（管理者用はTask 3/9で追加）

> 注: RLSだけで入力値を完全防御するのは難しいため、将来はAPI/RPC経由で本文長・NGワード・レート制限・識別子品質（hash形式等）を検証する。
> 注: Supabase API公開時は `anon` / `authenticated` のロール別制御、`service_role` 利用箇所、管理者判定（`profiles.role`）を追加する。

---

## 6. seedデータ案

`supabase/migrations/0001_initial_schema.sql` の末尾にコメントアウト形式でドラフトを含めています。

- 親カテゴリ例: `occupation`, `animal`, `region`
- 子カテゴリ例: `nurse`
- タグ例: `夜勤`, `ナースコール`, `人間関係`

Task 3で以下を正式投入予定です。

- 職業カテゴリ配下30件
- 初期投稿100件
- タグ拡充

---

## 7. 将来拡張方針

- 投稿/コメントのNGワード判定履歴テーブル追加
- カテゴリ単位のコメント停止フラグ
- 通報理由のカスタム辞書化
- 日次ランキング集計テーブル（マテビューやバッチ）
- 広告枠（`ad_slots`）をDB管理する場合は別マイグレーションで追加

---

## 8. Task 3で実施すべきこと

1. 初期カテゴリ30件・タグ・投稿seedのSQL化
2. 集計更新ロジック（投票/コメント時のカウント更新）方式決定
   - DBトリガー方式
   - API層トランザクション方式
   - ※Task 2ではスキーマ確定を優先し、集計トリガーは未実装。`posts` の `aruaru_count/wakaru_count/funny_count/nai_count/comment_count/score` は現時点では denormalized 保持のみ。
3. 管理者運用を前提にしたRLS追加
   - `profiles.role = admin|moderator`
   - 投稿の非公開/削除更新ポリシー
4. `reports` 対応フロー（open -> resolved/ignored）の管理画面要件確定
