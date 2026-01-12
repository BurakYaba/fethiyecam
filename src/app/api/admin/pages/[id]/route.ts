import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const pageSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  label: z.string().min(1),
  path: z.string().min(1).startsWith('/'),
  description: z.string().optional(),
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
    const page = await db.page.findUnique({
      where: { id },
    })

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Get page error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
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
    const data = pageSchema.parse(body)

    // Check if slug already exists (excluding current page)
    const existing = await db.page.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 400 }
      )
    }

    // Check if path already exists (excluding current page)
    const existingPath = await db.page.findFirst({
      where: {
        path: data.path,
        NOT: { id },
      },
    })

    if (existingPath) {
      return NextResponse.json(
        { error: 'A page with this path already exists' },
        { status: 400 }
      )
    }

    const page = await db.page.update({
      where: { id },
      data: {
        slug: data.slug,
        label: data.label,
        path: data.path,
        description: data.description || null,
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Update page error:', error)
    return NextResponse.json(
      { error: 'Failed to update page' },
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

    // Check if page has content blocks
    const blocksCount = await db.contentBlock.count({
      where: { page: id },
    })

    if (blocksCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete page with content blocks. Please remove all blocks first.' },
        { status: 400 }
      )
    }

    await db.page.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete page error:', error)
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    )
  }
}
