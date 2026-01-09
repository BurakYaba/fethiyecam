import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const blogPosts = await db.blogPost.findMany({
      where: {
        publishedAt: {
          lte: new Date(),
        },
      },
      orderBy: { publishedAt: 'desc' },
      include: {
        image: true,
      },
    })

    return NextResponse.json(blogPosts)
  } catch (error) {
    console.error('Get blog posts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
