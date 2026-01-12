"use client";

import { useState, useEffect } from "react";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

export default function Tips() {
  const [tips, setTips] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((posts) => {
        // Get up to 3 featured or recent posts
        const featuredPosts = posts
          .filter((post: any) => post.publishedAt)
          .sort((a: any, b: any) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          })
          .slice(0, 3)
          .map((post: any) => ({
            id: post.id,
            slug: post.slug,
            image: post.image?.url || "/images/moving_cards_image_01.png",
            date: post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "",
            title: post.title,
            featured: post.featured || false,
          }));
        setTips(featuredPosts);
      })
      .catch((error) => {
        console.error("Failed to fetch blog posts:", error);
        // Fallback to empty array
        setTips([]);
      });
  }, []);
  return (
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

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {tips.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Henüz blog yazısı yok.
            </div>
          ) : (
            tips.map((tip, index) => (
              <Link
                key={tip.id || index}
                href={`/blog/${tip.slug || ""}`}
                className={`blog-card block ${
                  tip.featured ? "md:row-span-1" : ""
                }`}
              >
              <div
                className={`relative overflow-hidden ${
                  tip.featured ? "h-full" : ""
                } ${tip.featured ? "h-64 md:h-full" : "h-48"}`}
              >
                <Image
                  src={tip.image}
                  alt={tip.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />

                {/* Overlay for featured */}
                {tip.featured && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <span
                      className="text-[#FF7F00] text-sm italic mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {tip.date}
                    </span>
                    <h3
                      className="text-xl text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {tip.title}
                    </h3>
                    <div className="mt-4">
                      <div className="w-10 h-10 rounded-full bg-[#FF7F00]/80 flex items-center justify-center">
                        <RiArrowRightLine className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content for non-featured */}
              {!tip.featured && (
                <div className="p-5">
                  <span
                    className="text-[#FF7F00] text-sm italic"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {tip.date}
                  </span>
                  <h3
                    className="text-lg text-gray-900 mt-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {tip.title}
                  </h3>
                </div>
              )}
              </Link>
            ))
          )}
        </div>

        {/* Read More Link */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-700 font-medium hover:text-[#FF7F00] transition-colors"
          >
            <span>Daha Fazla Oku</span>
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
