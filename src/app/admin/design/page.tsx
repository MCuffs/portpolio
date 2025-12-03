import { DesignForm } from '@/components/admin/DesignForm'
import { prisma } from '@/lib/prisma'

export default async function AdminDesignPage() {
    const settings = await prisma.designSetting.findFirst()

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Design Settings</h1>
                <p className="text-gray-500 mt-2">
                    Toggle background imagery for the hero and Selected Work sections. Use paths under <code>/public</code> or
                    full URLs.
                </p>
            </div>
            <DesignForm initialData={settings} />
        </div>
    )
}
