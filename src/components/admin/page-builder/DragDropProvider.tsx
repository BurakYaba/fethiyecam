'use client'

import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ReactNode } from 'react'

interface DragDropProviderProps {
  children: ReactNode
  items: Array<{ id: string }>
  onDragEnd: (event: DragEndEvent) => void
  onDragStart?: (event: DragStartEvent) => void
}

export default function DragDropProvider({
  children,
  items,
  onDragEnd,
  onDragStart,
}: DragDropProviderProps) {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
