import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { deleteFromBlob } from '@/lib/blob'

export const dynamic = 'force-dynamic'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ imageId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { imageId } = await params
    
    // Get the gallery image with media file to delete blob
    const galleryImage = await db.galleryImage.findUnique({
      where: { id: imageId },
      include: { image: true },
    })

    if (!galleryImage) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 })
    }

    // Delete image from blob storage if exists
    if (galleryImage.image?.blobId) {
      try {
        await deleteFromBlob(galleryImage.image.blobId, galleryImage.image.url)
      } catch (error) {
        console.error(`Error deleting blob for gallery image ${imageId}:`, error)
        // Continue with deletion even if blob deletion fails
      }
    }

    // Delete the gallery image
    await db.galleryImage.delete({
      where: { id: imageId },
    })

    // Delete MediaFile record if it exists and is not used elsewhere
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

      // Only delete if not used by other entities
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete image error:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
