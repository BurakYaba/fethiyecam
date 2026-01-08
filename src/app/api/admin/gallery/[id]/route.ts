import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

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
    await db.galleryAlbum.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete album error:', error)
    return NextResponse.json(
      { error: 'Failed to delete album' },
      { status: 500 }
    )
  }
}
