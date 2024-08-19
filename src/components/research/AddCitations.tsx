import { useState } from "react"
import { Citation } from "../../types/types"

function Citations({ citations, onCitationUpdate }: { citations: Citation[], onCitationUpdate: (action: 'delete' | 'add', citation?: Citation, id?: string) => void }) {
    const [citeText, setCiteText] = useState('')
    const [citeLink, setCiteLink] = useState('')

    function handleUpdate(action: 'delete' | 'add', id?: string): void {
        if (!citeText) return;
        const citation = {
            id: Math.random().toString(),
            name: citeText,
            link: citeLink
        }
        if (action === 'add') {
            onCitationUpdate('add', citation)
        } else if (action === 'delete') {
            onCitationUpdate('delete', undefined, id)
        }
        setCiteLink('')
        setCiteText('')
    }

    return (
        <div>
            <input type="text" name="citeText" value={citeText} placeholder="Name(s)" onChange={(e) => setCiteText(e.target.value)} required />
            <input type="text" name="citeLink" value={citeLink} placeholder="Link" onChange={(e) => setCiteLink(e.target.value)} />
            <button type="button" onClick={() => handleUpdate('add')}>+</button>
            <div>
                {citations.map(citation =>
                    <div key={citation.link}>
                        <a href={citation.link}>{citation.name}</a>
                        <button onClick={() => handleUpdate('delete', citation.id)} type="button">Remove</button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Citations