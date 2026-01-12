"use client";

import { useState, useEffect } from "react";
import { RiPhoneLine, RiMailLine, RiMapPinLine } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

const services = [
  { label: "Ev Cam Temizliği", href: "/hizmetler" },
  { label: "Ofis Cam Temizliği", href: "/hizmetler" },
  { label: "Dış Cephe Temizliği", href: "/hizmetler" },
  { label: "Düzenli Temizlik", href: "/hizmetler" },
];

const socialIcons = {
  Facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
    </svg>
  ),
  Instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

export default function Footer() {
  const [companyDescription, setCompanyDescription] = useState(
    "Fethiye Cam Temizleme olarak, evinizi, ofisinizi veya işyerinizi pırıl pırıl camlarla buluşturuyoruz. Hizmetlerimizi yaşam tarzınıza ve beklentilerinize göre şekillendiriyoruz."
  );
  const [phone, setPhone] = useState("+905301207848");
  const [email, setEmail] = useState("info@fethiyecam.com");
  const [address, setAddress] = useState("Tuzla, İnönü Blv. No:1/1 EA\n48300 Fethiye/Muğla");
  const [logo, setLogo] = useState("/Fethiye.png");
  const [socialLinks, setSocialLinks] = useState([
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
  ]);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((settings) => {
        if (settings["footer.companyDescription"]) {
          setCompanyDescription(settings["footer.companyDescription"]);
        }
        if (settings["footer.phone"]) setPhone(settings["footer.phone"]);
        if (settings["footer.email"]) setEmail(settings["footer.email"]);
        if (settings["footer.address"]) setAddress(settings["footer.address"]);
        if (settings["footer.social.facebook"]) {
          setSocialLinks((prev) =>
            prev.map((link) =>
              link.name === "Facebook"
                ? { ...link, href: settings["footer.social.facebook"] }
                : link
            )
          );
        }
        if (settings["footer.social.instagram"]) {
          setSocialLinks((prev) =>
            prev.map((link) =>
              link.name === "Instagram"
                ? { ...link, href: settings["footer.social.instagram"] }
                : link
            )
          );
        }
        if (settings["footer.social.twitter"]) {
          setSocialLinks((prev) =>
            prev.map((link) =>
              link.name === "Twitter"
                ? { ...link, href: settings["footer.social.twitter"] }
                : link
            )
          );
        }
        if (settings["footer.social.linkedin"]) {
          setSocialLinks((prev) =>
            prev.map((link) =>
              link.name === "LinkedIn"
                ? { ...link, href: settings["footer.social.linkedin"] }
                : link
            )
          );
        }
      })
      .catch((error) => {
        console.error("Failed to fetch settings:", error);
      });
  }, []);
  return (
    <footer id="iletisim" className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Logo Section */}
        <div className="flex justify-center md:justify-start mb-12">
          <Link href="/">
            <Image
              src={logo}
              alt="Fethiye Cam Temizleme"
              width={200}
              height={70}
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-10 pb-12 border-b border-gray-200">
          {/* Company Info */}
          <div className="md:max-w-md text-center md:text-left">
            <p
              className="text-gray-600 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: companyDescription }}
            />

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#3D8C40] hover:bg-[#3D8C40] hover:text-white hover:border-[#3D8C40] transition-colors"
                  aria-label={social.name}
                >
                  {socialIcons[social.name as keyof typeof socialIcons]}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Services and Contact */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {/* Services */}
            <div className="text-center md:text-left">
              <h4 className="font-bold text-gray-900 mb-5" style={{ fontWeight: 700 }}>Hizmetler</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      className="text-gray-600 hover:text-[#FF7F00] transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h4 className="font-bold text-gray-900 mb-5" style={{ fontWeight: 700 }}>İletişim</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-[#FF7F00] transition-colors justify-center md:justify-start"
                  >
                    <RiPhoneLine className="w-5 h-5 text-[#3D8C40]" />
                    <span>{phone.replace("+90", "0")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-[#FF7F00] transition-colors justify-center md:justify-start"
                  >
                    <RiMailLine className="w-5 h-5 text-[#3D8C40]" />
                    <span>{email}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-gray-600 justify-center md:justify-start">
                    <RiMapPinLine className="w-5 h-5 text-[#3D8C40] shrink-0 mt-0.5" />
                    <span style={{ whiteSpace: "pre-line" }}>{address}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p className="text-center md:text-left">
              © 2025 Fethiye Cam Temizleme. Tüm hakları saklıdır.
            </p>
            <p className="text-center md:text-right">
              <a
                href="https://www.webcraft.tr/hizmetler"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF7F00] transition-colors"
              >
                Web tasarım
              </a>
              {" ve "}
              <a
                href="https://www.webcraft.tr/hizmetler"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF7F00] transition-colors"
              >
                SEO Optimizasyonu
              </a>
              {" "}
              <a
                href="https://www.webcraft.tr/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF7F00] transition-colors"
              >
                WebCraft
              </a>
              {" tarafından yapılmıştır."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

