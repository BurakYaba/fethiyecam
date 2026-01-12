import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const settingSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string(),
  type: z.enum(['text', 'image', 'richText', 'json']),
  group: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await db.siteSettings.findMany({
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    })

    // Group settings by group
    const grouped = settings.reduce((acc, setting) => {
      const group = setting.group || 'general'
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(setting)
      return acc
    }, {} as Record<string, typeof settings>)

    return NextResponse.json(grouped)
  } catch (error) {
    console.error('Get settings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
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
    const data = settingSchema.parse(body)

    const setting = await db.siteSettings.upsert({
      where: { key: data.key },
      update: {
        value: data.value,
        type: data.type,
        group: data.group,
      },
      create: {
        key: data.key,
        value: data.value,
        type: data.type,
        group: data.group,
      },
    })

    return NextResponse.json(setting)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Create/update setting error:', error)
    return NextResponse.json(
      { error: 'Failed to save setting' },
      { status: 500 }
    )
  }
}
