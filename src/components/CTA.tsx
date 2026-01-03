"use client";

import { Mail } from "lucide-react";

export default function CTA() {
  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative flex flex-col lg:flex-row items-stretch rounded-3xl overflow-visible max-w-[1400px] mx-auto h-[400px] lg:h-[450px]">
          {/* Left - Image Section with Background (2/5 = 40%) */}
          <div className="relative lg:w-2/5 h-full rounded-l-3xl overflow-hidden">
            {/* Background Image with Blur */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/home_02_image_01.jpg')`,
                filter: "blur(3px)",
              }}
            />

            {/* Award Badge */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
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

          {/* Team Image Overlay - Between sections, overflowing to top */}
          <div className="absolute left-[40%] -translate-x-1/2 bottom-0 z-30 pointer-events-none hidden lg:block">
            <img
              src="/images/team_02.png"
              alt="Profesyonel temizlikçi"
              className="h-[115%] w-auto object-contain"
            />
          </div>

          {/* Right - Green Content Panel (3/5 = 60%) */}
          <div
            className="lg:w-3/5 h-full bg-[#3D8C40] py-8 lg:py-12 pr-8 lg:pr-40 pl-0 flex flex-col justify-center relative"
            style={{
              borderRadius: "0 1.5rem 1.5rem 0",
            }}
          >
            <div>
              {/* Title */}
              <h2
                className="text-2xl md:text-3xl lg:text-4xl text-white mb-3 leading-tight text-right"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Pırıl Pırıl Camlar
                <br />
                İçin Bize Ulaşın
              </h2>

              {/* Subtitle */}
              <p className="text-white/90 text-lg mb-8 text-right">
                Hemen teklif alın
              </p>

              {/* Email Contact */}
              <a
                href="mailto:info@fethiyecam.com"
                className="flex items-center gap-3 text-white hover:text-white/80 transition-colors group justify-end"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#3D8C40]" />
                </div>
                <span className="text-lg group-hover:underline">
                  info@fethiyecam.com
                </span>
              </a>
            </div>
            {/* Floating Decoration - Bottom */}
            <div className="absolute  -right-1  pointer-events-none">
              <img
                src="/images/floating_rotate_bottom.png"
                alt=""
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
