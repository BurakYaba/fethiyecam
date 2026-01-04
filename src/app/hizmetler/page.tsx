"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  RiCalendarCheckFill,
  RiCheckLine,
  RiSparklingFill,
  RiArrowRightLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";
import { useState } from "react";

const badges = [
  { icon: RiCheckLine, text: "Deneyimli ekip" },
  { icon: RiCheckLine, text: "Sigortalı hizmet" },
  { icon: RiCheckLine, text: "Sözleşme yok" },
];

const services = [
  {
    id: 1,
    title: "Cam Temizliği",
    number: "01",
    description:
      "İç ve dış cam temizliği, çerçeve silimi, pencere kenarları ve pervaz temizliği. Profesyonel ekipmanlarımızla lekesiz ve pırıl pırıl camlar garantisi veriyoruz.",
    features: [
      "Profesyonel ekipman ve malzemeler",
      "Sigortalı ve garantili hizmet",
      "Yüksek bina cam temizliği",
      "Ev ve ofis camları",
    ],
    image: "/images/window 2.png",
  },
  {
    id: 2,
    title: "Yüksek Bina Cam Temizliği",
    number: "02",
    description:
      "Güvenli ve profesyonel ekipmanlarla yüksek binaların cam temizliği. Özel platform ve güvenlik ekipmanları ile tüm yüksekliklerde hizmet veriyoruz.",
    features: [
      "Özel platform ve ekipmanlar",
      "Güvenlik sertifikalı ekip",
      "Sigortalı hizmet",
      "Hızlı ve etkili temizlik",
    ],
    image: "/images/highrise.webp",
  },
  {
    id: 3,
    title: "Ticari Vitrin Camları",
    number: "03",
    description:
      "Mağaza, ofis ve ticari mekanların vitrin camlarının profesyonel temizliği. Müşterilerinize en iyi görünümü sunun, işletmenizin camları pırıl pırıl olsun.",
    features: [
      "Ticari mekanlar için özel hizmet",
      "Esnek çalışma saatleri",
      "Hızlı ve etkili temizlik",
      "Rekabetçi fiyatlar",
    ],
    image: "/images/store.png",
  },
  {
    id: 4,
    title: "Düzenli Bakım Hizmeti",
    number: "04",
    description:
      "Aylık veya üç aylık düzenli bakım programı ile camlarınız her zaman temiz kalsın. Özel indirimli paket fiyatları ile bütçenize uygun çözümler sunuyoruz.",
    features: [
      "Düzenli bakım programı",
      "Özel indirimli paketler",
      "Planlı ve programlı hizmet",
      "Uzun vadeli çözümler",
    ],
    image: "/images/pngwing.com.png",
  },
];

const bookingSteps = [
  {
    icon: RiCalendarCheckFill,
    title: "Randevu Alın",
    description:
      "İhtiyacınız olan temizlik hizmeti türünü, evinizin veya mekanınızın büyüklüğünü ve tercih ettiğiniz tarih ve saati bize bildirin.",
  },
  {
    icon: RiCheckLine,
    title: "Paketinizi Seçin",
    description:
      "Temizlik için fiyat ve süre tahmini ile programınıza uygun müsait zaman dilimlerini size sunacağız.",
  },
  {
    icon: RiSparklingFill,
    title: "Biz Temizleriz, Siz Rahatlarsınız",
    description:
      "Profesyonel ekibimiz tüm malzemelerle zamanında gelecek ve tahmin edildiği gibi detaylı bir temizlik yapacaktır.",
  },
];

export default function HizmetlerPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero.webp"
              alt="Fethiye cam temizleme hizmetleri"
              fill
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-6 relative z-10 py-20">
            <div className="max-w-3xl">
              <span
                className="text-[#FF7F00] text-4xl mb-4 block"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontWeight: 700,
                }}
              >
                Hizmetlerimiz
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Profesyonel Cam Temizleme Hizmetleri
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Ev, ofis, ticari mekan ve yüksek bina cam temizliği için
                kapsamlı çözümler sunuyoruz. Deneyimli ekibimiz ve modern
                ekipmanlarımızla camlarınızı pırıl pırıl yapıyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section - Copy from landing page */}
        <section id="hizmetler" className="section-padding">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl text-gray-900 mb-6"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Fethiye Cam Temizleme Hizmetleri
              </h2>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-30 font-bold">
                {badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#3D8C40] flex items-center justify-center">
                      <badge.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-gray-700">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Cards Slider */}
            <div className="max-w-7xl mx-auto relative">
              {/* Slider Container */}
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {services.map((service) => (
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
                                <li
                                  key={idx}
                                  className="flex items-center gap-3"
                                >
                                  <RiCheckLine className="w-5 h-5 text-white/80" />
                                  <span className="text-white/90">
                                    {feature}
                                  </span>
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
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={service.id === 1}
                                loading={service.id === 1 ? undefined : "lazy"}
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
                  aria-label="Previous service"
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
                      aria-label={`Go to service ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#3D8C40] hover:bg-[#3D8C40] hover:text-white transition-all"
                  aria-label="Next service"
                >
                  <RiArrowRightSLine className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Process Section - Modified HowItWorks */}
        <section className="section-padding bg-cream">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span
                className="text-[#FF7F00] text-2xl md:text-3xl mb-4 block"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontWeight: 700,
                }}
              >
                60 Saniyede Randevu
              </span>
              <h2
                className="text-4xl md:text-5xl text-gray-900"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                }}
              >
                Hızlı ve Kolay Randevu Süreci
              </h2>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
              {bookingSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center gap-5">
                    {/* Icon Circle */}
                    <div className="icon-circle shrink-0">
                      <step.icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3
                        className="text-xl font-semibold text-gray-900 mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow between steps - curved orange arrows */}
                  {index < bookingSteps.length - 1 && (
                    <div className="hidden md:block absolute top-[15%] right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                      <svg
                        width="100"
                        height="60"
                        viewBox="0 0 100 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {index === 0 ? (
                          // Downward curved arrow
                          <path
                            d="M10 30 Q50 10 90 30"
                            stroke="#FF7F00"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                          />
                        ) : (
                          // Upward curved arrow
                          <path
                            d="M10 30 Q50 50 90 30"
                            stroke="#FF7F00"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                          />
                        )}
                        <path
                          d="M85 25 L90 30 L85 35"
                          stroke="#FF7F00"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center mt-12">
              <Link href="/iletisim" className="btn-primary">
                Hemen Başlayın
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
