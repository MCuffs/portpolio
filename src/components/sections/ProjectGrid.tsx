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
                <h2 className="text-2xl font-semibold">Selected Work</h2>
                <Link href="/projects" className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors">
                    View all <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.slug}`} className="group block">
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden border border-gray-100 transition-all group-hover:border-gray-300">
                            {project.thumbnail ? (
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                                    No image
                                </div>
                            )}
                        </div>
                        <h3 className="text-lg font-medium group-hover:underline decoration-1 underline-offset-4">
                            {project.title}
                        </h3>
                        <p className="text-gray-500 mt-1 text-sm line-clamp-2">
                            {project.description}
                        </p>
                        <div className="flex gap-2 mt-3">
                            {project.tags.split(',').map((tag) => (
                                <span key={tag} className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-600 border border-gray-100">
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
