import { notFound } from 'next/navigation';
import { CommentList } from '@/components/comments/CommentList';
import { PostDetailCard } from '@/components/posts/PostDetailCard';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getPublicComments } from '@/lib/queries/comments';
import { getPostDetail } from '@/lib/queries/posts';

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const post = await getPostDetail(id);

  if (!post) notFound();

  const comments = await getPublicComments(id);

  return (
    <main>
      <Container className="space-y-8 py-8">
        <PostDetailCard post={post} />

        <SectionCard>
          <h2 className="text-2xl font-black text-slate-950">コメント</h2>
          <p className="mt-2 text-sm font-bold text-slate-400">コメント投稿はPhase 4以降で実装します。</p>
          <div className="mt-5 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 p-5">
            <textarea
              disabled
              className="h-28 w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-400"
              placeholder="コメントを書く（Phase 4で実装）"
            />
            <button disabled className="mt-3 rounded-full bg-slate-200 px-5 py-3 text-sm font-black text-slate-400">
              コメントを投稿する
            </button>
          </div>
        </SectionCard>

        <CommentList comments={comments} />
      </Container>
    </main>
  );
}
