import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const imageSchema = z.object({
  imageId: z.string(),
  order: z.number().default(0),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: albumId } = await params
    const body = await request.json()
    const data = imageSchema.parse(body)

    // Get current max order
    const maxOrder = await db.galleryImage.findFirst({
      where: { albumId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const galleryImage = await db.galleryImage.create({
      data: {
        albumId,
        imageId: data.imageId,
        order: maxOrder ? maxOrder.order + 1 : 0,
      },
      include: {
        image: true,
      },
    })

    // Confirm image file
    await fetch(`${request.nextUrl.origin}/api/admin/media/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileIds: [data.imageId] }),
    })

    return NextResponse.json(galleryImage)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Add image error:', error)
    return NextResponse.json(
      { error: 'Failed to add image' },
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

    const { id: albumId } = await params
    const body = await request.json()
    const { images } = z.object({
      images: z.array(
        z.object({
          id: z.string(),
          order: z.number(),
        })
      ),
    }).parse(body)

    // Update orders
    await Promise.all(
      images.map((img) =>
        db.galleryImage.update({
          where: { id: img.id },
          data: { order: img.order },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reorder images error:', error)
    return NextResponse.json(
      { error: 'Failed to reorder images' },
      { status: 500 }
    )
  }
}
