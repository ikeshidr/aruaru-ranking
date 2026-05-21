insert into public.categories
  (type, name, title, group_name, slug, description, icon_key, tags, sort_order, is_active)
values
  (
    'occupation', '会社員', '会社員あるある', '職業あるある', 'office-worker',
    '会社員・サラリーマンあるある。会議・上司・テレワークなど、働く人なら誰でも共感できるネタ集。',
    'office-worker', array['会議','上司','テレワーク','残業','飲み会'], 10, true
  ),
  (
    'occupation', '医師', '医師あるある', '職業あるある', 'doctor',
    '医師・ドクターあるある。当直・研修医・カルテなど医療現場のリアルな共感ネタ集。',
    'doctor', array['当直','研修医','カルテ','オーベン','回診'], 11, true
  ),
  (
    'animal', '猫飼い', '猫飼いあるある', 'ペットあるある', 'cat-owner',
    '猫を飼っている人なら絶対わかる！早朝起こされる・ダンボール大好き・肉球の匂いなど猫あるあるネタ集。',
    'cat-owner', array['早朝','ダンボール','肉球','甘噛み','猫吸い','ゴロゴロ'], 20, true
  ),
  (
    'animal', '犬飼い', '犬飼いあるある', 'ペットあるある', 'dog-owner',
    '犬を飼っている人なら共感必至！散歩・トリミング・甘噛みなど愛犬家あるあるネタ集。',
    'dog-owner', array['散歩','トリミング','甘噛み','お留守番','しつけ'], 21, true
  ),
  (
    'school', '大学生', '大学生あるある', '学校あるある', 'university-student',
    '大学生なら絶対共感！単位・サークル・バイト・レポートなど大学生活のリアルあるあるネタ集。',
    'university-student', array['単位','サークル','バイト','レポート','シラバス','履修'], 30, true
  );
