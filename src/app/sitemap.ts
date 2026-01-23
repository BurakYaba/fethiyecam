import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { getAbsoluteUrl } from "@/lib/seo-utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/hizmetler", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/hakkimizda", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/galeri", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/blog", priority: 0.8, changeFrequency: "daily" as const },
    { url: "/sss", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/iletisim", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  staticPages.forEach((page) => {
    sitemap.push({
      url: getAbsoluteUrl(page.url),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  });

  try {
    // Blog posts
    const blogPosts = await db.blogPost.findMany({
      where: {
        publishedAt: {
          lte: new Date(),
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    blogPosts.forEach((post) => {
      sitemap.push({
        url: getAbsoluteUrl(`/blog/${post.slug}`),
        lastModified: post.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });

    // Dynamic pages
    const pages = await db.page.findMany({
      select: {
        path: true,
        updatedAt: true,
      },
    });

    pages.forEach((page) => {
      sitemap.push({
        url: getAbsoluteUrl(page.path),
        lastModified: page.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    // Services (if they have individual pages, otherwise skip)
    // Gallery albums (if they have individual pages, otherwise skip)
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return sitemap;
}
