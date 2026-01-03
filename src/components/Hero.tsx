"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="anasayfa"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero_image_02.jpg')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Main Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl text-white mb-8 animate-fade-in"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            animationDelay: "0.2s",
          }}
        >
          Biz Temizleyelim,
          <br />
          Siz Rahatınıza Bakın.
        </h1>

        {/* CTA Button */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Link
            href="#teklif"
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
          >
            <span>Ücretsiz Teklif Al</span>
            <Sparkles className="w-5 h-5" />
          </Link>
        </div>

        {/* Scroll Indicator */}
      </div>
    </section>
  );
}
