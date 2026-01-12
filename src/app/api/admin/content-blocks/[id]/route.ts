import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const updateBlockSchema = z.object({
  type: z.string().optional(),
  page: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  imageId: z.string().nullable().optional(),
  order: z.number().int().optional(),
  visible: z.boolean().optional(),
  config: z.any().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const block = await db.contentBlock.findUnique({
      where: { id },
      include: {
        image: true,
      },
    })

    if (!block) {
      return NextResponse.json({ error: 'Content block not found' }, { status: 404 })
    }

    return NextResponse.json(block)
  } catch (error) {
    console.error('Get content block error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content block' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const data = updateBlockSchema.parse(body)

    const updateData: any = {}
    if (data.type !== undefined) updateData.type = data.type
    if (data.page !== undefined) updateData.page = data.page
    if (data.title !== undefined) updateData.title = data.title
    if (data.subtitle !== undefined) updateData.subtitle = data.subtitle
    if (data.content !== undefined) updateData.content = data.content
    if (data.imageId !== undefined) updateData.imageId = data.imageId
    if (data.order !== undefined) updateData.order = data.order
    if (data.visible !== undefined) updateData.visible = data.visible
    if (data.config !== undefined) updateData.config = data.config

    const block = await db.contentBlock.update({
      where: { id },
      data: updateData,
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
    console.error('Update content block error:', error)
    return NextResponse.json(
      { error: 'Failed to update content block' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await db.contentBlock.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete content block error:', error)
    return NextResponse.json(
      { error: 'Failed to delete content block' },
      { status: 500 }
    )
  }
}
