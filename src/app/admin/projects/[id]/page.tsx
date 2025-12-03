import { ProjectForm } from '@/components/admin/ProjectForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await prisma.project.findUnique({
        where: { id },
    })

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
