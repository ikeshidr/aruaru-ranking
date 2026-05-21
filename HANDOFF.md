# あるあるランキング — Codex 引き継ぎドキュメント

このドキュメントは Codex（および他の AI エージェント）が本リポジトリの現状を素早く把握するためのものです。**作業開始前に必ず読んでください。**

- 最終更新: 2026-05-20
- 作業ブランチ: `feature/design-refresh`
- HEAD（このドキュメント作成時点）: `d777c85e44eafc65a8919cef1a739d4e5193e9a6`
- リポジトリ: https://github.com/ikeshidr/aruaru-ranking

---

## 0. Codex 初回プロンプト

次のメッセージを最初に Codex に渡してください。

> 以下のファイルを順に読み、内容を要約してから作業を開始してください。
>
> 1. `HANDOFF.md`（このファイル）
> 2. `AGENTS.md`
> 3. `CLAUDE.md`
> 4. `README.md`
> 5. `supabase/migrations/` 配下を timestamp 昇順で流し読み
>
> その後、`HANDOFF.md` の「未完了 TODO」のうち最優先と判断したものを 1 つピックアップして、コードに手を入れる前に方針案を出してください。
>
> 守るべきルールは `AGENTS.md` と `HANDOFF.md`「絶対に壊してはいけない仕様」セクションに集約されています。コード変更後は必ず `npm run lint && npm run build` を通し、UI 変更時は `npm run dev:fresh` で実機確認してから「完了」と報告してください。

---

## 1. 現在のフェーズ

**🚀 Pre-launch / 機能完成・コンテンツ投入済み・Vercel 本番デプロイ前**

### ✅ 完了済み
- 投稿 / 投票 / コメント / 通報 / 管理画面（事後モデレーション）の機能実装
- 投稿は即時公開（status='approved' で直接 insert）モデル
- WCAG AA コントラスト対応・カテゴリ色トークン整備
- ヒーロー画像差し替え・Header ロゴ画像化・favicon (`src/app/icon.tsx`)
- カテゴリーアイコン PNG 配置（nurse / teacher / engineer の 3 枚、他は default.svg フォールバック）
- シードコンテンツ 40 件投入（8 カテゴリ × 5 件、`20260520000000_seed_real_content.sql`）
- 監査済みデッドコード削除、重要セキュリティ Fix（`vote_post` 構文エラー / RLS バイパス / score 計算）
- `dev:fresh` ワークフロー確立、`.npmrc` で `script-shell=powershell.exe` 設定済み
- `vercel.json` でセキュリティヘッダ設定済み

### ⏳ 未対応（リリース前ブロッカーは §2 参照）
- Vercel 本番デプロイ
- `/new` ルートのページ作成
- `post_tags_public_read` RLS 漏洩修正
- カテゴリアイコン残り PNG 配置
- AdSense 実 slot ID（任意）

---

## 2. 未完了 TODO

### 🚨 リリース前ブロッカー

1. **`/new` ルートのページ作成**
   - 場所: `src/app/new/page.tsx` を作成
   - 現状: Header (`src/components/Header.tsx`) のナビ `navItems` に `{ label: '新着', href: '/new', icon: '✨' }` が存在するが、ページが無いのでクリック時 404
   - 暫定対応案: 既存 `getApprovedPosts()` を `created_at desc` で取得して `LatestPostRow` で表示する画面を作成、または該当ナビ項目を一旦削除

2. **Vercel 本番デプロイ準備**
   - GitHub リポジトリを Vercel に連携
   - Vercel ダッシュボード > Settings > Environment Variables に以下の**変数名**を登録（値は別管理、ここには絶対に書かない）:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_SITE_URL`（本番ドメイン、OGP / canonical / sitemap で使用）
     - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`（任意）
     - `NEXT_PUBLIC_ADSENSE_SLOT_HOME`（任意）
     - `NEXT_PUBLIC_ADSENSE_SLOT_HOME_SIDEBAR`（任意）
     - `NEXT_PUBLIC_ADSENSE_SLOT_RANKING`（任意）
   - Supabase ダッシュボード > Authentication > URL Configuration に本番ドメインを追加（管理画面ログインのリダイレクト用）
   - `git push origin main`（または PR マージ）で Vercel 自動デプロイ

3. **`post_tags_public_read` の RLS 漏洩修正**
   - 場所: `supabase/migrations/0001_initial_schema.sql:276-282`
   - 問題: `using (true)` で pending / rejected 投稿のタグ関連付けが anon にも漏洩
   - 修正方針: 新 migration（**既存ファイルは絶対に編集しない**）で policy を drop & 再作成
     ```sql
     drop policy if exists "post_tags_public_read" on public.post_tags;
     create policy "post_tags_public_read" on public.post_tags for select
       using (exists (
         select 1 from public.posts p
         where p.id = post_id and p.status = 'approved' and p.deleted_at is null
       ));
     ```

### 🟡 中優先

4. **カテゴリアイコン PNG の追加配置**
   - `public/icons/categories/` に未配置の flat 5 枚: `office-worker.png`、`doctor.png`、`cat-owner.png`、`dog-owner.png`、`university-student.png`
   - 詳細ページ用 hero 版 8 枚: `{slug}-hero.png` (現状全 8 カテゴリで未配置 → `{slug}.png` または `default.svg` にフォールバック)
   - 未配置時は `CategoryGlyph` の `onError` で `default.svg` に降格、コンソールに 400 エラーが出るが UI は壊れない

5. **`votes` の冗長 unique index 整理**
   - `0001_initial_schema.sql` に `votes_unique_anonymous_vote` (post_id, vote_type, anonymous_id) が定義されているが、phase 6 で `votes_unique_anonymous_post_vote` (post_id, anonymous_id) が後発で追加されており重複
   - 旧 index を drop する migration を新規追加

6. **`src/app/error.tsx` 作成**
   - 用途: Supabase 一時障害時に Next.js デフォルトエラー画面ではなくフレンドリーなフォールバックを出す
   - `'use client'` 不要、HEAD layout の枠内で表示するシンプルな構成で OK

7. **AdSense 実 slot ID 設定（任意）**
   - 未設定なら `WideAd.tsx` の自社プロモバナー（投稿 CTA）が表示され続ける

### 🟢 低優先

8. **「今日の人気あるある」を 24h フィルタに**
   - 現状 `src/app/page.tsx` で `rankingPosts.slice(5, 10)` を流用しているだけ
   - 実装するなら `getTodayPopularPosts()` を `src/lib/queries/posts.ts` に追加、`created_at >= now() - interval '1 day'` で絞る

9. **`focus-visible:ring-*` を主要ボタンに追加**
   - 対象: Header CTA、Submit ボタン、Vote ボタン、Approve/Reject 系
   - a11y フォーカス可視化向上

10. **`tailwind.config.ts` を `.mts` リネームまたは `package.json` に `"type":"module"` 追加**
    - `MODULE_TYPELESS_PACKAGE_JSON` Node warning 解消
    - 動作影響なし、リリース後対応で OK

11. **`getCurrentAdminUser` と `requireAdmin` の auth 2 段ロジック共通化**
    - 場所: `src/lib/queries/admin.ts` と `src/lib/actions/admin.ts`
    - 両方とも `auth.getUser()` → `rpc('is_admin')` のチェックを実装

---

## 3. 絶対に壊してはいけない仕様

### 🔴 データレイヤ（DB スキーマ・SQL）

#### 公開条件
- **posts**: `status = 'approved' AND deleted_at IS NULL` のみ表示
- **comments**: `status = 'public' AND deleted_at IS NULL` のみ表示
- `'published'` ステータスは使わない（旧仕様の名残）

#### 投稿フロー（post-moderation モデル）
- 投稿は `status = 'approved'` で直接 insert（事前承認なし）
- 管理者は `hidePostAction` で `deleted_at = now()` をセットして非公開化
- 旧「承認待ち」フローは完全撤去済み

#### votes テーブル
- **直接 INSERT は禁止**: anon / authenticated に対し `revoke insert, update, delete` 済み
- 書き込みは **`vote_post` RPC (SECURITY DEFINER) 経由のみ**
- 旧 `votes_anyone_insert` policy は drop 済み、**復活させてはいけない**

#### `vote_post` RPC
- `#variable_conflict use_column` ディレクティブが必須
  - `20260517150000_fix_vote_post_ambiguity.sql` で導入
  - 削除すると OUT カラム `vote_count` と `posts.vote_count` 列が衝突して全 RPC コール失敗
- 現 score 仕様: **`score = wakaru_count * 2`** （RPC 内 UPDATE で計算）
- **旧 score 仕様 `aruaru * 2 + funny - nai` は使わない**（`aruaru_count` / `funny_count` / `nai_count` 列は更新経路無く形骸化）

#### reports テーブル
- 既存スキーマ（`target_type` enum / `reporter_anonymous_id` text / `reason` enum）を活用
- 重複防止: 部分 unique index `reports_post_visitor_unique` `(post_id, reporter_anonymous_id) where target_type = 'post'`
- `report_reason` enum 値: `spam` / `abuse` / `discrimination` / `personal_info` / `adult` / `other`（UI は 4 値のみ露出）

#### Migration ルール
- **既存 migration ファイルの編集は禁止**
- 必ず timestamp prefix で新規 migration を追加
- 例外として 1 件、`20260507090000_add_vote_post_rpc.sql` に最小修正を入れた（本番に一度も適用されていなかったため）。今後は厳守

### 🔴 セキュリティ

#### エラーメッセージ漏洩防止
- `throwQueryError`（`src/lib/queries/admin.ts` / `posts.ts` / `categories.ts`）は **`error.message` を絶対にクライアントに throw しない**
- 確立パターン:
  ```ts
  if (error) {
    console.error(`${context}:`, error);
    throw new Error('データの取得に失敗しました');
  }
  ```

#### Server Actions の認証ガード
- 管理系全 action は `requireAdmin()` を経由する（`src/lib/actions/admin.ts`）
- `hidePostAction` も含む（Server Actions は HTTP エンドポイントとして外部露出するため defense-in-depth）
- 投稿系 (`submitPostAction`, `votePostAction`, `submitCommentAction`, `reportPostAction`) は匿名 OK だが `visitor_id` Cookie で識別

### 🔴 フロント / インフラ

#### 開発サーバー
- **`npm run dev` は使わない、`npm run dev:fresh` を使う**
  - `.next` キャッシュ汚染で CSS 崩壊する Windows 環境の既知問題
  - `.npmrc` に `script-shell=powershell.exe` 設定済みのため動作可能
- UI 変更後は必ず `npm run dev:fresh` で実機確認してから「完了」と報告する

#### 完了条件
- 必ず `npm run lint && npm run build` の両方が成功すること
- DB / RLS 変更時は `npx supabase db push` も実行

#### Tailwind v4 設定
- `globals.css` 内の `@config '../../tailwind.config.ts'` でデザイントークン JS config を読み込む
- パス変更厳禁（移動すると build 崩壊）

#### CategoryGlyph フォールバック連鎖
- `variant="flat"`（デフォルト、一覧用）: `/icons/categories/{slug}.png` → `/icons/categories/default.svg`
- `variant="hero"`（個別ページ用）: `/icons/categories/{slug}-hero.png` → `/icons/categories/{slug}.png` → `/icons/categories/default.svg`

### 🔴 デザイントークン（WCAG AA 達成済み、戻してはいけない）

- `text.muted: #6C6C76`（旧 `#8B8B95` は AA 失格）
- `text.faint: #6E6E78`（旧 `#BFBFC8` は AA 失格）
- `primary.hover: #E55A14`（旧 `#FF6420` はボタン文字色とのコントラスト不足）
- カテゴリ text 色は darken 済み:
  - `category.student.DEFAULT: #C4192F`
  - `category.work.DEFAULT: #1A50D9`
  - `category.daily.DEFAULT: #1A7A42`
  - `category.hobby.DEFAULT: #6B3FCC`
  - `category.love.DEFAULT: #CC2070`
  - `category.family.DEFAULT: #A66015`

### 🔴 文言・フロー

- 旧「承認待ち」「管理者確認後」「Phase 3 / Phase 4 で...」等の文言は完全撤去済み、復活禁止
- 投稿成功時は `redirect('/')` で `/` へ即遷移（success メッセージ表示は到達不能パスのため UI から削除済み）

---

## 4. リリース前チェックリスト

### コード品質
- [ ] `npm run lint` 通る
- [ ] `npm run build` 通る
- [ ] `npm run test:e2e` 通る（非破壊スモークのみ）
- [ ] `npm run dev:fresh` で実機動作確認

### コンテンツ・データ
- [ ] `/new` ルートのページ作成、または Header ナビから該当項目を一旦除外
- [ ] カテゴリアイコン PNG の配置完了（または `default.svg` フォールバック許容で割り切る）
- [ ] シードコンテンツ 40 件が `/`, `/ranking`, `/categories/[slug]` で正しく表示される

### セキュリティ / DB
- [ ] `post_tags_public_read` の RLS 漏洩修正 migration を適用
- [ ] Supabase 管理画面で実 policy 一覧確認: posts INSERT は `posts_public_insert_approved` のみ、votes INSERT policy 無し
- [ ] `vote_post` RPC 直接呼び出しで正常動作（`already_voted` / `vote_count` 返却）

### Vercel デプロイ
- [ ] GitHub リポジトリを Vercel に連携
- [ ] Environment Variables を Vercel ダッシュボードに設定（変数名は §2.2 参照、値は別管理）
- [ ] Supabase ダッシュボード > Authentication > URL Configuration に本番ドメイン追加
- [ ] `main` ブランチへの push（または PR マージ）で Vercel が自動デプロイ
- [ ] 本番 `/`, `/ranking`, `/submit`, `/admin`, `/posts/[id]`, `/categories/[slug]` の動作確認

### SEO / OGP
- [ ] Twitter Card Validator (`cards-dev.twitter.com/validator`) で `/posts/[id]` のプレビュー確認
- [ ] Google Search Console に sitemap 登録（`/sitemap.xml` ルート設置済み）
- [ ] favicon (`/icon` ルート) が本番でも表示される

---

## 5. リポジトリ情報

| 項目 | 値 |
|---|---|
| GitHub | `https://github.com/ikeshidr/aruaru-ranking` |
| 作業ブランチ | `feature/design-refresh` |
| デフォルトブランチ | `main` |
| HEAD（このドキュメント作成時点） | `d777c85e44eafc65a8919cef1a739d4e5193e9a6` |
| CI / Hooks | なし（`npm run verify` = lint + build + test:e2e のみ） |
| Migrations 件数 | 18（`supabase/migrations/` 配下、timestamp 順） |

## 6. 関連ドキュメント

| ドキュメント | 役割 |
|---|---|
| `AGENTS.md` | Codex / 全エージェントが毎回守るべき恒久ルール |
| `CLAUDE.md` | Claude Code 向けプロジェクト概要 + コマンド一覧 + dev サーバールール |
| `README.md` | セットアップ・デプロイ手順・必要環境変数 |
| `docs/` | 設計資料・スキーマ図など |
| `supabase/migrations/` | 真実の DB スキーマ（timestamp 昇順で読む） |

## 7. 引き継ぎ元・連絡先

- このドキュメントは Claude Code セッションで生成
- 不明点は `git log --oneline -50` で直近の commit 履歴を確認
- 重要決定の経緯は commit message 本文に残してある（`feat(db):` / `fix(a11y):` / `chore:` などの prefix で分類）
