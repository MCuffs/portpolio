import { AboutForm } from '@/components/admin/AboutForm'
import { prisma } from '@/lib/prisma'

export default async function AdminAboutPage() {
    let about = null
    try {
        about = await prisma.about.findFirst()
    } catch (e) {
        console.error('Failed to fetch about:', e)
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Edit About Page</h1>
            <AboutForm initialData={about} />
        </div>
    )
}
