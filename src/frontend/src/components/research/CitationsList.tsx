import { Citation } from "../../types/types"

function CitationsList({ citations }: { citations: Citation[] }) {
    return (
        <div className="text-sm">
            <div key={citations[0].link}>
                <a href={citations[0].link}>{citations[0].name}</a>
            </div>
            {citations.length > 1 && <p>and {citations.length - 1} other(s)</p>}
        </div>
    )
}

export default CitationsList