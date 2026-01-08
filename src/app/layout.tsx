import type { Metadata } from "next";
import { Inter, Inter_Tight, Caveat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fethiye Cam Temizleme | Profesyonel Cam Temizlik Hizmetleri",
  description: "Fethiye'de profesyonel cam temizlik hizmetleri. Ev, ofis ve işyeri camlarınız için güvenilir, sigortalı ve garantili temizlik. Ücretsiz teklif alın!",
  keywords: "cam temizleme, fethiye, cam temizlik, pencere temizleme, profesyonel temizlik, cam yıkama",
  icons: {
    icon: "/Fethiye.png",
    shortcut: "/Fethiye.png",
    apple: "/Fethiye.png",
  },
  openGraph: {
    title: "Fethiye Cam Temizleme | Profesyonel Cam Temizlik Hizmetleri",
    description: "Fethiye'de profesyonel cam temizlik hizmetleri. Ücretsiz teklif alın!",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${interTight.variable} ${caveat.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
