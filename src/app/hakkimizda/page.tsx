"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  RiShieldLine,
  RiLeafLine,
  RiCalendarLine,
  RiSettings3Line,
  RiStarLine,
  RiCheckLine,
  RiPhoneLine,
} from "@remixicon/react";

const features = [
  {
    icon: RiShieldLine,
    title: "Güvenilir Profesyoneller",
    description:
      "Ekibimiz titizlikle seçilmiş, eğitimli ve kaliteli hizmete adanmış profesyonellerden oluşur.",
  },
  {
    icon: RiCalendarLine,
    title: "Esnek Planlama",
    description:
      "Haftalık, aylık ve tek seferlik temizlik dahil esnek randevu seçenekleri sunuyoruz.",
  },
  {
    icon: RiLeafLine,
    title: "Çevre Dostu Temizlik",
    description:
      "Çocuklar, evcil hayvanlar ve gezegen için güvenli, toksik olmayan ürünler kullanıyoruz.",
  },
  {
    icon: RiSettings3Line,
    title: "Özelleştirilmiş Hizmet",
    description:
      "Her hizmeti ihtiyaçlarınıza ve bütçenize göre özelleştiriyoruz.",
  },
];

const services = [
  {
    title: "Ev Cam Temizliği",
    price: "₺299",
    image: "/images/image_service_01.jpg",
  },
  {
    title: "Ofis Cam Temizliği",
    price: "₺249",
    image: "/images/image_service_02.jpg",
  },
  {
    title: "Taşınma Sonrası Temizlik",
    price: "₺399",
    image: "/images/image_service_03.jpg",
  },
];

const testimonials = [
  {
    text: "Harika bir hizmet, ekip zamanında geldi ve işini hızlıca tamamladı. Evim harika görünüyordu.",
    author: "Ayşe Yılmaz",
    role: "Müşteri",
    image: "/images/testimonials_01.jpg",
  },
  {
    text: "Çocuk odası için doğal temizlik ürünleri kullanmalarını çok takdir ettim. Teşekkürler!",
    author: "Mehmet Kaya",
    role: "Müşteri",
    image: "/images/testimonials_02.jpg",
  },
  {
    text: "Profesyonel ve güler yüzlü ekip. Cam temizliği sonrası evim ışıl ışıl oldu.",
    author: "Zeynep Demir",
    role: "Müşteri",
    image: "/images/testimonials_04.jpg",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section - Full width image with overlay */}
        <section className="relative min-h-screen flex items-center ">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero_about.jpg"
              alt="Profesyonel temizlik ekibi"
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
                Hakkımızda
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Mekanları Parlatıyoruz, Her Seferinde Mükemmel Temizlik.
              </h1>
            </div>
          </div>
        </section>

        {/* About Intro Section */}
        <section className="section-padding bg-cream overflow-visible">
          <div className="container mx-auto px-6 overflow-visible">
            {/* Top text */}
            <div className="max-w-4xl mb-12">
              <span
                className="text-[#FF7F00] text-4xl mb-4 block"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontWeight: 700,
                }}
              >
                Hakkımızda
              </span>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Fethiye'de yüksek kaliteli konut ve ticari cam temizlik
                hizmetleri sunmaya adanmış profesyonel bir temizlik şirketiyiz.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Ekibimiz, her temizlikten sonra memnuniyetinizi sağlamak için
                özverili çalışır. Açık iletişim, esnek randevu ve memnuniyet
                garantisi ile huzurunuzu ön planda tutuyoruz.
              </p>
            </div>

            {/* Features Grid + Image Card */}
            <div className="grid lg:grid-cols-3 gap-8 overflow-visible">
              {/* Features - 2x2 Grid */}
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="w-12 h-12 text-[#3D8C40] mb-4">
                      <feature.icon className="w-10 h-10 stroke-1" />
                    </div>
                    <h5
                      className="font-bold text-gray-900 text-lg mb-2"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                      }}
                    >
                      {feature.title}
                    </h5>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Green Card with Image */}
              <div className="relative mt-4">
                {/* Decorative green frame - offset with transparent green fill */}
                <div className="absolute -top-3 -left-3 -right-3 -bottom-3 bg-[#5BA85F]/20  border-[#5BA85F]/50 rounded-[2rem] pointer-events-none" />
                <div className="bg-[#3D8C40] rounded-3xl p-6 h-full min-h-[400px] relative overflow-visible">
                  {/* Floating bubble images */}
                  <div className="absolute top-8 right-8 z-20 pointer-events-none">
                    <Image
                      src="/images/floating_image_02.png"
                      alt=""
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain animate-float"
                      style={{ animationDuration: "3s" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-16 right-16 z-20 pointer-events-none">
                    <Image
                      src="/images/floating_image_06.png"
                      alt=""
                      width={60}
                      height={60}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain animate-float"
                      style={{
                        animationDuration: "4s",
                        animationDelay: "0.5s",
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-24 right-6 z-20 pointer-events-none">
                    <Image
                      src="/images/floating_image_02.png"
                      alt=""
                      width={70}
                      height={70}
                      className="w-14 h-14 md:w-16 md:h-16 object-contain animate-float"
                      style={{
                        animationDuration: "3.5s",
                        animationDelay: "1s",
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-32 left-8 z-20 pointer-events-none">
                    <Image
                      src="/images/floating_image_06.png"
                      alt=""
                      width={90}
                      height={90}
                      className="w-16 h-16 md:w-24 md:h-24 object-contain animate-float"
                      style={{
                        animationDuration: "4s",
                        animationDelay: "0.3s",
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-20 left-16 z-20 pointer-events-none">
                    <Image
                      src="/images/floating_image_02.png"
                      alt=""
                      width={50}
                      height={50}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain animate-float"
                      style={{
                        animationDuration: "3s",
                        animationDelay: "1.5s",
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-1/3 left-1/4 z-20 pointer-events-none">
                    <Image
                      src="/images/floating_image_06.png"
                      alt=""
                      width={100}
                      height={100}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain animate-float"
                      style={{
                        animationDuration: "4.5s",
                        animationDelay: "0.7s",
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-1/4 right-1/3 z-20 pointer-events-none">
                    <Image
                      src="/images/floating_image_02.png"
                      alt=""
                      width={75}
                      height={75}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain animate-float"
                      style={{
                        animationDuration: "3.5s",
                        animationDelay: "1.2s",
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-1/2 right-1/4 z-20 pointer-events-none">
                    <Image
                      src="/images/floating_image_06.png"
                      alt=""
                      width={65}
                      height={65}
                      className="w-14 h-14 md:w-16 md:h-16 object-contain animate-float"
                      style={{
                        animationDuration: "4s",
                        animationDelay: "0.9s",
                      }}
                      loading="lazy"
                    />
                  </div>

                  {/* Cleaning supplies image - overflowing from top and bottom */}
                  <div className="absolute -top-20  left-0 right-0 z-10 flex items-end justify-center">
                    <Image
                      src="/images/image_about.png"
                      alt="Temizlik malzemeleri"
                      width={700}
                      height={700}
                      className="w-[110%] max-w-none h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-padding bg-cream">
          <div className="container mx-auto  bg-white rounded-3xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center px-6 py-12">
              {/* Left - Image */}
              <div className="rounded-3xl overflow-hidden">
                <Image
                  src="/images/image_about_01.jpg"
                  alt="Şirket kurucusu"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Right - Content */}
              <div>
                <h2
                  className="text-3xl md:text-4xl text-gray-900 mb-8"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Misyonumuz
                </h2>

                {/* Quote with orange marks */}
                <div className="relative pl-16 mb-8">
                  <span className="absolute left-0 top-0 text-6xl text-[#FF7F00] leading-none font-serif">
                    "
                  </span>
                  <p
                    className="text-xl md:text-2xl text-gray-700 leading-relaxed"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Yolculuğumuz, düzenli ve misafirperver mekanlar yaratma
                    tutkusuyla ve meşgul insanların daha fazla boş zamanın
                    tadını çıkarmasına yardımcı olma arzusuyla başladı.
                  </p>
                </div>

                {/* Signature */}
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/signature_01.png"
                    alt="İmza"
                    width={100}
                    height={50}
                    className="h-12 w-auto"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Ahmet Yıldız</p>
                    <p className="text-sm text-gray-600">Kurucu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding bg-cream">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left - Content */}
              <div>
                <h2
                  className="text-2xl md:text-3xl text-gray-900 mb-8 leading-relaxed"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Düzenli ev temizliklerinden derin ofis temizliklerine ve
                  taşınma hizmetlerine kadar, her işi ihtiyaçlarınıza göre
                  özelleştiriyoruz.
                </h2>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-[#3D8C40] flex items-center justify-center">
                      <RiCheckLine className="w-4 h-4 text-white" />
                    </div>
                    Arka plan kontrolü yapılmış temizlikçiler
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-[#3D8C40] flex items-center justify-center">
                      <RiCheckLine className="w-4 h-4 text-white" />
                    </div>
                    Kolay son dakika randevuları
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-[#3D8C40] flex items-center justify-center">
                      <RiCheckLine className="w-4 h-4 text-white" />
                    </div>
                    Sözleşme veya taahhüt yok
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-[#3D8C40] flex items-center justify-center">
                      <RiCheckLine className="w-4 h-4 text-white" />
                    </div>
                    Düzenli müşterilere özel indirimler
                  </li>
                </ul>

                <div className="flex flex-wrap gap-4">
                  <Link href="/#teklif" className="btn-primary">
                    Online Randevu Al
                  </Link>
                  <a
                    href="tel:+905301207848"
                    className="inline-flex items-center gap-2 text-gray-900 font-medium"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center">
                      <RiPhoneLine className="w-5 h-5 text-white" />
                    </span>
                    0530 120 78 48
                  </a>
                </div>
              </div>

              {/* Right - Service Cards */}
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white rounded-2xl p-2 pr-6 shadow-sm"
                  >
                    <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={128}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4
                        className="font-semibold text-gray-900 text-lg"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {service.title}
                      </h4>
                    </div>
                    <span className="px-4 py-2 border border-[#3D8C40] text-[#3D8C40] rounded-full text-sm font-medium">
                      {service.price}'den
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Green Background */}
        <section className="relative bg-[#3D8C40] py-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left - Header and Rating */}
              <div className="text-white">
                <span
                  className="text-white/80 text-4xl mb-4 block"
                  style={{
                    fontFamily: "var(--font-caveat)",
                    fontWeight: 700,
                  }}
                >
                  Referanslar
                </span>
                <h2
                  className="text-4xl md:text-5xl text-white mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Müşterilerimiz Ne Düşünüyor
                </h2>

                {/* Google Rating Badge */}
                <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <RiStarLine
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">4.7</span>
                </div>
              </div>

              {/* Right - Large Image */}
              <div className="relative">
                <div className="rounded-3xl overflow-hidden">
                  <Image
                    src="/images/image_02.jpg"
                    alt="Mutlu müşteri"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Testimonial Cards - Overlapping bottom */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 lg:-mt-20 relative z-10">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  {/* Orange quote */}
                  <span className="text-4xl text-[#FF7F00] font-serif leading-none">
                    "
                  </span>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Light with leaves */}
        <section className="relative py-32 overflow-hidden min-h-[600px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/faq_background.jpg"
              alt=""
              fill
              className="object-cover object-bottom"
              sizes="100vw"
              loading="lazy"
            />
          </div>

          {/* Leaves at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10">
            <Image
              src="/images/floating_leaf_01.png"
              alt=""
              width={100}
              height={150}
              className="absolute bottom-0 left-[5%] w-16 opacity-80"
            />
            <Image
              src="/images/floating_leaf_01.png"
              alt=""
              width={100}
              height={150}
              className="absolute bottom-0 left-[15%] w-24 opacity-90"
            />
            <Image
              src="/images/floating_leaf_01.png"
              alt=""
              width={100}
              height={150}
              className="absolute bottom-0 left-[30%] w-20 opacity-70"
            />
            <Image
              src="/images/floating_leaf_01.png"
              alt=""
              width={100}
              height={150}
              className="absolute bottom-0 right-[40%] w-16 opacity-80"
            />
            <Image
              src="/images/floating_leaf_01.png"
              alt=""
              width={100}
              height={150}
              className="absolute bottom-0 right-[20%] w-28 opacity-90"
            />
            <Image
              src="/images/floating_leaf_01.png"
              alt=""
              width={100}
              height={150}
              className="absolute bottom-0 right-[5%] w-20 opacity-75"
            />
          </div>

          {/* Floating leaf top right */}
          <div className="absolute top-20 right-1/4 z-10">
            <Image
              src="/images/floating_leaf_01.png"
              alt=""
              width={60}
              height={90}
              className="w-12 animate-float"
            />
          </div>

          <div className="container mx-auto px-6 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <span
                className="text-[#FF7F00] text-4xl mb-4 block"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontWeight: 700,
                }}
              >
                Pırıl pırıl camlar için hazır mısınız?
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ücretsiz teklif almak için bugün bizimle iletişime geçin.
              </h2>
              <Link
                href="/#teklif"
                className="inline-block bg-[#FF7F00] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#E67000] transition-colors"
              >
                Teklif Al
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
