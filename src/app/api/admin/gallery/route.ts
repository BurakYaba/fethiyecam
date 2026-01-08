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

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const albums = await db.galleryAlbum.findMany({
      orderBy: { createdAt: 'desc' },
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

    return NextResponse.json(albums)
  } catch (error) {
    console.error('Get albums error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch albums' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = albumSchema.parse(body)

    const album = await db.galleryAlbum.create({
      data: {
        title: data.title,
        coverImageId: data.coverImageId || null,
      },
      include: {
        coverImage: true,
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
    console.error('Create album error:', error)
    return NextResponse.json(
      { error: 'Failed to create album' },
      { status: 500 }
    )
  }
}
