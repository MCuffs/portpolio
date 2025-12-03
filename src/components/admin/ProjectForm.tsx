'use client'

import { createProject, updateProject } from '@/lib/actions'
import { useState } from 'react'
import { RichTextEditor } from './RichTextEditor'

type Project = {
    id: string
    title: string
    slug: string
    description: string
    content: string
    tags: string
    thumbnail: string | null
    featured: boolean
    order: number
}

export function ProjectForm({ project }: { project?: Project }) {
    const [isPending, setIsPending] = useState(false)
    const [thumbnailUrl, setThumbnailUrl] = useState(project?.thumbnail || '')
    const [isUploading, setIsUploading] = useState(false)
    const [content, setContent] = useState(project?.content || '')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPending(true)

        try {
            const formData = new FormData(e.currentTarget)
            // Set the thumbnail URL and content in formData
            formData.set('thumbnail', thumbnailUrl)
            formData.set('content', content)

            if (project) {
                await updateProject(project.id, formData)
            } else {
                await createProject(formData)
            }
        } catch (error) {
            console.error(error)
            setIsPending(false)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
                setThumbnailUrl(data.url)
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

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white p-6 rounded-lg shadow">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={project?.title}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                />
            </div>

            <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                    Slug
                </label>
                <input
                    type="text"
                    name="slug"
                    id="slug"
                    defaultValue={project?.slug}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail Image
                </label>

                {/* File Upload */}
                <div className="mb-3">
                    <label className="block">
                        <span className="sr-only">Choose file</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 disabled:opacity-50"
                        />
                    </label>
                    {isUploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                </div>

                {/* URL Input */}
                <div>
                    <input
                        type="text"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                        placeholder="Or paste image URL"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Upload a file or paste an external URL
                    </p>
                </div>

                {/* Preview */}
                {thumbnailUrl && (
                    <div className="mt-3">
                        <img
                            src={thumbnailUrl}
                            alt="Preview"
                            className="w-full max-w-xs h-auto rounded border"
                            onError={() => setThumbnailUrl('')}
                        />
                    </div>
                )}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description (Short)
                </label>
                <textarea
                    name="description"
                    id="description"
                    rows={3}
                    defaultValue={project?.description}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                </label>
                <RichTextEditor content={content} onChange={setContent} />
            </div>

            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags (comma separated)
                </label>
                <input
                    type="text"
                    name="tags"
                    id="tags"
                    defaultValue={project?.tags}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                />
            </div>

            <div className="flex gap-6">
                <div className="flex items-center">
                    <input
                        id="featured"
                        name="featured"
                        type="checkbox"
                        defaultChecked={project?.featured}
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                        Featured
                    </label>
                </div>

                <div>
                    <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                        Order
                    </label>
                    <input
                        type="number"
                        name="order"
                        id="order"
                        defaultValue={project?.order || 0}
                        className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isPending || isUploading}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                >
                    {isPending ? 'Saving...' : 'Save Project'}
                </button>
            </div>
        </form>
    )
}
