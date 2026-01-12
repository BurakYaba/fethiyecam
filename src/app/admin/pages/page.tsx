'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RiEditLine, RiFileLine, RiAddLine, RiDeleteBinLine } from '@remixicon/react'

interface Page {
  id: string
  slug: string
  label: string
  path: string
  description: string | null
}

// Default pages that always exist (not stored in DB)
const defaultPages = [
  { slug: 'home', label: 'Ana Sayfa', path: '/' },
  { slug: 'about', label: 'Hakkımızda', path: '/hakkimizda' },
  { slug: 'services', label: 'Hizmetler', path: '/hizmetler' },
  { slug: 'blog', label: 'Blog', path: '/blog' },
  { slug: 'gallery', label: 'Galeri', path: '/galeri' },
  { slug: 'faq', label: 'SSS', path: '/sss' },
  { slug: 'contact', label: 'İletişim', path: '/iletisim' },
]

export default function PagesListPage() {
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    slug: '',
    label: '',
    path: '',
    description: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/pages')
      if (response.ok) {
        const data = await response.json()
        setPages(data)
      }
    } catch (error) {
      console.error('Failed to fetch pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate form
    if (!formData.slug || !formData.label || !formData.path) {
      setError('Lütfen tüm alanları doldurun')
      return
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      setError('Slug sadece küçük harf, rakam ve tire içerebilir')
      return
    }

    // Validate path format
    if (!formData.path.startsWith('/')) {
      setError('Path / ile başlamalıdır')
      return
    }

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: formData.slug,
          label: formData.label,
          path: formData.path,
          description: formData.description || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Sayfa oluşturulamadı')
      }

      await fetchPages()
      setFormData({ slug: '', label: '', path: '', description: '' })
      setShowAddForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu sayfayı silmek istediğinizden emin misiniz?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Sayfa silinemedi')
      }

      await fetchPages()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Bir hata oluştu')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Sayfa Yönetimi
          </h1>
          <p className="text-gray-600">Sayfalarınızı düzenleyin veya yeni sayfa oluşturun</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center gap-2"
        >
          <RiAddLine className="w-5 h-5" />
          Yeni Sayfa
        </button>
      </div>

      {/* Add Page Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold mb-4">Yeni Sayfa Oluştur</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="ornek-sayfa"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Sadece küçük harf, rakam ve tire</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Path (Yol) *
                </label>
                <input
                  type="text"
                  value={formData.path}
                  onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="/ornek-sayfa"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">/ ile başlamalı</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sayfa Adı *
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Örnek Sayfa"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Sayfa açıklaması (opsiyonel)"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                Oluştur
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setFormData({ slug: '', label: '', path: '', description: '' })
                  setError('')
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Default Pages */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Varsayılan Sayfalar</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultPages.map((page) => (
            <Link
              key={page.slug}
              href={`/admin/pages/${page.slug}`}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FF7F00]/10 flex items-center justify-center">
                    <RiFileLine className="w-6 h-6 text-[#FF7F00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{page.label}</h3>
                    <p className="text-sm text-gray-500">{page.path}</p>
                  </div>
                </div>
                <RiEditLine className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Custom Pages */}
      {pages.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Özel Sayfalar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <div
                key={page.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#3D8C40]/10 flex items-center justify-center">
                      <RiFileLine className="w-6 h-6 text-[#3D8C40]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{page.label}</h3>
                      <p className="text-sm text-gray-500">{page.path}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="flex-1 btn-secondary text-center text-sm py-2"
                  >
                    <RiEditLine className="w-4 h-4 inline mr-1" />
                    Düzenle
                  </Link>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                  >
                    <RiDeleteBinLine className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
