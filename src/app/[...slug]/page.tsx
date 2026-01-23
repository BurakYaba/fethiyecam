import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockRenderer from "@/components/BlockRenderer";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  generatePageTitle,
  getAbsoluteUrl,
  truncateDescription,
} from "@/lib/seo-utils";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + slug.join("/");

  try {
    const page = await db.page.findFirst({
      where: { path },
    });

    if (!page) {
      return {
        title: generatePageTitle("Sayfa Bulunamadı"),
      };
    }

    const description = page.description
      ? truncateDescription(page.description)
      : `${page.label} - Fethiye Cam Temizleme`;

    return {
      title: generatePageTitle(page.label),
      description,
      openGraph: {
        title: page.label,
        description,
        url: getAbsoluteUrl(path),
        siteName: "Fethiye Cam Temizleme",
        locale: "tr_TR",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: page.label,
        description,
      },
      alternates: {
        canonical: getAbsoluteUrl(path),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: generatePageTitle("Sayfa"),
    };
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const path = "/" + slug.join("/");

  // Check if this is a known static route (should be handled by specific routes)
  const staticRoutes = [
    "/",
    "/blog",
    "/galeri",
    "/hizmetler",
    "/hakkimizda",
    "/sss",
    "/iletisim",
  ];
  if (staticRoutes.includes(path)) {
    notFound();
  }

  // Try to find the page in database
  let page = null;
  try {
    page = await db.page.findFirst({
      where: { path },
    });
  } catch (error) {
    // If database is unavailable, return 404
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Failed to fetch page from database:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }
    notFound();
  }

  if (!page) {
    notFound();
  }

  // Fetch content blocks for this page
  let blocks: any[] = [];
  try {
    blocks = await db.contentBlock.findMany({
      where: {
        page: page.slug,
        visible: true,
      },
      include: {
        image: true,
      },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    // Silently fall back to empty blocks array
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Failed to fetch content blocks:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  }

  // Fetch page hero if exists
  let pageHero = null;
  try {
    pageHero = await db.pageHero.findUnique({
      where: { page: page.slug },
      include: { image: true },
    });
  } catch (error) {
    // Silently continue without page hero
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Failed to fetch page hero:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  }

  return (
    <>
      <Header />
      <main>
        {/* Page Hero Section */}
        {pageHero && (
          <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
            {pageHero.image && (
              <div className="absolute inset-0">
                <Image
                  src={pageHero.image.url}
                  alt={pageHero.title}
                  fill
                  priority
                  quality={90}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            )}
            <div className="container mx-auto px-6 relative z-10 text-center">
              <h1
                className="text-4xl md:text-6xl text-white mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {pageHero.title}
              </h1>
              {pageHero.subtitle && (
                <p className="text-xl md:text-2xl text-white/90 mb-4">
                  {pageHero.subtitle}
                </p>
              )}
              {pageHero.description && (
                <p className="text-lg text-white/80 max-w-3xl mx-auto">
                  {pageHero.description}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Content Blocks */}
        {blocks.length > 0 ? (
          <BlockRenderer blocks={blocks} />
        ) : (
          <section className="section-padding">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Sayfa İçeriği</h2>
              <p className="text-gray-600">
                Bu sayfa için henüz içerik bloğu eklenmemiş. Yönetim panelinden
                içerik ekleyebilirsiniz.
              </p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
