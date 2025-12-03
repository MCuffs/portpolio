'use client'

import { useEffect, useState } from 'react'

import { saveHeroFields } from '@/lib/actions'

type Props = {
    headline: string
    subtext: string
    onDark?: boolean
    editable?: boolean
}

export function Hero({ onDark = false, headline, subtext, editable = false }: Props) {
    const titleColor = onDark ? 'text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]' : 'text-gray-900'
    const subColor = onDark ? 'text-slate-100' : 'text-gray-600'
    const sectionBg = onDark ? 'bg-transparent' : 'bg-white'
    const [title, setTitle] = useState(headline)
    const [sub, setSub] = useState(subtext)

    useEffect(() => {
        setTitle(headline)
        setSub(subtext)
    }, [headline, subtext])

    const handleSave = async () => {
        if (!editable) return
        const fd = new FormData()
        fd.set('headline', title.trim())
        fd.set('subtext', sub.trim())
        await saveHeroFields({ headline: title.trim(), subtext: sub.trim() })
    }

    return (
        <section className={`py-24 md:py-32 max-w-5xl mx-auto px-6 ${sectionBg}`}>
            <div className="flex items-start gap-3">
                <h1
                    className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up ${titleColor}`}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    onDoubleClick={() => editable && handleSave()}
                    onBlur={() => {
                        handleSave()
                    }}
                    onInput={(e) => setTitle((e.target as HTMLElement).innerText)}
                >
                    {title}
                </h1>
            </div>
            <p
                className={`text-xl md:text-2xl max-w-2xl font-light animate-fade-in-up delay-100 ${subColor}`}
                contentEditable={editable}
                suppressContentEditableWarning
                onDoubleClick={() => editable && handleSave()}
                onBlur={() => {
                    handleSave()
                }}
                onInput={(e) => setSub((e.target as HTMLElement).innerText)}
            >
                {sub}
            </p>
        </section>
    )
}
