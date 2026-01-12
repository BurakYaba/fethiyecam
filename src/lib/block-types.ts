// Block type definitions and schemas

export type BlockType =
  | 'hero'
  | 'about'
  | 'features'
  | 'howItWorks'
  | 'services'
  | 'gallery'
  | 'testimonials'
  | 'faq'
  | 'satisfaction'
  | 'cta'
  | 'tips'
  | 'custom'

export interface BlockTypeConfig {
  type: BlockType
  label: string
  description: string
  icon?: string
  defaultConfig?: Record<string, any>
}

export const BLOCK_TYPES: BlockTypeConfig[] = [
  {
    type: 'hero',
    label: 'Hero Section',
    description: 'Full-width hero section with background image and CTA',
    icon: 'RiImageLine',
  },
  {
    type: 'about',
    label: 'About Section',
    description: 'About section with image and content',
    icon: 'RiInformationLine',
  },
  {
    type: 'features',
    label: 'Features',
    description: 'Features grid section',
    icon: 'RiStarLine',
  },
  {
    type: 'howItWorks',
    label: 'How It Works',
    description: 'Process steps section',
    icon: 'RiSettingsLine',
  },
  {
    type: 'services',
    label: 'Services',
    description: 'Services slider (uses existing services)',
    icon: 'RiServiceLine',
  },
  {
    type: 'gallery',
    label: 'Gallery',
    description: 'Gallery preview (uses existing gallery)',
    icon: 'RiImageLine',
  },
  {
    type: 'testimonials',
    label: 'Testimonials',
    description: 'Customer testimonials (uses existing testimonials)',
    icon: 'RiStarLine',
  },
  {
    type: 'faq',
    label: 'FAQ',
    description: 'FAQ section (uses existing FAQs)',
    icon: 'RiQuestionLine',
  },
  {
    type: 'satisfaction',
    label: 'Satisfaction',
    description: 'Satisfaction metrics section',
    icon: 'RiHeartLine',
  },
  {
    type: 'cta',
    label: 'Call to Action',
    description: 'CTA section with image and content',
    icon: 'RiArrowRightLine',
  },
  {
    type: 'tips',
    label: 'Tips',
    description: 'Blog tips section (uses featured blog posts)',
    icon: 'RiArticleLine',
  },
  {
    type: 'custom',
    label: 'Custom Block',
    description: 'Custom HTML/rich text block',
    icon: 'RiCodeLine',
  },
]

export function getBlockType(type: BlockType): BlockTypeConfig | undefined {
  return BLOCK_TYPES.find((bt) => bt.type === type)
}

export function validateBlockConfig(type: BlockType, config: any): boolean {
  // Basic validation - can be extended with Zod schemas
  switch (type) {
    case 'hero':
      return config && typeof config.title === 'string'
    case 'about':
      return config && typeof config.title === 'string'
    case 'features':
      return true // Uses Feature model
    case 'howItWorks':
      return true // Uses HowItWorksStep model
    case 'services':
      return true // Uses Service model
    case 'gallery':
      return true // Uses GalleryAlbum model
    case 'testimonials':
      return true // Uses Testimonial model
    case 'faq':
      return true // Uses FAQ model
    case 'satisfaction':
      return true // Uses SatisfactionMetric model
    case 'cta':
      return config && typeof config.title === 'string'
    case 'tips':
      return true // Uses BlogPost model
    case 'custom':
      return config && typeof config.content === 'string'
    default:
      return false
  }
}
