import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const features = await db.feature.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(features)
  } catch (error) {
    console.error('Get public features error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    )
  }
}
