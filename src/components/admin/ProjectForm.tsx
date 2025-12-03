'use client'

import { createProject, updateProject } from '@/lib/actions'
import { useState } from 'react'

type Project = {
    id: string
    title: string
    slug: string
    description: string
    content: string
    tags: string
    featured: boolean
    order: number
}

export function ProjectForm({ project }: { project?: Project }) {
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true)
        try {
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

    return (
        <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow">
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
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content (Markdown)
                </label>
                <textarea
                    name="content"
                    id="content"
                    rows={10}
                    defaultValue={project?.content}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2 font-mono"
                />
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
                    disabled={isPending}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                >
                    {isPending ? 'Saving...' : 'Save Project'}
                </button>
            </div>
        </form>
    )
}
