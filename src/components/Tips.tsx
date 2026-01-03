import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const tips = [
  {
    image: "/images/moving_cards_image_01.png",
    date: "20 Aralık 2025",
    title: "Cam Temizliğinde En Sık Yapılan 5 Hata",
    featured: false,
  },
  {
    image: "/images/moving_cards_image_02.png",
    date: "15 Aralık 2025",
    title: "Kış Aylarında Cam Bakımı Nasıl Yapılır?",
    featured: true,
  },
  {
    image: "/images/moving_cards_image_03.png",
    date: "10 Aralık 2025",
    title: "Profesyonel Cam Temizliği vs. Evde Yapılan",
    featured: false,
  },
];

export default function Tips() {
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
          {tips.map((tip, index) => (
            <Link
              key={index}
              href="#"
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
                      className="text-[#F5A623] text-sm italic mb-2"
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
                      <div className="w-10 h-10 rounded-full bg-[#F5A623]/80 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content for non-featured */}
              {!tip.featured && (
                <div className="p-5">
                  <span
                    className="text-[#F5A623] text-sm italic"
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
          ))}
        </div>

        {/* Read More Link */}
        <div className="text-center mt-10">
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-gray-700 font-medium hover:text-[#F5A623] transition-colors"
          >
            <span>Daha Fazla Oku</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
