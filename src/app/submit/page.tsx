import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getActiveCategories } from '@/lib/queries/categories';

export default async function SubmitPage() {
  const categories = await getActiveCategories();

  return (
    <main>
      <Container className="space-y-8 py-8">
        <section className="rounded-[32px] border border-[#f5eadc] bg-[#fffaf2] p-8 shadow-sm">
          <p className="text-sm font-black text-orange-500">SUBMIT</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl">あるあるを投稿する</h1>
          <p className="mt-4 max-w-2xl font-bold leading-8 text-slate-600">
            投稿機能はPhase 4で実装します。Phase 3ではフォームの見た目だけを配置しています。
          </p>
        </section>

        <SectionCard>
          <form className="space-y-5">
            <label className="block">
              <span className="text-sm font-black text-slate-700">カテゴリー</span>
              <select disabled className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-500">
                <option>カテゴリーを選択</option>
                {categories.map((category) => (
                  <option key={category.id}>{category.title}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-black text-slate-700">あるある本文</span>
              <textarea
                disabled
                className="mt-2 h-36 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-500"
                placeholder="例：休憩に入った瞬間だけ急に忙しくなる"
              />
            </label>

            <label className="block">
              <span className="text-sm font-black text-slate-700">投稿者名</span>
              <input disabled className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-500" placeholder="匿名さん" />
            </label>

            <button disabled className="rounded-full bg-slate-200 px-6 py-3 text-sm font-black text-slate-400">
              Phase 4で投稿機能を実装します
            </button>
          </form>
        </SectionCard>
      </Container>
    </main>
  );
}
