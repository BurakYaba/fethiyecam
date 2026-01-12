import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const metricSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  value: z.number().int().min(0).max(100, 'Value must be between 0 and 100'),
  order: z.number().int().default(0),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const metrics = await db.satisfactionMetric.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Get satisfaction metrics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
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
    const data = metricSchema.parse(body)

    const metric = await db.satisfactionMetric.create({
      data: {
        label: data.label,
        value: data.value,
        order: data.order,
      },
    })

    return NextResponse.json(metric)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Create metric error:', error)
    return NextResponse.json(
      { error: 'Failed to create metric' },
      { status: 500 }
    )
  }
}
