import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { del } from '@vercel/blob'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find staging files older than 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const oldStagingFiles = await db.mediaFile.findMany({
      where: {
        status: 'staging',
        createdAt: {
          lt: twentyFourHoursAgo,
        },
      },
    })

    // Delete from Vercel Blob and database
    for (const file of oldStagingFiles) {
      try {
        if (file.blobId) {
          await del(file.blobId)
        }
      } catch (error) {
        console.error(`Failed to delete blob ${file.blobId}:`, error)
      }
      await db.mediaFile.delete({
        where: { id: file.id },
      })
    }

    return NextResponse.json({
      success: true,
      deleted: oldStagingFiles.length,
    })
  } catch (error) {
    console.error('Cleanup error:', error)
    return NextResponse.json(
      { error: 'Failed to cleanup files' },
      { status: 500 }
    )
  }
}
