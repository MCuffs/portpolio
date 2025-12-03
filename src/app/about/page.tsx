import { Timeline } from '@/components/sections/Timeline'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600

export default async function AboutPage() {
    let aboutData = null
    try {
        aboutData = await prisma.about.findFirst()
    } catch (e) {
        console.error('Failed to fetch about data:', e)
    }

    // Fallback data
    const bio = aboutData?.bio || "I am a strategist with a background in data science and product management. I help companies make better decisions by leveraging data."
    const philosophy = aboutData?.philosophy || "Simplicity is the ultimate sophistication. In a world of noise, clarity is power."

    let experience = []
    if (aboutData?.experience) {
        try {
            experience = JSON.parse(aboutData.experience)
        } catch (e) {
            console.error('Failed to parse experience JSON', e)
        }
    }

    if (experience.length === 0) {
        experience = [
            { year: '2023 - Present', role: 'Senior Strategist', company: 'Tech Corp' },
            { year: '2021 - 2023', role: 'Product Manager', company: 'Startup Inc' },
            { year: '2019 - 2021', role: 'Data Analyst', company: 'Data Solutions' },
        ]
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-24">
            <h1 className="text-4xl font-bold tracking-tight mb-12">About</h1>

            <section className="mb-16">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Bio</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    {bio}
                </p>
            </section>

            <section className="mb-16">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Philosophy</h2>
                <blockquote className="text-xl italic text-gray-500 border-l-4 border-gray-200 pl-4 py-2">
                    "{philosophy}"
                </blockquote>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-8 text-gray-900">Experience</h2>
                <Timeline experiences={experience} />
            </section>
        </div>
    )
}
