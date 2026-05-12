import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getCurrentAdminUser } from '@/lib/queries/admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '管理者ログイン',
  robots: {
    index: false,
    follow: false,
  },
};


export default async function AdminLoginPage() {
  const adminUser = await getCurrentAdminUser();

  if (adminUser) {
    redirect('/admin');
  }

  return (
    <main>
      <Container className="py-8 sm:py-10">
        <div className="mx-auto max-w-xl space-y-6">
          <section className="rounded-[36px] border border-white/80 bg-gradient-to-br from-[#fff4dd] via-white to-[#fff1f5] p-7 shadow-[0_20px_55px_rgba(251,146,60,0.12)] ring-1 ring-orange-100/60 sm:p-8">
            <p className="text-sm font-black text-orange-500">ADMIN</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">管理者ログイン</h1>
            <p className="mt-4 font-bold leading-8 text-slate-600">
              Supabase Authに登録された管理者アカウントでログインしてください。
            </p>
          </section>

          <SectionCard>
            <AdminLoginForm />
          </SectionCard>
        </div>
      </Container>
    </main>
  );
}
