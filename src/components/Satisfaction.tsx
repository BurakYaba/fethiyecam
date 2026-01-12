"use client";

import { useState, useEffect } from "react";
import { RiCheckLine, RiStarLine } from "@remixicon/react";
import Image from "next/image";

const defaultMetrics = [
  { label: "Ekibimizin dakikliği", value: 96 },
  { label: "Temizlik kalitesi", value: 94 },
  { label: "Evinize ve eşyalarınıza saygı", value: 100 },
];

export default function Satisfaction() {
  const [metrics, setMetrics] = useState(defaultMetrics);
  const [title, setTitle] = useState("Müşterilerimiz Ne Düşünüyor");
  const [subtitle, setSubtitle] = useState("Memnuniyet Anketi");
  const [satisfactionRate, setSatisfactionRate] = useState(96);
  const [imageUrl, setImageUrl] = useState("/images/image_home_02_01.png");

  useEffect(() => {
    // Fetch satisfaction metrics
    fetch("/api/satisfaction-metrics")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMetrics(
            data.map((metric: any) => ({
              label: metric.label,
              value: metric.value,
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Failed to fetch satisfaction metrics:", error);
      });

    // Fetch content block for satisfaction section
    fetch("/api/content-blocks?page=home&type=satisfaction")
      .then((res) => res.json())
      .then((blocks) => {
        if (Array.isArray(blocks) && blocks.length > 0) {
          const block = blocks[0];
          if (block.title) setTitle(block.title);
          if (block.subtitle) setSubtitle(block.subtitle);
          if (block.image?.url) setImageUrl(block.image.url);
          if (block.config?.satisfactionRate) {
            setSatisfactionRate(block.config.satisfactionRate);
          }
        }
      })
      .catch((error) => {
        console.error("Failed to fetch satisfaction block:", error);
      });
  }, []);
  return (
    <section className="section-padding bg-cream">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className="relative overflow-hidden">
            <div className="rounded-3xl overflow-hidden w-full relative">
              <Image
                src={imageUrl}
                alt="Mutlu müşteri"
                width={800}
                height={600}
                className="w-full h-auto object-cover rounded-3xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Satisfaction Badge */}
            <div className="absolute bottom-0 right-0 md:-bottom-4 md:-right-4">
              <div
                className="bg-cream p-5 flex items-center gap-4 relative"
                style={{
                  borderRadius: "1.5rem 0 1.5rem 0",
                }}
              >
                <div className="w-12 h-12 rounded-lg bg-[#3D8C40]/10 flex items-center justify-center">
                  <RiCheckLine className="w-6 h-6 text-[#3D8C40]" />
                </div>
                <div>
                  <div
                    className="text-4xl font-bold text-[#3D8C40]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    %{satisfactionRate}
                  </div>
                  <div className="text-sm text-gray-600">Memnuniyet Oranı</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="text-center md:text-left">
            <span className="section-label">{subtitle}</span>
            <h2
              className="text-4xl md:text-5xl text-gray-900 mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title}
            </h2>

            {/* Google Rating */}
            <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
              <div className="w-6 h-6 bg-cream rounded flex items-center justify-center overflow-hidden">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <RiStarLine
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-yellow-400 fill-yellow-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-700 font-medium">4.7</span>
            </div>

            {/* Progress Bars */}
            <div className="space-y-6">
              {metrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{metric.label}</span>
                    <span className="font-semibold text-gray-900">
                      %{metric.value}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="text-sm text-gray-500 mt-6 text-center md:text-left">
              *Müşteri memnuniyet anketi 298 yanıta dayanmaktadır.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
