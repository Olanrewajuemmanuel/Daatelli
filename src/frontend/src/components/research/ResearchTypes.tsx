import { routesMap } from "../../constants"
import ResearchTypeDisplay from "./ResearchTypeDisplay"

const researchTypes = [
    { title: 'Presentations', description: 'Presentations are slides from conferences, seminars, etc.', helpText: 'Presentations are best presented in pptx format', link: routesMap.addFindings + '?type=presentation' },
    { title: 'Research Papers', description: 'Research papers are academic papers from journals, conferences, etc.', link: routesMap.addFindings + '?type=researchPaper' },
    { title: 'Tables/Datasets', description: 'Tables/Datasets are tables or datasets from research papers, data analysis etc.', link: routesMap.addFindings + '?type=tables' },
    { title: 'Images', description: 'Images in jpeg, png and other formats.', link: routesMap.addFindings + '?type=images' },
    { title: 'Algorithms', description: 'Algorithms are algorithms from research papers, etc.', link: routesMap.addFindings + '?type=algorithms' },
    { title: 'Videos', description: 'Videos from conferences, seminars, field study etc.', link: routesMap.addFindings + '?type=videos' },
    { title: 'Code', description: 'Add Code in our code editor', link: routesMap.addFindings + '?type=code' },
    { title: 'Documents', description: 'Documents from research papers, etc.', link: routesMap.addFindings + '?type=documents' },
]

function ResearchTypes({ toggleDisplay }: { toggleDisplay: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="w-64 shadow-l shadow-md z-10 fixed right-0 top-0 bg-white">
            <div className="h-screen overflow-y-auto overflow-x-hidden">
                <div className="flex justify-between items-center p-3">
                    <h3 className="font-semibold">Research Types</h3>
                    <button className="text-lg lg:text-xl" onClick={() => toggleDisplay(false)}>✕</button>
                </div>
                <div className="border-t border-b border-gray-200">
                    <ul>
                        {researchTypes.map((type, index) => (
                            <ResearchTypeDisplay key={index} {...type} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ResearchTypes