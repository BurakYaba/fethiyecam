"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#anasayfa", label: "Ana Sayfa" },
    { href: "#hakkimizda", label: "Hakkımızda" },
    { href: "#hizmetler", label: "Hizmetler" },
    { href: "#iletisim", label: "İletişim" },
  ];

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
              <span
                className={`text-2xl font-normal transition-colors ${
                  isScrolled ? "text-[#1a1a1a]" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Fethiye Cam
              </span>
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
                      isScrolled ? "text-gray-800" : "text-white"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-px transition-all duration-300 ${
                        isScrolled
                          ? "bg-[#F5A623] group-hover:w-full"
                          : "bg-white group-hover:w-full"
                      }`}
                      style={{
                        width: link.href === "#anasayfa" ? "100%" : "0%",
                      }}
                    />
                  </Link>
                ))}
              </nav>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                {/* Phone Button - Outline Style */}
                <a
                  href="tel:+905551234567"
                  className="btn-header-outline flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>+90 555 123 45 67</span>
                </a>
                {/* Request Service Button - Filled Style */}
                <Link href="#teklif" className="btn-header-filled">
                  Teklif Al
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              <Menu className="w-6 h-6" />
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
            <span
              className="text-xl font-normal text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Fethiye Cam
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-normal text-gray-800 hover:text-[#F5A623] py-3 border-b border-gray-100 transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3 pt-6">
            <a
              href="tel:+905551234567"
              className="btn-header-outline w-full justify-center"
            >
              <Phone className="w-4 h-4" />
              <span>+90 555 123 45 67</span>
            </a>
            <Link href="#teklif" className="btn-header-filled w-full">
              Teklif Al
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
