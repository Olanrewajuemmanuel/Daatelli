function ResearchTypeDisplay({ title, helpText, description, link }: { title: string, helpText?: string, description: string, link: string }) {
    return (
        <div className="inter-body p-3 space-y-2 hover:bg-gray-100">
            <a href={link} className="font-semibold hover:underline">{title}</a>
            {helpText &&
                <button className="tooltip mx-1" data-tip={helpText}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </button>
            }

            <p className="text-sm text-body">{description}</p>
        </div>
    )
}

export default ResearchTypeDisplay