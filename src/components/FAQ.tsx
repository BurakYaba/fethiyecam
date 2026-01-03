"use client";

import Link from "next/link";

export default function FAQ() {
  return (
    <section className="relative py-20 overflow-hidden min-h-[600px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url('/images/faq_background.jpg')`,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <span className="section-label">Sıkça Sorulan Sorular</span>
          <div className="relative inline-block">
            <h2
              className="text-4xl md:text-5xl text-gray-900"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              Hâlâ Sorularınız mı Var?
            </h2>
            {/* Floating Leaf */}
            <div className="absolute -right-40 top-1/2 -translate-y-1/2 animate-float">
              <img
                src="/images/floating_leaf_01.png"
                alt=""
                className="w-16 h-20 md:w-28 md:h-40 object-contain"
                style={{ animationDuration: "3s" }}
              />
            </div>
          </div>
          <Link href="#iletisim" className="btn-primary">
            SSS Sayfamızı Görün
          </Link>
        </div>
      </div>
    </section>
  );
}
