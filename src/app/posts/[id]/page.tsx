import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CommentForm } from '@/components/comments/CommentForm';
import { CommentList } from '@/components/comments/CommentList';
import { PostDetailCard } from '@/components/posts/PostDetailCard';
import { ReportPostButton } from '@/components/posts/ReportPostButton';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getPublicComments } from '@/lib/queries/comments';
import { getPostDetail } from '@/lib/queries/posts';
import { SITE_NAME, absoluteUrl, createPageMetadata, truncateDescription } from '@/lib/seo';

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostDetail(id);

  if (!post) {
    return createPageMetadata({
      title: '投稿が見つかりません',
      description: '指定された投稿は見つかりませんでした。',
      path: `/posts/${id}`,
    });
  }

  const categoryTitle = post.categories?.title ?? 'あるある';
  const titleShort = truncateDescription(post.body, 40);
  const ogTitle = truncateDescription(post.body, 60);
  const description = `${categoryTitle}のあるある。みんなの「わかる！」が${post.vote_count}票集まっています。`;
  const url = absoluteUrl(`/posts/${post.id}`);

  return {
    title: titleShort,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: ogTitle,
      description,
    },
  };
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

        <div className="flex justify-center pt-2">
          <ReportPostButton postId={post.id} />
        </div>

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
