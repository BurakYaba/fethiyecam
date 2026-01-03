"use client";

import { Phone, Mail, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

const services = [
  { label: "Ev Cam Temizliği", href: "#" },
  { label: "Ofis Cam Temizliği", href: "#" },
  { label: "Dış Cephe Temizliği", href: "#" },
  { label: "Düzenli Temizlik", href: "#" },
];

const info = [
  { label: "Gizlilik Politikası", href: "#" },
  { label: "Kullanım Şartları", href: "#" },
  { label: "Çerez Ayarları", href: "#" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="iletisim" className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 border-b border-gray-200">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="text-3xl font-bold text-[#3D8C40]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Fethiye Cam
            </span>
            <Sparkles className="w-5 h-5 text-[#3D8C40]" />
          </div>

          {/* Newsletter Form */}
          <div className="w-full max-w-xl">
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#3D8C40] transition-colors"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Abone Ol
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-3">
              Özel temizlik kampanyaları ve güncellemelerden haberdar olun.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Company Info */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Fethiye Cam Temizleme olarak, evinizi, ofisinizi veya işyerinizi
              pırıl pırıl camlarla buluşturuyoruz. Hizmetlerimizi yaşam
              tarzınıza ve beklentilerinize göre şekillendiriyoruz.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#3D8C40] hover:bg-[#3D8C40] hover:text-white hover:border-[#3D8C40] transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Hizmetler</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-gray-600 hover:text-[#F5A623] transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Bilgi</h4>
            <ul className="space-y-3">
              {info.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-[#F5A623] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-5">İletişim</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+90XXXXXXXXXX"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#F5A623] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#3D8C40]" />
                  <span>+90 XXX XXX XX XX</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@fethiyecam.com"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#F5A623] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#3D8C40]" />
                  <span>info@fethiyecam.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#3D8C40] flex-shrink-0 mt-0.5" />
                  <span>
                    Fethiye, Muğla
                    <br />
                    Türkiye
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2025 Fethiye Cam Temizleme. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6">
              {info.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-[#F5A623] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

