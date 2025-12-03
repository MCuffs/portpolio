export function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0b1f3a]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/0 to-white/0" />

            <div className="relative py-24 md:py-32 max-w-5xl mx-auto px-6">
                <div className="h-8 w-14 rounded-full bg-white/10 blur-2xl absolute -left-6 top-16" aria-hidden />
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
                    Data-Driven Strategist.
                </h1>
                <p className="text-xl md:text-2xl text-slate-100 max-w-2xl font-light animate-fade-in-up delay-100">
                    I bridge the gap between complex data and actionable business strategy.
                    Building products that matter.
                </p>
            </div>
        </section>
    )
}
