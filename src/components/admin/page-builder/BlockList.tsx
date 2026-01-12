'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { RiDragMoveLine, RiEditLine, RiDeleteBinLine, RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import { getBlockType } from '@/lib/block-types'

interface Block {
  id: string
  type: string
  title: string | null
  order: number
  visible: boolean
}

interface BlockListProps {
  blocks: Block[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleVisible: (id: string) => void
}

function SortableBlockItem({
  block,
  onEdit,
  onDelete,
  onToggleVisible,
}: {
  block: Block
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleVisible: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const blockType = getBlockType(block.type as any)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <RiDragMoveLine className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">
          {block.title || blockType?.label || block.type}
        </div>
        <div className="text-sm text-gray-500">{blockType?.description || block.type}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleVisible(block.id)}
          className="p-2 text-gray-400 hover:text-gray-600"
          title={block.visible ? 'Gizle' : 'Göster'}
        >
          {block.visible ? (
            <RiEyeLine className="w-5 h-5" />
          ) : (
            <RiEyeOffLine className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={() => onEdit(block.id)}
          className="p-2 text-gray-400 hover:text-[#FF7F00]"
          title="Düzenle"
        >
          <RiEditLine className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(block.id)}
          className="p-2 text-gray-400 hover:text-red-600"
          title="Sil"
        >
          <RiDeleteBinLine className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default function BlockList({
  blocks,
  onEdit,
  onDelete,
  onToggleVisible,
}: BlockListProps) {
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-3">
      {sortedBlocks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Henüz blok eklenmemiş.</p>
          <p className="text-sm mt-2">Blok kütüphanesinden blok ekleyin.</p>
        </div>
      ) : (
        sortedBlocks.map((block) => (
          <SortableBlockItem
            key={block.id}
            block={block}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleVisible={onToggleVisible}
          />
        ))
      )}
    </div>
  )
}
