"use client";

import { useState, useEffect } from "react";
import { RiShieldLine, RiAwardLine, RiHeartLine } from "@remixicon/react";
import Image from "next/image";
import * as RemixIcon from "@remixicon/react";

const iconMap: Record<string, any> = {
  RiShieldLine,
  RiAwardLine,
  RiHeartLine,
};

const defaultFeatures = [
  {
    icon: "RiShieldLine",
    title: "Güvenilir Firma",
    description:
      "Güvenilirlik üzerine kurulmuş bir şirketiz. Her zaman zamanında gelir ve mekanınıza özenle davranırız.",
  },
  {
    icon: "RiAwardLine",
    title: "Profesyonel Hizmet",
    description:
      "Mükemmel performans, sabit fiyatlar, sürpriz yok. Her temizlik titiz, kişiselleştirilmiş ve dostane destekle sunulur.",
  },
  {
    icon: "RiHeartLine",
    title: "Müşteri Memnuniyeti",
    description:
      "Açık iletişim, esnek randevu ve memnuniyet garantisi ile her temizlikten sonra mutlu olmanızı sağlıyoruz.",
  },
];

export default function Features() {
  const [features, setFeatures] = useState(defaultFeatures);

  useEffect(() => {
    fetch("/api/features")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFeatures(
            data.map((feature: any) => ({
              icon: feature.icon || "RiShieldLine",
              title: feature.title,
              description: feature.description,
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Failed to fetch features:", error);
      });
  }, []);
  return (
    <section className="section-padding">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature Cards */}
          {features.map((feature, index) => {
            const IconComponent =
              typeof feature.icon === "string"
                ? iconMap[feature.icon] || RiShieldLine
                : feature.icon || RiShieldLine;
            return (
              <div key={index} className="feature-card">
                <div className="w-12 h-12 rounded-xl bg-[#3D8C40]/10 flex items-center justify-center mb-5">
                  <IconComponent className="w-6 h-6 text-[#3D8C40]" />
                </div>
              <h3
                className="text-xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                {feature.title}
              </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}

          {/* Stat Card */}
          <div className="stat-card-green relative overflow-hidden">
            <div className="relative z-10">
              <div
                className="text-5xl md:text-6xl font-bold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                1000+
              </div>
              <p className="text-white/90 text-lg">Temizlik Yapıldı</p>
            </div>

            {/* Decorative Image */}
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-90 relative">
              <Image
                src="/images/green_glove_02.png"
                alt="Temizlik"
                fill
                className="object-cover rounded-tl-3xl"
                sizes="128px"
                loading="lazy"
              />
            </div>

            {/* Sparkle decorations */}
            <div className="absolute top-1/2 right-1/3 text-white/30">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 5 L20 35 M5 20 L35 20 M10 10 L30 30 M30 10 L10 30" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
