import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: '利用規約',
  description: 'あるあるランキングを安心して利用するための基本ルールをまとめた利用規約ページです。',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <main>
      <Container className="space-y-6 py-10">
        <section className="rounded-[32px] border border-[#f2eadf] bg-[#fffaf2] p-8 shadow-sm sm:p-12">
          <p className="text-sm font-black text-orange-500">TERMS</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">利用規約</h1>
          <p className="mt-4 max-w-3xl font-bold leading-8 text-slate-600">
            あるあるランキングを楽しく安全に使うための、MVP公開時点の基本ルールです。
          </p>
        </section>

        <SectionCard>
          <div className="space-y-6 text-sm font-bold leading-8 text-slate-600">
            <section>
              <h2 className="text-xl font-black text-slate-950">サービスについて</h2>
              <p className="mt-2">本サービスでは、職業・学校・動物・趣味などの「あるある」を投稿し、投票やコメントで楽しめます。</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-slate-950">禁止事項</h2>
              <p className="mt-2">個人情報、誹謗中傷、差別的な表現、法令に反する内容、第三者の権利を侵害する投稿は行わないでください。</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-slate-950">投稿の取り扱い</h2>
              <p className="mt-2">公開後の投稿やコメントでも、運営が不適切と判断した場合は非公開化・削除などの対応を行うことがあります。</p>
            </section>
          </div>
        </SectionCard>
      </Container>
    </main>
  );
}
