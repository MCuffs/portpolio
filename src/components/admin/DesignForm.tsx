'use client'

import type { DesignSetting } from '@prisma/client'
import { useState } from 'react'

import { updateDesignSettings } from '@/lib/actions'

export function DesignForm({ initialData }: { initialData: DesignSetting | null }) {
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true)
        try {
            await updateDesignSettings(formData)
        } catch (error) {
            console.error(error)
            setIsPending(false)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow border max-w-3xl">
            <fieldset className="space-y-3">
                <legend className="font-semibold text-lg">Hero Section</legend>
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        name="heroBackgroundEnabled"
                        defaultChecked={initialData?.heroBackgroundEnabled}
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    Use background image
                </label>
                <div>
                    <label htmlFor="heroBackgroundImage" className="block text-sm font-medium text-gray-700">
                        Background image path or URL
                    </label>
                    <input
                        type="text"
                        name="heroBackgroundImage"
                        id="heroBackgroundImage"
                        placeholder="/hero-bg.jpg"
                        defaultValue={initialData?.heroBackgroundImage ?? ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        e.g. <code>/hero-bg.jpg</code> (from <code>public</code>) or a full image URL.
                    </p>
                </div>
            </fieldset>

            <fieldset className="space-y-3">
                <legend className="font-semibold text-lg">Selected Work Section</legend>
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        name="projectsBackgroundEnabled"
                        defaultChecked={initialData?.projectsBackgroundEnabled}
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    Use background image
                </label>
                <div>
                    <label htmlFor="projectsBackgroundImage" className="block text-sm font-medium text-gray-700">
                        Background image path or URL
                    </label>
                    <input
                        type="text"
                        name="projectsBackgroundImage"
                        id="projectsBackgroundImage"
                        placeholder="/hero-bg.jpg"
                        defaultValue={initialData?.projectsBackgroundImage ?? ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        e.g. <code>/hero-bg.jpg</code> (from <code>public</code>) or a full image URL.
                    </p>
                </div>
            </fieldset>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                >
                    {isPending ? 'Saving...' : 'Save changes'}
                </button>
            </div>
        </form>
    )
}
