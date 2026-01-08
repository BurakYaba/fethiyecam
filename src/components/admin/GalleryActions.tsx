'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RiEditLine, RiDeleteBinLine } from '@remixicon/react'

interface GalleryActionsProps {
  albumId: string
}

export default function GalleryActions({ albumId }: GalleryActionsProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Bu albümü silmek istediğinize emin misiniz?')) {
      return
    }

    setDeleting(true)
    try {
      const response = await fetch(`/api/admin/gallery/${albumId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Silme işlemi başarısız oldu')
      }
    } catch (error) {
      alert('Bir hata oluştu')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/gallery/${albumId}`}
        className="flex-1 px-4 py-2 bg-[#FF7F00] text-white rounded-lg hover:bg-[#E67000] transition-colors text-center text-sm font-medium"
      >
        <RiEditLine className="w-4 h-4 inline mr-1" />
        Düzenle
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 text-sm font-medium"
      >
        <RiDeleteBinLine className="w-4 h-4 inline mr-1" />
        Sil
      </button>
    </div>
  )
}
