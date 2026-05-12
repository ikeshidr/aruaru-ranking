import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { PendingPostList } from '@/components/admin/PendingPostList';
import { adminLogoutAction } from '@/lib/actions/admin';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getCurrentAdminUser, getPendingPostsForAdmin } from '@/lib/queries/admin';

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

  const pendingPosts = await getPendingPostsForAdmin();

  return (
    <main>
      <Container className="space-y-8 py-8 sm:py-10">
        <section className="rounded-[36px] border border-white/80 bg-gradient-to-br from-[#fff4dd] via-white to-[#fff1f5] p-7 shadow-[0_20px_55px_rgba(251,146,60,0.12)] ring-1 ring-orange-100/60 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black text-orange-500">ADMIN</p>
              <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl">管理画面</h1>
              <p className="mt-4 max-w-2xl font-bold leading-8 text-slate-600">
                承認待ち投稿を確認し、問題ない投稿は公開、公開しない投稿は非公開にできます。
              </p>
            </div>
            <form action={adminLogoutAction}>
              <button
                type="submit"
                className="rounded-full border border-orange-100 bg-white px-5 py-3 text-sm font-black text-slate-600 shadow-sm hover:-translate-y-0.5 hover:bg-orange-50 hover:text-orange-600"
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
                <h2 className="text-2xl font-black text-slate-950">承認待ち投稿</h2>
                <p className="mt-2 text-sm font-bold text-slate-500">{pendingPosts.length}件の投稿が確認待ちです。</p>
              </div>
            </div>
            <PendingPostList posts={pendingPosts} />
          </section>

          <aside className="space-y-5">
            <SectionCard>
              <h2 className="text-lg font-black text-slate-950">公開ルール</h2>
              <ul className="mt-4 space-y-3 text-sm font-bold leading-7 text-slate-600">
                <li>・承認すると status が approved になり、公開画面に表示されます。</li>
                <li>・却下すると status が rejected になり、公開画面には表示されません。</li>
                <li>・Supabaseの詳細エラーはユーザー画面には表示しません。</li>
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
