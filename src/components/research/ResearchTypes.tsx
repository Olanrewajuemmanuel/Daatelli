function ResearchTypes({ toggleDisplay }: { toggleDisplay: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="w-56 shadow-lg z-10 absolute right-0 top-0 h-full bg-white">
            <div className="w-full text-right">
                <button className="text-4xl" onClick={() => toggleDisplay(false)}>&times;</button>
            </div>
            <div>
                <ul>
                    <li><a href="#">Presentation</a></li>
                    <li><a href="#">Tables/Datasets</a></li>
                    <li><a href="#">Images</a></li>
                    <li><a href="#">Algorithms</a></li>
                    <li><a href="#">Videos</a></li>
                    <li><a href="#">Code</a></li>
                    <li><a href="#">Documents</a></li>
                </ul>
            </div>
        </div>
    )
}

export default ResearchTypes