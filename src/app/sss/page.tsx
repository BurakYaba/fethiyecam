"use client";

import { useState, useEffect } from "react";
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

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('/api/faq');
        if (response.ok) {
          const data = await response.json();
          setFaqs(data);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      }
    };
    fetchFAQs();
  }, []);

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
                      <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
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

