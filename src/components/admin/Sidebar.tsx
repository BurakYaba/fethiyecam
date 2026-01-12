'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  RiDashboardLine,
  RiArticleLine,
  RiImageLine,
  RiServiceLine,
  RiStarLine,
  RiQuestionLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiCloseLine,
  RiFileLine,
  RiSettingsLine,
  RiMenu2Line,
} from '@remixicon/react'
import { useState } from 'react'

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: RiDashboardLine },
  { href: '/admin/pages', label: 'Sayfalar', icon: RiFileLine },
  { href: '/admin/menu', label: 'Menü', icon: RiMenu2Line },
  { href: '/admin/settings', label: 'Ayarlar', icon: RiSettingsLine },
  { href: '/admin/blog', label: 'Blog Yazıları', icon: RiArticleLine },
  { href: '/admin/gallery', label: 'Galeri', icon: RiImageLine },
  { href: '/admin/services', label: 'Hizmetler', icon: RiServiceLine },
  { href: '/admin/testimonials', label: 'Referanslar', icon: RiStarLine },
  { href: '/admin/faq', label: 'SSS', icon: RiQuestionLine },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <RiMenuLine className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h1
              className="text-xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              CMS Yönetim
            </h1>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#FF7F00] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <RiLogoutBoxLine className="w-5 h-5" />
              <span className="font-medium">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
