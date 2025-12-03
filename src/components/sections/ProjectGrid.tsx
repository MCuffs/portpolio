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

export function ProjectGrid({ projects }: { projects: Project[] }) {
    return (
        <section className="py-16 max-w-5xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-2xl font-semibold text-white">Selected Work</h2>
                <Link
                    href="/projects"
                    className="text-sm text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                    View all <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.slug}`} className="group block">
                        <div className="aspect-video bg-white/5 rounded-lg mb-4 overflow-hidden border border-white/10 transition-all group-hover:border-white/25 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.8)]">
                            {project.thumbnail ? (
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/5 flex items-center justify-center text-slate-400">
                                    No image
                                </div>
                            )}
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:underline decoration-1 underline-offset-4">
                            {project.title}
                        </h3>
                        <p className="text-slate-200 mt-1 text-sm leading-relaxed line-clamp-2">
                            {project.description}
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                            {project.tags.split(',').map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-white/10 px-2 py-1 rounded text-slate-200 border border-white/20"
                                >
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
