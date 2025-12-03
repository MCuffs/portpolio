import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 3600

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const fallbackProjects = [
        {
            id: '1',
            slug: 'market-expansion',
            title: 'Market Expansion Strategy',
            description: 'A comprehensive strategy for entering the SEA market, resulting in 20% YoY growth.',
            tags: 'Strategy, Data, Growth',
            content: '<h2>Overview</h2><p>Placeholder project content when database is empty.</p>',
            thumbnail: null,
        },
        {
            id: '2',
            slug: 'ai-customer-segmentation',
            title: 'AI Customer Segmentation',
            description: 'Using clustering algorithms to identify high-value customers and optimize marketing spend.',
            tags: 'AI, Python, Marketing',
            content: '<h2>Overview</h2><p>Placeholder project content when database is empty.</p>',
            thumbnail: null,
        },
        {
            id: '3',
            slug: 'saas-pricing-model',
            title: 'SaaS Pricing Model Optimization',
            description: 'Redesigning the pricing tier structure based on usage data and competitor analysis.',
            tags: 'Product, Pricing, SaaS',
            content: '<h2>Overview</h2><p>Placeholder project content when database is empty.</p>',
            thumbnail: null,
        },
    ]

    let project = fallbackProjects.find((p) => p.slug === slug) || null
    try {
        const dbProject = await prisma.project.findUnique({
            where: { slug },
        })
        if (dbProject) {
            project = dbProject
        }
    } catch (e) {
        console.error('Failed to fetch project:', e)
    }

    if (!project) {
        notFound()
    }

    return (
        <article className="max-w-3xl mx-auto px-6 py-24">
            <Link href="/projects" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Projects
            </Link>

            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{project.title}</h1>
                <p className="text-xl text-gray-500 leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.split(',').map((tag) => (
                        <span key={tag} className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            </header>

            {/* Cover image */}
            {project.thumbnail ? (
                <div className="aspect-video bg-gray-100 rounded-xl mb-16 overflow-hidden">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="aspect-video bg-gray-100 rounded-xl mb-16 flex items-center justify-center text-gray-300">
                    No cover image
                </div>
            )}

            <div
                className="prose prose-lg prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: project.content }}
            />
        </article>
    )
}
