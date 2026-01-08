'use client'

import { useState } from 'react'
import { RiSearchLine, RiFacebookFill, RiTwitterXLine, RiWhatsappLine } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPostContentProps {
  post: any
  recentPosts: any[]
}

export default function BlogPostContent({ post, recentPosts }: BlogPostContentProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleShare = (platform: string) => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const title = post.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link kopyalandı!");
        break;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={post.image?.url || "/images/moving_cards_image_01.png"}
            alt={post.title}
            fill
            className="object-cover"
            style={{ objectPosition: "center 60%" }}
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content - 2/3 width */}
              <div className="lg:w-2/3">
                <article className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  <div className="border-t border-gray-200 my-8"></div>

                  {/* Categories and Share */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">Cam Temizliği, Blog</span>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex items-center gap-3">
                      <span className="text-gray-700 font-medium">Paylaş:</span>
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center text-white hover:bg-[#E67000] transition-colors"
                        aria-label="Linki kopyala"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center text-white hover:bg-[#E67000] transition-colors"
                        aria-label="Facebook'ta paylaş"
                      >
                        <RiFacebookFill className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleShare("twitter")}
                        className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center text-white hover:bg-[#E67000] transition-colors"
                        aria-label="Twitter'da paylaş"
                      >
                        <RiTwitterXLine className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleShare("whatsapp")}
                        className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center text-white hover:bg-[#E67000] transition-colors"
                        aria-label="WhatsApp'ta paylaş"
                      >
                        <RiWhatsappLine className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </article>
              </div>

              {/* Sidebar - 1/3 width */}
              <div className="lg:w-1/3">
                <div className="sticky top-24 space-y-8">
                  {/* Search Bar */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-[#FF7F00] transition-colors"
                      />
                      <RiSearchLine className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Recent Posts */}
                  <div>
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-6"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                    >
                      Son Yazılar
                    </h3>
                    <div className="space-y-6">
                      {recentPosts.map((recentPost) => (
                        <Link
                          key={recentPost.id}
                          href={`/blog/${recentPost.slug}`}
                          className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-0 hover:opacity-80 transition-opacity"
                        >
                          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                            <Image
                              src={recentPost.image?.url || "/images/moving_cards_image_01.png"}
                              alt={recentPost.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-[#FF7F00] text-sm mb-1"
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {recentPost.publishedAt
                                ? new Date(recentPost.publishedAt).toLocaleDateString("tr-TR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : new Date(recentPost.createdAt).toLocaleDateString("tr-TR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                            </p>
                            <h4
                              className="text-base text-gray-900 line-clamp-2"
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {recentPost.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
