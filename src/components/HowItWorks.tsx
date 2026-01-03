"use client";

import { RiCalendarLine, RiClipboardLine, RiSparklingFill } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

const steps = [
  {
    icon: RiCalendarLine,
    title: "Randevu Alın",
    description:
      "Bizi arayın veya iletişim formundan mesaj bırakın. Size en kısa sürede dönüş yapalım.",
  },
  {
    icon: RiClipboardLine,
    title: "Paketinizi Seçin",
    description:
      "Cam sayısına, metrekareye veya ihtiyaçlarınıza göre özelleştirilmiş paketler sunuyoruz.",
  },
  {
    icon: RiSparklingFill,
    title: "Biz Temizleriz, Siz Rahatlarsınız",
    description:
      "Profesyonel ekibimiz camlarınızı pırıl pırıl yapar, siz sadece keyfini çıkarın.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-cream">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-label">Nasıl Çalışıyoruz</span>
          <h2
            className="text-4xl md:text-5xl text-gray-900"
            style={{
              fontFamily: "var(--font-heading)",
            }}
          >
            Adım Adım Kullanım Kılavuzu
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
                {/* Icon Circle */}
                <div className="icon-circle flex-shrink-0">
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="text-center md:text-left">
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
            </div>
          ))}

          {/* Floating Image Top - Between Randevu Alın and Paketinizi Seçin */}
          <div className="hidden md:block absolute top-[10%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Image
              src="/images/floating_image_top.png"
              alt=""
              width={200}
              height={200}
              className="w-[100px] h-[40px] animate-float"
              style={{ animationDuration: "3s" }}
              loading="lazy"
              sizes="100px"
            />
          </div>

          {/* Floating Image Bottom - Between Paketinizi Seçin and Biz Temizleriz, Siz Rahatlarsınız */}
          <div className="hidden md:block absolute top-[95%] left-[66.666%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Image
              src="/images/floating_image_bottom.png"
              alt=""
              width={200}
              height={200}
              className="w-[100px] h-[40px] animate-float"
              style={{ animationDuration: "3s", animationDelay: "0.5s" }}
              loading="lazy"
              sizes="100px"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center mt-12">
          <Link href="#teklif" className="btn-primary">
            Hemen Başlayın
          </Link>
        </div>
      </div>
    </section>
  );
}
