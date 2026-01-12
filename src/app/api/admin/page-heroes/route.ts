import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const pageHeroSchema = z.object({
  page: z.string().min(1, 'Page is required'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  imageId: z.string().nullable().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const heroes = await db.pageHero.findMany({
      include: {
        image: true,
      },
      orderBy: { page: 'asc' },
    })

    return NextResponse.json(heroes)
  } catch (error) {
    console.error('Get page heroes error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page heroes' },
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
    const data = pageHeroSchema.parse(body)

    const hero = await db.pageHero.create({
      data: {
        page: data.page,
        title: data.title,
        subtitle: data.subtitle || null,
        description: data.description || null,
        imageId: data.imageId || null,
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

    return NextResponse.json(hero)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Create page hero error:', error)
    return NextResponse.json(
      { error: 'Failed to create page hero' },
      { status: 500 }
    )
  }
}
