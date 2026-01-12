import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createOrGetMediaFile(imagePath: string) {
  // Check if media file already exists with this URL
  const existing = await prisma.mediaFile.findFirst({
    where: { url: imagePath },
  })
  
  if (existing) {
    return existing.id
  }
  
  // Create a new media file record for local images
  const mediaFile = await prisma.mediaFile.create({
    data: {
      url: imagePath,
      filename: imagePath.split('/').pop() || 'image.jpg',
      mimeType: imagePath.endsWith('.png') ? 'image/png' : imagePath.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
      size: 0,
      status: 'active',
    },
  })
  
  return mediaFile.id
}

async function main() {
  console.log('Starting content migration...')

  // Create default menu items
  const menuItems = [
    { label: 'Ana Sayfa', href: '/', order: 0 },
    { label: 'Hakkımızda', href: '/hakkimizda', order: 1 },
    { label: 'Hizmetler', href: '/hizmetler', order: 2 },
    { label: 'Blog', href: '/blog', order: 3 },
    { label: 'Galeri', href: '/galeri', order: 4 },
    { label: 'SSS', href: '/sss', order: 5 },
    { label: 'İletişim', href: '/iletisim', order: 6 },
  ]

  for (const item of menuItems) {
    const existing = await prisma.menuItem.findFirst({
      where: { href: item.href },
    })
    
    if (!existing) {
      await prisma.menuItem.create({ data: item })
      console.log(`✓ Created menu item: ${item.label}`)
    } else {
      console.log(`⊘ Menu item already exists: ${item.label}`)
    }
  }

  // Create default site settings
  const settings = [
    { key: 'header.phone', value: '+905301207848', type: 'text', group: 'header' },
    { key: 'header.ctaText', value: 'Teklif Al', type: 'text', group: 'header' },
    { key: 'header.ctaLink', value: '/iletisim', type: 'text', group: 'header' },
    { key: 'footer.companyDescription', value: 'Fethiye Cam Temizleme olarak, evinizi, ofisinizi veya işyerinizi pırıl pırıl camlarla buluşturuyoruz. Hizmetlerimizi yaşam tarzınıza ve beklentilerinize göre şekillendiriyoruz.', type: 'text', group: 'footer' },
    { key: 'footer.address', value: 'Tuzla, İnönü Blv. No:1/1 EA\n48300 Fethiye/Muğla', type: 'text', group: 'footer' },
    { key: 'footer.phone', value: '+905301207848', type: 'text', group: 'footer' },
    { key: 'footer.email', value: 'info@fethiyecam.com', type: 'text', group: 'footer' },
    { key: 'contact.phone', value: '+905301207848', type: 'text', group: 'contact' },
    { key: 'contact.email', value: 'info@fethiyecam.com', type: 'text', group: 'contact' },
    { key: 'contact.address', value: 'Tuzla, İnönü Blv. No:1/1 EA\n48300 Fethiye/Muğla', type: 'text', group: 'contact' },
    { key: 'footer.social.facebook', value: '#', type: 'text', group: 'social' },
    { key: 'footer.social.instagram', value: '#', type: 'text', group: 'social' },
    { key: 'footer.social.twitter', value: '#', type: 'text', group: 'social' },
    { key: 'footer.social.linkedin', value: '#', type: 'text', group: 'social' },
  ]

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    })
  }

  // Create default features
  const features = [
    {
      title: 'Güvenilir Firma',
      description: 'Güvenilirlik üzerine kurulmuş bir şirketiz. Her zaman zamanında gelir ve mekanınıza özenle davranırız.',
      icon: 'RiShieldLine',
      order: 0,
    },
    {
      title: 'Profesyonel Hizmet',
      description: 'Mükemmel performans, sabit fiyatlar, sürpriz yok. Her temizlik titiz, kişiselleştirilmiş ve dostane destekle sunulur.',
      icon: 'RiAwardLine',
      order: 1,
    },
    {
      title: 'Müşteri Memnuniyeti',
      description: 'Açık iletişim, esnek randevu ve memnuniyet garantisi ile her temizlikten sonra mutlu olmanızı sağlıyoruz.',
      icon: 'RiHeartLine',
      order: 2,
    },
  ]

  const featureIds: string[] = []
  for (const feature of features) {
    const existing = await prisma.feature.findFirst({
      where: { title: feature.title },
    })
    
    if (!existing) {
      const created = await prisma.feature.create({ data: feature })
      featureIds.push(created.id)
      console.log(`✓ Created feature: ${feature.title}`)
    } else {
      featureIds.push(existing.id)
      console.log(`⊘ Feature already exists: ${feature.title}`)
    }
  }

  // Create default how it works steps
  const steps = [
    {
      title: 'Randevu Alın',
      description: 'Bizi arayın veya iletişim formundan mesaj bırakın. Size en kısa sürede dönüş yapalım.',
      icon: 'RiCalendarLine',
      order: 0,
    },
    {
      title: 'Paketinizi Seçin',
      description: 'Cam sayısına, metrekareye veya ihtiyaçlarınıza göre özelleştirilmiş paketler sunuyoruz.',
      icon: 'RiClipboardLine',
      order: 1,
    },
    {
      title: 'Biz Temizleriz, Siz Rahatlarsınız',
      description: 'Profesyonel ekibimiz camlarınızı pırıl pırıl yapar, siz sadece keyfini çıkarın.',
      icon: 'RiSparklingFill',
      order: 2,
    },
  ]

  const stepIds: string[] = []
  for (const step of steps) {
    const existing = await prisma.howItWorksStep.findFirst({
      where: { title: step.title },
    })
    
    if (!existing) {
      const created = await prisma.howItWorksStep.create({ data: step })
      stepIds.push(created.id)
      console.log(`✓ Created step: ${step.title}`)
    } else {
      stepIds.push(existing.id)
      console.log(`⊘ Step already exists: ${step.title}`)
    }
  }

  // Create default satisfaction metrics
  const metrics = [
    { label: 'Ekibimizin dakikliği', value: 96, order: 0 },
    { label: 'Temizlik kalitesi', value: 94, order: 1 },
    { label: 'Evinize ve eşyalarınıza saygı', value: 100, order: 2 },
  ]

  const metricIds: string[] = []
  for (const metric of metrics) {
    const existing = await prisma.satisfactionMetric.findFirst({
      where: { label: metric.label },
    })
    
    if (!existing) {
      const created = await prisma.satisfactionMetric.create({ data: metric })
      metricIds.push(created.id)
      console.log(`✓ Created metric: ${metric.label}`)
    } else {
      metricIds.push(existing.id)
      console.log(`⊘ Metric already exists: ${metric.label}`)
    }
  }

  // Create homepage content blocks with original hardcoded content
  console.log('Creating homepage content blocks...')
  
  // 1. Hero Block
  const heroImageId = await createOrGetMediaFile('/images/hero_image_02.jpg')
  const existingHero = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'hero' },
  })
  
  if (!existingHero) {
    await prisma.contentBlock.create({
      data: {
        type: 'hero',
        page: 'home',
        title: 'Biz Temizleyelim,\nSiz Rahatınıza Bakın.',
        order: 0,
        visible: true,
        config: {
          ctaText: 'Ücretsiz Teklif Al',
          ctaLink: '/iletisim',
          overlayOpacity: 0.3,
        },
        imageId: heroImageId,
      },
    })
    console.log('✓ Created Hero block')
  } else {
    await prisma.contentBlock.update({
      where: { id: existingHero.id },
      data: {
        title: 'Biz Temizleyelim,\nSiz Rahatınıza Bakın.',
        config: {
          ctaText: 'Ücretsiz Teklif Al',
          ctaLink: '/iletisim',
          overlayOpacity: 0.3,
        },
        imageId: heroImageId,
      },
    })
    console.log('✓ Updated Hero block')
  }

  // 2. How It Works Block
  const existingHowItWorks = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'howItWorks' },
  })
  
  if (!existingHowItWorks) {
    await prisma.contentBlock.create({
      data: {
        type: 'howItWorks',
        page: 'home',
        title: 'Nasıl Çalışır',
        subtitle: 'Nasıl Çalışıyoruz',
        order: 1,
        visible: true,
        config: {
          title: 'Adım Adım Kullanım Kılavuzu',
          stepIds: stepIds,
        },
      },
    })
    console.log('✓ Created How It Works block')
  }

  // 3. Services Block (no config needed, fetches from Service model)
  const existingServices = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'services' },
  })
  
  if (!existingServices) {
    await prisma.contentBlock.create({
      data: {
        type: 'services',
        page: 'home',
        title: 'Hizmetler',
        order: 2,
        visible: true,
        config: {},
      },
    })
    console.log('✓ Created Services block')
  }

  // 4. About Block
  const aboutImageId = await createOrGetMediaFile('/images/image_home_02_02.png')
  const existingAbout = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'about' },
  })
  
  if (!existingAbout) {
    await prisma.contentBlock.create({
      data: {
        type: 'about',
        page: 'home',
        title: 'Güvenebileceğiniz Profesyonel Cam Temizlik Hizmetleri',
        subtitle: 'Hakkımızda',
        order: 3,
        visible: true,
        content: 'Ekibimiz, her temizlikten sonra memnuniyetinizi sağlamak için özverili çalışır. Açık iletişim, esnek randevu ve memnuniyet garantisi ile huzurunuzu ön planda tutuyoruz.',
        imageId: aboutImageId,
        config: {
          stats: [{ label: 'Deneyimli Temizlikçi', value: '10+' }],
          awardTitle: 'Ödüllü Hizmet Kalitesi',
          awardDescription: 'İhtiyaçlarınıza, tercihlerinize ve programınıza göre özelleştirilmiş temizlik hizmetleri sunuyoruz.',
        },
      },
    })
    console.log('✓ Created About block')
  } else {
    await prisma.contentBlock.update({
      where: { id: existingAbout.id },
      data: {
        title: 'Güvenebileceğiniz Profesyonel Cam Temizlik Hizmetleri',
        subtitle: 'Hakkımızda',
        content: 'Ekibimiz, her temizlikten sonra memnuniyetinizi sağlamak için özverili çalışır. Açık iletişim, esnek randevu ve memnuniyet garantisi ile huzurunuzu ön planda tutuyoruz.',
        imageId: aboutImageId,
        config: {
          stats: [{ label: 'Deneyimli Temizlikçi', value: '10+' }],
          awardTitle: 'Ödüllü Hizmet Kalitesi',
          awardDescription: 'İhtiyaçlarınıza, tercihlerinize ve programınıza göre özelleştirilmiş temizlik hizmetleri sunuyoruz.',
        },
      },
    })
    console.log('✓ Updated About block')
  }

  // 5. Features Block
  const featuresImageId = await createOrGetMediaFile('/images/green_glove_02.png')
  const existingFeatures = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'features' },
  })
  
  if (!existingFeatures) {
    await prisma.contentBlock.create({
      data: {
        type: 'features',
        page: 'home',
        title: 'Özellikler',
        order: 4,
        visible: true,
        imageId: featuresImageId,
        config: {
          featureIds: featureIds,
          statValue: '1000+',
          statLabel: 'Temizlik Yapıldı',
          statImageId: featuresImageId,
        },
      },
    })
    console.log('✓ Created Features block')
  }

  // 6. Satisfaction Block
  const satisfactionImageId = await createOrGetMediaFile('/images/image_home_02_01.png')
  const existingSatisfaction = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'satisfaction' },
  })
  
  if (!existingSatisfaction) {
    await prisma.contentBlock.create({
      data: {
        type: 'satisfaction',
        page: 'home',
        title: 'Müşterilerimiz Ne Düşünüyor',
        subtitle: 'Memnuniyet Anketi',
        order: 5,
        visible: true,
        imageId: satisfactionImageId,
        config: {
          googleRating: 4.7,
          googleReviewCount: 298,
          metricsIds: metricIds,
          note: '*Müşteri memnuniyet anketi 298 yanıta dayanmaktadır.',
        },
      },
    })
    console.log('✓ Created Satisfaction block')
  }

  // 7. Gallery Block (no config needed, fetches from GalleryAlbum model)
  const existingGallery = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'gallery' },
  })
  
  if (!existingGallery) {
    await prisma.contentBlock.create({
      data: {
        type: 'gallery',
        page: 'home',
        title: 'Galeri',
        order: 6,
        visible: true,
        config: {},
      },
    })
    console.log('✓ Created Gallery block')
  }

  // 8. Testimonials Block (no config needed, fetches from Testimonial model)
  const existingTestimonials = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'testimonials' },
  })
  
  if (!existingTestimonials) {
    await prisma.contentBlock.create({
      data: {
        type: 'testimonials',
        page: 'home',
        title: 'Referanslar',
        order: 7,
        visible: true,
        config: {},
      },
    })
    console.log('✓ Created Testimonials block')
  }

  // 9. FAQ Block (no config needed, fetches from FAQ model)
  const existingFAQ = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'faq' },
  })
  
  if (!existingFAQ) {
    await prisma.contentBlock.create({
      data: {
        type: 'faq',
        page: 'home',
        title: 'Sıkça Sorulan Sorular',
        order: 8,
        visible: true,
        config: {},
      },
    })
    console.log('✓ Created FAQ block')
  }

  // 10. Tips Block
  const existingTips = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'tips' },
  })
  
  if (!existingTips) {
    await prisma.contentBlock.create({
      data: {
        type: 'tips',
        page: 'home',
        title: 'Cam Temizlik İpuçları',
        subtitle: 'Bilmeniz Gereken Herşey',
        order: 9,
        visible: true,
        config: {
          postCount: 3,
          featuredOnly: false,
        },
      },
    })
    console.log('✓ Created Tips block')
  }

  // 11. CTA Block
  const ctaBackgroundImageId = await createOrGetMediaFile('/images/home_02_image_01.jpg')
  const ctaTeamImageId = await createOrGetMediaFile('/images/team_02.png')
  const existingCTA = await prisma.contentBlock.findFirst({
    where: { page: 'home', type: 'cta' },
  })
  
  if (!existingCTA) {
    await prisma.contentBlock.create({
      data: {
        type: 'cta',
        page: 'home',
        title: 'Pırıl Pırıl Camlar\nİçin Bize Ulaşın',
        subtitle: 'Hemen teklif alın',
        order: 10,
        visible: true,
        imageId: ctaBackgroundImageId,
        config: {
          email: 'info@fethiyecam.com',
          teamImageId: ctaTeamImageId,
          awardText: 'Süper Hizmet Ödülü',
        },
      },
    })
    console.log('✓ Created CTA block')
  }

  console.log('Content migration completed!')
  console.log('All homepage content blocks have been created with original content.')
}

main()
  .catch((e) => {
    console.error('Migration error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
