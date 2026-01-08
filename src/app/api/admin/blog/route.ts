import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import { generateSlug } from '@/lib/utils'

const blogPostSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir'),
  slug: z.string().optional(),
  excerpt: z.string().min(1, 'Özet gereklidir'),
  content: z.string().min(1, 'İçerik gereklidir'),
  imageId: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  publishedAt: z.string().nullable().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const blogPosts = await db.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = blogPostSchema.parse(body)

    // Generate slug if not provided
    const slug = data.slug || generateSlug(data.title)

    // Check if slug exists
    const existing = await db.blogPost.findUnique({
      where: { slug },
    })

    let finalSlug = slug
    if (existing) {
      // Add timestamp to make it unique
      finalSlug = `${slug}-${Date.now()}`
    }

    const blogPost = await db.blogPost.create({
      data: {
        title: data.title,
        slug: finalSlug,
        excerpt: data.excerpt,
        content: data.content,
        imageId: data.imageId || null,
        featured: data.featured,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      },
      include: {
        image: true,
      },
    })

    // Confirm image file if provided
    if (data.imageId) {
      await fetch(`${request.nextUrl.origin}/api/admin/media/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileIds: [data.imageId] }),
      })
    }

    return NextResponse.json(blogPost)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Create blog post error:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
