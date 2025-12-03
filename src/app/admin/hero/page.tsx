import { HeroForm } from '@/components/admin/HeroForm'
import { prisma } from '@/lib/prisma'

export default async function AdminHeroPage() {
    let hero = null
    try {
        hero = await prisma.hero.findFirst()
    } catch (e) {
        console.error('Failed to fetch hero:', e)
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Edit Hero Section</h1>
            <HeroForm initialData={hero} />
        </div>
    )
}
