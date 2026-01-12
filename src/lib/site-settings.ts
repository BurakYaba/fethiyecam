// Site settings helper functions

import { db } from './db'

export interface SiteSettingsMap {
  [key: string]: string
}

/**
 * Fetch all site settings and return as a key-value map
 */
export async function getSiteSettings(): Promise<SiteSettingsMap> {
  try {
    const settings = await db.siteSettings.findMany()
    return settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as SiteSettingsMap)
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    return {}
  }
}

/**
 * Get a single setting value by key
 */
export async function getSetting(key: string): Promise<string | null> {
  try {
    const setting = await db.siteSettings.findUnique({
      where: { key },
    })
    return setting?.value || null
  } catch (error) {
    console.error(`Failed to fetch setting ${key}:`, error)
    return null
  }
}

/**
 * Get settings grouped by group name
 */
export async function getSettingsByGroup(): Promise<Record<string, SiteSettingsMap>> {
  try {
    const settings = await db.siteSettings.findMany({
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    })

    return settings.reduce((acc, setting) => {
      const group = setting.group || 'general'
      if (!acc[group]) {
        acc[group] = {}
      }
      acc[group][setting.key] = setting.value
      return acc
    }, {} as Record<string, SiteSettingsMap>)
  } catch (error) {
    console.error('Failed to fetch settings by group:', error)
    return {}
  }
}

/**
 * Common setting keys
 */
export const SETTING_KEYS = {
  // Header
  HEADER_LOGO: 'header.logo',
  HEADER_PHONE: 'header.phone',
  HEADER_CTA_TEXT: 'header.ctaText',
  HEADER_CTA_LINK: 'header.ctaLink',

  // Footer
  FOOTER_COMPANY_DESCRIPTION: 'footer.companyDescription',
  FOOTER_ADDRESS: 'footer.address',
  FOOTER_PHONE: 'footer.phone',
  FOOTER_EMAIL: 'footer.email',
  FOOTER_SOCIAL_FACEBOOK: 'footer.social.facebook',
  FOOTER_SOCIAL_INSTAGRAM: 'footer.social.instagram',
  FOOTER_SOCIAL_TWITTER: 'footer.social.twitter',
  FOOTER_SOCIAL_LINKEDIN: 'footer.social.linkedin',

  // Contact
  CONTACT_PHONE: 'contact.phone',
  CONTACT_EMAIL: 'contact.email',
  CONTACT_ADDRESS: 'contact.address',
} as const
