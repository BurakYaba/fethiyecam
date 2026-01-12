import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const contentBlockSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  page: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  imageId: z.string().nullable().optional(),
  order: z.number().int().default(0),
  visible: z.boolean().default(true),
  config: z.any().optional(), // JSON field
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const type = searchParams.get('type')

    const where: any = {}
    if (page) where.page = page
    if (type) where.type = type

    const blocks = await db.contentBlock.findMany({
      where,
      include: {
        image: true,
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(blocks)
  } catch (error) {
    console.error('Get content blocks error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content blocks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = contentBlockSchema.parse(body)

    const block = await db.contentBlock.create({
      data: {
        type: data.type,
        page: data.page || null,
        title: data.title || null,
        subtitle: data.subtitle || null,
        content: data.content || null,
        imageId: data.imageId || null,
        order: data.order,
        visible: data.visible,
        config: data.config || null,
      },
      include: {
        image: true,
      },
    })

    // Confirm image file if provided
    if (data.imageId) {
      await fetch(`${request.nextUrl.origin}/api/admin/media/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileIds: [data.imageId] }),
      }).catch(console.error)
    }

    return NextResponse.json(block)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Create content block error:', error)
    return NextResponse.json(
      { error: 'Failed to create content block' },
      { status: 500 }
    )
  }
}
