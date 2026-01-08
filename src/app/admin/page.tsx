import { db } from '@/lib/db'
import {
  RiArticleLine,
  RiImageLine,
  RiServiceLine,
  RiStarLine,
  RiQuestionLine,
} from '@remixicon/react'

export default async function AdminDashboard() {
  // Middleware handles authentication - no need to check here

  // Get content statistics
  const [blogCount, galleryCount, serviceCount, testimonialCount, faqCount] =
    await Promise.all([
      db.blogPost.count(),
      db.galleryAlbum.count(),
      db.service.count(),
      db.testimonial.count(),
      db.fAQ.count(),
    ])

  const stats = [
    {
      label: 'Blog Yazıları',
      count: blogCount,
      icon: RiArticleLine,
      href: '/admin/blog',
      color: 'bg-blue-500',
    },
    {
      label: 'Galeri Albümleri',
      count: galleryCount,
      icon: RiImageLine,
      href: '/admin/gallery',
      color: 'bg-green-500',
    },
    {
      label: 'Hizmetler',
      count: serviceCount,
      icon: RiServiceLine,
      href: '/admin/services',
      color: 'bg-purple-500',
    },
    {
      label: 'Referanslar',
      count: testimonialCount,
      icon: RiStarLine,
      href: '/admin/testimonials',
      color: 'bg-yellow-500',
    },
    {
      label: 'SSS',
      count: faqCount,
      icon: RiQuestionLine,
      href: '/admin/faq',
      color: 'bg-orange-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Dashboard
        </h1>
        <p className="text-gray-600">İçerik yönetim paneline hoş geldiniz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <a
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p
                    className="text-3xl font-bold text-gray-900"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.count}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
