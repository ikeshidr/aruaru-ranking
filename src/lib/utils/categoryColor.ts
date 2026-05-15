export type CategoryColorKey = 'student' | 'work' | 'daily' | 'hobby' | 'love' | 'family';

const SLUG_OVERRIDES: Record<string, CategoryColorKey> = {
  student: 'student',
  school: 'student',
  teacher: 'student',
  highschool: 'student',
  university: 'student',
  college: 'student',

  occupation: 'work',
  nurse: 'work',
  engineer: 'work',
  office: 'work',
  sales: 'work',
  beauty: 'work',
  beautician: 'work',
  caregiver: 'work',
  factory: 'work',
  driver: 'work',
  restaurant: 'work',

  daily: 'daily',
  life: 'daily',
  animal: 'daily',
  region: 'daily',

  hobby: 'hobby',
  gaming: 'hobby',
  anime: 'hobby',
  idol: 'hobby',
  music: 'hobby',
  oshi: 'hobby',

  love: 'love',
  romance: 'love',
  dating: 'love',

  family: 'family',
  parent: 'family',
  kids: 'family',
  child: 'family',
};

const GROUP_OVERRIDES: Record<string, CategoryColorKey> = {
  学生: 'student',
  学校: 'student',
  仕事: 'work',
  職業: 'work',
  職業あるある: 'work',
  日常生活: 'daily',
  日常: 'daily',
  地域: 'daily',
  動物: 'daily',
  '趣味・推し': 'hobby',
  趣味: 'hobby',
  推し: 'hobby',
  恋愛: 'love',
  '家族・親': 'family',
  家族: 'family',
  親: 'family',
};

// Full literal class strings so Tailwind's content scanner picks them up.
const CLASS_MAP: Record<CategoryColorKey, { text: string; bg: string; pill: string }> = {
  student: {
    text: 'text-category-student',
    bg: 'bg-category-student-bg',
    pill: 'bg-category-student-bg text-category-student',
  },
  work: {
    text: 'text-category-work',
    bg: 'bg-category-work-bg',
    pill: 'bg-category-work-bg text-category-work',
  },
  daily: {
    text: 'text-category-daily',
    bg: 'bg-category-daily-bg',
    pill: 'bg-category-daily-bg text-category-daily',
  },
  hobby: {
    text: 'text-category-hobby',
    bg: 'bg-category-hobby-bg',
    pill: 'bg-category-hobby-bg text-category-hobby',
  },
  love: {
    text: 'text-category-love',
    bg: 'bg-category-love-bg',
    pill: 'bg-category-love-bg text-category-love',
  },
  family: {
    text: 'text-category-family',
    bg: 'bg-category-family-bg',
    pill: 'bg-category-family-bg text-category-family',
  },
};

export function getCategoryColorKey(opts: { slug?: string | null; groupName?: string | null }): CategoryColorKey {
  const slug = opts.slug?.trim().toLowerCase();
  if (slug && SLUG_OVERRIDES[slug]) return SLUG_OVERRIDES[slug];

  const group = opts.groupName?.trim();
  if (group) {
    if (GROUP_OVERRIDES[group]) return GROUP_OVERRIDES[group];
    if (group.includes('学')) return 'student';
    if (group.includes('仕事') || group.includes('職')) return 'work';
    if (group.includes('日常') || group.includes('地域') || group.includes('動物')) return 'daily';
    if (group.includes('趣味') || group.includes('推し')) return 'hobby';
    if (group.includes('恋愛')) return 'love';
    if (group.includes('家族') || group.includes('親')) return 'family';
  }

  return 'daily';
}

export function getCategoryPillClass(opts: { slug?: string | null; groupName?: string | null }): string {
  return CLASS_MAP[getCategoryColorKey(opts)].pill;
}

export function getCategoryTextClass(opts: { slug?: string | null; groupName?: string | null }): string {
  return CLASS_MAP[getCategoryColorKey(opts)].text;
}
