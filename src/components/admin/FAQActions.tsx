'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RiEditLine, RiDeleteBinLine } from '@remixicon/react'

interface FAQActionsProps {
  faqId: string
}

export default function FAQActions({ faqId }: FAQActionsProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) {
      return
    }

    setDeleting(true)
    try {
      const response = await fetch(`/api/admin/faq/${faqId}`, {
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
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin/faq/${faqId}`}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
      >
        <RiEditLine className="w-4 h-4" />
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
      >
        <RiDeleteBinLine className="w-4 h-4" />
      </button>
    </div>
  )
}
