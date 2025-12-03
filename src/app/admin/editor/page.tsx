import { setEditorMode } from '@/lib/actions'
import { cookies } from 'next/headers'

export default function AdminEditorPage() {
    const editCookie = cookies().get('edit')?.value === '1'

    return (
        <div className="p-8 max-w-3xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Editor Mode</h1>
                <p className="text-gray-500">
                    Turn on the visual editor for the public site. This sets a cookie so you can edit without query params.
                </p>
            </div>

            <form action={setEditorMode} className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
                <label className="flex items-center gap-3 text-sm text-gray-700">
                    <input
                        type="checkbox"
                        name="enabled"
                        defaultChecked={editCookie}
                        className="h-4 w-4 text-black rounded border-gray-300"
                    />
                    Enable editor mode across the site
                </label>
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                    >
                        Save
                    </button>
                    <div className="text-sm text-gray-500">
                        Current: {editCookie ? 'On' : 'Off'}
                    </div>
                </div>
            </form>
        </div>
    )
}
