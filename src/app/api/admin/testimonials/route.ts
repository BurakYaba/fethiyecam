import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const testimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  avatarId: z.string().nullable().optional(),
  rating: z.number().min(1).max(5).default(5),
  order: z.number().default(0),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const testimonials = await db.testimonial.findMany({
      orderBy: { order: 'asc' },
      include: { avatar: true },
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = testimonialSchema.parse(body)

    const testimonial = await db.testimonial.create({ data, include: { avatar: true } })

    if (data.avatarId) {
      await fetch(`${request.nextUrl.origin}/api/admin/media/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileIds: [data.avatarId] }),
      })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
