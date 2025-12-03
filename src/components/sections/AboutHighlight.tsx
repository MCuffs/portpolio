'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { saveAboutFields } from '@/lib/actions'

type Experience = {
    year: string
    role: string
    company: string
}

type Props = {
    bio: string
    philosophy?: string
    experience: Experience[]
    editable?: boolean
}

export function AboutHighlight({ bio, philosophy, experience, editable = false }: Props) {
    const [bioText, setBioText] = useState(bio)
    const [philoText, setPhiloText] = useState(philosophy || '')

    useEffect(() => {
        setBioText(bio)
        setPhiloText(philosophy || '')
    }, [bio, philosophy])

    const handleSave = async () => {
        if (!editable) return
        await saveAboutFields({
            bio: bioText.trim(),
            philosophy: philoText.trim(),
            experience: JSON.stringify(experience),
        })
    }

    return (
        <section className="bg-white">
            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
                    <div className="md:w-1/2 space-y-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-semibold text-gray-900">About</h2>
                            {editable && <span className="text-xs text-gray-400">Double-click to edit</span>}
                        </div>
                        <p
                            className="text-lg leading-relaxed text-gray-600"
                            contentEditable={editable}
                            suppressContentEditableWarning
                            onDoubleClick={() => editable && handleSave()}
                            onInput={(e) => setBioText((e.target as HTMLElement).innerText)}
                            onBlur={handleSave}
                        >
                            {bioText}
                        </p>
                        {(philoText || editable) && (
                            <blockquote
                                className="text-lg italic text-gray-500 border-l-4 border-gray-200 pl-4"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                onDoubleClick={() => editable && handleSave()}
                                onInput={(e) => setPhiloText((e.target as HTMLElement).innerText)}
                                onBlur={handleSave}
                            >
                                “{philoText || 'Add your philosophy…'}”
                            </blockquote>
                        )}
                        <Link
                            href="/about"
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black underline underline-offset-4"
                        >
                            View full profile
                        </Link>
                    </div>

                    <div className="md:w-1/2">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Experience</h3>
                        <div className="space-y-4">
                            {experience.map((item, idx) => (
                                <div key={`${item.year}-${idx}`} className="flex items-start gap-4">
                                    <div className="text-sm font-semibold text-gray-400 w-28 shrink-0">{item.year}</div>
                                    <div>
                                        <div className="text-gray-900 font-medium">{item.role}</div>
                                        <div className="text-gray-500 text-sm">{item.company}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
