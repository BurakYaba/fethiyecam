import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import { deleteFromBlob } from '@/lib/blob'

export const dynamic = 'force-dynamic'

const testimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  avatarId: z.string().nullable().optional(),
  rating: z.number().min(1).max(5).default(5),
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
    const testimonial = await db.testimonial.findUnique({
      where: { id },
      include: { avatar: true },
    })

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 })
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
    const data = testimonialSchema.parse(body)

    const testimonial = await db.testimonial.update({
      where: { id },
      data,
      include: { avatar: true },
    })

    if (data.avatarId) {
      await fetch(`${request.nextUrl.origin}/api/admin/media/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileIds: [data.avatarId] }),
      })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
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
    
    // Get the testimonial with avatar to delete blob
    const testimonial = await db.testimonial.findUnique({
      where: { id },
      include: { avatar: true },
    })

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    // Delete avatar from blob storage if exists
    if (testimonial.avatar?.blobId) {
      try {
        await deleteFromBlob(testimonial.avatar.blobId, testimonial.avatar.url)
      } catch (error) {
        console.error(`Error deleting blob for testimonial ${id}:`, error)
        // Continue with deletion even if blob deletion fails
      }
    }

    // Delete the testimonial
    await db.testimonial.delete({ where: { id } })

    // Delete MediaFile record if it exists and is not used elsewhere
    if (testimonial.avatarId) {
      const mediaFile = await db.mediaFile.findUnique({
        where: { id: testimonial.avatarId },
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
            where: { id: testimonial.avatarId },
          })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete testimonial error:', error)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
