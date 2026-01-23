"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiSparklingFill,
  RiCheckLine,
  RiArrowRightLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";

interface Service {
  id: string;
  title: string;
  number: string;
  description: string;
  features: string[];
  image?: {
    url: string;
  } | null;
}

interface ServicesCarouselProps {
  services: Service[];
}

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Henüz hizmet bulunmamaktadır.
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {services.map((service, index) => (
            <div key={service.id} className="w-full shrink-0">
              <div className="service-card">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="text-3xl md:text-4xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {service.title}
                      </h3>
                      <span className="text-5xl md:text-6xl font-light opacity-30">
                        {service.number}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <RiSparklingFill className="w-5 h-5" />
                      <span className="font-medium">Neler Dahil?</span>
                    </div>

                    <p className="text-white/90 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <RiCheckLine className="w-5 h-5 text-white/80" />
                          <span className="text-white/90">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                      <Link
                        href="/iletisim"
                        className="inline-flex items-center gap-10 text-white font-medium hover:gap-3 transition-all"
                      >
                        <span>Teklif Al</span>
                        <div className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center">
                          <RiArrowRightLine className="w-5 h-5 text-white" />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden aspect-3/2 relative">
                      <Image
                        src={service.image?.url || "/images/window 2.png"}
                        alt={`Fethiye ${service.title} - Profesyonel cam temizleme hizmeti`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                        loading={index === 0 ? undefined : "lazy"}
                      />
                    </div>
                    {/* Sparkle decoration */}
                    <div className="absolute -bottom-4 -right-4 text-white opacity-50">
                      <RiSparklingFill className="w-12 h-12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={goToPrevious}
          className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#3D8C40] hover:bg-[#3D8C40] hover:text-white transition-all"
          aria-label="Önceki hizmet"
        >
          <RiArrowLeftSLine className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-[#3D8C40] w-8"
                  : "bg-gray-300 hover:bg-[#3D8C40]"
              }`}
              aria-label={`Hizmet ${index + 1}'e git`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#3D8C40] hover:bg-[#3D8C40] hover:text-white transition-all"
          aria-label="Sonraki hizmet"
        >
          <RiArrowRightSLine className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
