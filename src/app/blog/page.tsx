"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

const blogPosts = [
  {
    id: 1,
    slug: "cam-temizliginde-en-sik-yapilan-5-hata",
    image: "/images/moving_cards_image_01.png",
    date: "20 Aralık 2025",
    title: "Cam Temizliğinde En Sık Yapılan 5 Hata",
    excerpt:
      "Cam temizliği yaparken dikkat edilmesi gereken önemli noktalar ve yaygın hatalar hakkında bilgiler.",
    featured: false,
  },
  {
    id: 2,
    slug: "kis-aylarinda-cam-bakimi-nasil-yapilir",
    image: "/images/moving_cards_image_02.png",
    date: "15 Aralık 2025",
    title: "Kış Aylarında Cam Bakımı Nasıl Yapılır?",
    excerpt:
      "Kış mevsiminde camlarınızın bakımı için önemli ipuçları ve profesyonel öneriler.",
    featured: true,
  },
  {
    id: 3,
    slug: "profesyonel-cam-temizligi-vs-evde-yapilan",
    image: "/images/moving_cards_image_03.png",
    date: "10 Aralık 2025",
    title: "Profesyonel Cam Temizliği vs. Evde Yapılan",
    excerpt:
      "Profesyonel cam temizliği hizmeti ile evde yapılan temizlik arasındaki farklar ve avantajlar.",
    featured: false,
  },
  {
    id: 4,
    slug: "yuksek-bina-cam-temizligi-icin-guvenlik-onlemleri",
    image: "/images/moving_cards_image_01.png",
    date: "5 Aralık 2025",
    title: "Yüksek Bina Cam Temizliği İçin Güvenlik Önlemleri",
    excerpt:
      "Yüksek binalarda güvenli cam temizliği için alınması gereken önlemler ve profesyonel yaklaşım.",
    featured: false,
  },
  {
    id: 5,
    slug: "cam-temizligi-icin-en-iyi-malzemeler",
    image: "/images/moving_cards_image_02.png",
    date: "1 Aralık 2025",
    title: "Cam Temizliği İçin En İyi Malzemeler",
    excerpt:
      "Cam temizliğinde kullanılabilecek en etkili ve güvenli malzemeler hakkında detaylı bilgiler.",
    featured: false,
  },
  {
    id: 6,
    slug: "ofis-camlarinin-duzenli-bakiminin-onemi",
    image: "/images/moving_cards_image_03.png",
    date: "25 Kasım 2025",
    title: "Ofis Camlarının Düzenli Bakımının Önemi",
    excerpt:
      "İş yerlerinde cam temizliğinin önemi ve düzenli bakım programlarının faydaları.",
    featured: false,
  },
];

export default function BlogPage() {
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
              {blogPosts.map((post) => (
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
                      src={post.image}
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
                          {post.date}
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
                        {post.date}
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
              ))}
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
