import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const type = searchParams.get('type')

    const where: any = {
      visible: true,
    }
    if (page) where.page = page
    if (type) where.type = type

    const blocks = await db.contentBlock.findMany({
      where,
      include: {
        image: true,
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(blocks)
  } catch (error) {
    console.error('Get public content blocks error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content blocks' },
      { status: 500 }
    )
  }
}
