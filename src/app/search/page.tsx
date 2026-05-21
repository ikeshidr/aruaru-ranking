import type { Metadata } from 'next';
import Link from 'next/link';
import { PostCard } from '@/components/posts/PostCard';
import { RankingPostCard } from '@/components/posts/RankingPostCard';
import { Container } from '@/components/ui/Container';
import { searchPosts } from '@/lib/queries/posts';

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  return {
    title: query ? `「${query}」の検索結果 | あるあるランキング` : '検索 | あるあるランキング',
    robots: { index: false },
  };
}

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const posts = query ? await searchPosts(query) : [];

  return (
    <main>
      <Container className="space-y-8 py-8">
        <section className="rounded-[32px] border border-[#f5eadc] bg-[#fffaf2] p-8 shadow-sm">
          <p className="text-sm font-black text-orange-500">SEARCH</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl">
            {query ? `「${query}」の検索結果` : 'キーワード検索'}
          </h1>
          <form action="/search" method="get" className="mt-6">
            <label className="relative block max-w-xl">
              <span className="sr-only">キーワードで検索</span>
              <input
                type="search"
                name="q"
                defaultValue={query}
                autoFocus={!query}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-14 font-bold text-slate-700 outline-none ring-orange-200 placeholder:text-slate-400 focus:border-orange-200 focus:ring-2"
                placeholder="例：休憩に入った瞬間だけ忙しくなる"
                maxLength={100}
              />
              <button
                type="submit"
                aria-label="検索"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-orange-500 px-3 py-2 text-sm text-white hover:bg-orange-600"
              >
                🔍
              </button>
            </label>
          </form>
        </section>

        {!query ? (
          <div className="rounded-[28px] border border-dashed border-orange-200 bg-orange-50/60 px-6 py-12 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-4 text-xl font-black text-slate-800">何を探しますか？</p>
            <p className="mt-2 text-sm font-bold text-slate-500">
              職業・動物・学校など、あるあるのキーワードを入力してください。
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
            <p className="text-4xl">😢</p>
            <p className="mt-4 text-xl font-black text-slate-800">
              「{query}」に一致するあるあるは見つかりませんでした
            </p>
            <p className="mt-2 text-sm font-bold text-slate-500">
              別のキーワードで検索するか、カテゴリーから探してみてください。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/categories" className="rounded-full border border-orange-200 bg-orange-50 px-5 py-2.5 text-sm font-black text-orange-600 hover:bg-orange-100">
                カテゴリー一覧を見る
              </Link>
              <Link href="/ranking" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-black text-slate-600 hover:bg-slate-50">
                ランキングを見る
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm font-bold text-slate-500">
              <span className="font-black text-slate-800">{posts.length}</span> 件見つかりました
              {posts.length === 30 && <span className="ml-2 text-xs text-slate-400">（上位 30 件を表示）</span>}
            </p>
            <div className="space-y-4">
              {posts.map((post, index) =>
                index < 3
                  ? <RankingPostCard key={post.id} rank={index + 1} post={post} />
                  : <PostCard key={post.id} post={post} />
              )}
            </div>
          </>
        )}
      </Container>
    </main>
  );
}
