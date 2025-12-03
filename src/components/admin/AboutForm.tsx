'use client'

import { updateAbout } from '@/lib/actions'
import { useState } from 'react'

export function AboutForm({ initialData }: { initialData: any }) {
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true)
        try {
            await updateAbout(formData)
        } catch (error) {
            console.error(error)
            setIsPending(false)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow">
            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                </label>
                <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    defaultValue={initialData?.bio}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                />
            </div>

            <div>
                <label htmlFor="philosophy" className="block text-sm font-medium text-gray-700">
                    Philosophy
                </label>
                <textarea
                    name="philosophy"
                    id="philosophy"
                    rows={2}
                    defaultValue={initialData?.philosophy}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                />
            </div>

            <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Experience (JSON)
                </label>
                <textarea
                    name="experience"
                    id="experience"
                    rows={10}
                    defaultValue={initialData?.experience || '[]'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2 font-mono"
                />
                <p className="mt-1 text-xs text-gray-500">
                    Format: {`[{"year": "2023", "role": "Role", "company": "Company"}]`}
                </p>
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
