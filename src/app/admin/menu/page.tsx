'use client'

import { useState, useEffect } from 'react'
import { DragEndEvent } from '@dnd-kit/core'
import DragDropProvider from '@/components/admin/page-builder/DragDropProvider'
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiDragMoveLine } from '@remixicon/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface MenuItem {
  id: string
  label: string
  href: string
  order: number
  parentId: string | null
  children: MenuItem[]
}

function SortableMenuItem({
  item,
  onEdit,
  onDelete,
  onAddChild,
}: {
  item: MenuItem
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onAddChild: (parentId: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-white rounded-lg border border-gray-200 p-4 mb-2">
      <div className="flex items-center gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <RiDragMoveLine className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{item.label}</div>
          <div className="text-sm text-gray-500">{item.href}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddChild(item.id)}
            className="p-2 text-gray-400 hover:text-[#FF7F00]"
            title="Alt Menü Ekle"
          >
            <RiAddLine className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(item.id)}
            className="p-2 text-gray-400 hover:text-[#FF7F00]"
            title="Düzenle"
          >
            <RiEditLine className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-gray-400 hover:text-red-600"
            title="Sil"
          >
            <RiDeleteBinLine className="w-5 h-5" />
          </button>
        </div>
      </div>
      {item.children.length > 0 && (
        <div className="mt-3 ml-8 space-y-2 border-l-2 border-gray-200 pl-4">
          {item.children.map((child) => (
            <div key={child.id} className="bg-gray-50 rounded p-3">
              <div className="font-medium text-gray-900">{child.label}</div>
              <div className="text-sm text-gray-500">{child.href}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({ label: '', href: '', parentId: null as string | null })

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/admin/menu')
      if (response.ok) {
        const data = await response.json()
        setMenuItems(data)
      }
    } catch (error) {
      console.error('Failed to fetch menu items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    try {
      const response = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: formData.label,
          href: formData.href,
          order: menuItems.length,
          parentId: formData.parentId,
        }),
      })

      if (response.ok) {
        await fetchMenuItems()
        setFormData({ label: '', href: '', parentId: null })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Failed to create menu item:', error)
    }
  }

  const handleEdit = (id: string) => {
    const findItem = (items: MenuItem[]): MenuItem | null => {
      for (const item of items) {
        if (item.id === id) return item
        const found = findItem(item.children)
        if (found) return found
      }
      return null
    }
    const item = findItem(menuItems)
    if (item) {
      setEditingItem(item)
      setFormData({ label: item.label, href: item.href, parentId: item.parentId })
      setShowAddForm(true)
    }
  }

  const handleUpdate = async () => {
    if (!editingItem) return

    try {
      const response = await fetch(`/api/admin/menu/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: formData.label,
          href: formData.href,
          parentId: formData.parentId,
        }),
      })

      if (response.ok) {
        await fetchMenuItems()
        setEditingItem(null)
        setFormData({ label: '', href: '', parentId: null })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Failed to update menu item:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu menü öğesini silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/menu/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchMenuItems()
      }
    } catch (error) {
      console.error('Failed to delete menu item:', error)
    }
  }

  const handleAddChild = (parentId: string) => {
    setFormData({ label: '', href: '', parentId })
    setEditingItem(null)
    setShowAddForm(true)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = menuItems.findIndex((item) => item.id === active.id)
    const newIndex = menuItems.findIndex((item) => item.id === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    const newItems = [...menuItems]
    const [movedItem] = newItems.splice(oldIndex, 1)
    newItems.splice(newIndex, 0, movedItem)

    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }))

    setMenuItems(reorderedItems)

    try {
      await fetch('/api/admin/menu/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          reorderedItems.map((item) => ({ id: item.id, order: item.order, parentId: item.parentId }))
        ),
      })
    } catch (error) {
      console.error('Failed to reorder menu items:', error)
    }
  }

  if (loading) {
    return <div className="p-8">Yükleniyor...</div>
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Menü Yönetimi
          </h1>
          <p className="text-gray-600">Navigasyon menüsünü düzenleyin</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true)
            setEditingItem(null)
            setFormData({ label: '', href: '', parentId: null })
          }}
          className="btn-primary flex items-center gap-2"
        >
          <RiAddLine className="w-5 h-5" />
          Yeni Menü Öğesi
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            {editingItem ? 'Menü Öğesini Düzenle' : 'Yeni Menü Öğesi Ekle'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Etiket
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Ana Sayfa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link
              </label>
              <input
                type="text"
                value={formData.href}
                onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="/"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={editingItem ? handleUpdate : handleAdd}
                className="btn-primary"
              >
                {editingItem ? 'Güncelle' : 'Ekle'}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingItem(null)
                  setFormData({ label: '', href: '', parentId: null })
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Menü Öğeleri</h3>
        {menuItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Henüz menü öğesi eklenmemiş.</p>
          </div>
        ) : (
          <DragDropProvider items={menuItems} onDragEnd={handleDragEnd}>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <SortableMenuItem
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAddChild={handleAddChild}
                />
              ))}
            </div>
          </DragDropProvider>
        )}
      </div>
    </div>
  )
}
