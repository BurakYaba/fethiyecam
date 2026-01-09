import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { optimizeImage } from '@/lib/image-optimizer'
import { uploadToBlob } from '@/lib/blob'
import sharp from 'sharp'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Get image metadata
    const metadata = await sharp(buffer).metadata()

    // Optimize image
    const optimized = await optimizeImage(buffer, 1920, 90)

    // Upload to Vercel Blob
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '') // Remove extension
    const filename = `uploads/${timestamp}-${nameWithoutExt}.webp` // Add .webp extension
    const { url, blobId } = await uploadToBlob(
      filename,
      optimized.buffer,
      'image/webp'
    )

    // Save to database with staging status
    const mediaFile = await db.mediaFile.create({
      data: {
        url,
        blobId,
        filename: file.name,
        mimeType: 'image/webp',
        size: optimized.size,
        width: optimized.width,
        height: optimized.height,
        status: 'staging',
      },
    })

    return NextResponse.json({
      id: mediaFile.id,
      url: mediaFile.url,
      width: mediaFile.width,
      height: mediaFile.height,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
