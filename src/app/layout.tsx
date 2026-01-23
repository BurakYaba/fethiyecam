import type { Metadata } from "next";
import { Inter, Inter_Tight, Caveat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getLocalBusinessSchema } from "@/lib/structured-data";
import { getAbsoluteUrl } from "@/lib/seo-utils";

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
  description:
    "Fethiye'de profesyonel cam temizlik hizmetleri. Ev, ofis ve işyeri camlarınız için güvenilir, sigortalı ve garantili temizlik. Ücretsiz teklif alın!",
  icons: {
    icon: "/Fethiye.png",
    shortcut: "/Fethiye.png",
    apple: "/Fethiye.png",
  },
  openGraph: {
    title: "Fethiye Cam Temizleme | Profesyonel Cam Temizlik Hizmetleri",
    description:
      "Fethiye'de profesyonel cam temizlik hizmetleri. Ücretsiz teklif alın!",
    url: getAbsoluteUrl("/"),
    siteName: "Fethiye Cam Temizleme",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: getAbsoluteUrl("/og-default.jpg"),
        width: 1200,
        height: 630,
        alt: "Fethiye Cam Temizleme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fethiye Cam Temizleme | Profesyonel Cam Temizlik Hizmetleri",
    description: "Fethiye'de profesyonel cam temizlik hizmetleri.",
    images: [getAbsoluteUrl("/og-default.jpg")],
  },
  alternates: {
    canonical: getAbsoluteUrl("/"),
    languages: {
      "tr-TR": getAbsoluteUrl("/"),
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = await getLocalBusinessSchema();

  return (
    <html lang="tr">
      <body
        className={`${inter.variable} ${interTight.variable} ${caveat.variable} antialiased`}
      >
        {localBusinessSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(localBusinessSchema),
            }}
          />
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
