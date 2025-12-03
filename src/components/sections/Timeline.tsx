type Experience = {
    year: string
    role: string
    company: string
}

export function Timeline({ experiences }: { experiences: Experience[] }) {
    return (
        <div className="space-y-8 border-l border-gray-200 ml-3 pl-8 py-4">
            {experiences.map((exp, index) => (
                <div key={index} className="relative">
                    <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 border-white bg-gray-200 ring-4 ring-white" />
                    <span className="text-sm text-gray-400 font-mono">{exp.year}</span>
                    <h3 className="text-lg font-medium text-gray-900 mt-1">{exp.role}</h3>
                    <p className="text-gray-500">{exp.company}</p>
                </div>
            ))}
        </div>
    )
}
