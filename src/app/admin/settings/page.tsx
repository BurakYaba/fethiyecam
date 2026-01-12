'use client'

import { useState, useEffect } from 'react'
import { RiSaveLine } from '@remixicon/react'
import ImageUpload, { ImageUploadRef } from '@/components/admin/ImageUpload'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { useRef } from 'react'

interface Setting {
  key: string
  value: string
  type: string
  group: string | null
}

const TABS = [
  { id: 'header', label: 'Header' },
  { id: 'footer', label: 'Footer' },
  { id: 'contact', label: 'İletişim' },
  { id: 'social', label: 'Sosyal Medya' },
  { id: 'seo', label: 'SEO' },
  { id: 'theme', label: 'Tema' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('header')
  const [settings, setSettings] = useState<Record<string, Setting>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const logoUploadRef = useRef<ImageUploadRef>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const grouped = await response.json()
        const flat: Record<string, Setting> = {}
        Object.values(grouped).forEach((group: any) => {
          if (Array.isArray(group)) {
            group.forEach((setting: Setting) => {
              flat[setting.key] = setting
            })
          }
        })
        setSettings(flat)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSetting = (key: string, value: string, type: string, group?: string) => {
    setSettings({
      ...settings,
      [key]: {
        key,
        value,
        type,
        group: group || settings[key]?.group || null,
      },
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Upload logo if there's a new one
      if (logoUploadRef.current && activeTab === 'header') {
        try {
          const logoId = await logoUploadRef.current.uploadFile()
          if (logoId) {
            updateSetting('header.logo', logoId, 'image', 'header')
          }
        } catch (error) {
          console.error('Failed to upload logo:', error)
        }
      }

      // Save all settings
      const settingsArray = Object.values(settings).map((s) => ({
        key: s.key,
        value: s.value,
        type: s.type,
        group: s.group,
      }))

      const response = await fetch('/api/admin/settings/bulk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsArray),
      })

      if (response.ok) {
        alert('Ayarlar kaydedildi!')
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Ayarlar kaydedilirken bir hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  const getSetting = (key: string, defaultValue = '') => {
    return settings[key]?.value || defaultValue
  }

  if (loading) {
    return <div className="p-8">Yükleniyor...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Site Ayarları
        </h1>
        <p className="text-gray-600">Site genelinde kullanılan ayarları yönetin</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200 flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#FF7F00] text-[#FF7F00]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'header' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <ImageUpload
                  ref={logoUploadRef}
                  value={getSetting('header.logo') || null}
                  onChange={(url) => updateSetting('header.logo', url || '', 'image', 'header')}
                  onFileIdChange={(fileId) =>
                    updateSetting('header.logo', fileId || '', 'image', 'header')
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="text"
                  value={getSetting('header.phone', '+905301207848')}
                  onChange={(e) =>
                    updateSetting('header.phone', e.target.value, 'text', 'header')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Metni
                </label>
                <input
                  type="text"
                  value={getSetting('header.ctaText', 'Teklif Al')}
                  onChange={(e) =>
                    updateSetting('header.ctaText', e.target.value, 'text', 'header')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Link
                </label>
                <input
                  type="text"
                  value={getSetting('header.ctaLink', '/iletisim')}
                  onChange={(e) =>
                    updateSetting('header.ctaLink', e.target.value, 'text', 'header')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şirket Açıklaması
                </label>
                <RichTextEditor
                  content={getSetting('footer.companyDescription')}
                  onChange={(html) =>
                    updateSetting('footer.companyDescription', html, 'richText', 'footer')
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <textarea
                  value={getSetting('footer.address', 'Tuzla, İnönü Blv. No:1/1 EA\n48300 Fethiye/Muğla')}
                  onChange={(e) =>
                    updateSetting('footer.address', e.target.value, 'text', 'footer')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="text"
                  value={getSetting('footer.phone', '+905301207848')}
                  onChange={(e) =>
                    updateSetting('footer.phone', e.target.value, 'text', 'footer')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  value={getSetting('footer.email', 'info@fethiyecam.com')}
                  onChange={(e) =>
                    updateSetting('footer.email', e.target.value, 'text', 'footer')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="text"
                  value={getSetting('contact.phone', '+905301207848')}
                  onChange={(e) =>
                    updateSetting('contact.phone', e.target.value, 'text', 'contact')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  value={getSetting('contact.email', 'info@fethiyecam.com')}
                  onChange={(e) =>
                    updateSetting('contact.email', e.target.value, 'text', 'contact')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <textarea
                  value={getSetting('contact.address', 'Tuzla, İnönü Blv. No:1/1 EA\n48300 Fethiye/Muğla')}
                  onChange={(e) =>
                    updateSetting('contact.address', e.target.value, 'text', 'contact')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={getSetting('footer.social.facebook', '#')}
                  onChange={(e) =>
                    updateSetting('footer.social.facebook', e.target.value, 'text', 'social')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={getSetting('footer.social.instagram', '#')}
                  onChange={(e) =>
                    updateSetting('footer.social.instagram', e.target.value, 'text', 'social')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={getSetting('footer.social.twitter', '#')}
                  onChange={(e) =>
                    updateSetting('footer.social.twitter', e.target.value, 'text', 'social')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={getSetting('footer.social.linkedin', '#')}
                  onChange={(e) =>
                    updateSetting('footer.social.linkedin', e.target.value, 'text', 'social')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Başlığı
                </label>
                <input
                  type="text"
                  value={getSetting('seo.title', 'Fethiye Cam Temizleme')}
                  onChange={(e) =>
                    updateSetting('seo.title', e.target.value, 'text', 'seo')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Açıklama
                </label>
                <textarea
                  value={getSetting('seo.description', 'Fethiye\'de profesyonel cam temizlik hizmetleri')}
                  onChange={(e) =>
                    updateSetting('seo.description', e.target.value, 'text', 'seo')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birincil Renk
                </label>
                <input
                  type="color"
                  value={getSetting('theme.primaryColor', '#FF7F00')}
                  onChange={(e) =>
                    updateSetting('theme.primaryColor', e.target.value, 'text', 'theme')
                  }
                  className="w-full h-12 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İkincil Renk
                </label>
                <input
                  type="color"
                  value={getSetting('theme.secondaryColor', '#3D8C40')}
                  onChange={(e) =>
                    updateSetting('theme.secondaryColor', e.target.value, 'text', 'theme')
                  }
                  className="w-full h-12 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            <RiSaveLine className="w-4 h-4" />
            {saving ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet'}
          </button>
        </div>
      </div>
    </div>
  )
}
