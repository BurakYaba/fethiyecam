import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BlockRenderer from "@/components/BlockRenderer"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const path = '/' + slug.join('/')

  // Check if this is a known static route (should be handled by specific routes)
  const staticRoutes = ['/', '/blog', '/galeri', '/hizmetler', '/hakkimizda', '/sss', '/iletisim']
  if (staticRoutes.includes(path)) {
    notFound()
  }

  // Try to find the page in database
  const page = await db.page.findFirst({
    where: { path },
  })

  if (!page) {
    notFound()
  }

  // Fetch content blocks for this page
  let blocks: any[] = []
  try {
    blocks = await db.contentBlock.findMany({
      where: {
        page: page.slug,
        visible: true,
      },
      include: {
        image: true,
      },
      orderBy: { order: 'asc' },
    })
  } catch (error) {
    console.error('Failed to fetch content blocks:', error)
  }

  // Fetch page hero if exists
  let pageHero = null
  try {
    pageHero = await db.pageHero.findUnique({
      where: { page: page.slug },
      include: { image: true },
    })
  } catch (error) {
    console.error('Failed to fetch page hero:', error)
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
                style={{ fontFamily: 'var(--font-heading)' }}
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
                Bu sayfa için henüz içerik bloğu eklenmemiş. Yönetim panelinden içerik ekleyebilirsiniz.
              </p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
