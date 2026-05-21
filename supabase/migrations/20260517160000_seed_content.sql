-- =========================================================
-- テスト投稿を全削除
-- =========================================================
delete from public.posts where body like 'テスト%';

-- =========================================================
-- 本番用あるある投稿データ（各カテゴリー10件）
-- =========================================================
-- 既存カテゴリーのIDを subquery で取得して insert する
-- categories テーブルの slug で引く

-- 看護師あるある
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id,
  v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 200 + 10)::int,
  floor(random() * 200 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('夜勤明けに「おはようございます」って言われると、一瞬バグる。', '匿名さん'),
  ('患者さんの名前を覚えるのに必死すぎて、プライベートでもフルネームで呼んでしまう。', '看護師7年目'),
  ('休憩室でご飯食べてると必ず呼ばれる。', '匿名さん'),
  ('血管を見る癖が抜けない。他人の腕を見て「いい血管してる」と思ってしまう。', '内科ナース'),
  ('「少し痛いですよ」と言いながら全然痛くない処置をしても、患者さんがすごく怖がる。', '匿名さん'),
  ('申し送りが長い先輩のせいで休憩が削られていく。', '匿名さん'),
  ('サマリー書き終わった瞬間に追加情報が来る。', '病棟ナース'),
  ('ナースコールが鳴るとご飯の味がしなくなる。', '夜勤担当'),
  ('休みの日も白衣を着て出かけたくなる夢を見る。', '匿名さん'),
  ('点滴のルート組み立てがどこにいても速い自信がある。', 'ICUナース')
) as v(body, author_name)
where c.slug = 'nurse';

-- 教師あるある
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id,
  v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 180 + 10)::int,
  floor(random() * 180 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('授業中に自分でボケて、自分でツッコんで、ひとり笑いをこらえる。', '中学教師'),
  ('名簿を見なくても出席番号で全員の顔が浮かぶ。', '高校教師'),
  ('課題の提出日、なぜかいつもギリギリ。', '匿名さん'),
  ('保護者会の前日は決まって眠れない。', '担任10年目'),
  ('生徒に「先生って家あるんですか？」って本気で聞かれた。', '匿名さん'),
  ('採点中に「この答え、ある意味合ってる…」と思う瞬間がある。', '国語教師'),
  ('職員室でお菓子を食べていると必ず生徒に見つかる。', '匿名さん'),
  ('遠足の引率中に自分が一番楽しんでいる。', '小学校教師'),
  ('卒業生が訪ねてきても最初の2秒は誰かわからない。', '匿名さん'),
  ('テスト返却日の教室の空気が一番緊張する。', '理科教師')
) as v(body, author_name)
where c.slug = 'teacher';

-- エンジニアあるある
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id,
  v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 220 + 10)::int,
  floor(random() * 220 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('バグを直したら別のバグが生まれた。', '匿名さん'),
  ('「ちょっと修正するだけ」が一番時間かかる。', 'バックエンドエンジニア'),
  ('コードを書いていて気づいたら深夜3時。', '匿名さん'),
  ('コメントに「なんでこうした？」と書いてあって、書いた本人が自分だった。', 'フロントエンジニア'),
  ('動いてる理由はわからないけど動いてるのでヨシ。', '匿名さん'),
  ('Stack Overflow の回答をコピーしてとりあえず動かす。', 'インフラエンジニア'),
  ('会議中に「それ実装できる？」って聞かれると全員の顔がこっちを向く。', '匿名さん'),
  ('本番環境で直接触るときだけ手が震える。', 'SRE'),
  ('ドキュメントを書こうと思ったままリリースを迎えた。', '匿名さん'),
  ('「仕様です」で全部解決しようとする人がいる。', 'Webエンジニア')
) as v(body, author_name)
where c.slug = 'engineer';
