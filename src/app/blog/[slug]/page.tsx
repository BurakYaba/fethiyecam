import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db } from "@/lib/db";
import BlogPostContent from "@/components/BlogPostContent";

// Force dynamic rendering - prevent static generation and caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let post;
  let recentPosts = [];
  
  try {
    post = await db.blogPost.findUnique({
      where: { slug },
      include: {
        image: true,
      },
    });

    if (!post) {
      return (
        <>
          <Header />
          <main className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Yazı bulunamadı</h1>
              <Link href="/blog" className="btn-primary">
                Blog'a Dön
              </Link>
            </div>
          </main>
          <Footer />
        </>
      );
    }

    // Get recent posts
    recentPosts = await db.blogPost.findMany({
      where: {
        slug: { not: slug },
        publishedAt: { lte: new Date() },
      },
      take: 4,
      orderBy: { publishedAt: 'desc' },
      include: {
        image: true,
      },
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Veritabanı bağlantı hatası</h1>
            <p className="text-gray-600 mb-4">Lütfen daha sonra tekrar deneyin.</p>
            <Link href="/blog" className="btn-primary">
              Blog'a Dön
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <BlogPostContent post={post} recentPosts={recentPosts} />
      </main>
      <Footer />
    </>
  );
}
