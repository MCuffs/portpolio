'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const content = formData.get('content') as string
    const tags = formData.get('tags') as string
    const thumbnail = formData.get('thumbnail') as string
    const featured = formData.get('featured') === 'on'
    const order = parseInt(formData.get('order') as string) || 0

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

    revalidatePath('/projects')
    revalidatePath('/')
    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const content = formData.get('content') as string
    const tags = formData.get('tags') as string
    const thumbnail = formData.get('thumbnail') as string
    const featured = formData.get('featured') === 'on'
    const order = parseInt(formData.get('order') as string) || 0

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

    revalidatePath('/projects')
    revalidatePath('/')
    revalidatePath(`/projects/${slug}`)
    revalidatePath('/admin/projects')
    redirect('/admin/projects')
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
