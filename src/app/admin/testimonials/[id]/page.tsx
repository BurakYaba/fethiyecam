'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'
import { RiArrowLeftLine, RiSaveLine } from '@remixicon/react'
import Link from 'next/link'
import { stripHtmlTags } from '@/lib/utils'

export default function EditTestimonialPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const avatarFileRef = useRef<File | null>(null)
  const [formData, setFormData] = useState({
    quote: '',
    name: '',
    role: '',
    avatarId: null as string | null,
    avatarUrl: null as string | null,
    avatarFile: null as File | null,
    rating: 5,
    order: 0,
  })

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch(`/api/admin/testimonials/${id}`)
        if (!response.ok) {
          throw new Error('Referans bulunamadı')
        }
        const testimonial = await response.json()
        setFormData({
          quote: stripHtmlTags(testimonial.quote), // Strip HTML tags when loading
          name: testimonial.name,
          role: testimonial.role,
          avatarId: testimonial.avatarId,
          avatarUrl: testimonial.avatar?.url || null,
          avatarFile: null,
          rating: testimonial.rating,
          order: testimonial.order,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTestimonial()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      let avatarId = formData.avatarId

      // Upload image if a new file was selected (check both state and ref)
      const fileToUpload = formData.avatarFile || avatarFileRef.current
      if (fileToUpload) {
        const formDataUpload = new FormData()
        formDataUpload.append('file', fileToUpload)

        const uploadResponse = await fetch('/api/admin/media/upload', {
          method: 'POST',
          body: formDataUpload,
        })

        if (!uploadResponse.ok) {
          const data = await uploadResponse.json()
          throw new Error(data.error || 'Resim yükleme başarısız')
        }

        const uploadData = await uploadResponse.json()
        avatarId = uploadData.id
      }

      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote: formData.quote,
          name: formData.name,
          role: formData.role,
          avatarId,
          rating: formData.rating,
          order: formData.order,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Güncelleme başarısız')
      }

      router.push('/admin/testimonials')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7F00]"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/testimonials"
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <RiArrowLeftLine className="w-5 h-5" />
        </Link>
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Referansı Düzenle
          </h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İsim <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rol <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yorum <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:border-transparent resize-y"
            placeholder="Müşteri yorumunu buraya yazın..."
          />
        </div>

        <ImageUpload
          value={formData.avatarUrl}
          onChange={(url) => setFormData({ ...formData, avatarUrl: url })}
          onFileIdChange={(id) => setFormData({ ...formData, avatarId: id })}
          onFileChange={(file) => {
            avatarFileRef.current = file
            setFormData({ ...formData, avatarFile: file })
          }}
          label="Avatar Resmi"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Puan (1-5) <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:border-transparent"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Yıldız
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <Link href="/admin/testimonials" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            İptal
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RiSaveLine className="w-5 h-5" />
            <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
