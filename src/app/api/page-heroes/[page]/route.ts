import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params
    const hero = await db.pageHero.findUnique({
      where: { page },
      include: {
        image: true,
      },
    })

    if (!hero) {
      return NextResponse.json({ error: 'Page hero not found' }, { status: 404 })
    }

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Get public page hero error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page hero' },
      { status: 500 }
    )
  }
}
