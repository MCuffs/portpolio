import { ProjectForm } from '@/components/admin/ProjectForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let project = null
    try {
        project = await prisma.project.findUnique({
            where: { id },
        })
    } catch (e) {
        console.error('Failed to fetch project:', e)
    }

    if (!project) {
        notFound()
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
            <ProjectForm project={project} />
        </div>
    )
}
