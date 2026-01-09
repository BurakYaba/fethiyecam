import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import { db } from "@/lib/db";

// Force dynamic rendering - prevent static generation and caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  let blogPosts: any[] = [];
  try {
    blogPosts = await db.blogPost.findMany({
      where: {
        publishedAt: {
          lte: new Date(),
        },
      },
      orderBy: { publishedAt: 'desc' },
      include: {
        image: true,
      },
    });
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/bloghero.webp"
              alt="Blog"
              fill
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <span
                className="text-[#FF7F00] text-3xl mb-4 block"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontWeight: 700,
                }}
              >
                Blog
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Cam Temizlik
                <br />
                İpuçları ve Rehberler
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-8">
                Profesyonel cam temizliği hakkında bilmeniz gereken her şey.
                İpuçları, rehberler ve uzman önerileri.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="section-padding bg-cream">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="section-label">Bilmeniz Gereken Herşey</span>
              <h2
                className="text-4xl md:text-5xl text-gray-900"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Cam Temizlik İpuçları
              </h2>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  Henüz blog yazısı yok.
                </div>
              ) : (
                blogPosts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`blog-card block ${
                    post.featured ? "md:row-span-1" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      post.featured ? "h-full" : ""
                    } ${post.featured ? "h-64 md:h-full" : "h-48"}`}
                  >
                    <Image
                      src={post.image?.url || "/images/moving_cards_image_01.png"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />

                    {/* Overlay for featured */}
                    {post.featured && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <span
                          className="text-[#FF7F00] text-sm italic mb-2"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : new Date(post.createdAt).toLocaleDateString("tr-TR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                        </span>
                        <h3
                          className="text-xl text-white mb-2"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {post.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="mt-4">
                          <div className="w-10 h-10 rounded-full bg-[#FF7F00]/80 flex items-center justify-center">
                            <RiArrowRightLine className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content for non-featured */}
                  {!post.featured && (
                    <div className="p-5 bg-white">
                      <span
                        className="text-[#FF7F00] text-sm italic"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : new Date(post.createdAt).toLocaleDateString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                      </span>
                      <h3
                        className="text-lg text-gray-900 mt-2 mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-[#FF7F00] text-sm font-medium">
                        <span>Devamını Oku</span>
                        <RiArrowRightLine className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </Link>
                ))
              )}
            </div>

            {/* Pagination or Load More */}
            <div className="text-center mt-12">
              <button className="btn-primary">Daha Fazla Yazı Yükle</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
