import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const bulkSettingsSchema = z.array(
  z.object({
    key: z.string().min(1),
    value: z.string(),
    type: z.enum(['text', 'image', 'richText', 'json']),
    group: z.string().optional(),
  })
)

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const settings = bulkSettingsSchema.parse(body)

    // Use transaction to update all settings
    const results = await Promise.all(
      settings.map((setting) =>
        db.siteSettings.upsert({
          where: { key: setting.key },
          update: {
            value: setting.value,
            type: setting.type,
            group: setting.group,
          },
          create: {
            key: setting.key,
            value: setting.value,
            type: setting.type,
            group: setting.group,
          },
        })
      )
    )

    return NextResponse.json({ success: true, updated: results.length })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Bulk update settings error:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
