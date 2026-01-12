import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const updateMetricSchema = z.object({
  label: z.string().min(1).optional(),
  value: z.number().int().min(0).max(100).optional(),
  order: z.number().int().optional(),
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
    const metric = await db.satisfactionMetric.findUnique({
      where: { id },
    })

    if (!metric) {
      return NextResponse.json({ error: 'Metric not found' }, { status: 404 })
    }

    return NextResponse.json(metric)
  } catch (error) {
    console.error('Get metric error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metric' },
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
    const data = updateMetricSchema.parse(body)

    const updateData: any = {}
    if (data.label !== undefined) updateData.label = data.label
    if (data.value !== undefined) updateData.value = data.value
    if (data.order !== undefined) updateData.order = data.order

    const metric = await db.satisfactionMetric.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(metric)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Update metric error:', error)
    return NextResponse.json(
      { error: 'Failed to update metric' },
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
    await db.satisfactionMetric.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete metric error:', error)
    return NextResponse.json(
      { error: 'Failed to delete metric' },
      { status: 500 }
    )
  }
}
