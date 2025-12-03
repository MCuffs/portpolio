'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function createProject(formData: FormData) {
    return upsertProject(formData)
}

export async function updateProject(id: string, formData: FormData) {
    formData.set('id', id)
    return upsertProject(formData)
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    })

    revalidatePath('/projects')
    revalidatePath('/')
    revalidatePath('/admin/projects')
}

export async function updateAbout(formData: FormData) {
    const bio = formData.get('bio') as string
    const philosophy = formData.get('philosophy') as string
    const experience = formData.get('experience') as string

    // Check if exists, if not create
    const existing = await prisma.about.findFirst()
    if (existing) {
        await prisma.about.update({
            where: { id: existing.id },
            data: { bio, philosophy, experience },
        })
    } else {
        await prisma.about.create({
            data: { bio, philosophy, experience },
        })
    }

    revalidatePath('/about')
    revalidatePath('/admin/about')
    redirect('/admin/dashboard')
}

export async function updateHero(formData: FormData) {
    const headline = formData.get('headline') as string
    const subtext = formData.get('subtext') as string

    const existing = await prisma.hero.findFirst()
    if (existing) {
        await prisma.hero.update({
            where: { id: existing.id },
            data: { headline, subtext },
        })
    } else {
        await prisma.hero.create({
            data: { headline, subtext },
        })
    }

    revalidatePath('/')
    revalidatePath('/admin/hero')
    redirect('/admin/dashboard')
}

export async function updateDesignSettings(formData: FormData) {
    const heroBackgroundEnabled = formData.get('heroBackgroundEnabled') === 'on'
    const projectsBackgroundEnabled = formData.get('projectsBackgroundEnabled') === 'on'
    const heroBackgroundImage = ((formData.get('heroBackgroundImage') as string) || '').trim()
    const projectsBackgroundImage = ((formData.get('projectsBackgroundImage') as string) || '').trim()

    const existing = await prisma.designSetting.findFirst()

    if (existing) {
        await prisma.designSetting.update({
            where: { id: existing.id },
            data: {
                heroBackgroundEnabled,
                projectsBackgroundEnabled,
                heroBackgroundImage: heroBackgroundImage || null,
                projectsBackgroundImage: projectsBackgroundImage || null,
            },
        })
    } else {
        await prisma.designSetting.create({
            data: {
                heroBackgroundEnabled,
                projectsBackgroundEnabled,
                heroBackgroundImage: heroBackgroundImage || null,
                projectsBackgroundImage: projectsBackgroundImage || null,
            },
        })
    }

    revalidatePath('/')
    revalidatePath('/projects')
    revalidatePath('/admin/design')
    redirect('/admin/design')
}

export async function upsertProject(formData: FormData) {
    const id = (formData.get('id') as string | null) || null
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const content = formData.get('content') as string
    const tags = formData.get('tags') as string
    const thumbnail = formData.get('thumbnail') as string
    const featured = formData.get('featured') === 'on'
    const order = parseInt(formData.get('order') as string) || 0

    if (id) {
        await prisma.project.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                content,
                tags,
                thumbnail: thumbnail || null,
                featured,
                order,
            },
        })
    } else {
        await prisma.project.create({
            data: {
                title,
                slug,
                description,
                content,
                tags,
                thumbnail: thumbnail || null,
                featured,
                order,
            },
        })
    }

    revalidatePath('/projects')
    revalidatePath('/')
    revalidatePath(`/projects/${slug}`)
    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}

export async function setEditorMode(formData: FormData) {
    const enabled = formData.get('enabled') === 'on'
    const cookieStore = cookies()

    if (enabled) {
        cookieStore.set('edit', '1', { path: '/', httpOnly: false, sameSite: 'lax' })
    } else {
        cookieStore.set('edit', '0', { path: '/', httpOnly: false, maxAge: -1, sameSite: 'lax' })
    }
    revalidatePath('/')
}

export async function saveHeroFields({ headline, subtext }: { headline: string; subtext: string }) {
    const existing = await prisma.hero.findFirst()
    if (existing) {
        await prisma.hero.update({
            where: { id: existing.id },
            data: { headline, subtext },
        })
    } else {
        await prisma.hero.create({ data: { headline, subtext } })
    }

    revalidatePath('/')
    revalidatePath('/admin/hero')
}

export async function saveAboutFields({
    bio,
    philosophy,
    experience,
}: {
    bio: string
    philosophy?: string
    experience?: string
}) {
    const existing = await prisma.about.findFirst()
    if (existing) {
        await prisma.about.update({
            where: { id: existing.id },
            data: { bio, philosophy: philosophy || null, experience: experience || '[]' },
        })
    } else {
        await prisma.about.create({
            data: { bio, philosophy: philosophy || null, experience: experience || '[]' },
        })
    }

    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/admin/about')
}

export async function saveDesignBackground(formData: FormData) {
    const section = formData.get('section') as 'hero' | 'about' | 'projects'
    const image = (formData.get('image') as string | null) || null
    const enabled = formData.get('enabled') === 'true' || formData.get('enabled') === 'on'

    const existing = await prisma.designSetting.findFirst()

    const data: Record<string, any> = {}
    if (section === 'hero') {
        data.heroBackgroundImage = image
        data.heroBackgroundEnabled = enabled
    } else if (section === 'about') {
        data.aboutBackgroundImage = image
        data.aboutBackgroundEnabled = enabled
    } else if (section === 'projects') {
        data.projectsBackgroundImage = image
        data.projectsBackgroundEnabled = enabled
    }

    if (existing) {
        await prisma.designSetting.update({
            where: { id: existing.id },
            data,
        })
    } else {
        await prisma.designSetting.create({
            data,
        })
    }

    revalidatePath('/')
    revalidatePath('/projects')
    revalidatePath('/admin/design')
}
