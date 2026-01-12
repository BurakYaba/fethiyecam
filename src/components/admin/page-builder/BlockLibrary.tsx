'use client'

import { BLOCK_TYPES } from '@/lib/block-types'
import { RiAddLine } from '@remixicon/react'

interface BlockLibraryProps {
  onAddBlock: (type: string) => void
}

export default function BlockLibrary({ onAddBlock }: BlockLibraryProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Blok Kütüphanesi</h3>
      <div className="space-y-2">
        {BLOCK_TYPES.map((blockType) => (
          <button
            key={blockType.type}
            onClick={() => onAddBlock(blockType.type)}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#FF7F00] hover:bg-[#FF7F00]/5 transition-colors text-left"
          >
            <RiAddLine className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <div className="font-medium text-gray-900">{blockType.label}</div>
              <div className="text-xs text-gray-500">{blockType.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
