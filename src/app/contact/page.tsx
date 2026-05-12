import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'お問い合わせ',
  description: 'あるあるランキングへのご意見、不具合連絡、掲載内容に関するお問い合わせ方法をご案内します。',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main>
      <Container className="space-y-6 py-10">
        <section className="rounded-[32px] border border-[#f2eadf] bg-[#fffaf2] p-8 shadow-sm sm:p-12">
          <p className="text-sm font-black text-orange-500">CONTACT</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">お問い合わせ</h1>
          <p className="mt-4 max-w-3xl font-bold leading-8 text-slate-600">
            ご意見、不具合のご連絡、掲載内容についての相談はこちらをご確認ください。
          </p>
        </section>

        <SectionCard>
          <div className="space-y-5 text-sm font-bold leading-8 text-slate-600">
            <p>現在はMVP公開準備中のため、専用フォームは準備中です。公開時には連絡先またはフォームへの導線を設置します。</p>
            <p>掲載内容について困ったことがある場合は、対象ページのURLと内容が分かる情報を添えてご連絡ください。</p>
          </div>
        </SectionCard>
      </Container>
    </main>
  );
}
