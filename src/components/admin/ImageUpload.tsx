'use client'

import { useState, useRef, useEffect } from 'react'
import { RiUploadLine, RiCloseLine, RiImageLine } from '@remixicon/react'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string | null
  onChange: (url: string | null) => void
  onFileIdChange?: (fileId: string | null) => void
  onFileChange?: (file: File | null) => void
  label?: string
  required?: boolean
}

export default function ImageUpload({
  value,
  onChange,
  onFileIdChange,
  onFileChange,
  label = 'Resim',
  required = false,
}: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(value || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update preview when value changes (e.g., when editing existing content)
  useEffect(() => {
    if (value && !selectedFile) {
      setPreview(value)
    }
  }, [value, selectedFile])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Sadece resim dosyaları yüklenebilir')
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Dosya boyutu 10MB\'dan küçük olmalıdır')
      return
    }

    setError(null)
    setSelectedFile(file)

    // Create local preview URL
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    onChange(objectUrl)

    // Notify parent component about the file
    if (onFileChange) {
      onFileChange(file)
    }

    // Clear fileId since we have a new file
    if (onFileIdChange) {
      onFileIdChange(null)
    }

    // Clean up input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = () => {
    // Clean up object URL if it was created from a file
    if (selectedFile && preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview)
    }
    
    setSelectedFile(null)
    setPreview(null)
    onChange(null)
    if (onFileIdChange) {
      onFileIdChange(null)
    }
    if (onFileChange) {
      onFileChange(null)
    }
  }

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {preview ? (
        <div className="relative group">
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
            {preview.startsWith('blob:') ? (
              // Use regular img tag for blob URLs (Next.js Image doesn't support blob:)
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <RiCloseLine className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#FF7F00] transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <RiImageLine className="w-12 h-12 text-gray-400" />
            <p className="text-sm text-gray-600">
              Resim seçmek için tıklayın veya sürükleyin
            </p>
            <p className="text-xs text-gray-500">Maksimum 10MB</p>
            {selectedFile && (
              <p className="text-xs text-blue-600 mt-2">
                ✓ Resim seçildi (kaydet butonuna tıkladığınızda yüklenecek)
              </p>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
