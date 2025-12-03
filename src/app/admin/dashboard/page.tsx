import { logout } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <form
                    action={async () => {
                        'use server'
                        await logout()
                        redirect('/admin/login')
                    }}
                >
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
                    <Link href="/admin/projects" className="block h-full">
                        <h2 className="text-xl font-semibold mb-2">Projects</h2>
                        <p className="text-gray-500">Manage your portfolio projects.</p>
                    </Link>
                </div>
                <div className="p-6 bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
                    <Link href="/admin/about" className="block h-full">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p className="text-gray-500">Update your bio and experience.</p>
                    </Link>
                </div>
                <div className="p-6 bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
                    <Link href="/admin/hero" className="block h-full">
                        <h2 className="text-xl font-semibold mb-2">Hero</h2>
                        <p className="text-gray-500">Update home page hero text.</p>
                    </Link>
                </div>
                <div className="p-6 bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
                    <Link href="/admin/design" className="block h-full">
                        <h2 className="text-xl font-semibold mb-2">Design</h2>
                        <p className="text-gray-500">Toggle background imagery and assets.</p>
                    </Link>
                </div>
                <div className="p-6 bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
                    <Link href="/admin/editor" className="block h-full">
                        <h2 className="text-xl font-semibold mb-2">Editor Mode</h2>
                        <p className="text-gray-500">Enable site-wide visual editor without query params.</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
