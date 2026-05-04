import { Container } from './Container';

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main>
      <Container className="py-10">
        <section className="rounded-[32px] border border-[#f2eadf] bg-[#fffaf2] p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-sm">🚧</div>
          <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl font-bold leading-8 text-slate-600">{description}</p>
        </section>
      </Container>
    </main>
  );
}
