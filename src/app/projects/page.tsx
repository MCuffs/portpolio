import type { Project } from '@prisma/client'

import { ProjectGrid } from '@/components/sections/ProjectGrid'
import { prisma } from '@/lib/prisma'
import { fallbackProjects } from '@/lib/fallback-projects'

export const revalidate = 3600

export default async function ProjectsPage() {
    let projects: Project[] = []
    try {
        projects = await prisma.project.findMany({
            orderBy: { order: 'asc' },
        })
    } catch (e) {
        console.error('Failed to fetch projects:', e)
    }

    // Fallback data
    if (projects.length === 0) {
        projects = fallbackProjects
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-24">
            <h1 className="text-4xl font-bold tracking-tight mb-6">All Projects</h1>
            <p className="text-xl text-gray-500 mb-12 max-w-2xl">
                A selection of strategic initiatives and data-driven solutions.
            </p>
            <ProjectGrid projects={projects} />
        </div>
    )
}
