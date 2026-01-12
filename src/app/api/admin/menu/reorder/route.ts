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
    parentId: z.string().nullable().optional(),
  })
)

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const items = reorderSchema.parse(body)

    // Update all items in a transaction
    await db.$transaction(
      items.map((item) =>
        db.menuItem.update({
          where: { id: item.id },
          data: {
            order: item.order,
            parentId: item.parentId || null,
          },
        })
      )
    )

    return NextResponse.json({ success: true, updated: items.length })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Reorder menu items error:', error)
    return NextResponse.json(
      { error: 'Failed to reorder menu items' },
      { status: 500 }
    )
  }
}
