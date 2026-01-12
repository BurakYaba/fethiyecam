import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const steps = await db.howItWorksStep.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(steps)
  } catch (error) {
    console.error('Get public how it works steps error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch steps' },
      { status: 500 }
    )
  }
}
