import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const reorderSchema = z.array(
  z.object({
    id: z.string(),
    order: z.number().int(),
  })
)

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const blocks = reorderSchema.parse(body)

    // Update all blocks in a transaction
    await db.$transaction(
      blocks.map((block) =>
        db.contentBlock.update({
          where: { id: block.id },
          data: { order: block.order },
        })
      )
    )

    return NextResponse.json({ success: true, updated: blocks.length })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Reorder content blocks error:', error)
    return NextResponse.json(
      { error: 'Failed to reorder content blocks' },
      { status: 500 }
    )
  }
}
