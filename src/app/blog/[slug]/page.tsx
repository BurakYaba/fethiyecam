import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db } from "@/lib/db";
import BlogPostContent from "@/components/BlogPostContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  generatePageTitle,
  getAbsoluteUrl,
  truncateDescription,
} from "@/lib/seo-utils";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/structured-data";

// Force dynamic rendering - prevent static generation and caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await db.blogPost.findUnique({
      where: { slug },
      include: { image: true },
    });

    if (!post) {
      return {
        title: generatePageTitle("Yaz\u0131 Bulunamad\u0131"),
      };
    }

    const ogImage = post.image?.url
      ? getAbsoluteUrl(post.image.url)
      : getAbsoluteUrl("/og-default.jpg");

    return {
      title: generatePageTitle(post.title),
      description: truncateDescription(post.excerpt),
      keywords: `cam temizli\u011fi, fethiye, ${post.title}`,
      openGraph: {
        title: post.title,
        description: truncateDescription(post.excerpt),
        url: getAbsoluteUrl(`/blog/${post.slug}`),
        siteName: "Fethiye Cam Temizleme",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: "tr_TR",
        type: "article",
        publishedTime: post.publishedAt?.toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
        authors: ["Fethiye Cam Temizleme"],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: truncateDescription(post.excerpt),
        images: [ogImage],
      },
      alternates: {
        canonical: getAbsoluteUrl(`/blog/${post.slug}`),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: generatePageTitle("Blog"),
    };
  }
}

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
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Yazı bulunamadı
              </h1>
              <Link href="/blog" className="btn-primary">
                Blog'a Dön
              </Link>
            </div>
          </main>
          <Footer />
        </>
      );
    }

    // Get related/recent posts
    recentPosts = await db.blogPost.findMany({
      where: {
        slug: { not: slug },
        publishedAt: { lte: new Date() },
      },
      take: 3,
      orderBy: { publishedAt: "desc" },
      include: {
        image: true,
      },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Veritabanı bağlantı hatası
            </h1>
            <p className="text-gray-600 mb-4">
              Lütfen daha sonra tekrar deneyin.
            </p>
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
      <Breadcrumbs
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getArticleSchema(post)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Ana Sayfa", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: post.title, url: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />
      <main>
        <BlogPostContent post={post} recentPosts={recentPosts} />
      </main>
      <Footer />
    </>
  );
}
