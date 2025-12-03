'use client'

import { useRef, useState } from 'react'

import { saveDesignBackground } from '@/lib/actions'

type Props = {
    section: 'hero' | 'about' | 'projects'
    image?: string | null
    enabled?: boolean
}

export function BackgroundEditor({ section, image, enabled = false }: Props) {
    const [value, setValue] = useState(image || '')
    const [on, setOn] = useState(Boolean(enabled))
    const fileRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const form = new FormData()
        form.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: form })
        if (res.ok) {
            const data = await res.json()
            setValue(data.url)
        } else {
            alert('Upload failed')
        }
    }

    const handleSave = async () => {
        const form = new FormData()
        form.set('section', section)
        form.set('image', value)
        form.set('enabled', on ? 'true' : 'false')
        await saveDesignBackground(form)
    }

    return (
        <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-white/80 border border-gray-200 px-4 py-2 shadow-sm">
            <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                    type="checkbox"
                    checked={on}
                    onChange={(e) => setOn(e.target.checked)}
                    className="h-4 w-4 text-black rounded border-gray-300"
                />
                Use background
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Image URL"
                className="text-sm border border-gray-200 rounded px-2 py-1 w-56"
            />
            <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-sm px-2 py-1 bg-gray-100 rounded border border-gray-200 hover:bg-gray-200"
            >
                Upload
            </button>
            <button
                type="button"
                onClick={handleSave}
                className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
                Save
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </div>
    )
}
