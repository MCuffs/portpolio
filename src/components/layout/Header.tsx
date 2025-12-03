'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function Header() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const edit = searchParams?.get('edit') === '1'

    const editHref = useMemo(() => {
        const params = new URLSearchParams(searchParams?.toString() || '')
        if (edit) {
            params.delete('edit')
        } else {
            params.set('edit', '1')
        }
        const query = params.toString()
        return query ? `${pathname}?${query}` : pathname || '/'
    }, [edit, pathname, searchParams])

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold tracking-tight">
                    Jeong Min Su
                </Link>
                <nav className="flex gap-6 text-sm font-medium text-gray-600">
                    <Link href="/about" className="hover:text-black transition-colors">
                        About
                    </Link>
                    <Link href="/projects" className="hover:text-black transition-colors">
                        Projects
                    </Link>
                    <Link href="/admin/login" className="hover:text-black transition-colors">
                        Admin
                    </Link>
                    <Link
                        href={editHref}
                        className={`px-3 py-1 rounded-full border text-xs ${
                            edit ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200'
                        }`}
                    >
                        {edit ? 'Editor On' : 'Editor Off'}
                    </Link>
                </nav>
            </div>
        </header>
    )
}
