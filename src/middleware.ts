import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Protect /admin routes
    if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
        const cookie = (await cookies()).get('session')?.value
        if (!cookie) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        try {
            await decrypt(cookie)
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
