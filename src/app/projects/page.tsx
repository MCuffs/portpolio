import { ProjectGrid } from '@/components/sections/ProjectGrid'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600

export default async function ProjectsPage() {
    let projects = []
    try {
        projects = await prisma.project.findMany({
            orderBy: { order: 'asc' },
        })
    } catch (e) {
        console.error('Failed to fetch projects:', e)
    }

    // Fallback data
    if (projects.length === 0) {
        projects = [
            {
                id: '1',
                slug: 'market-expansion',
                title: 'Market Expansion Strategy',
                description: 'A comprehensive strategy for entering the SEA market, resulting in 20% YoY growth.',
                tags: 'Strategy, Data, Growth',
                content: '',
                thumbnail: null,
                featured: true,
                order: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                slug: 'ai-customer-segmentation',
                title: 'AI Customer Segmentation',
                description: 'Using clustering algorithms to identify high-value customers and optimize marketing spend.',
                tags: 'AI, Python, Marketing',
                content: '',
                thumbnail: null,
                featured: true,
                order: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3',
                slug: 'saas-pricing-model',
                title: 'SaaS Pricing Model Optimization',
                description: 'Redesigning the pricing tier structure based on usage data and competitor analysis.',
                tags: 'Product, Pricing, SaaS',
                content: '',
                thumbnail: null,
                featured: true,
                order: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '4',
                slug: 'operational-efficiency',
                title: 'Operational Efficiency Audit',
                description: 'Analyzing internal workflows to identify bottlenecks and automate repetitive tasks.',
                tags: 'Operations, Automation',
                content: '',
                thumbnail: null,
                featured: false,
                order: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]
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
