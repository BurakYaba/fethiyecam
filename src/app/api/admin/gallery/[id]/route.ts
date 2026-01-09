import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import { deleteFromBlob } from '@/lib/blob'

export const dynamic = 'force-dynamic'

const albumSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir'),
  coverImageId: z.string().nullable().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const album = await db.galleryAlbum.findUnique({
      where: { id },
      include: {
        coverImage: true,
        images: {
          include: {
            image: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    return NextResponse.json(album)
  } catch (error) {
    console.error('Get album error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch album' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const data = albumSchema.parse(body)

    const album = await db.galleryAlbum.update({
      where: { id },
      data: {
        title: data.title,
        coverImageId: data.coverImageId || null,
      },
      include: {
        coverImage: true,
        images: {
          include: {
            image: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (data.coverImageId) {
      await fetch(`${request.nextUrl.origin}/api/admin/media/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileIds: [data.coverImageId] }),
      })
    }

    return NextResponse.json(album)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Update album error:', error)
    return NextResponse.json(
      { error: 'Failed to update album' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    // Get the album with all images to delete blobs
    const album = await db.galleryAlbum.findUnique({
      where: { id },
      include: {
        coverImage: true,
        images: {
          include: {
            image: true,
          },
        },
      },
    })

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    // Delete cover image from blob storage if exists
    if (album.coverImage?.blobId) {
      try {
        await deleteFromBlob(album.coverImage.blobId, album.coverImage.url)
      } catch (error) {
        console.error(`Error deleting cover blob for album ${id}:`, error)
      }
    }

    // Delete all album images from blob storage
    for (const galleryImage of album.images) {
      if (galleryImage.image?.blobId) {
        try {
          await deleteFromBlob(galleryImage.image.blobId, galleryImage.image.url)
        } catch (error) {
          console.error(`Error deleting blob for gallery image ${galleryImage.id}:`, error)
        }
      }
    }

    // Delete the album (cascade will handle GalleryImage deletion)
    await db.galleryAlbum.delete({
      where: { id },
    })

    // Delete MediaFile records if not used elsewhere
    if (album.coverImageId) {
      const mediaFile = await db.mediaFile.findUnique({
        where: { id: album.coverImageId },
        include: {
          blogPostsAsImage: true,
          galleryAlbumsAsCover: true,
          galleryImagesAsImage: true,
          servicesAsImage: true,
          testimonialsAsAvatar: true,
        },
      })

      if (mediaFile) {
        const isUsedElsewhere =
          mediaFile.blogPostsAsImage.length > 0 ||
          mediaFile.galleryAlbumsAsCover.length > 0 ||
          mediaFile.galleryImagesAsImage.length > 0 ||
          mediaFile.servicesAsImage.length > 0 ||
          mediaFile.testimonialsAsAvatar.length > 0

        if (!isUsedElsewhere) {
          await db.mediaFile.delete({
            where: { id: album.coverImageId },
          })
        }
      }
    }

    // Delete MediaFile records for album images
    for (const galleryImage of album.images) {
      if (galleryImage.imageId) {
        const mediaFile = await db.mediaFile.findUnique({
          where: { id: galleryImage.imageId },
          include: {
            blogPostsAsImage: true,
            galleryAlbumsAsCover: true,
            galleryImagesAsImage: true,
            servicesAsImage: true,
            testimonialsAsAvatar: true,
          },
        })

        if (mediaFile) {
          const isUsedElsewhere =
            mediaFile.blogPostsAsImage.length > 0 ||
            mediaFile.galleryAlbumsAsCover.length > 0 ||
            mediaFile.galleryImagesAsImage.length > 0 ||
            mediaFile.servicesAsImage.length > 0 ||
            mediaFile.testimonialsAsAvatar.length > 0

          if (!isUsedElsewhere) {
            await db.mediaFile.delete({
              where: { id: galleryImage.imageId },
            })
          }
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete album error:', error)
    return NextResponse.json(
      { error: 'Failed to delete album' },
      { status: 500 }
    )
  }
}
