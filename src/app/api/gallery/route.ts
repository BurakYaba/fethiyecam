import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
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
