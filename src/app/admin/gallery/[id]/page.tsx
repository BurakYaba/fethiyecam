'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload, { ImageUploadRef } from '@/components/admin/ImageUpload'
import { RiArrowLeftLine, RiSaveLine, RiAddLine, RiDeleteBinLine } from '@remixicon/react'
import Link from 'next/link'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'
import { upload } from '@vercel/blob/client'

export default function EditGalleryPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [album, setAlbum] = useState<any>(null)
  const coverImageUploadRef = useRef<ImageUploadRef>(null)
  const [formData, setFormData] = useState({
    title: '',
    coverImageId: null as string | null,
    coverImageUrl: null as string | null,
  })

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`/api/admin/gallery/${id}`)
        if (!response.ok) {
          throw new Error('Albüm bulunamadı')
        }
        const data = await response.json()
        setAlbum(data)
        setFormData({
          title: data.title,
          coverImageId: data.coverImageId,
          coverImageUrl: data.coverImage?.url || null,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchAlbum()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      let coverImageId = formData.coverImageId

      // Upload image if a new file was selected
      if (coverImageUploadRef.current) {
        try {
          const uploadedFileId = await coverImageUploadRef.current.uploadFile()
          if (uploadedFileId) {
            coverImageId = uploadedFileId
          }
        } catch (uploadError) {
          throw new Error(
            uploadError instanceof Error
              ? uploadError.message
              : 'Resim yükleme başarısız'
          )
        }
      }

      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          coverImageId,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Güncelleme başarısız')
      }

      const updated = await response.json()
      setAlbum(updated)
      alert('Albüm güncellendi!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      // Upload all files using client-side upload
      const uploadPromises = Array.from(files).map(async (file) => {
        // Optimize image in browser
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1600,
          useWebWorker: true,
          fileType: 'image/webp',
          initialQuality: 0.85,
        }

        const compressedFile = await imageCompression(file, options)

        // Generate filename
        const timestamp = Date.now()
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')
        const filename = `uploads/${timestamp}-${nameWithoutExt}.webp`

        // Upload directly to Vercel Blob
        const blob = await upload(filename, compressedFile, {
          access: 'public',
          handleUploadUrl: '/api/admin/media/upload-token',
        })

        // Save media file record immediately
        const saveResponse = await fetch('/api/admin/media/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: blob.url,
            blobId: blob.pathname,
            filename: filename.split('/').pop() || 'image.webp',
            size: compressedFile.size,
          }),
        })

        if (!saveResponse.ok) {
          throw new Error('Failed to save media file record')
        }

        const mediaData = await saveResponse.json()
        return { id: mediaData.id, url: blob.url }
      })

      const uploadedImages = await Promise.all(uploadPromises)

      // Add all images to album
      const addPromises = uploadedImages.map((data) =>
        fetch(`/api/admin/gallery/${id}/images`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageId: data.id,
          }),
        })
      )

      await Promise.all(addPromises)

      router.refresh()
      // Refetch album
      const albumResponse = await fetch(`/api/admin/gallery/${id}`)
      if (albumResponse.ok) {
        setAlbum(await albumResponse.json())
      }
    } catch (err) {
      alert('Resim yükleme başarısız')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Bu resmi silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/gallery/images/${imageId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
        // Refetch album
        const albumResponse = await fetch(`/api/admin/gallery/${id}`)
        if (albumResponse.ok) {
          setAlbum(await albumResponse.json())
        }
      }
    } catch (err) {
      alert('Silme işlemi başarısız')
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
          href="/admin/gallery"
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <RiArrowLeftLine className="w-5 h-5" />
        </Link>
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Galeri Albümünü Düzenle
          </h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Albüm Başlığı <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:border-transparent"
          />
        </div>

        <ImageUpload
          ref={coverImageUploadRef}
          value={formData.coverImageUrl}
          onChange={(url) => setFormData({ ...formData, coverImageUrl: url })}
          onFileIdChange={(id) => setFormData({ ...formData, coverImageId: id })}
          label="Kapak Resmi"
        />

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
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

      {/* Images Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Albüm Resimleri
          </h2>
          <label className="btn-primary cursor-pointer">
            <RiAddLine className="w-5 h-5" />
            <span>Resim Ekle</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                handleImageUpload(e.target.files)
              }}
              disabled={uploading}
            />
          </label>
        </div>

        {uploading && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
            Resimler yükleniyor...
          </div>
        )}

        {album?.images && album.images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {album.images.map((img: any) => (
              <div key={img.id} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={img.image.url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <button
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <RiDeleteBinLine className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Henüz resim eklenmemiş. Resim eklemek için yukarıdaki butonu kullanın.
          </div>
        )}
      </div>
    </div>
  )
}
