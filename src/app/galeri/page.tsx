"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";
import { RiImageLine } from "@remixicon/react";

// Note: Client components can't export metadata. This page needs to be converted to server component for SEO
// For now, metadata is inherited from layout

export default function GaleriPage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentAlbumImages, setCurrentAlbumImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("/api/gallery");
        if (response.ok) {
          const data = await response.json();
          setAlbums(data);
        }
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  const openAlbum = (album: any) => {
    if (!album.images || album.images.length === 0) {
      return;
    }
    const imageUrls = album.images.map((img: any) => img.image.url);
    setCurrentAlbumImages(imageUrls);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % currentAlbumImages.length);
  };

  const previousImage = () => {
    setLightboxIndex(
      (prev) =>
        (prev - 1 + currentAlbumImages.length) % currentAlbumImages.length,
    );
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
              src="/images/hero_about.jpg"
              alt="Galeri"
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
                Galeri
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Çalışmalarımızdan
                <br />
                Örnekler
              </h1>
              <p className="text-white/90 text-lg md:text-xl">
                Profesyonel cam temizlik hizmetlerimizden örnekler. Ev, ofis ve
                ticari mekanlar için gerçekleştirdiğimiz başarılı projeler.
              </p>
            </div>
          </div>
        </section>

        {/* Albums Section */}
        <section className="section-padding bg-cream">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="section-label">Proje Albümleri</span>
              <h2
                className="text-4xl md:text-5xl text-gray-900"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Tüm Projelerimiz
              </h2>
            </div>

            {/* Albums Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <RiImageLine className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>Henüz galeri albümü eklenmemiş.</p>
                </div>
              ) : (
                albums.map((album) => (
                  <div
                    key={album.id}
                    className="blog-card cursor-pointer group overflow-hidden"
                    onClick={() => openAlbum(album)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={
                          album.coverImage?.url ||
                          album.images?.[0]?.image?.url ||
                          "/images/image_service_01.jpg"
                        }
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center mb-3 mx-auto">
                            <RiImageLine className="w-8 h-8 text-[#3D8C40]" />
                          </div>
                          <span className="text-white font-semibold text-lg">
                            Albümü Aç
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Album Info */}
                    <div className="p-5 bg-white">
                      <h3
                        className="text-lg font-semibold text-gray-900 mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {album.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <RiImageLine className="w-4 h-4" />
                        <span>{album.images?.length || 0} Fotoğraf</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {currentAlbumImages.length > 0 && (
        <Lightbox
          images={currentAlbumImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      )}
    </>
  );
}
