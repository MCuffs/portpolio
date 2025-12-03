'use client'

import { updateHero } from '@/lib/actions'
import { useState } from 'react'

export function HeroForm({ initialData }: { initialData: any }) {
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true)
        try {
            await updateHero(formData)
        } catch (error) {
            console.error(error)
            setIsPending(false)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow">
            <div>
                <label htmlFor="headline" className="block text-sm font-medium text-gray-700">
                    Headline
                </label>
                <input
                    type="text"
                    name="headline"
                    id="headline"
                    defaultValue={initialData?.headline}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                />
            </div>

            <div>
                <label htmlFor="subtext" className="block text-sm font-medium text-gray-700">
                    Subtext
                </label>
                <textarea
                    name="subtext"
                    id="subtext"
                    rows={3}
                    defaultValue={initialData?.subtext}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    )
}
