'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { RiArrowLeftLine, RiSaveLine } from '@remixicon/react'
import Link from 'next/link'

export default function EditFAQPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
  })

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await fetch(`/api/admin/faq/${id}`)
        if (!response.ok) {
          throw new Error('Soru bulunamadı')
        }
        const faq = await response.json()
        setFormData({
          question: faq.question,
          answer: faq.answer,
          order: faq.order,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchFAQ()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const response = await fetch(`/api/admin/faq/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: formData.question,
          answer: formData.answer,
          order: formData.order,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Güncelleme başarısız')
      }

      router.push('/admin/faq')
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
          href="/admin/faq"
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <RiArrowLeftLine className="w-5 h-5" />
        </Link>
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Soruyu Düzenle
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
            Soru <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:border-transparent"
          />
        </div>

        <RichTextEditor
          content={formData.answer}
          onChange={(html) => setFormData({ ...formData, answer: html })}
          label="Cevap"
          required
        />

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <Link href="/admin/faq" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
