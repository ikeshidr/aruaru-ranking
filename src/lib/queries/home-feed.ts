import { popularCategories, nursePosts } from '@/data/dummy';
import { getPublishedCategories } from '@/lib/queries/categories';
import { getPublishedPostsByCategory } from '@/lib/queries/posts';
import type { Database } from '@/lib/supabase/database.types';

type CategoryRow = Database['public']['Tables']['categories']['Row'];
type PostRow = Database['public']['Tables']['posts']['Row'];

type HomeFeedData = {
  categories: { name: string; count: number }[];
  posts: typeof nursePosts;
  source: 'database' | 'fallback';
  errorMessage: string | null;
};

function formatDate(isoDate: string) {
  return isoDate.slice(0, 10);
}

export async function getHomeFeedData(): Promise<HomeFeedData> {
  try {
    const categories = await getPublishedCategories();
    const firstCategory = categories[0];

    if (!firstCategory) {
      return {
        categories: popularCategories,
        posts: nursePosts,
        source: 'fallback',
        errorMessage: 'カテゴリデータが0件のため、ダミーデータを表示しています。'
      };
    }

    const posts = await getPublishedPostsByCategory(firstCategory.id);

    return {
      categories: categories.map((category: CategoryRow) => ({ name: category.name, count: 0 })),
      posts: posts.map((post: PostRow, index: number) => ({
        id: index + 1,
        rank: index + 1,
        category: firstCategory.name,
        body: post.body,
        author: post.author_name ?? '匿名ユーザー',
        createdAt: formatDate(post.published_at ?? post.created_at),
        aruaru: post.aruaru_count,
        funny: post.funny_count,
        nai: post.nai_count,
        comments: post.comment_count,
        tags: []
      })),
      source: 'database',
      errorMessage: null
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'DB接続に失敗しました。';

    return {
      categories: popularCategories,
      posts: nursePosts,
      source: 'fallback',
      errorMessage: message
    };
  }
}
