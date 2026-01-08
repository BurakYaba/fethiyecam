import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'
import { RiAddLine } from '@remixicon/react'
import Image from 'next/image'
import GalleryActions from '@/components/admin/GalleryActions'

export default async function GalleryListPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }

  const albums = await db.galleryAlbum.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      coverImage: true,
      images: true,
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Galeri Albümleri
          </h1>
          <p className="text-gray-600">Galeri albümlerinizi yönetin</p>
        </div>
        <Link href="/admin/gallery/new" className="btn-primary">
          <RiAddLine className="w-5 h-5" />
          <span>Yeni Albüm</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Henüz albüm yok. İlk albümünüzü oluşturun!
          </div>
        ) : (
          albums.map((album) => (
            <div
              key={album.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {album.coverImage ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={album.coverImage.url}
                    alt={album.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Resim Yok</span>
                </div>
              )}
              <div className="p-4">
                <h3
                  className="font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {album.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {album.images.length} fotoğraf
                </p>
                <GalleryActions albumId={album.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
