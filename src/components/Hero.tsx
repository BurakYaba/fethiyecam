"use client";

import { useState, useEffect } from "react";
import { RiSparklingFill } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [heroData, setHeroData] = useState({
    title: "Biz Temizleyelim,\nSiz Rahatınıza Bakın.",
    subtitle: null as string | null,
    ctaText: "Ücretsiz Teklif Al",
    ctaLink: "/iletisim",
    backgroundImage: "/images/hero_image_02.jpg",
  });

  useEffect(() => {
    fetch("/api/content-blocks?page=home&type=hero")
      .then((res) => res.json())
      .then((blocks) => {
        if (Array.isArray(blocks) && blocks.length > 0) {
          const block = blocks[0];
          setHeroData({
            title: block.title || heroData.title,
            subtitle: block.subtitle || null,
            ctaText: block.config?.ctaText || heroData.ctaText,
            ctaLink: block.config?.ctaLink || heroData.ctaLink,
            backgroundImage: block.image?.url || heroData.backgroundImage,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch hero block:", error);
      });
  }, []);

  return (
    <section
      id="anasayfa"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroData.backgroundImage}
          alt="Fethiye Cam Temizleme"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Subtitle (optional) */}
        {heroData.subtitle && (
          <p
            className="text-xl md:text-2xl text-white/90 mb-4 animate-fade-in"
            style={{
              fontFamily: "var(--font-body)",
              animationDelay: "0.1s",
            }}
          >
            {heroData.subtitle}
          </p>
        )}

        {/* Main Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl text-white mb-8 animate-fade-in"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            animationDelay: "0.2s",
            whiteSpace: "pre-line",
          }}
        >
          {heroData.title}
        </h1>

        {/* CTA Button */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Link
            href={heroData.ctaLink}
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
          >
            <span>{heroData.ctaText}</span>
            <RiSparklingFill className="w-5 h-5" />
          </Link>
        </div>

        {/* Scroll Indicator */}
      </div>
    </section>
  );
}
