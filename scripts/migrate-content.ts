import { PrismaClient } from '@prisma/client'
import { put } from '@vercel/blob'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function uploadImageToBlob(localPath: string, filename: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), 'public', localPath)
    if (!fs.existsSync(fullPath)) {
      console.warn(`Image not found: ${fullPath}`)
      return null
    }

    const buffer = fs.readFileSync(fullPath)
    
    // Determine content type from file extension
    const ext = path.extname(localPath).toLowerCase()
    let contentType = 'image/png'
    if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg'
    } else if (ext === '.webp') {
      contentType = 'image/webp'
    } else if (ext === '.png') {
      contentType = 'image/png'
    }
    
    // Upload to Vercel Blob (using type assertion for migration script)
    const blob = await put(`migration/${filename}`, buffer as any, {
      access: 'public',
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return blob.url
  } catch (error) {
    console.error(`Failed to upload ${localPath}:`, error)
    return null
  }
}

async function createMediaFile(url: string, filename: string, blobId?: string) {
  // Determine mime type from file extension
  const ext = path.extname(filename).toLowerCase()
  let mimeType = 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') {
    mimeType = 'image/jpeg'
  } else if (ext === '.webp') {
    mimeType = 'image/webp'
  } else if (ext === '.png') {
    mimeType = 'image/png'
  }
  
  return prisma.mediaFile.create({
    data: {
      url,
      blobId: blobId || null,
      filename,
      mimeType,
      size: 0, // Will be updated if needed
      status: 'active',
    },
  })
}

async function main() {
  console.log('Starting content migration...')

  // Migrate Blog Posts
  console.log('Migrating blog posts...')
  const blogPosts = [
    {
      title: 'Cam Temizliğinde En Sık Yapılan 5 Hata',
      slug: 'cam-temizliginde-en-sik-yapilan-5-hata',
      excerpt: 'Cam temizliği yaparken dikkat edilmesi gereken önemli noktalar ve yaygın hatalar hakkında bilgiler.',
      image: '/images/moving_cards_image_01.png',
      featured: false,
      publishedAt: new Date('2025-12-20'),
      content: `<h2>Cam Temizliğinde En Sık Yapılan 5 Hata</h2>
        <p>Cam temizliği göründüğü kadar basit değildir. Birçok kişi yanlış yöntemler kullanarak camlarını temizlemeye çalışır ve sonuç olarak lekeler, çizikler veya bulanık camlarla karşılaşır. İşte cam temizliğinde en sık yapılan hatalar:</p>
        
        <h3>1. Yanlış Temizlik Malzemesi Kullanımı</h3>
        <p>Cam temizliği için özel olarak üretilmiş temizlik malzemeleri kullanmak çok önemlidir. Evde bulunan deterjanlar veya sabunlar cam yüzeyinde kalıntı bırakabilir ve camın görünümünü bozabilir.</p>
        
        <h3>2. Güneş Altında Temizlik Yapmak</h3>
        <p>Camları güneş altında temizlemek, temizlik sıvısının çok hızlı kurumasına neden olur. Bu da lekelerin ve izlerin kalmasına yol açar. En iyi zaman sabah erken saatler veya akşamüstü saatleridir.</p>
        
        <h3>3. Kuru Bez Kullanmak</h3>
        <p>Kuru bez kullanmak cam yüzeyinde çiziklere neden olabilir. Her zaman nemli bir bez veya özel cam temizlik bezleri kullanılmalıdır.</p>
        
        <h3>4. Düzensiz Temizlik</h3>
        <p>Camları düzenli olarak temizlememek, kir ve toz birikimine neden olur. Bu da temizliği zorlaştırır ve daha fazla zaman alır.</p>
        
        <h3>5. Profesyonel Yardım Almamak</h3>
        <p>Yüksek binalar veya zor erişilebilir camlar için profesyonel yardım almak hem güvenlik hem de kalite açısından çok önemlidir.</p>
        
        <p>Bu hatalardan kaçınarak camlarınızı daha etkili bir şekilde temizleyebilirsiniz. Ancak en iyi sonuç için profesyonel cam temizlik hizmeti almanızı öneririz.</p>`,
    },
    {
      title: 'Kış Aylarında Cam Bakımı Nasıl Yapılır?',
      slug: 'kis-aylarinda-cam-bakimi-nasil-yapilir',
      excerpt: 'Kış mevsiminde camlarınızın bakımı için önemli ipuçları ve profesyonel öneriler.',
      image: '/images/moving_cards_image_02.png',
      featured: true,
      publishedAt: new Date('2025-12-15'),
      content: `<h2>Kış Aylarında Cam Bakımı Nasıl Yapılır?</h2>
        <p>Kış ayları camlar için zorlu bir dönemdir. Soğuk hava, yağmur, kar ve don gibi faktörler camların bakımını zorlaştırır. İşte kış aylarında cam bakımı için önemli ipuçları:</p>
        
        <h3>1. Düzenli Temizlik</h3>
        <p>Kış aylarında camlar daha sık kirlenir. Yağmur ve kar cam yüzeyinde izler bırakabilir. Bu nedenle düzenli temizlik yapmak çok önemlidir.</p>
        
        <h3>2. Don Önleme</h3>
        <p>Camların donmasını önlemek için pencere kenarlarını düzenli olarak kontrol edin ve gerekirse yalıtım yapın. Donmuş camları sıcak su ile temizlemeye çalışmayın, bu camın çatlamasına neden olabilir.</p>
        
        <h3>3. Uygun Temizlik Malzemeleri</h3>
        <p>Kış aylarında donmayı önleyen özel cam temizlik malzemeleri kullanın. Bu malzemeler cam yüzeyinde koruyucu bir tabaka oluşturur.</p>
        
        <h3>4. İç ve Dış Temizlik</h3>
        <p>Hem iç hem de dış camları temiz tutmak önemlidir. İç camlardaki buğu ve nem birikimi camın görünümünü bozabilir.</p>
        
        <h3>5. Profesyonel Bakım</h3>
        <p>Kış aylarında özellikle yüksek binalar için profesyonel cam temizlik hizmeti almak hem güvenlik hem de kalite açısından önemlidir.</p>
        
        <p>Bu ipuçlarını takip ederek kış aylarında da camlarınızı temiz ve bakımlı tutabilirsiniz.</p>`,
    },
    {
      title: 'Profesyonel Cam Temizliği vs. Evde Yapılan',
      slug: 'profesyonel-cam-temizligi-vs-evde-yapilan',
      excerpt: 'Profesyonel cam temizliği hizmeti ile evde yapılan temizlik arasındaki farklar ve avantajlar.',
      image: '/images/moving_cards_image_03.png',
      featured: false,
      publishedAt: new Date('2025-12-10'),
      content: `<h2>Profesyonel Cam Temizliği vs. Evde Yapılan</h2>
        <p>Cam temizliği yaparken birçok kişi evde kendi başına temizlik yapmayı tercih eder. Ancak profesyonel cam temizlik hizmeti ile evde yapılan temizlik arasında önemli farklar vardır:</p>
        
        <h3>Profesyonel Cam Temizliğinin Avantajları</h3>
        <ul>
          <li><strong>Özel Ekipman:</strong> Profesyonel ekipler özel temizlik ekipmanları ve malzemeleri kullanır.</li>
          <li><strong>Güvenlik:</strong> Yüksek binalar için güvenlik ekipmanları ve sertifikalı ekipler kullanılır.</li>
          <li><strong>Kalite:</strong> Profesyonel temizlik sonuçları daha kalıcı ve etkilidir.</li>
          <li><strong>Zaman Tasarrufu:</strong> Profesyonel ekipler işi çok daha hızlı tamamlar.</li>
          <li><strong>Garanti:</strong> Profesyonel hizmetler genellikle garanti ile birlikte gelir.</li>
        </ul>
        
        <h3>Evde Yapılan Temizliğin Dezavantajları</h3>
        <ul>
          <li><strong>Sınırlı Erişim:</strong> Yüksek camlara erişim zor veya imkansızdır.</li>
          <li><strong>Güvenlik Riski:</strong> Yüksek yerlerde temizlik yapmak tehlikelidir.</li>
          <li><strong>Kalite:</strong> Evde yapılan temizlik genellikle profesyonel sonuçlar vermez.</li>
          <li><strong>Zaman:</strong> Evde yapılan temizlik çok daha uzun sürer.</li>
          <li><strong>Maliyet:</strong> Yanlış malzeme kullanımı uzun vadede daha pahalıya mal olabilir.</li>
        </ul>
        
        <h3>Ne Zaman Profesyonel Yardım Alınmalı?</h3>
        <p>Aşağıdaki durumlarda mutlaka profesyonel cam temizlik hizmeti alınmalıdır:</p>
        <ul>
          <li>Yüksek binalar ve zor erişilebilir camlar</li>
          <li>Büyük ofis binaları ve ticari mekanlar</li>
          <li>Düzenli ve kaliteli temizlik ihtiyacı</li>
          <li>Güvenlik endişeleri</li>
        </ul>
        
        <p>Sonuç olarak, profesyonel cam temizlik hizmeti hem güvenlik hem de kalite açısından evde yapılan temizlikten çok daha avantajlıdır.</p>`,
    },
  ]

  for (const post of blogPosts) {
    let imageId = null
    if (post.image) {
      const imageUrl = await uploadImageToBlob(post.image, `blog-${post.slug}.png`)
      if (imageUrl) {
        const mediaFile = await createMediaFile(imageUrl, path.basename(post.image))
        imageId = mediaFile.id
      }
    }

    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        content: post.content || '<p>İçerik buraya gelecek...</p>',
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content || '<p>İçerik buraya gelecek...</p>',
        imageId,
        featured: post.featured,
        publishedAt: post.publishedAt,
      },
    })
    console.log(`✓ Migrated blog post: ${post.title}`)
  }

  // Migrate Services
  console.log('Migrating services...')
  const services = [
    {
      title: 'Cam Temizliği',
      number: '01',
      description: 'İç ve dış cam temizliği, çerçeve silimi, pencere kenarları ve pervaz temizliği.',
      image: '/images/window 2.png',
      features: [
        'Profesyonel ekipman ve malzemeler',
        'Sigortalı ve garantili hizmet',
        'Yüksek bina cam temizliği',
        'Ev ve ofis camları',
      ],
      order: 0,
    },
    {
      title: 'Yüksek Bina Cam Temizliği',
      number: '02',
      description: 'Güvenli ve profesyonel ekipmanlarla yüksek binaların cam temizliği.',
      image: '/images/highrise.webp',
      features: [
        'Özel platform ve ekipmanlar',
        'Güvenlik sertifikalı ekip',
        'Sigortalı hizmet',
        'Hızlı ve etkili temizlik',
      ],
      order: 1,
    },
  ]

  for (const service of services) {
    let imageId = null
    if (service.image) {
      const imageUrl = await uploadImageToBlob(service.image, `service-${service.number}.png`)
      if (imageUrl) {
        const mediaFile = await createMediaFile(imageUrl, path.basename(service.image))
        imageId = mediaFile.id
      }
    }

    const existing = await prisma.service.findFirst({
      where: { number: service.number },
    })

    if (existing) {
      await prisma.service.update({
        where: { id: existing.id },
        data: {
          title: service.title,
          description: service.description,
          imageId,
          features: service.features,
          order: service.order,
        },
      })
    } else {
      await prisma.service.create({
        data: {
          title: service.title,
          number: service.number,
          description: service.description,
          imageId,
          features: service.features,
          order: service.order,
        },
      })
    }
    console.log(`✓ Migrated service: ${service.title}`)
  }

  // Migrate Testimonials
  console.log('Migrating testimonials...')
  const testimonials = [
    {
      quote: 'Harika bir hizmet! Ekip zamanında geldi ve işi çok hızlı tamamladı.',
      name: 'Ayşe Yılmaz',
      role: 'Müşteri',
      avatar: '/images/testimonials_01.jpg',
      rating: 5,
      order: 0,
    },
    {
      quote: 'Fethiye\'de cam temizliği için en iyi seçenek! Profesyonel ekipmanlarla çalışıyorlar.',
      name: 'Mehmet Kaya',
      role: 'Müşteri',
      avatar: '/images/testimonials_02.jpg',
      rating: 5,
      order: 1,
    },
  ]

  for (const testimonial of testimonials) {
    let avatarId = null
    if (testimonial.avatar) {
      const imageUrl = await uploadImageToBlob(
        testimonial.avatar,
        `testimonial-${testimonial.name.replace(/\s+/g, '-')}.jpg`
      )
      if (imageUrl) {
        const mediaFile = await createMediaFile(imageUrl, path.basename(testimonial.avatar))
        avatarId = mediaFile.id
      }
    }

    const existing = await prisma.testimonial.findFirst({
      where: { name: testimonial.name, quote: testimonial.quote },
    })

    if (!existing) {
      await prisma.testimonial.create({
        data: {
          quote: testimonial.quote,
          name: testimonial.name,
          role: testimonial.role,
          avatarId,
          rating: testimonial.rating,
          order: testimonial.order,
        },
      })
      console.log(`✓ Migrated testimonial: ${testimonial.name}`)
    } else {
      console.log(`⊘ Testimonial already exists: ${testimonial.name}`)
    }
  }

  // Migrate FAQs
  console.log('Migrating FAQs...')
  const faqs = [
    {
      question: 'Cam temizliği hizmetiniz ne kadar sürer?',
      answer: 'Temizlik süresi, cam sayısına, mekanın büyüklüğüne ve temizlik türüne göre değişir.',
      order: 0,
    },
    {
      question: 'Hangi bölgelerde hizmet veriyorsunuz?',
      answer: 'Fethiye ve çevresindeki tüm bölgelerde hizmet veriyoruz.',
      order: 1,
    },
  ]

  for (const faq of faqs) {
    const existing = await prisma.fAQ.findFirst({
      where: { question: faq.question },
    })

    if (!existing) {
      await prisma.fAQ.create({
        data: {
          question: faq.question,
          answer: faq.answer,
          order: faq.order,
        },
      })
      console.log(`✓ Migrated FAQ: ${faq.question}`)
    } else {
      console.log(`⊘ FAQ already exists: ${faq.question}`)
    }
  }

  // Migrate Gallery Albums
  console.log('Migrating gallery albums...')
  const galleryAlbums = [
    {
      title: 'Ev Cam Temizliği',
      coverImage: '/images/image_service_01.jpg',
      images: [
        '/images/image_service_01.jpg',
        '/images/image_service_02.jpg',
        '/images/image_service_03.jpg',
        '/images/image_about_01.jpg',
      ],
    },
    {
      title: 'Ofis Cam Temizliği',
      coverImage: '/images/highrise.webp',
      images: [
        '/images/highrise.webp',
        '/images/image_home_02_01.png',
        '/images/image_home_02_02.png',
      ],
    },
    {
      title: 'Yüksek Bina Projeleri',
      coverImage: '/images/hero_image_02.jpg',
      images: [
        '/images/hero_image_02.jpg',
        '/images/image_02.jpg',
        '/images/store.webp',
      ],
    },
  ]

  for (const album of galleryAlbums) {
    let coverImageId = null
    
    // Upload cover image
    if (album.coverImage) {
      const coverImageUrl = await uploadImageToBlob(
        album.coverImage,
        `gallery-cover-${album.title.replace(/\s+/g, '-').toLowerCase()}.jpg`
      )
      if (coverImageUrl) {
        const coverMediaFile = await createMediaFile(
          coverImageUrl,
          path.basename(album.coverImage)
        )
        coverImageId = coverMediaFile.id
      }
    }

    // Upload album images
    const albumImageIds: string[] = []
    for (let i = 0; i < album.images.length; i++) {
      const imagePath = album.images[i]
      const imageUrl = await uploadImageToBlob(
        imagePath,
        `gallery-${album.title.replace(/\s+/g, '-').toLowerCase()}-${i}.jpg`
      )
      if (imageUrl) {
        const mediaFile = await createMediaFile(imageUrl, path.basename(imagePath))
        albumImageIds.push(mediaFile.id)
      }
    }

    // Create or update album
    const existingAlbum = await prisma.galleryAlbum.findFirst({
      where: { title: album.title },
    })

    if (existingAlbum) {
      // Update existing album
      await prisma.galleryImage.deleteMany({
        where: { albumId: existingAlbum.id },
      })
      
      await prisma.galleryAlbum.update({
        where: { id: existingAlbum.id },
        data: {
          coverImageId,
          images: {
            create: albumImageIds.map((imageId, index) => ({
              imageId,
              order: index,
            })),
          },
        },
      })
      console.log(`✓ Updated gallery album: ${album.title}`)
    } else {
      // Create new album
      await prisma.galleryAlbum.create({
        data: {
          title: album.title,
          coverImageId,
          images: {
            create: albumImageIds.map((imageId, index) => ({
              imageId,
              order: index,
            })),
          },
        },
      })
      console.log(`✓ Migrated gallery album: ${album.title} with ${albumImageIds.length} images`)
    }
  }

  console.log('Migration completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
