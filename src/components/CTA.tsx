"use client";

import { RiMailLine } from "@remixicon/react";
import Image from "next/image";

export default function CTA() {
  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative flex flex-col lg:flex-row items-stretch overflow-visible max-w-[1400px] mx-auto lg:h-[450px]">
          {/* Top/Left - Image Section with Background */}
          <div className="relative lg:w-2/5 h-[350px] lg:h-full rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl overflow-hidden">
            {/* Background Image with Blur */}
            <div className="absolute inset-0">
              <Image
                src="/images/home_02_image_01.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
                style={{ filter: "blur(3px)" }}
              />
            </div>

            {/* Team Image Overlay - Mobile: centered at bottom, Desktop: hidden here */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-30 pointer-events-none lg:hidden">
              <Image
                src="/images/team_02.png"
                alt="Profesyonel temizlikçi"
                width={300}
                height={450}
                className="w-[300px] max-w-none h-auto object-contain"
                sizes="300px"
                loading="lazy"
              />
            </div>

            {/* Award Badge - Hidden on mobile for cleaner look */}
            <div className="absolute top-6 left-6 z-20 hidden lg:flex items-center gap-3">
              {/* Orange Circle */}
              <div className="w-6 h-6 rounded-full bg-[#F5A623] flex items-center justify-center shrink-0" />

              {/* Award Text */}
              <span
                className="text-[#F5A623] italic text-lg whitespace-nowrap"
                style={{ fontFamily: "var(--font-decorative)" }}
              >
                Süper Hizmet Ödülü
              </span>

              {/* Decorative Curved Line */}
              <svg
                width="80"
                height="30"
                viewBox="0 0 80 30"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M0 15 Q40 0 75 20"
                  stroke="#3D8C40"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 2"
                />
                <circle cx="75" cy="20" r="5" fill="#3D8C40" />
              </svg>
            </div>
          </div>

          {/* Team Image Overlay - Desktop: Between sections, overflowing to top */}
          <div className="absolute left-[40%] -translate-x-1/2 bottom-0 z-30 pointer-events-none hidden lg:block">
            <Image
              src="/images/team_02.png"
              alt="Profesyonel temizlikçi"
              width={600}
              height={780}
              className="h-[520px] w-auto object-contain"
              sizes="600px"
              loading="lazy"
            />
          </div>

          {/* Bottom/Right - Green Content Panel */}
          <div className="lg:w-3/5 bg-[#3D8C40] py-8 lg:py-12 px-6 lg:px-0 lg:pr-40 lg:pl-0 flex flex-col justify-center relative rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl">
            <div>
              {/* Title */}
              <h2
                className="text-2xl md:text-3xl lg:text-4xl text-white mb-3 leading-tight text-center lg:text-right"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Pırıl Pırıl Camlar
                <br />
                İçin Bize Ulaşın
              </h2>

              {/* Subtitle */}
              <p className="text-white/90 text-lg mb-8 text-center lg:text-right">
                Hemen teklif alın
              </p>

              {/* Email Contact */}
              <a
                href="mailto:info@fethiyecam.com"
                className="flex items-center gap-3 text-white hover:text-white/80 transition-colors group justify-center lg:justify-end"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                  <RiMailLine className="w-5 h-5 text-[#3D8C40]" />
                </div>
                <span className="text-lg group-hover:underline">
                  info@fethiyecam.com
                </span>
              </a>
            </div>
            {/* Floating Decoration - Bottom - Hidden on mobile */}
            <div className="absolute -right-1 pointer-events-none hidden lg:block w-32 h-32">
              <div className="relative w-full h-full">
                <Image
                  src="/images/floating_rotate_bottom.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="128px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
