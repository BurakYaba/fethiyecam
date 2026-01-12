'use client'

import { useState, useEffect } from 'react'
import { RiSaveLine } from '@remixicon/react'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload, { ImageUploadRef } from '@/components/admin/ImageUpload'
import { useRef } from 'react'

interface ContentBlock {
  id: string
  type: string
  page: string | null
  title: string | null
  subtitle: string | null
  content: string | null
  imageId: string | null
  image: {
    url: string
  } | null
  order: number
  visible: boolean
  config: Record<string, any> | null
}

interface BlockEditorProps {
  block: ContentBlock
  onSave: (data: Partial<ContentBlock>) => void
  onCancel: () => void
  saving: boolean
}

export default function BlockEditor({ block, onSave, onCancel, saving }: BlockEditorProps) {
  const [formData, setFormData] = useState({
    title: block.title || '',
    subtitle: block.subtitle || '',
    content: block.content || '',
    imageId: block.imageId || null,
    config: block.config || {},
  })

  const imageUploadRef = useRef<ImageUploadRef>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Upload image if there's a new one, otherwise keep existing imageId
    let imageId = block.imageId || formData.imageId
    if (imageUploadRef.current) {
      try {
        const uploadedImageId = await imageUploadRef.current.uploadFile()
        if (uploadedImageId) {
          imageId = uploadedImageId
        }
      } catch (error) {
        console.error('Failed to upload image:', error)
        // If upload fails but we have an existing image, keep it
        if (!imageId && block.imageId) {
          imageId = block.imageId
        }
      }
    }

    onSave({
      title: formData.title || null,
      subtitle: formData.subtitle || null,
      content: formData.content || null,
      imageId,
      config: formData.config,
    })
  }

  // Render type-specific fields
  const renderTypeSpecificFields = () => {
    switch (block.type) {
      case 'hero':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA Metni
              </label>
              <input
                type="text"
                value={formData.config?.ctaText || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    config: { ...formData.config, ctaText: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Ücretsiz Teklif Al"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA Link
              </label>
              <input
                type="text"
                value={formData.config?.ctaLink || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    config: { ...formData.config, ctaLink: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="/iletisim"
              />
            </div>
          </>
        )

      case 'about':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İçerik
            </label>
            <RichTextEditor
              content={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
            />
          </div>
        )

      case 'cta':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İçerik
              </label>
              <RichTextEditor
                content={formData.content || ''}
                onChange={(html) => setFormData({ ...formData, content: html })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <input
                type="email"
                value={formData.config?.email || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    config: { ...formData.config, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="info@example.com"
              />
            </div>
          </>
        )

      case 'custom':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HTML İçerik
              </label>
              <RichTextEditor
                content={formData.content || ''}
                onChange={(html) => setFormData({ ...formData, content: html })}
              />
            </div>
            
            {/* Layout Options */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Düzen Seçenekleri</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arka Plan Rengi
                  </label>
                  <select
                    value={formData.config?.backgroundColor || 'white'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, backgroundColor: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="white">Beyaz</option>
                    <option value="cream">Krem</option>
                    <option value="gray">Gri</option>
                    <option value="green">Yeşil</option>
                    <option value="transparent">Şeffaf</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metin Hizalaması
                  </label>
                  <select
                    value={formData.config?.textAlign || 'left'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, textAlign: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="left">Sol</option>
                    <option value="center">Orta</option>
                    <option value="right">Sağ</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genişlik
                  </label>
                  <select
                    value={formData.config?.width || 'container'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, width: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="container">Konteyner (Sınırlı)</option>
                    <option value="full">Tam Genişlik</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İçerik Maksimum Genişlik
                  </label>
                  <select
                    value={formData.config?.contentMaxWidth || 'full'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, contentMaxWidth: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="full">Tam Genişlik</option>
                    <option value="wide">Geniş (1200px)</option>
                    <option value="medium">Orta (900px)</option>
                    <option value="narrow">Dar (600px)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Padding
                  </label>
                  <select
                    value={formData.config?.padding || 'normal'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, padding: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="none">Yok</option>
                    <option value="small">Küçük</option>
                    <option value="normal">Normal</option>
                    <option value="large">Büyük</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Margin (Dış Boşluk)
                  </label>
                  <select
                    value={formData.config?.margin || 'normal'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, margin: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="none">Yok</option>
                    <option value="small">Küçük</option>
                    <option value="normal">Normal</option>
                    <option value="large">Büyük</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Köşe Yuvarlaklığı
                  </label>
                  <select
                    value={formData.config?.borderRadius || 'medium'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, borderRadius: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="none">Yok</option>
                    <option value="small">Küçük</option>
                    <option value="medium">Orta</option>
                    <option value="large">Büyük</option>
                    <option value="full">Tam Yuvarlak</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gölge
                  </label>
                  <select
                    value={formData.config?.shadow || 'none'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, shadow: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="none">Yok</option>
                    <option value="sm">Küçük</option>
                    <option value="md">Orta</option>
                    <option value="lg">Büyük</option>
                    <option value="xl">Çok Büyük</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Image Options */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Resim Seçenekleri</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resim Konumu
                </label>
                <select
                  value={formData.config?.imagePosition || 'none'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      config: { ...formData.config, imagePosition: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="none">Resim Yok</option>
                  <option value="background">Arka Plan</option>
                  <option value="top">Üstte</option>
                  <option value="left">Solda</option>
                  <option value="right">Sağda</option>
                  <option value="bottom">Altta</option>
                </select>
              </div>
              
              {formData.config?.imagePosition === 'background' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arka Plan Overlay Opaklığı: {formData.config?.overlayOpacity || 40}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    step="5"
                    value={formData.config?.overlayOpacity || 40}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, overlayOpacity: parseInt(e.target.value) },
                      })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0% (Şeffaf)</span>
                    <span>80% (Koyu)</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Content Layout */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">İçerik Düzeni</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sütun Düzeni
                </label>
                <select
                  value={formData.config?.columns || 'single'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      config: { ...formData.config, columns: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="single">Tek Sütun</option>
                  <option value="two">İki Sütun</option>
                  <option value="three">Üç Sütun</option>
                </select>
              </div>
            </div>
            
            {/* Buttons/CTAs */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Butonlar / CTA</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birinci Buton Metni
                  </label>
                  <input
                    type="text"
                    value={formData.config?.button1Text || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, button1Text: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Buton metni (opsiyonel)"
                  />
                </div>
                
                {formData.config?.button1Text && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Birinci Buton Link
                      </label>
                      <input
                        type="text"
                        value={formData.config?.button1Link || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            config: { ...formData.config, button1Link: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="/iletisim"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Birinci Buton Stili
                      </label>
                      <select
                        value={formData.config?.button1Style || 'primary'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            config: { ...formData.config, button1Style: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="primary">Birincil (Turuncu)</option>
                        <option value="secondary">İkincil (Çerçeveli)</option>
                      </select>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İkinci Buton Metni
                  </label>
                  <input
                    type="text"
                    value={formData.config?.button2Text || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, button2Text: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Buton metni (opsiyonel)"
                  />
                </div>
                
                {formData.config?.button2Text && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        İkinci Buton Link
                      </label>
                      <input
                        type="text"
                        value={formData.config?.button2Link || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            config: { ...formData.config, button2Link: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="/iletisim"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        İkinci Buton Stili
                      </label>
                      <select
                        value={formData.config?.button2Style || 'secondary'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            config: { ...formData.config, button2Style: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="primary">Birincil (Turuncu)</option>
                        <option value="secondary">İkincil (Çerçeveli)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Advanced Options */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Gelişmiş Seçenekler</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özel CSS Sınıfları
                </label>
                <input
                  type="text"
                  value={formData.config?.customClasses || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      config: { ...formData.config, customClasses: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="custom-class-1 custom-class-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Ekstra CSS sınıfları eklemek için (boşlukla ayırın)
                </p>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Embed (YouTube/Vimeo URL)
                </label>
                <input
                  type="text"
                  value={formData.config?.videoUrl || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      config: { ...formData.config, videoUrl: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  YouTube veya Vimeo video URL'si (içerik yerine gösterilir)
                </p>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlık İkonu (RemixIcon adı)
                </label>
                <input
                  type="text"
                  value={formData.config?.titleIcon || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      config: { ...formData.config, titleIcon: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="RiSparklingFill"
                />
                <p className="text-xs text-gray-500 mt-1">
                  RemixIcon bileşen adı (örn: RiSparklingFill, RiCheckLine)
                </p>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Animasyon
                </label>
                <select
                  value={formData.config?.animation || 'none'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      config: { ...formData.config, animation: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="none">Yok</option>
                  <option value="fadeIn">Fade In</option>
                  <option value="slideUp">Slide Up</option>
                  <option value="slideDown">Slide Down</option>
                </select>
              </div>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Başlık
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Blok başlığı"
        />
      </div>

      {block.type !== 'about' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt Başlık
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Alt başlık (opsiyonel)"
          />
        </div>
      )}

      {(block.type === 'hero' || block.type === 'about' || block.type === 'cta' || block.type === 'custom') && (
        <ImageUpload
          ref={imageUploadRef}
          value={block.image?.url || null}
          onChange={(url) => {
            // Preview URL changed (either from existing image or new file selection)
            // The actual imageId will be set via onFileIdChange when uploadFile is called
          }}
          onFileIdChange={(fileId) => {
            // Update formData with the new imageId when file is uploaded
            setFormData((prev) => ({ ...prev, imageId: fileId }))
          }}
          label={block.type === 'custom' ? "Arka Plan Resmi veya İçerik Resmi" : "Resim"}
        />
      )}

      {renderTypeSpecificFields()}

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          <RiSaveLine className="w-4 h-4" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          İptal
        </button>
      </div>
    </form>
  )
}
