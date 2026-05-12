import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CommentForm } from '@/components/comments/CommentForm';
import { CommentList } from '@/components/comments/CommentList';
import { PostDetailCard } from '@/components/posts/PostDetailCard';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getPublicComments } from '@/lib/queries/comments';
import { getPostDetail } from '@/lib/queries/posts';
import { createPageMetadata, truncateDescription } from '@/lib/seo';

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostDetail(id);

  if (!post) {
    return createPageMetadata({
      title: 'あるあるが見つかりません',
      description: '指定されたあるある投稿は見つかりませんでした。',
      path: `/posts/${id}`,
    });
  }

  const categoryTitle = post.categories?.title ?? 'あるある';

  return createPageMetadata({
    title: `${truncateDescription(post.body, 32)} - ${categoryTitle}`,
    description: truncateDescription(`${categoryTitle}のあるある「${post.body}」に投票・コメントして、みんなの共感ランキングを楽しみましょう。`),
    path: `/posts/${post.id}`,
    type: 'article',
  });
}

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
          <h2 className="text-2xl font-black text-slate-950">コメントを投稿する</h2>
          <p className="mt-2 text-sm font-bold text-slate-400">コメントは投稿後すぐに公開されます。</p>
          <CommentForm postId={post.id} />
        </SectionCard>

        <CommentList comments={comments} />
      </Container>
    </main>
  );
}
