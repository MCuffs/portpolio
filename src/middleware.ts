import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Protect /admin routes
    if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
        const session = await getSession()
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
