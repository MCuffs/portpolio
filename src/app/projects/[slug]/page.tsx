import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 3600

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params

    let project = null
    try {
        project = await prisma.project.findUnique({
            where: { slug },
        })
    } catch (e) {
        console.error('Failed to fetch project:', e)
    }

    // Fallback for demo if DB is empty
    if (!project) {
        // Check fallback data
        const fallbackProjects = [
            {
                id: '1',
                slug: 'market-expansion',
                title: 'Market Expansion Strategy',
                description: 'A comprehensive strategy for entering the SEA market, resulting in 20% YoY growth.',
                tags: 'Strategy, Data, Growth',
                content: `## Problem
The client was facing stagnation in their domestic market and needed to identify new growth avenues. The SEA market was identified as a potential target, but the client lacked local insights and a clear entry strategy.

## Approach
We conducted a multi-phased analysis:
1. **Market Sizing & Opportunity Assessment**: Analyzed macroeconomic indicators, competitor landscape, and consumer behavior in key SEA countries (Indonesia, Vietnam, Thailand).
2. **Consumer Research**: Conducted surveys and focus groups to understand local preferences and pain points.
3. **Go-to-Market Strategy**: Developed a tailored channel strategy, pricing model, and marketing mix for the priority markets.
4. **Financial Modeling**: Built a 5-year P&L forecast to estimate investment requirements and ROI.

## Results
- **20% YoY Revenue Growth**: Successfully launched in Indonesia and Vietnam within 12 months.
- **$5M New Revenue**: Generated $5M in revenue in the first year of operations.
- **Market Share**: Achieved 5% market share in the target segment within 18 months.

## Key Learnings
- Localization is key: A one-size-fits-all approach does not work in the diverse SEA region.
- Partnerships accelerate entry: Collaborating with local distributors significantly reduced time-to-market.
`,
                thumbnail: null,
            },
            {
                id: '2',
                slug: 'ai-customer-segmentation',
                title: 'AI Customer Segmentation',
                description: 'Using clustering algorithms to identify high-value customers and optimize marketing spend.',
                tags: 'AI, Python, Marketing',
                content: `## Problem
The marketing team was using a broad-brush approach to targeting, resulting in low conversion rates and high customer acquisition costs (CAC).

## Approach
We implemented a data-driven segmentation strategy:
1. **Data Collection**: Aggregated customer data from CRM, website analytics, and transaction history.
2. **Feature Engineering**: Created new features such as "Recency, Frequency, Monetary" (RFM) scores and behavioral metrics.
3. **Clustering**: Applied K-Means clustering to identify distinct customer personas based on their value and behavior.
4. **Targeting Strategy**: Developed personalized marketing campaigns for each segment.

## Results
- **15% Increase in ROI**: Marketing spend was optimized by targeting high-value segments.
- **25% Reduction in CAC**: More efficient targeting led to lower acquisition costs.
- **10% Uplift in Retention**: Personalized offers improved customer loyalty.
`,
                thumbnail: null,
            },
        ]
        project = fallbackProjects.find(p => p.slug === slug)
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

            {/* Placeholder for cover image */}
            <div className="aspect-video bg-gray-100 rounded-xl mb-16 flex items-center justify-center text-gray-300">
                Cover Image
            </div>

            <div className="prose prose-lg prose-gray max-w-none">
                {/* Simple markdown rendering (replace with react-markdown for full support) */}
                {project.content.split('\n').map((line, i) => {
                    if (line.startsWith('## ')) {
                        return <h2 key={i} className="text-2xl font-bold mt-12 mb-6 text-gray-900">{line.replace('## ', '')}</h2>
                    }
                    if (line.startsWith('- ')) {
                        return <li key={i} className="ml-4 list-disc mb-2">{line.replace('- ', '')}</li>
                    }
                    if (line.startsWith('1. ')) {
                        return <li key={i} className="ml-4 list-decimal mb-2">{line.replace(/^\d+\. /, '')}</li>
                    }
                    if (line.trim() === '') {
                        return <br key={i} />
                    }
                    return <p key={i} className="mb-4 text-gray-700 leading-relaxed">{line}</p>
                })}
            </div>
        </article>
    )
}
