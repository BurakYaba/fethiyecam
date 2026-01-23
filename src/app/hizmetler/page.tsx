import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  RiCalendarCheckFill,
  RiCheckLine,
  RiSparklingFill,
} from "@remixicon/react";
import { db } from "@/lib/db";
import ServicesCarousel from "@/components/ServicesCarousel";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  generatePageTitle,
  getAbsoluteUrl,
  getDefaultOgImage,
} from "@/lib/seo-utils";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/structured-data";

export const revalidate = 3600; // Revalidate every 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = await getDefaultOgImage();

  return {
    title: generatePageTitle("Hizmetler"),
    description:
      "Fethiye'de profesyonel cam temizleme hizmetleri. Ev, ofis, ticari mekan ve yüksek bina cam temizliği için kapsamlı çözümler sunuyoruz.",
    keywords:
      "cam temizleme fethiye, profesyonel cam temizliği, ev cam temizliği, ofis cam temizliği, bina cam temizliği",
    openGraph: {
      title: "Hizmetler | Fethiye Cam Temizleme",
      description:
        "Fethiye'de profesyonel cam temizleme hizmetleri. Ev, ofis ve yüksek bina cam temizliği.",
      url: getAbsoluteUrl("/hizmetler"),
      siteName: "Fethiye Cam Temizleme",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Fethiye Cam Temizleme Hizmetleri",
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Hizmetler | Fethiye Cam Temizleme",
      description: "Fethiye'de profesyonel cam temizleme hizmetleri.",
      images: [ogImage],
    },
    alternates: {
      canonical: getAbsoluteUrl("/hizmetler"),
    },
  };
}

const badges = [
  { icon: RiCheckLine, text: "Deneyimli ekip" },
  { icon: RiCheckLine, text: "Sigortalı hizmet" },
  { icon: RiCheckLine, text: "Sözleşme yok" },
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

export default async function HizmetlerPage() {
  // Fetch services from database
  const services = await db.service.findMany({
    include: {
      image: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <>
      <Header />
      <Breadcrumbs
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hizmetler", href: "/hizmetler" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceSchema(services)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Ana Sayfa", url: "/" },
              { name: "Hizmetler", url: "/hizmetler" },
            ]),
          ),
        }}
      />
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
              <ServicesCarousel services={services} />
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
