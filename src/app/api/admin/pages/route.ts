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

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const pages = await db.page.findMany({
      orderBy: { label: 'asc' },
    })

    return NextResponse.json(pages)
  } catch (error) {
    console.error('Get pages error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
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
    const data = pageSchema.parse(body)

    // Check if slug already exists
    const existing = await db.page.findUnique({
      where: { slug: data.slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 400 }
      )
    }

    // Check if path already exists
    const existingPath = await db.page.findFirst({
      where: { path: data.path },
    })

    if (existingPath) {
      return NextResponse.json(
        { error: 'A page with this path already exists' },
        { status: 400 }
      )
    }

    const page = await db.page.create({
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
    console.error('Create page error:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}
