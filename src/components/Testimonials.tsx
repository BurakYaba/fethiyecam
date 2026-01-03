"use client";

import { useState } from "react";
import { RiStarLine, RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Harika bir hizmet! Ekip zamanında geldi ve işi çok hızlı tamamladı. Camlarımız hiç bu kadar temiz olmamıştı. Herkese tavsiye ediyorum.",
    name: "Ayşe Yılmaz",
    role: "Müşteri",
    avatar: "/images/testimonials_01.jpg",
    rating: 5,
  },
  {
    quote:
      "Fethiye'de cam temizliği için en iyi seçenek! Profesyonel ekipmanlarla çalışıyorlar ve sonuç mükemmel. Çok memnun kaldım.",
    name: "Mehmet Kaya",
    role: "Müşteri",
    avatar: "/images/testimonials_02.jpg",
    rating: 5,
  },
  {
    quote:
      "Ofisimizin camlarını düzenli olarak temizletiyoruz. Her seferinde aynı kalitede hizmet alıyoruz. Güvenilir ve profesyonel bir ekip.",
    name: "Fatma Demir",
    role: "Müşteri",
    avatar: "/images/testimonials_03.jpg",
    rating: 5,
  },
  {
    quote:
      "Yüksek binamızın dış cephe camlarını temizlediler. İşlerini çok güvenli ve profesyonel bir şekilde yaptılar. Teşekkürler!",
    name: "Ali Özkan",
    role: "Müşteri",
    avatar: "/images/testimonials_04.jpg",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length - 1) % (testimonials.length - 1)
    );
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto px-6">
        {/* Testimonial Cards */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card flex-shrink-0 w-full md:w-[calc(50%-12px)]"
              >
                <span className="section-label text-sm">Müşteri Yorumları</span>
                
                <p
                  className="text-xl md:text-2xl text-gray-900 mt-4 mb-6 leading-relaxed"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <RiStarLine
                      key={i}
                      className="w-5 h-5 text-[#FF7F00] fill-[#FF7F00]"
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                    sizes="48px"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: testimonials.length - 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === currentIndex ? "bg-gray-900" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <RiArrowLeftSLine className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <RiArrowRightSLine className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

