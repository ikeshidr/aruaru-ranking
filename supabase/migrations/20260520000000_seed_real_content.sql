-- =========================================================
-- 本番用シード: 各カテゴリー 5 件 × 8 カテゴリー = 40 件
-- 全て author_name='運営', status='approved', vote_count を指定
-- =========================================================

-- office-worker
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count)
select c.id, v.body, '運営', 'approved', now(), v.vote_count
from public.categories c
cross join (values
  ('月曜の朝、なぜか日曜の夜から憂鬱になる', 47),
  ('「ちょっといいですか」がだいたいちょっとじゃない', 39),
  ('有給申請するだけで謎の罪悪感がある', 28),
  ('帰ろうとした瞬間に「ちょっとだけいい？」が来る', 26),
  ('お昼何食べるか11時から考えてる', 8)
) as v(body, vote_count)
where c.slug = 'office-worker';

-- nurse
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count)
select c.id, v.body, '運営', 'approved', now(), v.vote_count
from public.categories c
cross join (values
  ('夜勤明けは何もしてないのに一日が終わる', 44),
  ('ナースコールが鳴ると夢の中でも反応してしまう', 33),
  ('休憩室のご飯を食べ終わる前に呼ばれる', 31),
  ('患者さんの「大丈夫です」に逆に不安になる', 18),
  ('ナースシューズがすぐボロボロになる', 9)
) as v(body, vote_count)
where c.slug = 'nurse';

-- doctor
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count)
select c.id, v.body, '運営', 'approved', now(), v.vote_count
from public.categories c
cross join (values
  ('自分が病気になると妙に症状を過小評価してしまう', 42),
  ('専門外の健康相談を親戚からされがち', 34),
  ('ドラマの医療シーンにどうしてもツッコんでしまう', 25),
  ('当直明けの外来が一番つらい', 17),
  ('電子カルテの入力中に呼ばれて何を書こうとしたか忘れる', 8)
) as v(body, vote_count)
where c.slug = 'doctor';

-- teacher
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count)
select c.id, v.body, '運営', 'approved', now(), v.vote_count
from public.categories c
cross join (values
  ('休み時間なのに全然休めない', 45),
  ('「先生って夏休みいいよね」と言われるたびにモヤる', 37),
  ('通知表の所見欄が埋まらなくて夜中まで悩む', 24),
  ('生徒の流行語をこっそり調べる', 19),
  ('卒業式で毎年泣く', 14)
) as v(body, vote_count)
where c.slug = 'teacher';

-- engineer
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count)
select c.id, v.body, '運営', 'approved', now(), v.vote_count
from public.categories c
cross join (values
  ('動いてる理由はわからないけど動いてるからよし', 49),
  ('「ちょっと修正するだけ」が一日仕事になる', 41),
  ('ローカルでは動くのにな…', 33),
  ('再現しないバグが一番怖い', 26),
  ('昨日書いたコードが今日は読めない', 11)
) as v(body, vote_count)
where c.slug = 'engineer';

-- cat-owner
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count)
select c.id, v.body, '運営', 'approved', now(), v.vote_count
from public.categories c
cross join (values
  ('猫がいると布団から出られない', 46),
  ('高いおもちゃより袋のカサカサに夢中', 35),
  ('猫が膝に乗ってきたらトイレを我慢する', 29),
  ('帰宅してまず猫を探す', 17),
  ('朝4時に顔を踏まれて起こされる', 8)
) as v(body, vote_count)
where c.slug = 'cat-owner';

-- dog-owner
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count)
select c.id, v.body, '運営', 'approved', now(), v.vote_count
from public.categories c
cross join (values
  ('帰宅したときの興奮っぷりで疲れが吹き飛ぶ', 43),
  ('おやつの袋の音に異常な反応を示す', 32),
  ('ソファを独占されても文句が言えない', 27),
  ('雨の日の散歩が憂鬱なのは飼い主だけ', 18),
  ('「待て」ができると無駄に自慢したくなる', 7)
) as v(body, vote_count)
where c.slug = 'dog-owner';

-- university-student
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count)
select c.id, v.body, '運営', 'approved', now(), v.vote_count
from public.categories c
cross join (values
  ('1限に出席できた日は一日が充実した気がする', 44),
  ('レポート締切前日だけ友達とのLINEが活発になる', 38),
  ('「単位落とした」話題で盛り上がれる', 24),
  ('バイトのシフトと試験期間が毎回かぶる', 19),
  ('卒論の存在を3年生まで他人事だと思っている', 7)
) as v(body, vote_count)
where c.slug = 'university-student';
