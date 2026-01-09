import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import sharp from 'sharp'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { url, blobId, filename, size } = body

    if (!url || !blobId) {
      return NextResponse.json(
        { error: 'URL and blobId are required' },
        { status: 400 }
      )
    }

    // Try to fetch image to get dimensions
    let width: number | null = null
    let height: number | null = null
    let contentType = 'image/webp'
    let actualSize = size || 0

    try {
      const imgResponse = await fetch(url)
      if (imgResponse.ok) {
        const arrayBuffer = await imgResponse.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        actualSize = buffer.length

        const metadata = await sharp(buffer).metadata()
        width = metadata.width || null
        height = metadata.height || null
        contentType = metadata.format ? `image/${metadata.format}` : 'image/webp'
      }
    } catch (error) {
      console.warn('Could not fetch image for dimensions, saving without them:', error)
      // Continue without dimensions - webhook will update later
    }

    // Check if media file already exists
    const existing = await db.mediaFile.findFirst({
      where: { url },
    })

    let mediaFile
    if (existing) {
      // Update existing record
      mediaFile = await db.mediaFile.update({
        where: { id: existing.id },
        data: {
          width,
          height,
          size: actualSize,
          mimeType: contentType,
        },
      })
    } else {
      // Create new record
      mediaFile = await db.mediaFile.create({
        data: {
          url,
          blobId,
          filename: filename || blobId.split('/').pop() || 'image.webp',
          mimeType: contentType,
          size: actualSize,
          width,
          height,
          status: 'staging',
        },
      })
    }

    return NextResponse.json({
      id: mediaFile.id,
      url: mediaFile.url,
      width: mediaFile.width,
      height: mediaFile.height,
    })
  } catch (error) {
    console.error('Save media file error:', error)
    return NextResponse.json(
      { error: 'Failed to save media file' },
      { status: 500 }
    )
  }
}
