'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { BlockType } from '@/lib/block-types'

interface ContentBlock {
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
}

interface BlockRendererProps {
  blocks: ContentBlock[]
}

// Dynamically import components for better code splitting
const Hero = dynamic(() => import('@/components/Hero'), { ssr: true })
const About = dynamic(() => import('@/components/About'), { ssr: true })
const Features = dynamic(() => import('@/components/Features'), { ssr: true })
const HowItWorks = dynamic(() => import('@/components/HowItWorks'), { ssr: true })
const Services = dynamic(() => import('@/components/Services'), { ssr: true })
const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: true })
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: true })
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true })
const Satisfaction = dynamic(() => import('@/components/Satisfaction'), { ssr: true })
const CTA = dynamic(() => import('@/components/CTA'), { ssr: true })
const Tips = dynamic(() => import('@/components/Tips'), { ssr: true })

// Helper function to get icon component dynamically
function getIconComponent(iconName: string) {
  if (!iconName) return null
  try {
    // Dynamically import remixicon/react and get the icon
    const remixIcons = require('@remixicon/react')
    const IconComponent = remixIcons[iconName]
    return IconComponent || null
  } catch {
    return null
  }
}

// Helper function to extract video ID from URL
function getVideoEmbedUrl(url: string): string | null {
  if (!url) return null
  
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }
  
  // Vimeo
  const vimeoRegex = /vimeo\.com\/(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }
  
  return null
}

// Custom Block Renderer Component
function CustomBlockRenderer({ block }: { block: ContentBlock }) {
  const config = block.config || {}
  
  // Extract all config values
  const backgroundColor = config.backgroundColor || 'white'
  const textAlign = config.textAlign || 'left'
  const width = config.width || 'container'
  const padding = config.padding || 'normal'
  const margin = config.margin || 'normal'
  const imagePosition = config.imagePosition || 'none'
  const contentMaxWidth = config.contentMaxWidth || 'full'
  const borderRadius = config.borderRadius || 'medium'
  const shadow = config.shadow || 'none'
  const overlayOpacity = config.overlayOpacity ?? 40
  const columns = config.columns || 'single'
  const customClasses = config.customClasses || ''
  const videoUrl = config.videoUrl || ''
  const titleIcon = config.titleIcon || ''
  const animation = config.animation || 'none'
  const button1Text = config.button1Text || ''
  const button1Link = config.button1Link || ''
  const button1Style = config.button1Style || 'primary'
  const button2Text = config.button2Text || ''
  const button2Link = config.button2Link || ''
  const button2Style = config.button2Style || 'secondary'
  
  // Background color classes
  const bgClasses: Record<string, string> = {
    white: 'bg-white',
    cream: 'bg-cream',
    gray: 'bg-gray-50',
    green: 'bg-[#3D8C40]',
    transparent: 'bg-transparent',
  }
  
  // Padding classes
  const paddingClasses: Record<string, string> = {
    none: '',
    small: 'py-8',
    normal: 'section-padding',
    large: 'py-20 md:py-32',
  }
  
  // Margin classes
  const marginClasses: Record<string, string> = {
    none: '',
    small: 'my-4',
    normal: 'my-8',
    large: 'my-16',
  }
  
  // Text alignment classes
  const textAlignClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
  
  // Content max width classes
  const contentMaxWidthClasses: Record<string, string> = {
    full: 'max-w-full',
    wide: 'max-w-7xl',
    medium: 'max-w-4xl',
    narrow: 'max-w-2xl',
  }
  
  // Border radius classes
  const borderRadiusClasses: Record<string, string> = {
    none: 'rounded-none',
    small: 'rounded-lg',
    medium: 'rounded-2xl',
    large: 'rounded-3xl',
    full: 'rounded-full',
  }
  
  // Shadow classes
  const shadowClasses: Record<string, string> = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-2xl',
  }
  
  // Animation classes
  const animationClasses: Record<string, string> = {
    none: '',
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideDown: 'animate-slide-down',
  }
  
  // Container classes
  const containerClass = width === 'full' ? 'w-full' : 'container mx-auto px-6'
  
  // Image position logic
  const hasImage = block.image?.url && imagePosition !== 'none'
  const isBackgroundImage = imagePosition === 'background'
  const isSideImage = imagePosition === 'left' || imagePosition === 'right'
  
  // Video embed URL
  const videoEmbedUrl = videoUrl ? getVideoEmbedUrl(videoUrl) : null
  
  // Icon component
  const IconComponent = titleIcon ? getIconComponent(titleIcon) : null
  
  // Determine text color based on background
  const isDarkBackground = backgroundColor === 'green' || isBackgroundImage
  const titleColor = isDarkBackground ? 'text-white' : 'text-gray-900'
  const subtitleColor = isDarkBackground ? 'text-white/90' : 'text-gray-600'
  
  // Render title with optional icon
  const renderTitle = () => {
    if (!block.title) return null
    
    return (
      <h2
        className={`text-4xl md:text-5xl mb-4 ${titleColor} ${animationClasses[animation]}`}
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {IconComponent && (
          <IconComponent className="inline-block w-8 h-8 mr-3 align-middle" />
        )}
        {block.title}
      </h2>
    )
  }
  
  // Render buttons
  const renderButtons = () => {
    if (!button1Text && !button2Text) return null
    
    return (
      <div className={`flex flex-wrap gap-4 mt-6 ${textAlignClasses[textAlign] === 'text-center' ? 'justify-center' : textAlignClasses[textAlign] === 'text-right' ? 'justify-end' : 'justify-start'}`}>
        {button1Text && button1Link && (
          <Link
            href={button1Link}
            className={button1Style === 'primary' ? 'btn-primary' : 'btn-secondary'}
          >
            {button1Text}
          </Link>
        )}
        {button2Text && button2Link && (
          <Link
            href={button2Link}
            className={button2Style === 'primary' ? 'btn-primary' : 'btn-secondary'}
          >
            {button2Text}
          </Link>
        )}
      </div>
    )
  }
  
  // Render content based on column layout
  const renderContent = () => {
    if (videoEmbedUrl) {
      return (
        <div className={`relative ${contentMaxWidthClasses[contentMaxWidth]} mx-auto ${borderRadiusClasses[borderRadius]} overflow-hidden ${shadowClasses[shadow]}`}>
          <div className="aspect-video">
            <iframe
              src={videoEmbedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )
    }
    
    if (!block.content) return null
    
    // Column layout using CSS columns
    const columnClass = columns === 'two' ? 'md:columns-2' : columns === 'three' ? 'md:columns-3' : ''
    const columnGap = columns !== 'single' ? 'gap-8' : ''
    
    return (
      <div
        className={`prose prose-lg max-w-none ${contentMaxWidthClasses[contentMaxWidth]} mx-auto ${columnClass} ${columnGap} ${isDarkBackground ? 'prose-invert' : ''}`}
        style={columns !== 'single' ? { columnGap: '2rem' } : undefined}
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    )
  }
  
  return (
    <section 
      className={`relative ${bgClasses[backgroundColor]} ${paddingClasses[padding]} ${marginClasses[margin]} ${isBackgroundImage ? 'overflow-hidden' : ''} ${customClasses} ${shadowClasses[shadow]}`}
    >
      {/* Background Image */}
      {isBackgroundImage && hasImage && block.image && (
        <>
          <div className="absolute inset-0">
            <Image
              src={block.image.url}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
          />
        </>
      )}
      
      <div className={`${containerClass} relative z-10`}>
        {isSideImage && hasImage && block.image ? (
          <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${imagePosition === 'right' ? 'lg:grid-flow-dense' : ''}`}>
            {imagePosition === 'left' && (
              <div className={`relative aspect-video ${borderRadiusClasses[borderRadius]} overflow-hidden ${shadowClasses[shadow]}`}>
                <Image
                  src={block.image.url}
                  alt={block.title || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            
            <div className={textAlignClasses[textAlign]}>
              {renderTitle()}
              {block.subtitle && (
                <p className={`text-xl md:text-2xl mb-6 ${subtitleColor} ${animationClasses[animation]}`}>
                  {block.subtitle}
                </p>
              )}
              {renderContent()}
              {renderButtons()}
            </div>
            
            {imagePosition === 'right' && (
              <div className={`relative aspect-video ${borderRadiusClasses[borderRadius]} overflow-hidden lg:col-start-2 ${shadowClasses[shadow]}`}>
                <Image
                  src={block.image.url}
                  alt={block.title || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        ) : (
          <div className={textAlignClasses[textAlign]}>
            {(imagePosition === 'top' && hasImage && block.image) && (
              <div className={`relative aspect-video mb-8 ${borderRadiusClasses[borderRadius]} overflow-hidden ${shadowClasses[shadow]}`}>
                <Image
                  src={block.image.url}
                  alt={block.title || ''}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            )}
            
            {renderTitle()}
            {block.subtitle && (
              <p className={`text-xl md:text-2xl mb-6 ${subtitleColor} ${animationClasses[animation]}`}>
                {block.subtitle}
              </p>
            )}
            {renderContent()}
            {renderButtons()}
            
            {(imagePosition === 'bottom' && hasImage && block.image) && (
              <div className={`relative aspect-video mt-8 ${borderRadiusClasses[borderRadius]} overflow-hidden ${shadowClasses[shadow]}`}>
                <Image
                  src={block.image.url}
                  alt={block.title || ''}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  const sortedBlocks = [...blocks]
    .filter((block) => block.visible)
    .sort((a, b) => a.order - b.order)

  return (
    <>
      {sortedBlocks.map((block) => {
        switch (block.type) {
          case 'hero':
            return <Hero key={block.id} />
          case 'about':
            return <About key={block.id} />
          case 'features':
            return <Features key={block.id} />
          case 'howItWorks':
            return <HowItWorks key={block.id} />
          case 'services':
            return <Services key={block.id} />
          case 'gallery':
            return <Gallery key={block.id} />
          case 'testimonials':
            return <Testimonials key={block.id} />
          case 'faq':
            return <FAQ key={block.id} />
          case 'satisfaction':
            return <Satisfaction key={block.id} />
          case 'cta':
            return <CTA key={block.id} />
          case 'tips':
            return <Tips key={block.id} />
          case 'custom':
            return <CustomBlockRenderer key={block.id} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
