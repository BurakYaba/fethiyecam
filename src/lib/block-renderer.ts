// Block rendering utilities

import { BlockType } from './block-types'

export interface ContentBlock {
  id: string
  type: BlockType
  page: string | null
  title: string | null
  subtitle: string | null
  content: string | null
  imageId: string | null
  image: {
    url: string
  } | null
  order: number
  visible: boolean
  config: Record<string, any> | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Get the component name for a block type
 */
export function getBlockComponentName(type: BlockType): string {
  const componentMap: Record<BlockType, string> = {
    hero: 'Hero',
    about: 'About',
    features: 'Features',
    howItWorks: 'HowItWorks',
    services: 'Services',
    gallery: 'Gallery',
    testimonials: 'Testimonials',
    faq: 'FAQ',
    satisfaction: 'Satisfaction',
    cta: 'CTA',
    tips: 'Tips',
    custom: 'CustomBlock',
  }

  return componentMap[type] || 'CustomBlock'
}

/**
 * Check if a block should be rendered
 */
export function shouldRenderBlock(block: ContentBlock): boolean {
  return block.visible === true
}

/**
 * Sort blocks by order
 */
export function sortBlocksByOrder(blocks: ContentBlock[]): ContentBlock[] {
  return [...blocks].sort((a, b) => a.order - b.order)
}

/**
 * Filter blocks by page
 */
export function filterBlocksByPage(
  blocks: ContentBlock[],
  page: string | null
): ContentBlock[] {
  return blocks.filter((block) => block.page === page)
}

/**
 * Get blocks for a specific page, sorted and filtered
 */
export function getPageBlocks(
  blocks: ContentBlock[],
  page: string | null
): ContentBlock[] {
  return sortBlocksByOrder(
    filterBlocksByPage(blocks, page).filter(shouldRenderBlock)
  )
}
