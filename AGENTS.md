# あるあるランキング 開発ルール

このリポジトリは「あるあるランキング / あるある言いたい！」の開発用です。
**Codex / Claude / その他 AI エージェントは、作業開始前に必ず本ファイルと `HANDOFF.md` を読んでください。**

## 0. 最初に読むもの

1. このファイル（`AGENTS.md`） — 恒久ルール
2. `HANDOFF.md` — 現在の状態・未完了 TODO・絶対に壊してはいけない仕様の詳細
3. `CLAUDE.md` — プロジェクト概要・コマンド・dev サーバー運用
4. `README.md` — セットアップ・デプロイ手順
5. `supabase/migrations/` 配下 — DB スキーマの真実（timestamp 昇順）

---

## 1. Pre-launch 現行ルール（最優先）

既存仕様より下記を優先してください。

### 投稿・コメントの公開状態

- 投稿は MVP では即時公開。`posts.status = 'approved'` を公開状態として使う。
- 投稿で `'published'` / `'public'` status は使わない（旧仕様の名残）。
- 公開投稿の取得条件は `status = 'approved' AND deleted_at IS NULL` を維持する。
- コメントは承認制にしない。投稿後すぐ公開する。
- コメントの公開状態は `comments.status = 'public'` を使う。
- 公開コメントの取得条件は `status = 'public' AND deleted_at IS NULL` を維持する。
- 管理画面は「事前承認」より「事後モデレーション」を主目的にする。

### 投票・RPC

- `votes` テーブルへの直接 INSERT は禁止。`vote_post` RPC（SECURITY DEFINER）経由のみ。
- 旧 `votes_anyone_insert` policy は drop 済み。**復活させてはいけない。**
- `vote_post` RPC 内の `#variable_conflict use_column` ディレクティブは**絶対に削除しない**。削除すると `vote_count` 列が ambiguous エラーで全 RPC コールが失敗する。
- 現 score 仕様は `score = wakaru_count * 2`（`vote_post` RPC 内の UPDATE で計算）。
- 旧 score 仕様 `aruaru * 2 + funny - nai` は**使わない**（`aruaru_count` / `funny_count` / `nai_count` 列は更新経路無く形骸化）。

### Server Actions

- `'use server'` ファイルからは `async function` 以外を export しない。
- Server Action の initial state / type / schema は `'use server'` ではない別ファイルへ置く。
- 管理系 Server Actions は `requireAdmin()` を経由する（Server Actions は HTTP エンドポイントとして外部露出するため）。
- Supabase の詳細エラーをユーザー画面に出さない。
- `throwQueryError` は `error.message` を絶対にクライアントに throw しない。確立パターン:
  ```ts
  if (error) {
    console.error(`${context}:`, error);
    throw new Error('データの取得に失敗しました');
  }
  ```

### Migration

- 既存 migration は書き換えず、新しい timestamp 付き migration を追加する。
- DB / RLS 変更時は `npx supabase db push` で適用。

---

## 2. 開発サーバー運用

### `npm run dev` を使わない、`npm run dev:fresh` を使う

- `.next` キャッシュ汚染で CSS 崩壊する Windows 環境の既知問題があるため、`dev:fresh` が必須。
- `.npmrc` の `script-shell=powershell.exe` 設定で `dev:fresh` の `Remove-Item .next` が動作する。
- UI 変更後は必ず `npm run dev:fresh` で実機確認してから「完了」と報告する。HMR での確認は不十分。

---

## 3. 完了条件（Required Checks）

変更後は原則として以下を実行すること。

```bash
npm run lint
npm run build
```

両方が成功するまで「完了」と報告しない。

DB / RLS 変更がある場合は以下も必要。

```bash
npx supabase db push
npx supabase gen types typescript --linked | Out-File -FilePath src\lib\supabase\database.types.ts -Encoding utf8
```

---

## 4. プロジェクト概要

ユーザーが「あるあるネタ」を投稿し、投票・コメント・ランキング閲覧できる Web サイトです。

初期リリースでは職業あるあるから開始しますが、将来的に以下へ拡張します。

- 動物あるある
- 地域あるある
- 趣味あるある
- 学校あるある
- 釣り人あるある
- 子育てあるある

## 5. 重要方針

- 職業専用サイトとして作りすぎないこと
- 親カテゴリ > 子カテゴリ > 投稿 の汎用構造にすること
- スマホファーストで作ること
- 投稿、投票、ランキング、コメント、通報、広告枠を MVP の中心にすること
- コメントは承認制にしない。原則即時公開とする
- 広告枠は必ずコンポーネント化すること（`WideAd.tsx` 経由のみ）
- 画像をそのまま背景として貼らず、Tailwind CSS で再現すること

## 6. デザイン方針

`docs/design/` の画像を参考にする。

重視すること：

- 白〜クリーム系の明るい背景
- オレンジ系の CTA
- 角丸カード
- やさしい影
- 親しみやすいイラスト感
- 広告枠が自然に入るレイアウト
- かわいいが、安っぽくしない
- WCAG AA コントラスト達成済みのデザイントークン値（`HANDOFF.md` §3 参照）を**戻してはいけない**

## 7. 技術方針

- Next.js 15（App Router）
- TypeScript
- Tailwind CSS 4（`tailwind.config.ts` を `@config` ディレクティブで読み込み）
- Supabase PostgreSQL
- Vercel デプロイ想定

## 8. 実装時の注意

- 1 タスクでやる範囲を広げすぎないこと
- まず静的 UI を作り、その後 DB 接続すること
- `npm run build` が通る状態を保つこと
- 型エラーを放置しないこと
- 可能な限りコンポーネント分割すること
- `.env.local`, `.next`, `node_modules`, `supabase/.temp` はコミットしないこと
- 既存ファイルの編集は最小限に。新規ファイル追加で済むなら追加を優先。

---

## 9. 参考リンク

- 現在の状態・未完了 TODO・リリース前チェックリストは `HANDOFF.md` を参照
- 過去の重要決定は `git log --oneline -50` と commit message 本文を参照
