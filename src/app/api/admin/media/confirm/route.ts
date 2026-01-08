import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const confirmSchema = z.object({
  fileIds: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { fileIds } = confirmSchema.parse(body)

    // Update file status from staging to active
    await db.mediaFile.updateMany({
      where: {
        id: { in: fileIds },
        status: 'staging',
      },
      data: {
        status: 'active',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Confirm error:', error)
    return NextResponse.json(
      { error: 'Failed to confirm files' },
      { status: 500 }
    )
  }
}
