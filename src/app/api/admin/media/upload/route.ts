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

    // Reduce max size to 4MB to stay under Vercel's 4.5MB body limit
    const maxSize = 4 * 1024 * 1024 // 4MB instead of 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Dosya boyutu 4MB\'dan küçük olmalıdır' },
        { status: 400 }
      )
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Get image metadata
    const metadata = await sharp(buffer).metadata()

    // Optimize more aggressively: reduce max width to 1600px and quality to 85%
    const optimized = await optimizeImage(buffer, 1600, 85)

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
