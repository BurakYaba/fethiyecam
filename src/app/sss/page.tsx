"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowDownSLine,
  RiCheckLine,
  RiQuestionLine,
  RiPhoneLine,
  RiMailLine,
} from "@remixicon/react";

const faqs = [
  {
    id: 1,
    question: "Cam temizliği hizmetiniz ne kadar sürer?",
    answer:
      "Temizlik süresi, cam sayısına, mekanın büyüklüğüne ve temizlik türüne göre değişir. Genellikle bir ev için 1-3 saat, ofis için 2-4 saat arasında sürmektedir. Detaylı bir süre tahmini için ücretsiz keşif yapıyoruz.",
  },
  {
    id: 2,
    question: "Hangi bölgelerde hizmet veriyorsunuz?",
    answer:
      "Fethiye ve çevresindeki tüm bölgelerde hizmet veriyoruz. Özel durumlar için lütfen bizimle iletişime geçin, size en uygun çözümü sunalım.",
  },
  {
    id: 3,
    question: "Fiyatlarınız nasıl belirleniyor?",
    answer:
      "Fiyatlarımız cam sayısı, mekanın büyüklüğü, temizlik türü ve erişim zorluğuna göre belirlenir. Şeffaf fiyatlandırma politikamız sayesinde hiçbir sürpriz yok. Ücretsiz keşif sonrası net bir fiyat teklifi sunuyoruz.",
  },
  {
    id: 4,
    question: "Sigortalı hizmet veriyor musunuz?",
    answer:
      "Evet, tüm hizmetlerimiz sigortalıdır. Çalışma sırasında oluşabilecek herhangi bir hasar durumunda sigortamız devreye girer. Güvenli ve garantili hizmet sunuyoruz.",
  },
  {
    id: 5,
    question: "Randevu nasıl alabilirim?",
    answer:
      "Randevu almak için bizi telefon ile arayabilir (0530 120 78 48), iletişim formumuzu doldurabilir veya WhatsApp üzerinden mesaj gönderebilirsiniz. Size en kısa sürede dönüş yapacağız.",
  },
  {
    id: 6,
    question: "Düzenli temizlik hizmeti sunuyor musunuz?",
    answer:
      "Evet, haftalık, aylık veya üç aylık düzenli bakım programları sunuyoruz. Düzenli hizmet alan müşterilerimize özel indirimli paket fiyatları sunuyoruz.",
  },
  {
    id: 7,
    question: "Hangi temizlik malzemelerini kullanıyorsunuz?",
    answer:
      "Çevre dostu, çocuklar ve evcil hayvanlar için güvenli, profesyonel temizlik malzemeleri kullanıyoruz. Tüm ürünlerimiz cam yüzeylere zarar vermeyecek şekilde seçilmiştir.",
  },
  {
    id: 8,
    question: "Yüksek bina cam temizliği yapıyor musunuz?",
    answer:
      "Evet, özel platform ve güvenlik ekipmanları ile yüksek binaların cam temizliğini yapıyoruz. Ekibimiz güvenlik sertifikalı ve sigortalıdır.",
  },
  {
    id: 9,
    question: "Temizlik sonrası memnun kalmazsam ne olur?",
    answer:
      "Memnuniyet garantisi sunuyoruz. Eğer temizlik sonrası herhangi bir sorun yaşarsanız, ücretsiz olarak tekrar temizlik yapıyoruz. Müşteri memnuniyeti bizim önceliğimizdir.",
  },
  {
    id: 10,
    question: "Ödeme nasıl yapılır?",
    answer:
      "Nakit, kredi kartı veya banka havalesi ile ödeme yapabilirsiniz. Ödeme genellikle temizlik tamamlandıktan sonra yapılır. Kurumsal müşterilerimiz için fatura kesiyoruz.",
  },
  {
    id: 11,
    question: "Acil durumlarda hizmet veriyor musunuz?",
    answer:
      "Evet, acil durumlar için esnek çalışma saatlerimiz vardır. Müsaitliğimize göre aynı gün veya ertesi gün hizmet verebiliriz. Lütfen bizimle iletişime geçin.",
  },
  {
    id: 12,
    question: "Evcil hayvanlarım varsa sorun olur mu?",
    answer:
      "Hayır, hiçbir sorun olmaz. Kullandığımız temizlik ürünleri evcil hayvanlar için güvenlidir. Çalışma sırasında evcil hayvanlarınızın güvenliği için gerekli önlemleri alıyoruz.",
  },
];

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
              src="/images/faq_background.jpg"
              alt="Sıkça Sorulan Sorular"
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
                Sıkça Sorulan Sorular
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Merak Ettiklerinizin
                <br />
                Cevapları Burada
              </h1>
              <p className="text-white/90 text-lg md:text-xl">
                Cam temizliği hizmetlerimiz hakkında en çok sorulan sorular ve
                cevapları. Başka sorularınız varsa bizimle iletişime geçmekten
                çekinmeyin.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-cream">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="section-label">Sorularınız ve Cevaplarımız</span>
              <h2
                className="text-4xl md:text-5xl text-gray-900"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Sıkça Sorulan Sorular
              </h2>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-[#3D8C40]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <RiQuestionLine className="w-5 h-5 text-[#3D8C40]" />
                      </div>
                      <h3
                        className="text-lg md:text-xl font-semibold text-gray-900 flex-1"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    <RiArrowDownSLine
                      className={`w-6 h-6 text-gray-400 shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-5 pl-[72px]">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto mt-16">
              <div className="bg-[#3D8C40] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                {/* Decorative Images */}
                <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
                  <Image
                    src="/images/floating_image_02.png"
                    alt=""
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain animate-float"
                    style={{ animationDuration: "3s" }}
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-4 left-4 opacity-20 pointer-events-none">
                  <Image
                    src="/images/floating_image_06.png"
                    alt=""
                    width={60}
                    height={60}
                    className="w-12 h-12 object-contain animate-float"
                    style={{ animationDuration: "4s", animationDelay: "0.5s" }}
                    loading="lazy"
                  />
                </div>

                <div className="relative z-10">
                  <h3
                    className="text-2xl md:text-3xl text-white mb-4"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    Başka Sorularınız mı Var?
                  </h3>
                  <p className="text-white/90 mb-8 text-lg">
                    Sorularınız için bizimle iletişime geçmekten çekinmeyin.
                    Size yardımcı olmaktan mutluluk duyarız.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:+905301207848"
                      className="inline-flex items-center justify-center gap-2 bg-white text-[#3D8C40] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <RiPhoneLine className="w-5 h-5" />
                      <span>0530 120 78 48</span>
                    </a>
                    <Link
                      href="/iletisim"
                      className="inline-flex items-center justify-center gap-2 bg-[#FF7F00] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#E67000] transition-colors"
                    >
                      <RiMailLine className="w-5 h-5" />
                      <span>İletişim Formu</span>
                    </Link>
                  </div>
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

