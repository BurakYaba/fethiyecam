import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const updateHeroSchema = z.object({
  page: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  subtitle: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  imageId: z.string().nullable().optional(),
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
    const hero = await db.pageHero.findUnique({
      where: { id },
      include: {
        image: true,
      },
    })

    if (!hero) {
      return NextResponse.json({ error: 'Page hero not found' }, { status: 404 })
    }

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Get page hero error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page hero' },
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
    const data = updateHeroSchema.parse(body)

    const updateData: any = {}
    if (data.page !== undefined) updateData.page = data.page
    if (data.title !== undefined) updateData.title = data.title
    if (data.subtitle !== undefined) updateData.subtitle = data.subtitle
    if (data.description !== undefined) updateData.description = data.description
    if (data.imageId !== undefined) updateData.imageId = data.imageId

    const hero = await db.pageHero.update({
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

    return NextResponse.json(hero)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Update page hero error:', error)
    return NextResponse.json(
      { error: 'Failed to update page hero' },
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
    await db.pageHero.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete page hero error:', error)
    return NextResponse.json(
      { error: 'Failed to delete page hero' },
      { status: 500 }
    )
  }
}
