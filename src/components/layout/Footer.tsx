import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t border-gray-100 py-12 mt-20">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Jeong Min Su. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-black transition-colors"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-black transition-colors"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href="mailto:hello@example.com"
                        className="text-gray-400 hover:text-black transition-colors"
                    >
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </footer>
    )
}
