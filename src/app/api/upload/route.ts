import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const BUCKET = 'uploads'

export async function POST(request: Request) {
    try {
        const supabaseUrl = process.env.SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json(
                { error: 'Supabase URL/Service Role Key missing in environment' },
                { status: 500 }
            )
        }

        const supabase = createClient(supabaseUrl, supabaseKey)
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        // Ensure bucket exists (ignore error if already exists)
        await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => null)

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const timestamp = Date.now()
        const safeName = file.name.replace(/\s/g, '-')
        const path = `${timestamp}-${safeName}`

        const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(path, buffer, {
                contentType: file.type || 'application/octet-stream',
                upsert: true,
            })

        if (uploadError) {
            console.error('Upload to Supabase failed:', uploadError)
            return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
        }

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
        return NextResponse.json({ url: data.publicUrl })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
