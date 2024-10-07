import { Citation } from "../../types/types"

function CitationsList({ citations }: { citations: Citation[] }) {
    return (
        <div>
            {citations.map(citation =>
                <div key={citation.link}>
                    <a href={citation.link}>{citation.name}</a>
                </div>
            )}
        </div>
    )
}

export default CitationsList