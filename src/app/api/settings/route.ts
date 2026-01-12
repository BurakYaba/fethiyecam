import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Fetch only public settings (contact info, social links, etc.)
    const settings = await db.siteSettings.findMany({
      where: {
        group: {
          in: ['contact', 'social', 'footer'],
        },
      },
    })

    // Convert to key-value map for easy access
    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(settingsMap)
  } catch (error) {
    console.error('Get public settings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}
