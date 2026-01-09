import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import { generateSlug } from '@/lib/utils'
import { deleteFromBlob } from '@/lib/blob'

export const dynamic = 'force-dynamic'

const blogPostSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir'),
  slug: z.string().optional(),
  excerpt: z.string().min(1, 'Özet gereklidir'),
  content: z.string().min(1, 'İçerik gereklidir'),
  imageId: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  publishedAt: z.string().nullable().optional(),
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
    const blogPost = await db.blogPost.findUnique({
      where: { id },
      include: {
        image: true,
      },
    })

    if (!blogPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    return NextResponse.json(blogPost)
  } catch (error) {
    console.error('Get blog post error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
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
    const data = blogPostSchema.parse(body)

    // Generate slug if not provided
    const slug = data.slug || generateSlug(data.title)

    // Check if slug exists (excluding current post)
    const existing = await db.blogPost.findFirst({
      where: {
        slug,
        id: { not: id },
      },
    })

    let finalSlug = slug
    if (existing) {
      finalSlug = `${slug}-${Date.now()}`
    }

    const blogPost = await db.blogPost.update({
      where: { id },
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
    console.error('Update blog post error:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
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
    
    // Get the blog post with image to delete blob
    const blogPost = await db.blogPost.findUnique({
      where: { id },
      include: { image: true },
    })

    if (!blogPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Delete image from blob storage if exists
    if (blogPost.image?.blobId) {
      try {
        await deleteFromBlob(blogPost.image.blobId, blogPost.image.url)
      } catch (error) {
        console.error(`Error deleting blob for blog post ${id}:`, error)
        // Continue with deletion even if blob deletion fails
      }
    }

    // Delete the blog post (cascade will handle MediaFile deletion)
    await db.blogPost.delete({
      where: { id },
    })

    // Delete MediaFile record if it exists and is not used elsewhere
    if (blogPost.imageId) {
      const mediaFile = await db.mediaFile.findUnique({
        where: { id: blogPost.imageId },
        include: {
          blogPostsAsImage: true,
          galleryAlbumsAsCover: true,
          galleryImagesAsImage: true,
          servicesAsImage: true,
          testimonialsAsAvatar: true,
        },
      })

      // Only delete if not used by other entities
      if (mediaFile) {
        const isUsedElsewhere =
          mediaFile.blogPostsAsImage.length > 0 ||
          mediaFile.galleryAlbumsAsCover.length > 0 ||
          mediaFile.galleryImagesAsImage.length > 0 ||
          mediaFile.servicesAsImage.length > 0 ||
          mediaFile.testimonialsAsAvatar.length > 0

        if (!isUsedElsewhere) {
          await db.mediaFile.delete({
            where: { id: blogPost.imageId },
          })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete blog post error:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
