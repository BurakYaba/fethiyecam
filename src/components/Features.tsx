import { ShieldCheck, Award, Heart } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: ShieldCheck,
    title: "Güvenilir Firma",
    description:
      "Güvenilirlik üzerine kurulmuş bir şirketiz. Her zaman zamanında gelir ve mekanınıza özenle davranırız.",
  },
  {
    icon: Award,
    title: "Profesyonel Hizmet",
    description:
      "Mükemmel performans, sabit fiyatlar, sürpriz yok. Her temizlik titiz, kişiselleştirilmiş ve dostane destekle sunulur.",
  },
  {
    icon: Heart,
    title: "Müşteri Memnuniyeti",
    description:
      "Açık iletişim, esnek randevu ve memnuniyet garantisi ile her temizlikten sonra mutlu olmanızı sağlıyoruz.",
  },
];

export default function Features() {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature Cards */}
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="w-12 h-12 rounded-xl bg-[#3D8C40]/10 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-[#3D8C40]" />
              </div>
              <h3
                className="text-xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}

          {/* Stat Card */}
          <div className="stat-card-green relative overflow-hidden">
            <div className="relative z-10">
              <div
                className="text-5xl md:text-6xl font-bold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                1000+
              </div>
              <p className="text-white/90 text-lg">Temizlik Yapıldı</p>
            </div>

            {/* Decorative Image */}
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-90 relative">
              <Image
                src="/images/green_glove_02.png"
                alt="Temizlik"
                fill
                className="object-cover rounded-tl-3xl"
                sizes="128px"
                loading="lazy"
              />
            </div>

            {/* Sparkle decorations */}
            <div className="absolute top-1/2 right-1/3 text-white/30">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 5 L20 35 M5 20 L35 20 M10 10 L30 30 M30 10 L10 30" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Timeline Bar */}
      <div className="mt-16 overflow-hidden">
        <div className="h-2 bg-[#3D8C40] flex">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-[#2d6930] last:border-r-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
