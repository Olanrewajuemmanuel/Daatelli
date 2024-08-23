import { useState } from "react"
import { Citation, UploadFindingSchemaType } from "../../types/types"
import { useFormContext } from "react-hook-form";
import InputError from "../InputError";
import { urlValidationSchema } from "../../validations/schema/commons";

function AddCitations({ citations, onCitationUpdate }: { citations: Citation[], onCitationUpdate: (action: 'delete' | 'add', citation?: Citation, id?: string) => void }) {
    const { setError, clearErrors, formState: { errors } } = useFormContext<UploadFindingSchemaType>();

    const [citeText, setCiteText] = useState('')
    const [citeLink, setCiteLink] = useState('')

    function handleUpdate(action: 'delete' | 'add', id?: string): void {
        if (!citeText) {
            setError("findings", { message: 'Add a citation text', type: "onChange" })
            return;
        };
        if (!citeLink) {
            setError("findings", { message: 'Add a valid URL', type: "onChange" })
            return;
        };
        urlValidationSchema.validate(citeLink).then(() => {
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
            clearErrors("findings")
        }).catch(err => setError("findings", { message: err.errors }))

    }

    return (
        <div>
            <input type="text" name="citeText" value={citeText} placeholder="Name(s)" onChange={(e) => setCiteText(e.target.value)} required />
            <input type="text" name="citeLink" value={citeLink} placeholder="Link" onChange={(e) => setCiteLink(e.target.value)} />
            {errors && <InputError message={errors.findings?.message} />}
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

export default AddCitations