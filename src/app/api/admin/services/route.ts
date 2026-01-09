import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const serviceSchema = z.object({
  title: z.string().min(1),
  number: z.string().min(1),
  description: z.string().min(1),
  imageId: z.string().nullable().optional(),
  features: z.array(z.string()),
  order: z.number().default(0),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const services = await db.service.findMany({
      orderBy: { order: 'asc' },
      include: { image: true },
    })

    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = serviceSchema.parse(body)

    // Get current max order to set new service at the end
    const maxOrder = await db.service.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const service = await db.service.create({
      data: {
        ...data,
        order: maxOrder ? maxOrder.order + 1 : 0,
      },
      include: { image: true },
    })

    if (data.imageId) {
      await fetch(`${request.nextUrl.origin}/api/admin/media/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileIds: [data.imageId] }),
      })
    }

    return NextResponse.json(service)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
