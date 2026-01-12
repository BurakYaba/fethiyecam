"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { RiPhoneLine, RiMenuLine, RiCloseLine } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  children: MenuItem[];
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<MenuItem[]>([]);
  const [phone, setPhone] = useState("+905301207848");
  const [ctaText, setCtaText] = useState("Teklif Al");
  const [ctaLink, setCtaLink] = useState("/iletisim");
  const [logo, setLogo] = useState("/Fethiye.png");
  const pathname = usePathname();
  const isContactPage = pathname === "/iletisim";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch menu items
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNavLinks(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch menu:", error);
        // Fallback to default menu
        setNavLinks([
          { id: "1", href: "/", label: "Ana Sayfa", children: [] },
          { id: "2", href: "/hakkimizda", label: "Hakkımızda", children: [] },
          { id: "3", href: "/hizmetler", label: "Hizmetler", children: [] },
          { id: "4", href: "/blog", label: "Blog", children: [] },
          { id: "5", href: "/galeri", label: "Galeri", children: [] },
          { id: "6", href: "/sss", label: "SSS", children: [] },
          { id: "7", href: "/iletisim", label: "İletişim", children: [] },
        ]);
      });

    // Fetch settings
    fetch("/api/settings")
      .then((res) => res.json())
      .then((settings) => {
        if (settings["header.phone"]) setPhone(settings["header.phone"]);
        if (settings["header.ctaText"]) setCtaText(settings["header.ctaText"]);
        if (settings["header.ctaLink"]) setCtaLink(settings["header.ctaLink"]);
        if (settings["header.logo"]) setLogo(settings["header.logo"]);
      })
      .catch((error) => {
        console.error("Failed to fetch settings:", error);
      });
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Fethiye Cam Temizleme"
                width={250}
                height={90}
                className="h-14 md:h-16 lg:h-18 w-auto object-contain"
                priority
              />
            </Link>

            {/* Right Section - Navigation and Buttons */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Desktop Navigation */}
              <nav className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium transition-colors duration-300 relative group ${
                      isScrolled || isContactPage
                        ? "text-gray-800"
                        : "text-white"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-px transition-all duration-300 ${
                        isScrolled || isContactPage
                          ? "bg-[#FF7F00] group-hover:w-full"
                          : "bg-white group-hover:w-full"
                      }`}
                      style={{
                        width: pathname === link.href || (link.href === "/" && pathname === "/") ? "100%" : "0%",
                      }}
                    />
                  </Link>
                ))}
              </nav>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                {/* Phone Button - Outline Style */}
                <a
                  href={`tel:${phone}`}
                  className={`btn-header-outline flex items-center gap-2 ${
                    isContactPage && !isScrolled
                      ? "!text-[#1a1a1a] [box-shadow:0_0_0_1px_#1a1a1a_inset]"
                      : ""
                  }`}
                >
                  <RiPhoneLine
                    className={`w-4 h-4 ${
                      isContactPage && !isScrolled ? "!text-[#1a1a1a]" : ""
                    }`}
                  />
                  <span>{phone.replace("+90", "0")}</span>
                </a>
                {/* Request Service Button - Filled Style */}
                <Link href={ctaLink} className="btn-header-filled">
                  {ctaText}
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled || isContactPage ? "text-gray-800" : "text-white"
              }`}
            >
              <RiMenuLine className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <Image
              src={logo}
              alt="Fethiye Cam Temizleme"
              width={240}
              height={60}
              className="h-14 w-auto object-contain"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <RiCloseLine className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-normal text-gray-800 hover:text-[#FF7F00] py-3 border-b border-gray-100 transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3 pt-6">
            <a
              href={`tel:${phone}`}
              className="btn-header-outline w-full justify-center"
            >
              <RiPhoneLine className="w-4 h-4" />
              <span>{phone.replace("+90", "0")}</span>
            </a>
            <Link href={ctaLink} className="btn-header-filled w-full">
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
