import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { order: 'asc' },
      include: { avatar: true },
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Get testimonials error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}
