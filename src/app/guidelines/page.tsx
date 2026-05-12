import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: '投稿ガイドライン',
  description: 'あるあるランキングで投稿・コメントするときに守ってほしい、やさしい共感のためのガイドラインです。',
  path: '/guidelines',
});

export default function GuidelinesPage() {
  return (
    <main>
      <Container className="space-y-7 py-10 sm:py-12">
        <section className="rounded-[36px] border border-white/80 bg-gradient-to-br from-[#fff4dd] via-white to-[#fff1f5] p-7 shadow-[0_20px_55px_rgba(251,146,60,0.12)] ring-1 ring-orange-100/60 sm:p-12">
          <p className="text-sm font-black text-orange-500">GUIDELINES</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">投稿ガイドライン</h1>
          <p className="mt-4 max-w-3xl font-bold leading-8 text-slate-600">
            「わかる！」と笑えるあるあるを、みんなで気持ちよく楽しむためのガイドラインです。
          </p>
        </section>

        <SectionCard>
          <ul className="space-y-4 text-sm font-bold leading-8 text-slate-600 sm:text-base">
            <li>・実在する個人が特定できる内容や連絡先は書かないでください。</li>
            <li>・職業、学校、地域、趣味などへの愛ある共感を大切にし、差別や攻撃を目的にした表現は避けてください。</li>
            <li>・投稿後すぐに公開される内容でも、運営判断で非公開化・削除する場合があります。</li>
            <li>・迷ったときは「本人や関係者が読んでも笑えるか」を目安にしてください。</li>
          </ul>
        </SectionCard>
      </Container>
    </main>
  );
}
