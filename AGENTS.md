# あるあるランキング 開発ルール

このリポジトリは「あるあるランキング / あるある言いたい！」の開発用です。

## 2026-05 現在の最優先ルール

既存仕様より下記を優先してください。

- 投稿はMVPでは即時公開へ変更する方針。`posts.status = approved` を公開状態として使う。
- 投稿で `published` / `public` status は使わない。
- 公開投稿の取得条件は `status = 'approved' and deleted_at is null` を維持する。
- コメントは承認制にしない。投稿後すぐ公開する。
- コメントの公開状態は `comments.status = public` を使う。
- 公開コメントの取得条件は `status = 'public' and deleted_at is null` を維持する。
- 管理画面は「事前承認」より「事後モデレーション」を主目的にする。
- `'use server'` ファイルからは async function 以外を export しない。
- Server Action の initial state / type / schema は `'use server'` ではない別ファイルへ置く。
- Supabase の詳細エラーをユーザー画面に出さない。
- 既存migrationは書き換えず、新しいtimestamp付きmigrationを追加する。

## プロジェクト概要

ユーザーが「あるあるネタ」を投稿し、投票・コメント・ランキング閲覧できるWebサイトです。

初期リリースでは職業あるあるから開始しますが、将来的に以下へ拡張します。

- 動物あるある
- 地域あるある
- 趣味あるある
- 学校あるある
- 釣り人あるある
- 子育てあるある

## 重要方針

- 職業専用サイトとして作りすぎないこと
- 親カテゴリ > 子カテゴリ > 投稿 の汎用構造にすること
- スマホファーストで作ること
- 投稿、投票、ランキング、コメント、通報、広告枠をMVPの中心にすること
- コメントは承認制にしない。原則即時公開とする
- 広告枠は必ずコンポーネント化すること
- 画像をそのまま背景として貼らず、Tailwind CSSで再現すること

## デザイン方針

`docs/design/` の画像を参考にする。

重視すること：

- 白〜クリーム系の明るい背景
- オレンジ系のCTA
- 角丸カード
- やさしい影
- 親しみやすいイラスト感
- 広告枠が自然に入るレイアウト
- かわいいが、安っぽくしない

## 技術方針

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Supabase PostgreSQL
- Vercel デプロイ想定

## 実装時の注意

- 1タスクでやる範囲を広げすぎないこと
- まず静的UIを作り、その後DB接続すること
- `npm run build` が通る状態を保つこと
- 型エラーを放置しないこと
- 可能な限りコンポーネント分割すること
- `.env.local`, `.next`, `node_modules`, `supabase/.temp` はコミットしないこと

## Required Checks

変更後は原則として以下を実行すること。

```bash
npm run lint
npm run build
```

DB/RLS変更がある場合は以下も必要。

```bash
npx supabase db push
npx supabase gen types typescript --linked | Out-File -FilePath src\lib\supabase\database.types.ts -Encoding utf8
```
