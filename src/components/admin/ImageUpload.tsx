'use client'

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { RiUploadLine, RiCloseLine, RiImageLine } from '@remixicon/react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'
import { upload } from '@vercel/blob/client'

interface ImageUploadProps {
  value?: string | null
  onChange: (url: string | null) => void
  onFileIdChange?: (fileId: string | null) => void
  onFileChange?: (file: File | null) => void
  label?: string
  required?: boolean
}

export interface ImageUploadRef {
  uploadFile: () => Promise<string | null> // Returns media file ID
}

const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(
  (
    {
      value,
      onChange,
      onFileIdChange,
      onFileChange,
      label = 'Resim',
      required = false,
    },
    ref
  ) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(value || null)
    const [error, setError] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
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

    // Remove file size limit - we'll optimize in browser
    // Large files will be compressed before upload

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

  // Expose upload method via ref
  useImperativeHandle(ref, () => ({
    uploadFile: async (): Promise<string | null> => {
      if (!selectedFile) {
        return null
      }

      setUploading(true)
      setError(null)

      try {
        // Optimize image in browser
        const options = {
          maxSizeMB: 2, // Target size after compression
          maxWidthOrHeight: 1600,
          useWebWorker: true,
          fileType: 'image/webp',
          initialQuality: 0.85,
        }

        const compressedFile = await imageCompression(selectedFile, options)

        // Generate filename
        const timestamp = Date.now()
        const originalName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')
        const filename = `uploads/${timestamp}-${nameWithoutExt}.webp`

        // Upload directly to Vercel Blob
        const blob = await upload(filename, compressedFile, {
          access: 'public',
          handleUploadUrl: '/api/admin/media/upload-token',
        })

        // Save media file record immediately (webhook will update dimensions later)
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
        const fileId = mediaData.id

        // Update preview to use the uploaded URL
        setPreview(blob.url)
        onChange(blob.url)
        if (onFileIdChange) {
          onFileIdChange(fileId)
        }

        setUploading(false)
        return fileId
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Resim yükleme başarısız'
        setError(errorMessage)
        setUploading(false)
        throw err
      }
    },
  }))

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
            <p className="text-xs text-gray-500">Herhangi bir boyut (otomatik optimize edilecek)</p>
            {selectedFile && (
              <p className="text-xs text-blue-600 mt-2">
                ✓ Resim seçildi (kaydet butonuna tıkladığınızda yüklenecek)
              </p>
            )}
            {uploading && (
              <p className="text-xs text-blue-600 mt-2">
                ⏳ Resim yükleniyor...
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
})

ImageUpload.displayName = 'ImageUpload'

export default ImageUpload
