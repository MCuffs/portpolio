export function Hero({ onDark = false }: { onDark?: boolean }) {
    const titleColor = onDark ? 'text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]' : 'text-gray-900'
    const subColor = onDark ? 'text-slate-100' : 'text-gray-600'
    const sectionBg = onDark ? 'bg-transparent' : 'bg-white'

    return (
        <section className={`py-24 md:py-32 max-w-5xl mx-auto px-6 ${sectionBg}`}>
            <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up ${titleColor}`}>
                Data-Driven Strategist.
            </h1>
            <p className={`text-xl md:text-2xl max-w-2xl font-light animate-fade-in-up delay-100 ${subColor}`}>
                I bridge the gap between complex data and actionable business strategy.
                Building products that matter.
            </p>
        </section>
    )
}
