import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RiHome5Line, RiPhoneLine } from "@remixicon/react";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı | Fethiye Cam Temizleme",
  description:
    "Aradığınız sayfa bulunamadı. Ana sayfaya dönebilir veya hizmetlerimize göz atabilirsiniz.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-cream py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Number */}
            <div className="mb-8">
              <h1
                className="text-9xl md:text-[180px] font-bold text-[#3D8C40]/20"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                404
              </h1>
            </div>

            {/* Title */}
            <h2
              className="text-3xl md:text-4xl text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              Sayfa Bulunamadı
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak
              kullanılamıyor olabilir.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#3D8C40] text-white rounded-full hover:bg-[#2d6b30] transition-colors"
              >
                <RiHome5Line className="w-5 h-5" />
                <span>Ana Sayfaya Dön</span>
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#3D8C40] text-[#3D8C40] rounded-full hover:bg-[#3D8C40] hover:text-white transition-colors"
              >
                <RiPhoneLine className="w-5 h-5" />
                <span>Bize Ulaşın</span>
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Aradığınızı bulamadınız mı? Bu sayfalara göz atın:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <Link
                  href="/hizmetler"
                  className="text-[#3D8C40] hover:underline"
                >
                  Hizmetler
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/blog" className="text-[#3D8C40] hover:underline">
                  Blog
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/galeri" className="text-[#3D8C40] hover:underline">
                  Galeri
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/sss" className="text-[#3D8C40] hover:underline">
                  SSS
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/hakkimizda"
                  className="text-[#3D8C40] hover:underline"
                >
                  Hakkımızda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
