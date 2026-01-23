import { db } from "./db";

/**
 * Get absolute URL for a given path
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://fethiyecamtemizleme.com";
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Generate page title with site name suffix
 */
export function generatePageTitle(title: string): string {
  return `${title} | Fethiye Cam Temizleme`;
}

/**
 * Truncate description to specified length
 */
export function truncateDescription(
  text: string,
  maxLength: number = 160,
): string {
  if (!text) return "";

  // Remove HTML tags
  const plainText = text.replace(/<[^>]*>/g, "");

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Truncate and add ellipsis
  return plainText.substring(0, maxLength - 3).trim() + "...";
}

/**
 * Get default OG image from SiteSettings
 */
export async function getDefaultOgImage(): Promise<string> {
  try {
    const setting = await db.siteSettings.findUnique({
      where: { key: "seo.defaultOgImage" },
    });

    if (setting?.value) {
      return getAbsoluteUrl(setting.value);
    }
  } catch (error) {
    console.error("Failed to fetch default OG image:", error);
  }

  // Fallback to default image
  return getAbsoluteUrl("/og-default.jpg");
}
