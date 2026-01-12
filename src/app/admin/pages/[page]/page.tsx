'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DragEndEvent } from '@dnd-kit/core'
import DragDropProvider from '@/components/admin/page-builder/DragDropProvider'
import BlockLibrary from '@/components/admin/page-builder/BlockLibrary'
import BlockList from '@/components/admin/page-builder/BlockList'
import BlockEditor from '@/components/admin/page-builder/BlockEditor'
import { RiSaveLine, RiCloseLine } from '@remixicon/react'

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

const PAGE_NAMES: Record<string, string> = {
  home: 'Ana Sayfa',
  about: 'Hakkımızda',
  services: 'Hizmetler',
  blog: 'Blog',
  gallery: 'Galeri',
  faq: 'SSS',
  contact: 'İletişim',
}

export default function PageBuilderPage() {
  const params = useParams()
  const router = useRouter()
  const page = params.page as string

  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBlocks()
  }, [page])

  const fetchBlocks = async () => {
    try {
      const response = await fetch(`/api/admin/content-blocks?page=${page}`)
      if (response.ok) {
        const data = await response.json()
        setBlocks(data)
      }
    } catch (error) {
      console.error('Failed to fetch blocks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBlock = async (type: string) => {
    try {
      const response = await fetch('/api/admin/content-blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          page,
          order: blocks.length,
          visible: true,
        }),
      })

      if (response.ok) {
        const newBlock = await response.json()
        setBlocks([...blocks, newBlock])
        setEditingBlock(newBlock)
      }
    } catch (error) {
      console.error('Failed to create block:', error)
    }
  }

  const handleEdit = (id: string) => {
    const block = blocks.find((b) => b.id === id)
    if (block) {
      setEditingBlock(block)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu bloğu silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/content-blocks/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setBlocks(blocks.filter((b) => b.id !== id))
        if (editingBlock?.id === id) {
          setEditingBlock(null)
        }
      }
    } catch (error) {
      console.error('Failed to delete block:', error)
    }
  }

  const handleToggleVisible = async (id: string) => {
    const block = blocks.find((b) => b.id === id)
    if (!block) return

    try {
      const response = await fetch(`/api/admin/content-blocks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visible: !block.visible,
        }),
      })

      if (response.ok) {
        setBlocks(
          blocks.map((b) => (b.id === id ? { ...b, visible: !b.visible } : b))
        )
      }
    } catch (error) {
      console.error('Failed to toggle visibility:', error)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = blocks.findIndex((b) => b.id === active.id)
    const newIndex = blocks.findIndex((b) => b.id === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    const newBlocks = [...blocks]
    const [movedBlock] = newBlocks.splice(oldIndex, 1)
    newBlocks.splice(newIndex, 0, movedBlock)

    // Update order values
    const reorderedBlocks = newBlocks.map((block, index) => ({
      ...block,
      order: index,
    }))

    setBlocks(reorderedBlocks)

    // Save new order to database
    try {
      await fetch('/api/admin/content-blocks/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          reorderedBlocks.map((b) => ({ id: b.id, order: b.order }))
        ),
      })
    } catch (error) {
      console.error('Failed to reorder blocks:', error)
    }
  }

  const handleSaveBlock = async (blockData: Partial<ContentBlock>) => {
    if (!editingBlock) return

    setSaving(true)
    try {
      const response = await fetch(`/api/admin/content-blocks/${editingBlock.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blockData),
      })

      if (response.ok) {
        const updatedBlock = await response.json()
        setBlocks(blocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b)))
        setEditingBlock(null)
      }
    } catch (error) {
      console.error('Failed to save block:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      {/* Left Sidebar - Block Library */}
      <div className="w-80 flex-shrink-0">
        <div className="mb-4">
          <button
            onClick={() => router.push('/admin/pages')}
            className="text-gray-600 hover:text-gray-900 mb-4"
          >
            ← Geri
          </button>
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {PAGE_NAMES[page] || page}
          </h1>
        </div>
        <BlockLibrary onAddBlock={handleAddBlock} />
      </div>

      {/* Center - Block List */}
      <div className="flex-1 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bloklar</h2>
        </div>
        <DragDropProvider items={blocks} onDragEnd={handleDragEnd}>
          <BlockList
            blocks={blocks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleVisible={handleToggleVisible}
          />
        </DragDropProvider>
      </div>

      {/* Right Sidebar - Block Editor */}
      {editingBlock && (
        <div className="w-96 flex-shrink-0 border-l border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Blok Düzenle</h3>
            <button
              onClick={() => setEditingBlock(null)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100vh-200px)]">
            <BlockEditor
              block={editingBlock}
              onSave={handleSaveBlock}
              onCancel={() => setEditingBlock(null)}
              saving={saving}
            />
          </div>
        </div>
      )}
    </div>
  )
}
