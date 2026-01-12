import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const stepSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().nullable().optional(),
  order: z.number().int().default(0),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const steps = await db.howItWorksStep.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(steps)
  } catch (error) {
    console.error('Get how it works steps error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch steps' },
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
    const data = stepSchema.parse(body)

    const step = await db.howItWorksStep.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon || null,
        order: data.order,
      },
    })

    return NextResponse.json(step)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Create step error:', error)
    return NextResponse.json(
      { error: 'Failed to create step' },
      { status: 500 }
    )
  }
}
