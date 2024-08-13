import { routesMap } from "../../constants"

function ResearchTypes({ toggleDisplay }: { toggleDisplay: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="w-56 shadow-lg z-10 absolute right-0 top-0 h-full bg-white">
            <div className="w-full text-right">
                <button className="text-4xl" onClick={() => toggleDisplay(false)}>&times;</button>
            </div>
            <div>
                <ul>
                    <li><a href={routesMap.addFindings + '?type=presentation'}>Presentation</a></li>
                    <li><a href={routesMap.addFindings + '?type=tables'}>Tables/Datasets</a></li>
                    <li><a href={routesMap.addFindings + '?type=images'}>Images</a></li>
                    <li><a href={routesMap.addFindings + '?type=algorithms'}>Algorithms</a></li>
                    <li><a href={routesMap.addFindings + '?type=videos'}>Videos</a></li>
                    <li><a href={routesMap.addFindings + '?type=code'}>Code</a></li>
                    <li><a href={routesMap.addFindings + '?type=documents'}>Documents</a></li>
                </ul>
            </div>
        </div>
    )
}

export default ResearchTypes