'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import {
  RiBold,
  RiItalic,
  RiListUnordered,
  RiListOrdered,
  RiH1,
  RiH2,
  RiH3,
  RiLink,
  RiImageLine,
  RiParagraph,
} from '@remixicon/react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  label?: string
  required?: boolean
}

export default function RichTextEditor({
  content,
  onChange,
  label = 'İçerik',
  required = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#FF7F00] underline hover:text-[#E67000]',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4 tiptap-editor',
      },
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Resim URL\'si girin:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Link URL\'si girin:', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetMark('link').run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Toolbar */}
      <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive('bold')
              ? 'bg-[#FF7F00] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Kalın"
        >
          <RiBold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive('italic')
              ? 'bg-[#FF7F00] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="İtalik"
        >
          <RiItalic className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-[#FF7F00] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Başlık 1"
        >
          <RiH1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-[#FF7F00] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Başlık 2"
        >
          <RiH2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-[#FF7F00] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Başlık 3"
        >
          <RiH3 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-2 rounded ${
            editor.isActive('paragraph')
              ? 'bg-[#FF7F00] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Paragraf"
        >
          <RiParagraph className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive('bulletList')
              ? 'bg-[#FF7F00] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Madde İşareti"
        >
          <RiListUnordered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive('orderedList')
              ? 'bg-[#FF7F00] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Numaralı Liste"
        >
          <RiListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded ${
            editor.isActive('link')
              ? 'bg-[#FF7F00] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Link Ekle"
        >
          <RiLink className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-100"
          title="Resim Ekle"
        >
          <RiImageLine className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <div className="border border-t-0 border-gray-300 rounded-b-lg bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
