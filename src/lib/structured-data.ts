import { db } from "./db";
import { getAbsoluteUrl } from "./seo-utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  image?: {
    url: string;
  } | null;
}

interface Service {
  id: string;
  title: string;
  description: string;
  number: string;
  image?: {
    url: string;
  } | null;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface GalleryAlbum {
  id: string;
  title: string;
  coverImage?: {
    url: string;
  } | null;
  images: Array<{
    image: {
      url: string;
    };
  }>;
}

/**
 * Generate LocalBusiness schema for the root layout
 */
export async function getLocalBusinessSchema() {
  try {
    const settings = await db.siteSettings.findMany({
      where: {
        key: {
          in: [
            "footer.phone",
            "footer.email",
            "footer.address",
            "seo.businessHours",
            "seo.foundingDate",
            "seo.priceRange",
          ],
        },
      },
    });

    const settingsMap = settings.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      },
      {} as Record<string, string>,
    );

    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": getAbsoluteUrl("/#business"),
      name: "Fethiye Cam Temizleme",
      image: getAbsoluteUrl("/Fethiye.png"),
      description:
        "Fethiye'de profesyonel cam temizlik hizmetleri. Ev, ofis ve işyeri camlarınız için güvenilir, sigortalı ve garantili temizlik.",
      url: getAbsoluteUrl("/"),
      telephone: settingsMap["footer.phone"] || "+905301207848",
      email: settingsMap["footer.email"] || "info@fethiyecam.com",
      priceRange: settingsMap["seo.priceRange"] || "₺₺",
      foundingDate: settingsMap["seo.foundingDate"] || "2020-01-01",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tuzla, İnönü Blv. No:1/1 EA",
        addressLocality: "Fethiye",
        addressRegion: "Muğla",
        postalCode: "48300",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 37.6188,
        longitude: 29.1156,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/fethiyecam",
        "https://www.instagram.com/fethiyecam",
      ],
    };

    return schema;
  } catch (error) {
    console.error("Failed to generate LocalBusiness schema:", error);
    return null;
  }
}

/**
 * Generate Article schema for blog posts
 */
export function getArticleSchema(post: BlogPost) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": getAbsoluteUrl(`/blog/${post.slug}#article`),
    headline: post.title,
    description: post.excerpt,
    image: post.image?.url
      ? getAbsoluteUrl(post.image.url)
      : getAbsoluteUrl("/og-default.jpg"),
    datePublished:
      post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "Fethiye Cam Temizleme",
      url: getAbsoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: "Fethiye Cam Temizleme",
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteUrl("/Fethiye.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getAbsoluteUrl(`/blog/${post.slug}`),
    },
  };

  return schema;
}

/**
 * Generate Service schema
 */
export function getServiceSchema(services: Service[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": getAbsoluteUrl(`/hizmetler#service-${service.id}`),
        name: service.title,
        description: service.description,
        provider: {
          "@type": "LocalBusiness",
          name: "Fethiye Cam Temizleme",
          url: getAbsoluteUrl("/"),
        },
        ...(service.image?.url && {
          image: getAbsoluteUrl(service.image.url),
        }),
      },
    })),
  };

  return schema;
}

/**
 * Generate FAQPage schema
 */
export function getFAQSchema(faqs: FAQ[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return schema;
}

/**
 * Generate BreadcrumbList schema
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  };

  return schema;
}

/**
 * Generate ImageGallery schema
 */
export function getImageGallerySchema(albums: GalleryAlbum[]) {
  const allImages = albums.flatMap((album) =>
    album.images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: getAbsoluteUrl(img.image.url),
      name: album.title,
    })),
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Fethiye Cam Temizleme Galeri",
    description: "Tamamlanmış cam temizleme projelerimizden fotoğraflar",
    image: allImages,
  };

  return schema;
}
