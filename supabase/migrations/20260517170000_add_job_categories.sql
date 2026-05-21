-- =========================================================
-- 職業系カテゴリーを 8 つ追加 + 各 10 件のあるあるをシード
-- 既存の sort_order 30 (engineer) の続きで 40〜110 を割り当て
-- =========================================================

-- ---------------------------------------------------------
-- カテゴリー追加
-- ---------------------------------------------------------
insert into public.categories (type, name, slug, title, group_name, description, icon_key, sort_order, is_active)
values
  ('occupation', '介護士',        'caregiver',  '介護士あるある',         '職業', '介護士・ヘルパーのあるある',     'care',     40, true),
  ('occupation', '美容師',        'beautician', '美容師あるある',         '職業', '美容師・理容師のあるある',       'beauty',   50, true),
  ('occupation', '営業職',        'sales',      '営業職あるある',         '職業', '営業・セールスのあるある',       'sales',    60, true),
  ('occupation', '飲食店バイト',  'restaurant', '飲食店バイトあるある',   '職業', '飲食店・カフェのバイトあるある', 'food',     70, true),
  ('occupation', '工場勤務',      'factory',    '工場勤務あるある',       '職業', '製造業・工場勤務のあるある',     'factory',  80, true),
  ('occupation', '事務職',        'office',     '事務職あるある',         '職業', '一般事務・OLのあるある',         'office',   90, true),
  ('occupation', '保育士',        'nursery',    '保育士あるある',         '職業', '保育士・幼稚園教諭のあるある',   'nursery', 100, true),
  ('occupation', 'トラック運転手','driver',     'トラック運転手あるある', '職業', 'ドライバー・配送業のあるある',   'truck',   110, true);

-- ---------------------------------------------------------
-- 介護士
-- ---------------------------------------------------------
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id, v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 290 + 10)::int,
  floor(random() * 290 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('利用者さんの名前を覚えるのに必死すぎて、プライベートでもフルネームで呼びそうになる。', '介護士3年目'),
  ('夜勤明けにコンビニに寄ったら白衣のまま来てたことに気づく。', '匿名さん'),
  ('「もう帰りたい」という利用者さんに、帰れない理由を一緒に考える時間が意外と好き。', '特養スタッフ'),
  ('腰が笑うという感覚を20代で覚えた。', '匿名さん'),
  ('介護記録を書く速さだけは自信がある。', '訪問介護員'),
  ('利用者さんに「若いのにえらいね」と言われると全部報われる。', '匿名さん'),
  ('移乗の瞬間だけ全集中する。', 'デイサービス'),
  ('入浴介助のあとは自分もさっぱりした気分になる。', '匿名さん'),
  ('認知症の方に同じ話を100回聞かされても、毎回初めて聞く顔ができるようになった。', 'グループホーム'),
  ('バイタル測定の数値、一瞬で暗記できる。', '匿名さん')
) as v(body, author_name)
where c.slug = 'caregiver';

-- ---------------------------------------------------------
-- 美容師
-- ---------------------------------------------------------
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id, v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 290 + 10)::int,
  floor(random() * 290 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('「お任せで」と言われた瞬間が一番プレッシャー。', '美容師5年目'),
  ('休みの日に友達の髪が気になって無意識に触りそうになる。', '匿名さん'),
  ('シャンプー台で寝てしまったお客さんを起こすタイミングがわからない。', 'スタイリスト'),
  ('鏡越しに会話するの、最初はすごく不自然だった。', '匿名さん'),
  ('カットした髪が自分の服の中に入る。', 'アシスタント'),
  ('「前回と同じで」と言われても前回のカルテを必死に確認する。', '匿名さん'),
  ('立ちっぱなしで足がむくむのはもう諦めた。', 'フリーランス美容師'),
  ('お客さんが帰ったあとにやっと水が飲める。', '匿名さん'),
  ('ブリーチ中の時間管理が人生で一番緊張する。', 'カラー担当'),
  ('美容師同士で集まると全員が誰かの髪を触りだす。', '匿名さん')
) as v(body, author_name)
where c.slug = 'beautician';

-- ---------------------------------------------------------
-- 営業職
-- ---------------------------------------------------------
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id, v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 290 + 10)::int,
  floor(random() * 290 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('月末になると上司の目つきが変わる。', '法人営業'),
  ('「検討します」が一番つらいお断りワード。', '匿名さん'),
  ('名刺入れがいつもパンパン。', '営業5年目'),
  ('移動中の電車でメールを打ちながら昼ごはんを食べる。', '外回り営業'),
  ('ノルマ達成した瞬間、次のノルマが始まる。', '匿名さん'),
  ('断られた数だけ強くなれると信じないとやってられない。', 'ルート営業'),
  ('お客さんの趣味に合わせた話題を事前準備するのが地味にしんどい。', '匿名さん'),
  ('経費精算が月末に山積みになる。', '営業部'),
  ('「また来てください」と言われても100%社交辞令とわかっている。', '匿名さん'),
  ('雨の日の飛び込み営業は本当に心が折れる。', '新卒営業')
) as v(body, author_name)
where c.slug = 'sales';

-- ---------------------------------------------------------
-- 飲食店バイト
-- ---------------------------------------------------------
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id, v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 290 + 10)::int,
  floor(random() * 290 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('「いらっしゃいませ」が口癖になってプライベートでも言いそうになる。', 'カフェバイト'),
  ('混雑時に頭の中でテーブル番号と注文が自動で整理される。', '居酒屋スタッフ'),
  ('閉店間際に来るお客さんには複雑な感情がある。', '匿名さん'),
  ('賄いが一番おいしい。', 'ファミレスバイト'),
  ('皿を何枚でも重ねて運べる特技、日常では使えない。', '匿名さん'),
  ('レジを打つ速さだけは誰にも負けない自信がある。', 'コンビニ兼務'),
  ('「少々お待ちください」を言いながら全力で走っている。', '匿名さん'),
  ('オーダーミスしたとき、厨房に言いに行く足が重い。', '居酒屋'),
  ('酔っぱらいのお客さんの対応で人間力が鍛えられた。', '匿名さん'),
  ('バイト終わりに食べるまかないのためだけに頑張れる日がある。', 'レストランバイト')
) as v(body, author_name)
where c.slug = 'restaurant';

-- ---------------------------------------------------------
-- 工場勤務
-- ---------------------------------------------------------
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id, v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 290 + 10)::int,
  floor(random() * 290 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('ラインが止まった瞬間の静寂が怖い。', '製造業10年'),
  ('同じ動作を8時間繰り返すと、家に帰ってもやってる夢を見る。', '匿名さん'),
  ('耳栓なしではもう眠れない体になった。', '夜勤ライン'),
  ('工場の人間は時間に超正確。1分の遅刻でもざわつく。', '匿名さん'),
  ('製品の欠陥を一瞬で見抜ける目が身についた。', '品質管理'),
  ('休憩のタイミングが体内時計に刷り込まれている。', '匿名さん'),
  ('安全靴を脱いだ瞬間の解放感がたまらない。', '物流倉庫'),
  ('ラインのスピードが上がった日は全員テンションが下がる。', '匿名さん'),
  ('ベテランのおじさんの手さばきを見るのが地味に好き。', '期間工'),
  ('工場あるあるを話せる人が家族にいないのでずっと一人で抱えている。', '匿名さん')
) as v(body, author_name)
where c.slug = 'factory';

-- ---------------------------------------------------------
-- 事務職
-- ---------------------------------------------------------
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id, v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 290 + 10)::int,
  floor(random() * 290 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('Excelのショートカットキーを覚えると、謎の達成感がある。', '事務職4年目'),
  ('電話の取り次ぎで「少々お待ちください」と言いながら全力で走る。', '匿名さん'),
  ('回覧板が自分のところで止まっていたことに気づいて焦る。', '一般事務'),
  ('コピー用紙の補充、なんで自分だけやってるんだろうと思う。', '匿名さん'),
  ('議事録係になると会議の内容が頭に入らない。', '総務担当'),
  ('「至急」と書いてある書類が1日5枚くる。', '匿名さん'),
  ('印鑑の押し忘れを最後に発見するのはいつも自分。', '経理事務'),
  ('定時上がりに罪悪感を感じるようになってしまった。', '匿名さん'),
  ('来客対応でお茶を出すとき、毎回どっちから出すか迷う。', '受付事務'),
  ('エクセルの数式が壊れたとき、作った人を心の中で恨む。', '匿名さん')
) as v(body, author_name)
where c.slug = 'office';

-- ---------------------------------------------------------
-- 保育士
-- ---------------------------------------------------------
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id, v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 290 + 10)::int,
  floor(random() * 290 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('子どもに「先生って家あるの？」と本気で聞かれる。', '保育士6年目'),
  ('給食を食べる速さが異常に上がった。', '匿名さん'),
  ('外遊びのあと自分が一番泥だらけになっている。', '幼稚園教諭'),
  ('子どもの名前を間違えると100倍傷つく。', '匿名さん'),
  ('ピアノが弾けることより、全力で走れることの方が重要だと気づいた。', '公立保育園'),
  ('泣いている子をあやしながら別の子の対応をしながら書類を書く。', '匿名さん'),
  ('運動会の前週は全員が戦場モードになる。', 'こども園スタッフ'),
  ('子どもが熱を出すと連絡がつくまで心配でたまらない。', '匿名さん'),
  ('保護者の顔より子どもの顔の方が圧倒的に覚えが早い。', '乳児担当'),
  ('帰宅後に子どもの歌が頭から離れない。', '匿名さん')
) as v(body, author_name)
where c.slug = 'nursery';

-- ---------------------------------------------------------
-- トラック運転手
-- ---------------------------------------------------------
insert into public.posts (category_id, body, author_name, status, approved_at, vote_count, score, tags, visitor_id)
select c.id, v.body, v.author_name, 'approved', now() - (random() * interval '30 days'),
  floor(random() * 290 + 10)::int,
  floor(random() * 290 + 10)::int,
  '{}', gen_random_uuid()::text
from public.categories c
cross join (values
  ('SA・PAのご飯がなぜか一番うまく感じる。', 'ドライバー8年'),
  ('渋滞情報を見ると無意識にルートを計算している。', '匿名さん'),
  ('荷物の積み方に美学がある。', '長距離ドライバー'),
  ('一人の時間が好きな人間に向いている仕事だと思う。', '匿名さん'),
  ('ラジオのパーソナリティの声が一番の相棒。', '近距離配送'),
  ('バック駐車を一発で決めたときの達成感は格別。', '匿名さん'),
  ('天気予報と道路情報は毎日欠かさず確認する。', '冷蔵車担当'),
  ('家族が起きる前に出て、寝た後に帰る日が続く。', '匿名さん'),
  ('走行距離の感覚がバグって、徒歩10分が「近い」と思えなくなった。', '幹線輸送'),
  ('荷主さんに「ありがとう」と言われるとまた頑張れる。', '匿名さん')
) as v(body, author_name)
where c.slug = 'driver';
