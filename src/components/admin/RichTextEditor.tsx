'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link2,
    ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify
} from 'lucide-react'
import { useState } from 'react'

interface RichTextEditorProps {
    content: string
    onChange: (content: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const [showImageInput, setShowImageInput] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            TextStyle,
            Color,
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-4',
            },
        },
    })

    if (!editor) {
        return null
    }

    const addImage = () => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run()
            setImageUrl('')
            setShowImageInput(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const data = await response.json()
                editor.chain().focus().setImage({ src: data.url }).run()
            } else {
                alert('Upload failed')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Upload failed')
        } finally {
            setIsUploading(false)
        }
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) {
            return
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    const MenuButton = ({ onClick, isActive, title, icon: Icon }: any) => (
        <button
            type="button"
            onClick={onClick}
            className={`p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-300' : ''}`}
            title={title}
        >
            <Icon size={18} />
        </button>
    )

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r pr-2">
                    <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold" icon={Bold} />
                    <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic" icon={Italic} />
                    <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline" icon={UnderlineIcon} />
                    <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough" icon={Strikethrough} />
                    <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title="Code" icon={Code} />
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r pr-2">
                    <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1" icon={Heading1} />
                    <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2" icon={Heading2} />
                    <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3" icon={Heading3} />
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r pr-2">
                    <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List" icon={List} />
                    <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numbered List" icon={ListOrdered} />
                    <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Quote" icon={Quote} />
                </div>

                {/* Alignment */}
                <div className="flex gap-1 border-r pr-2">
                    <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left" icon={AlignLeft} />
                    <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center" icon={AlignCenter} />
                    <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right" icon={AlignRight} />
                    <MenuButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justify" icon={AlignJustify} />
                </div>

                {/* Link & Image */}
                <div className="flex gap-1 border-r pr-2">
                    <MenuButton onClick={setLink} isActive={editor.isActive('link')} title="Add Link" icon={Link2} />
                    <MenuButton onClick={() => setShowImageInput(!showImageInput)} isActive={false} title="Add Image URL" icon={ImageIcon} />
                    <label className="p-2 rounded hover:bg-gray-200 cursor-pointer" title="Upload Image">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={isUploading}
                        />
                        <ImageIcon size={18} className={isUploading ? 'opacity-50' : ''} />
                    </label>
                </div>

                {/* Undo/Redo */}
                <div className="flex gap-1">
                    <MenuButton onClick={() => editor.chain().focus().undo().run()} isActive={false} title="Undo" icon={Undo} />
                    <MenuButton onClick={() => editor.chain().focus().redo().run()} isActive={false} title="Redo" icon={Redo} />
                </div>
            </div>

            {/* Image URL Input */}
            {showImageInput && (
                <div className="p-3 bg-gray-50 border-b flex gap-2">
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1 px-3 py-2 border rounded text-sm"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                addImage()
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={addImage}
                        className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowImageInput(false)}
                        className="px-4 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Editor */}
            <EditorContent editor={editor} className="min-h-[400px]" />
        </div>
    )
}
