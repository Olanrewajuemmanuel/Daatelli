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
        if (action === 'add') {
            if (!citeText) {
                setError("findings", { message: 'Add a citation text', type: "onChange" })
                return;
            };
            if (!citeLink) {
                setError("findings", { message: 'Add a valid URL', type: "onChange" })
                return;
            };
            const citation = {
                id: idGenerator(),
                name: citeText,
                link: citeLink
            }
            urlValidationSchema.validate(citeLink).then(() => {
                onCitationUpdate('add', citation)
            }).catch(err => setError("findings", { message: err.errors }))
            // Reset the form
            setCiteLink('')
            setCiteText('')
            clearErrors("findings")
        } else if (action === 'delete') {
            onCitationUpdate('delete', undefined, id)
        }
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