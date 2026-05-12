import { SubmitPostForm } from '@/components/submit/SubmitPostForm';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getActiveCategories } from '@/lib/queries/categories';

import { createPageMetadata } from '@/lib/seo';
export const metadata = createPageMetadata({
  title: 'あるあるを投稿する',
  description: 'あなたの身近な職業・学校・動物・趣味などの「あるある」を投稿して、みんなの共感を集めましょう。',
  path: '/submit',
});

export const dynamic = 'force-dynamic';

export default async function SubmitPage() {
  const categories = await getActiveCategories();

  return (
    <main>
      <Container className="space-y-8 py-8 sm:py-10">
        <section className="rounded-[36px] border border-white/80 bg-gradient-to-br from-[#fff4dd] via-white to-[#fff1f5] p-7 shadow-[0_20px_55px_rgba(251,146,60,0.12)] ring-1 ring-orange-100/60 sm:p-10">
          <p className="text-sm font-black text-orange-500">SUBMIT</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl">あるあるを投稿する</h1>
          <p className="mt-4 max-w-2xl font-bold leading-8 text-slate-600">
            みんなに聞いてほしい「あるある」を投稿できます。投稿内容は管理者確認後に公開されます。
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <SectionCard>
            <SubmitPostForm categories={categories} />
          </SectionCard>

          <aside className="space-y-5">
            <SectionCard>
              <h2 className="text-lg font-black text-slate-950">投稿前の確認</h2>
              <ul className="mt-4 space-y-3 text-sm font-bold leading-7 text-slate-600">
                <li>・個人名や連絡先など、個人情報は書かないでください。</li>
                <li>・誰かを傷つける表現や、差別的な内容は避けてください。</li>
                <li>・投稿後は承認待ちになり、公開画面にはまだ表示されません。</li>
              </ul>
            </SectionCard>

            <SectionCard className="bg-gradient-to-br from-orange-50 to-rose-50">
              <h2 className="text-lg font-black text-slate-950">公開までの流れ</h2>
              <ol className="mt-4 space-y-3 text-sm font-bold leading-7 text-slate-600">
                <li>1. あるあるを投稿</li>
                <li>2. 管理者が内容を確認</li>
                <li>3. 承認後、ランキングやカテゴリー画面に表示</li>
              </ol>
            </SectionCard>
          </aside>
        </div>
      </Container>
    </main>
  );
}
