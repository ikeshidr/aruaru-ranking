import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ModeratePostList } from '@/components/admin/ModeratePostList';
import { adminLogoutAction } from '@/lib/actions/admin';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getCurrentAdminUser, getPublicPostsForModeration, getReportCountsByPostId } from '@/lib/queries/admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '管理画面',
  robots: {
    index: false,
    follow: false,
  },
};


export default async function AdminPage() {
  const adminUser = await getCurrentAdminUser();

  if (!adminUser) {
    redirect('/admin/login');
  }

  const posts = await getPublicPostsForModeration();
  const reportCounts = await getReportCountsByPostId(posts.map((p) => p.id));

  return (
    <main>
      <Container className="space-y-8 py-8">
        <section className="rounded-[32px] border border-[#f5eadc] bg-[#fffaf2] p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black text-orange-500">ADMIN</p>
              <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl">管理画面</h1>
              <p className="mt-4 max-w-2xl font-bold leading-8 text-slate-600">
                公開中の投稿を監視し、ガイドライン違反や不適切な内容は「非公開にする」で即時対応できます。
              </p>
            </div>
            <form action={adminLogoutAction}>
              <button
                type="submit"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-600 shadow-sm hover:bg-slate-50"
              >
                ログアウト
              </button>
            </form>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black text-slate-950">公開中の投稿（事後モデレーション）</h2>
                <p className="mt-2 text-sm font-bold text-slate-500">公開中の投稿を確認し、ガイドライン違反があれば非公開にできます。直近 50 件を表示しています。</p>
              </div>
            </div>
            <ModeratePostList posts={posts} reportCounts={reportCounts} />
          </section>

          <aside className="space-y-5">
            <SectionCard>
              <h2 className="text-lg font-black text-slate-950">モデレーションの目安</h2>
              <ul className="mt-4 space-y-3 text-sm font-bold leading-7 text-slate-600">
                <li>・個人情報・連絡先が含まれる投稿</li>
                <li>・特定個人への誹謗中傷・差別的表現</li>
                <li>・スパム・宣伝目的とみられる投稿</li>
                <li>・その他ガイドライン違反の疑いがある投稿</li>
              </ul>
            </SectionCard>

            <SectionCard className="bg-gradient-to-br from-orange-50 to-rose-50">
              <h2 className="text-lg font-black text-slate-950">ログイン中</h2>
              <p className="mt-3 break-all text-sm font-bold leading-7 text-slate-600">{adminUser.email}</p>
            </SectionCard>
          </aside>
        </div>
      </Container>
    </main>
  );
}
