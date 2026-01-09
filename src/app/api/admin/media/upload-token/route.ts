import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { db } from '@/lib/db'
import sharp from 'sharp'

export const dynamic = 'force-dynamic'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as HandleUploadBody

    // Store metadata for later use
    let uploadMetadata: {
      originalFilename: string
      uploadedBy: string
    } | null = null

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string) => {
        // Authenticate user before generating token
        const session = await getServerSession(authOptions)
        if (!session) {
          throw new Error('Not authorized')
        }

        // Validate file type from pathname
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
        const hasValidExtension = allowedExtensions.some((ext) =>
          pathname.toLowerCase().endsWith(ext)
        )
        if (!hasValidExtension) {
          throw new Error('Only image files are allowed')
        }

        uploadMetadata = {
          originalFilename: pathname,
          uploadedBy: session.user?.email || 'unknown',
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          tokenPayload: JSON.stringify(uploadMetadata),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // The file is already optimized in the browser before upload
        console.log('Blob upload completed (webhook)', blob.url)

        try {
          // Parse token payload
          const payload = tokenPayload ? JSON.parse(tokenPayload) : uploadMetadata || {}

          // Fetch the uploaded image to get dimensions and size
          const imgResponse = await fetch(blob.url)
          if (!imgResponse.ok) {
            throw new Error('Failed to fetch uploaded image')
          }

          const arrayBuffer = await imgResponse.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)

          // Get image metadata using sharp
          const metadata = await sharp(buffer).metadata()
          const width = metadata.width || null
          const height = metadata.height || null
          const contentType = metadata.format ? `image/${metadata.format}` : 'image/webp'

          // Check if media file already exists
          const existing = await db.mediaFile.findFirst({
            where: { url: blob.url },
          })

          if (existing) {
            // Update existing record
            await db.mediaFile.update({
              where: { id: existing.id },
              data: {
                width,
                height,
                size: buffer.length,
                mimeType: contentType,
              },
            })
          } else {
            // Create new record
            await db.mediaFile.create({
              data: {
                url: blob.url,
                blobId: blob.pathname,
                filename: payload.originalFilename || blob.pathname.split('/').pop() || 'image.webp',
                mimeType: contentType,
                size: buffer.length,
                width,
                height,
                status: 'staging',
              },
            })
          }

          console.log('Media file saved/updated in database via webhook')
        } catch (error) {
          console.error('Error processing uploaded blob in webhook:', error)
          // Don't throw - webhook will retry
        }
      },
    })

    // Note: Media file is saved via /api/admin/media/save endpoint called by the client
    // The onUploadCompleted webhook will update dimensions in production
    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('Upload token error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    )
  }
}
