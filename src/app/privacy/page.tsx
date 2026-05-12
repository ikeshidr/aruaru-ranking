import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'プライバシーポリシー',
  description: 'あるあるランキングにおけるアクセス情報や投稿情報の取り扱いをまとめたプライバシーポリシーです。',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <main>
      <Container className="space-y-7 py-10 sm:py-12">
        <section className="rounded-[36px] border border-white/80 bg-gradient-to-br from-[#fff4dd] via-white to-[#fff1f5] p-7 shadow-[0_20px_55px_rgba(251,146,60,0.12)] ring-1 ring-orange-100/60 sm:p-12">
          <p className="text-sm font-black text-orange-500">PRIVACY</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">プライバシーポリシー</h1>
          <p className="mt-4 max-w-3xl font-bold leading-8 text-slate-600">
            MVP公開時点での、あるあるランキングにおける情報の取り扱い方針です。
          </p>
        </section>

        <SectionCard>
          <div className="space-y-7 text-sm font-bold leading-8 text-slate-600 sm:text-base">
            <section>
              <h2 className="text-xl font-black text-slate-950">取得する情報</h2>
              <p className="mt-2">投稿・コメント内容、表示名、投票や不正防止に必要な識別情報、アクセス解析に必要な情報を取得する場合があります。</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-slate-950">利用目的</h2>
              <p className="mt-2">サービス提供、ランキング表示、コメント表示、不適切投稿への対応、品質改善のために利用します。</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-slate-950">個人情報を書かないお願い</h2>
              <p className="mt-2">投稿やコメントには、氏名・住所・電話番号・SNSアカウントなど個人を特定できる情報を書かないでください。</p>
            </section>
          </div>
        </SectionCard>
      </Container>
    </main>
  );
}
