"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  RiHeadphoneLine,
  RiMapPinLine,
  RiRefreshLine,
  RiPhoneLine,
  RiFacebookFill,
  RiInstagramLine,
  RiTwitterXLine,
  RiLinkedinFill,
} from "@remixicon/react";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section with Contact Form */}
        <section className="relative min-h-screen bg-cream  pt-20">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-start justify-center  pointer-events-none select-none overflow-hidden lg:mt-[-80] mt-14">
            <span
              className="text-[20vw] font-bold text-[#3D8C40]  whitespace-nowrap"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              iletişim
            </span>
          </div>

          {/* Decorative Image Left - Smaller and closer to form */}
          <div className="absolute top-4/5 left-[10%] -translate-y-1/2 z-10 hidden lg:block">
            <Image
              src="/images/image_02_contact.png"
              alt=""
              width={200}
              height={300}
              className="w-auto h-[300px] object-contain"
            />
          </div>

          {/* Decorative Image Right - Bigger and closer to form */}
          <div className="absolute top-1/2 right-[15%] -translate-y-1/2 z-30 hidden lg:block">
            <Image
              src="/images/image_01_contact.png"
              alt=""
              width={500}
              height={800}
              className="w-auto h-[700px] object-contain"
            />
          </div>

          {/* Contact Form */}
          <div className="container mx-auto px-6 relative z-20 py-16">
            <div className="max-w-xl mx-auto bg-cream rounded-3xl shadow-xl p-8 md:p-10 mt-20">
              <span
                className="text-[#FF7F00] text-3xl mb-2 block text-center"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontWeight: 700,
                }}
              >
                Bize Ulaşın
              </span>
              <h1
                className="text-3xl md:text-4xl text-gray-900 text-center mb-6"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Hemen Randevu Alın
              </h1>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Adınız*"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#3D8C40] transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Soyadınız*"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#3D8C40] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-posta*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#3D8C40] transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefon*"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#3D8C40] transition-colors"
                  />
                </div>

                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#3D8C40] transition-colors text-gray-600"
                >
                  <option value="">Hizmet Türü</option>
                  <option value="ev">Ev Cam Temizliği</option>
                  <option value="ofis">Ofis Cam Temizliği</option>
                  <option value="yuksek">Yüksek Bina Cam Temizliği</option>
                  <option value="ticari">Ticari Vitrin Temizliği</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Mesajınız"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#3D8C40] transition-colors resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FF7F00] text-white font-semibold rounded-full hover:bg-[#E67000] transition-colors"
                >
                  Gönder
                </button>

                <p className="text-sm text-gray-500 text-center">
                  *Zorunlu alanlar
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Get in Touch Section */}
        <section className="section-padding bg-cream">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span
                className="text-[#FF7F00] text-4xl mb-2 block"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontWeight: 700,
                }}
              >
                Bize Ulaşın
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Sorularınız mı var veya randevu mu almak istiyorsunuz?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Tek seferlik derin temizlik veya düzenli hizmet ihtiyacınız
                olsun, ekibimiz bir mesaj uzağınızda.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              {/* Customer Service Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm md:col-span-1">
                <div className="w-14 h-14 rounded-2xl bg-[#3D8C40]/10 flex items-center justify-center mb-6">
                  <RiHeadphoneLine className="w-7 h-7 text-[#3D8C40]" />
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  Müşteri Hizmetleri
                </h3>
                <p className="text-gray-600 mb-4">
                  Mesai saatleri içinde bizi arayabilir veya mesaj
                  atabilirsiniz.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">
                    Pazartesi - Cumartesi:
                  </p>
                  <p className="text-gray-900">08:00 - 18:00</p>
                  <a
                    href="tel:+905301207848"
                    className="text-[#3D8C40] font-semibold hover:underline"
                  >
                    0530 120 78 48
                  </a>
                </div>
              </div>

              {/* Find Us Here Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm md:col-span-1">
                <div className="w-14 h-14 rounded-2xl bg-[#3D8C40]/10 flex items-center justify-center mb-6">
                  <RiMapPinLine className="w-7 h-7 text-[#3D8C40]" />
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  Bizi Bulun
                </h3>
                <p className="text-gray-600 mb-4">
                  Fethiye Cam Temizleme
                  <br />
                  Tuzla, İnönü Blv. No:1/1 EA
                  <br />
                  48300 Fethiye/Muğla
                </p>
                <Link
                  href="https://maps.google.com/?q=Tuzla,+İnönü+Blv.+No:1/1+EA,+48300+Fethiye/Muğla"
                  target="_blank"
                  className="inline-block px-6 py-2 bg-[#FF7F00] text-white font-medium rounded-full hover:bg-[#E67000] transition-colors"
                >
                  Haritada Gör
                </Link>
              </div>

              {/* Contact Online Card */}
              <div className="bg-[#3D8C40] rounded-3xl p-8 relative overflow-hidden md:col-span-2">
                {/* Decorative Icon */}
                <div className="absolute top-6 left-6">
                  <RiRefreshLine className="w-8 h-8 text-white/30" />
                </div>

                {/* Orange Glove Image */}
                <div className="absolute -bottom-4 -right-4 z-10">
                  <Image
                    src="/images/orange_glove_01.png"
                    alt=""
                    width={200}
                    height={200}
                    className="w-64 h-64 object-contain"
                  />
                </div>

                <div className="relative z-20 pt-8 md:pt-20">
                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                    }}
                  >
                    Online veya sosyal
                    <br />
                    medya üzerinden ulaşın
                  </h3>
                  <a
                    href="mailto:info@fethiyecam.com"
                    className="text-white/90 hover:underline block mb-6"
                  >
                    info@fethiyecam.com
                  </a>

                  {/* Social Media Icons */}
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#3D8C40] transition-colors"
                    >
                      <RiFacebookFill className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#3D8C40] transition-colors"
                    >
                      <RiInstagramLine className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#3D8C40] transition-colors"
                    >
                      <RiTwitterXLine className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#3D8C40] transition-colors"
                    >
                      <RiLinkedinFill className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="section-padding bg-cream">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span
                className="text-[#FF7F00] text-2xl mb-2 block"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontWeight: 700,
                }}
              >
                Bize Ulaşın
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl text-gray-900"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Hizmet Verdiğimiz Bölgeler
              </h2>
            </div>

            {/* Map Container */}
            <div className="flex flex-col lg:block relative rounded-3xl overflow-hidden">
              {/* Google Map */}
              <div className="h-[500px] w-full order-1">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.132210717772!2d29.122685399999998!3d36.623204099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c0433c0ac2b14b%3A0x2b09a09b82e7403f!2sFethiye%20Cam%20temizleme!5e0!3m2!1str!2str!4v1767459908817!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(30%)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Location Card - Below map on mobile, overlay on desktop */}
              <div className="order-2 mt-6 lg:order-0 lg:absolute lg:mt-40 lg:left-6 z-10 lg:max-w-xs w-full lg:w-auto">
                <div className="bg-[#FF7F00] rounded-2xl p-6 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <RiMapPinLine className="w-5 h-5 text-white" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Fethiye, Muğla
                  </h3>
                  <p className="text-white/90 mb-2">
                    Tuzla, İnönü Blv. No:1/1 EA
                    <br />
                    48300 Fethiye/Muğla
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <RiHeadphoneLine className="w-4 h-4" />
                    <span>0530 120 78 48</span>
                  </div>
                  <p className="text-sm text-white/80">
                    *Fethiye ve çevre ilçelere hizmet veriyoruz.
                  </p>
                </div>
              </div>
            </div>

            {/* More Locations */}
            <div className="mt-12">
              <h3
                className="text-2xl font-semibold text-gray-900 text-center mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Hizmet Verdiğimiz Diğer Bölgeler
              </h3>

              {/* Floating Decorative Images */}
              <div className="relative">
                <div className="hidden lg:block absolute -left-20 top-0 z-10">
                  <Image
                    src="/images/floating_contact_01.png"
                    alt=""
                    width={150}
                    height={150}
                    className="w-24 h-24 object-contain animate-float"
                  />
                </div>
                <div className="hidden lg:block absolute -right-20 top-1/2 z-10">
                  <Image
                    src="/images/floating_contact_02.png"
                    alt=""
                    width={150}
                    height={150}
                    className="w-24 h-24 object-contain animate-float"
                    style={{ animationDelay: "1s" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: "Ölüdeniz",
                      address: "Ölüdeniz Mahallesi, Fethiye",
                      phone: "0530 120 78 48",
                    },
                    {
                      name: "Hisarönü",
                      address: "Hisarönü Mahallesi, Fethiye",
                      phone: "0530 120 78 48",
                    },
                    {
                      name: "Çalış",
                      address: "Çalış Mahallesi, Fethiye",
                      phone: "0530 120 78 48",
                    },
                    {
                      name: "Göcek",
                      address: "Göcek Mahallesi, Fethiye",
                      phone: "0530 120 78 48",
                    },
                  ].map((location, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-sm"
                    >
                      <h4
                        className="text-lg font-semibold text-[#3D8C40] mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {location.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {location.address}
                      </p>
                      <a
                        href={`tel:${location.phone.replace(/\s/g, "")}`}
                        className="text-gray-900 font-medium hover:text-[#3D8C40] transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-cream overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="relative flex flex-col lg:flex-row items-stretch overflow-visible max-w-[1400px] mx-auto lg:h-[450px]">
              {/* Left Orange Panel */}
              <div className="relative lg:w-2/5 bg-[#FF7F00] p-8 lg:p-12 rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl flex flex-col justify-center">
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl text-white mb-3 leading-tight"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontStyle: "italic",
                  }}
                >
                  Bugün Sizin İçin
                  <br />
                  Ne Temizleyelim?
                </h2>
                <p className="text-white/90 text-lg mb-6 font-semibold">
                  Hemen Randevu Alın
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                    <RiPhoneLine className="w-6 h-6 text-[#3D8C40]" />
                  </div>
                  <a
                    href="tel:+905301207848"
                    className="text-white font-semibold text-lg hover:text-white/80 transition-colors"
                  >
                    0530 120 78 48
                  </a>
                </div>
              </div>

              {/* Team Image Overlay - Desktop: Between sections, overflowing to top */}
              <div className="absolute left-[40%] -translate-x-1/2 bottom-0 z-30 pointer-events-none hidden lg:block">
                <Image
                  src="/images/team_01.png"
                  alt="Profesyonel temizlikçi"
                  width={600}
                  height={780}
                  className="h-[520px] w-auto object-contain"
                  sizes="600px"
                  loading="lazy"
                />
              </div>

              {/* Team Image Overlay - Mobile: centered at bottom */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-30 pointer-events-none lg:hidden">
                <Image
                  src="/images/team_01.png"
                  alt="Profesyonel temizlikçi"
                  width={300}
                  height={450}
                  className="w-[300px] max-w-none h-auto object-contain"
                  sizes="300px"
                  loading="lazy"
                />
              </div>

              {/* Right Image Section with Background */}
              <div className="relative lg:w-3/5 h-[350px] lg:h-full rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl overflow-hidden">
                {/* Background Image with Blur */}
                <div className="absolute inset-0">
                  <Image
                    src="/images/home_02_image_01.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    loading="lazy"
                    style={{ filter: "blur(3px)" }}
                  />
                </div>

                {/* Award Badge */}
                <div className="absolute top-6 right-6 z-20 hidden lg:flex items-center gap-3">
                  <Image
                    src="/images/award_logo.png"
                    alt="2024 Super Service Award"
                    width={100}
                    height={120}
                    className="w-20 h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
