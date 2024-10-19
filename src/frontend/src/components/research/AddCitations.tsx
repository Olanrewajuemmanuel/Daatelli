import { useState } from "react"
import { Citation, UploadFindingSchemaType } from "../../types/types"
import { useFormContext } from "react-hook-form";
import InputError from "../uiEnhancements/InputError";
import { urlValidationSchema } from "../../validations/schema/commons";
import { idGenerator } from "../../constants/utils";

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
                id: idGenerator,
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
            {errors && <InputError message={errors.findings?.message} />}
            <div className="flex items-center gap-2">
                <input type="text" name="citeText" value={citeText} placeholder="Name(s)" className="input input-bordered" onChange={(e) => setCiteText(e.target.value)} required />
                <input type="text" name="citeLink" value={citeLink} placeholder="Link" className="input input-bordered" onChange={(e) => setCiteLink(e.target.value)} />
                <button type="button" onClick={() => handleUpdate('add')} className="btn text-lg">+</button>
            </div>

            <div>
                {citations.map(citation =>
                    <div key={citation.link} className="flex items-center justify-between gap-2 my-5">
                        <a href={citation.link} className="link">{citation.name}</a>
                        <button onClick={() => handleUpdate('delete', citation.id)} type="button" className="btn btn-sm btn-outline">Remove</button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default AddCitations