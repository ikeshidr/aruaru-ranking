import { Post } from '@/components/types';

export const popularCategories = [
  { name: '看護師', count: 1240 },
  { name: '介護士', count: 890 },
  { name: '美容師', count: 760 },
  { name: '営業職', count: 950 },
  { name: '飲食店バイト', count: 680 },
  { name: '工場勤務', count: 810 },
  { name: 'トラック運転手', count: 540 },
  { name: '動物', count: 430 }
];

export const nurseTags = ['すべて', '夜勤', 'ナースコール', '患者さん', '人間関係', '休憩'];
export const nursePosts: Post[] = [
  { id: 1, rank: 1, category: '看護師', body: 'ナースコールの幻聴で休日でも耳が反応する。', author: '匿名ナース', createdAt: '2026-05-01', aruaru: 342, funny: 120, nai: 8, comments: 28, tags: ['夜勤', 'ナースコール'] },
  { id: 2, rank: 2, category: '看護師', body: '休憩に入った瞬間だけ急変コールが鳴る気がする。', author: 'A子', createdAt: '2026-04-29', aruaru: 298, funny: 103, nai: 12, comments: 15, tags: ['休憩'] },
  { id: 3, rank: 3, category: '看護師', body: '手袋を外した直後に別件対応が入る。', author: 'ナース太郎', createdAt: '2026-04-28', aruaru: 256, funny: 88, nai: 15, comments: 9, tags: ['患者さん'] }
];
