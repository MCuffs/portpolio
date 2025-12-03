import Link from 'next/link'

export function Header() {
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
                </nav>
            </div>
        </header>
    )
}
