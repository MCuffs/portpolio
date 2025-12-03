import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Mock data type until we fetch from DB
type Project = {
    id: string
    slug: string
    title: string
    description: string
    tags: string
    thumbnail?: string | null
}

export function ProjectGrid({ projects, onDark = false }: { projects: Project[]; onDark?: boolean }) {
    const headingColor = onDark ? 'text-white' : 'text-gray-900'
    const linkColor = onDark ? 'text-slate-300 hover:text-white' : 'text-gray-500 hover:text-black'
    const cardBorder = onDark ? 'bg-white/5 border-white/10 hover:border-white/25' : 'bg-gray-100 border-gray-100 hover:border-gray-300'
    const fallbackBg = onDark ? 'bg-white/5 text-slate-300' : 'bg-gray-50 text-gray-300'
    const titleColor = onDark ? 'text-white' : 'text-gray-900'
    const descColor = onDark ? 'text-slate-200' : 'text-gray-600'
    const tagBg = onDark ? 'bg-white/10 text-slate-200 border-white/20' : 'bg-gray-50 text-gray-600 border-gray-200'

    return (
        <section className="py-16 max-w-5xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
                <h2 className={`text-2xl font-semibold ${headingColor}`}>Selected Work</h2>
                <Link href="/projects" className={`text-sm flex items-center gap-1 transition-colors ${linkColor}`}>
                    View all <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.slug}`} className="group block">
                        <div
                            className={`aspect-video rounded-lg mb-4 overflow-hidden border transition-all group-hover:shadow-lg ${cardBorder}`}
                        >
                            {project.thumbnail ? (
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className={`w-full h-full flex items-center justify-center ${fallbackBg}`}>
                                    No image
                                </div>
                            )}
                        </div>
                        <h3 className={`text-lg font-semibold group-hover:underline decoration-1 underline-offset-4 ${titleColor}`}>
                            {project.title}
                        </h3>
                        <p className={`mt-1 text-sm leading-relaxed line-clamp-2 ${descColor}`}>
                            {project.description}
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                            {project.tags.split(',').map((tag) => (
                                <span key={tag} className={`text-xs px-2 py-1 rounded border ${tagBg}`}>
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
