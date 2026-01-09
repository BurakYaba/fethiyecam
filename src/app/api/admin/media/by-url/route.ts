import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = request.nextUrl.searchParams.get('url')
    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
    }

    // Find media file by URL
    const mediaFile = await db.mediaFile.findFirst({
      where: {
        url: url,
      },
    })

    if (!mediaFile) {
      return NextResponse.json({ error: 'Media file not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: mediaFile.id,
      url: mediaFile.url,
      width: mediaFile.width,
      height: mediaFile.height,
    })
  } catch (error) {
    console.error('Get media file by URL error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media file' },
      { status: 500 }
    )
  }
}
