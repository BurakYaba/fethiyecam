import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const metrics = await db.satisfactionMetric.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Get public satisfaction metrics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}
