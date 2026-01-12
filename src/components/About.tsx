"use client";

import { useState, useEffect } from "react";
import { RiCheckLine, RiStarLine } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  const [aboutData, setAboutData] = useState({
    title: "Güvenebileceğiniz Profesyonel Cam Temizlik Hizmetleri",
    subtitle: "Hakkımızda",
    content:
      "Ekibimiz, her temizlikten sonra memnuniyetinizi sağlamak için özverili çalışır. Açık iletişim, esnek randevu ve memnuniyet garantisi ile huzurunuzu ön planda tutuyoruz.",
    image: "/images/image_home_02_02.png",
    stats: [{ label: "Deneyimli Temizlikçi", value: "10+" }],
  });

  useEffect(() => {
    fetch("/api/content-blocks?page=home&type=about")
      .then((res) => res.json())
      .then((blocks) => {
        if (Array.isArray(blocks) && blocks.length > 0) {
          const block = blocks[0];
          setAboutData({
            title: block.title || aboutData.title,
            subtitle: block.subtitle || aboutData.subtitle,
            content: block.content || aboutData.content,
            image: block.image?.url || aboutData.image,
            stats: block.config?.stats || aboutData.stats,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch about block:", error);
      });
  }, []);

  return (
    <section id="hakkimizda" className="section-padding bg-cream">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden w-full">
              <Image
                src={aboutData.image}
                alt="Profesyonel cam temizlik ekibi"
                width={800}
                height={600}
                className="w-full h-auto object-cover rounded-3xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#3D8C40] rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#3D8C40] rounded-br-3xl" />
            </div>

            {/* Stats Badge */}
            {aboutData.stats && aboutData.stats.length > 0 && (
              <div className="absolute -bottom-4 -right-4 bg-cream rounded-2xl  p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#3D8C40]/10 flex items-center justify-center">
                  <RiCheckLine className="w-6 h-6 text-[#3D8C40]" />
                </div>
                <div>
                  <div
                    className="text-3xl font-bold text-[#3D8C40]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {aboutData.stats[0].value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {aboutData.stats[0].label}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right - Content */}
          <div>
            <span className="section-label">{aboutData.subtitle}</span>
            <h2
              className="text-4xl md:text-5xl text-gray-900 mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {aboutData.title}
            </h2>

            <div
              className="text-gray-600 text-lg leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: aboutData.content }}
            />

            {/* Award Badge */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-2xl shadow-sm">
              <div className="relative w-20 h-20 shrink-0">
                <div className="absolute inset-0 bg-[#3D8C40] rounded-xl flex flex-col items-center justify-center text-white">
                  <div className="flex gap-0.5 mb-1">
                    <RiStarLine className="w-3 h-3 fill-current" />
                    <RiStarLine className="w-3 h-3 fill-current" />
                    <RiStarLine className="w-3 h-3 fill-current" />
                  </div>
                  <span className="text-xl font-bold">2024</span>
                  <span className="text-[8px] uppercase tracking-wider">
                    Süper Hizmet
                  </span>
                  <span className="text-[10px] font-semibold">Ödülü</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Ödüllü Hizmet Kalitesi
                </h4>
                <p className="text-sm text-gray-600">
                  İhtiyaçlarınıza, tercihlerinize ve programınıza göre
                  özelleştirilmiş temizlik hizmetleri sunuyoruz.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center md:justify-start">
              <Link href="/iletisim" className="btn-primary">
                Hemen Randevu Al
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
