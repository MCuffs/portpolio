import { ProjectForm } from '@/components/admin/ProjectForm'

export default function NewProjectPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">New Project</h1>
            <ProjectForm />
        </div>
    )
}
