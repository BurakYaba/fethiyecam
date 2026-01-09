'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload, { ImageUploadRef } from '@/components/admin/ImageUpload'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { RiArrowLeftLine, RiSaveLine } from '@remixicon/react'
import Link from 'next/link'

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const imageUploadRef = useRef<ImageUploadRef>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageId: null as string | null,
    imageUrl: null as string | null,
    featured: false,
    publishedAt: '',
  })

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/blog/${id}`)
        if (!response.ok) {
          throw new Error('Yazı bulunamadı')
        }
        const post = await response.json()
        setFormData({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content || '',
          imageId: post.imageId,
          imageUrl: post.image?.url || null,
          featured: post.featured,
          publishedAt: post.publishedAt
            ? new Date(post.publishedAt).toISOString().slice(0, 10)
            : '',
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      let imageId = formData.imageId

      // Upload image if a new file was selected
      if (imageUploadRef.current) {
        try {
          const uploadedFileId = await imageUploadRef.current.uploadFile()
          if (uploadedFileId) {
            imageId = uploadedFileId
          }
        } catch (uploadError) {
          throw new Error(
            uploadError instanceof Error
              ? uploadError.message
              : 'Resim yükleme başarısız'
          )
        }
      }

      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          imageId,
          featured: formData.featured,
          publishedAt: formData.publishedAt || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Güncelleme başarısız')
      }

      router.push('/admin/blog')
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
          href="/admin/blog"
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <RiArrowLeftLine className="w-5 h-5" />
        </Link>
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Blog Yazısını Düzenle
          </h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Başlık <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:border-transparent"
            placeholder="Blog yazısı başlığı"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Özet <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:border-transparent"
            placeholder="Kısa özet..."
          />
        </div>

        <ImageUpload
          ref={imageUploadRef}
          value={formData.imageUrl}
          onChange={(url) => setFormData({ ...formData, imageUrl: url })}
          onFileIdChange={(id) => setFormData({ ...formData, imageId: id })}
          label="Öne Çıkan Resim"
        />

        <RichTextEditor
          content={formData.content}
          onChange={(html) => setFormData({ ...formData, content: html })}
          label="İçerik"
          required
        />

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-[#FF7F00] border-gray-300 rounded focus:ring-[#FF7F00]"
            />
            <span className="text-sm font-medium text-gray-700">Öne Çıkan Yazı</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yayın Tarihi
          </label>
          <input
            type="date"
            value={formData.publishedAt}
            onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:border-transparent"
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <Link href="/admin/blog" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
