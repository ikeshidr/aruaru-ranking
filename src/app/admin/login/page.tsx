import { redirect } from 'next/navigation';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getCurrentAdminUser } from '@/lib/queries/admin';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const adminUser = await getCurrentAdminUser();

  if (adminUser) {
    redirect('/admin');
  }

  return (
    <main>
      <Container className="py-8">
        <div className="mx-auto max-w-xl space-y-6">
          <section className="rounded-[32px] border border-[#f5eadc] bg-[#fffaf2] p-8 shadow-sm">
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
