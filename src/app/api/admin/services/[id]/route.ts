import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import { deleteFromBlob } from '@/lib/blob'

export const dynamic = 'force-dynamic'

const serviceSchema = z.object({
  title: z.string().min(1),
  number: z.string().min(1),
  description: z.string().min(1),
  imageId: z.string().nullable().optional(),
  features: z.array(z.string()),
  order: z.number().default(0),
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
    const service = await db.service.findUnique({
      where: { id },
      include: { image: true },
    })

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
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
    const data = serviceSchema.parse(body)

    const service = await db.service.update({
      where: { id },
      data,
      include: { image: true },
    })

    if (data.imageId) {
      await fetch(`${request.nextUrl.origin}/api/admin/media/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileIds: [data.imageId] }),
      })
    }

    return NextResponse.json(service)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
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
    
    // Get the service with image to delete blob
    const service = await db.service.findUnique({
      where: { id },
      include: { image: true },
    })

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    // Delete image from blob storage if exists
    if (service.image) {
      if (service.image.blobId) {
        try {
          console.log(`Deleting blob for service ${id}:`, {
            blobId: service.image.blobId,
            url: service.image.url,
          })
          await deleteFromBlob(service.image.blobId, service.image.url)
        } catch (error) {
          console.error(`Error deleting blob for service ${id}:`, error)
          // Continue with deletion even if blob deletion fails
        }
      } else {
        console.warn(`Service ${id} image has no blobId. URL: ${service.image.url}`)
      }
    } else {
      console.warn(`Service ${id} has no image associated`)
    }

    // Delete the service
    await db.service.delete({ where: { id } })

    // Delete MediaFile record if it exists and is not used elsewhere
    if (service.imageId) {
      const mediaFile = await db.mediaFile.findUnique({
        where: { id: service.imageId },
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
            where: { id: service.imageId },
          })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete service error:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
