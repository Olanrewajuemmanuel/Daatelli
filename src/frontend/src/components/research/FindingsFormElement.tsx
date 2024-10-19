import { ChangeEvent, useState } from "react"
import { Citation, Findings, UploadFindingSchemaType } from "../../types/types"
import FindingsDragAndDrop from "./FindingsDragAndDrop"
import InfoItem from "../uiEnhancements/InfoItem"
import { globals } from "../../constants"
import Select from "react-select"
import { FindingsBadge } from "../../types/enums"
import AddCitations from "./AddCitations"
import { useFormContext } from "react-hook-form"
import InputError from "../uiEnhancements/InputError"
import { idGenerator } from "../../constants/utils"

const badgesOptions = [
    { 'label': 'Significant/Expected outcome', value: FindingsBadge.significant },
    { 'label': 'Unexpected outcome', value: FindingsBadge.unexpected },
    { 'label': 'Outlier', value: FindingsBadge.outlier },
    { 'label': 'Correlation', value: FindingsBadge.correlations },
]


function FindingsFormElement() {
    const { setValue, setError, formState: { errors } } = useFormContext<UploadFindingSchemaType>();

    const [findings, setFindings] = useState<Findings[]>([])
    const [findingsText, setFindingsText] = useState('')
    const [findingsCitation, setFindingsCitation] = useState<Citation[]>([])
    const [findingsBadge, setFindingsBadge] = useState<FindingsBadge>(FindingsBadge.significant)
    const [displayCite, setDisplayCite] = useState(false)

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setFindingsText(e.currentTarget.value);

    }

    function handleBadgeChange(option: unknown): void {
        setFindingsBadge((option as { value: FindingsBadge }).value);

    }


    async function handleAddition(): Promise<void> {
        const newFinding: Findings = {
            id: idGenerator,
            badge: findingsBadge,
            text: findingsText,
            citations: findingsCitation,
        }
        if (newFinding.text.trim().split(/\s+/).length > 15) {
            setError('findings', { message: 'Findings should be no more than 15 words' }, { shouldFocus: true });
            return;
        }
        setFindings(findings => [...findings, newFinding]);
        setValue("findings", [...findings, newFinding], { shouldValidate: true })
        setFindingsText('')
        setFindingsCitation([])
        setDisplayCite(false)


    }

    function handleCitationUpdate(action: 'delete' | 'add', citation?: Citation, id?: string) {
        if (action === 'add') {
            if (!citation) return;
            setFindingsCitation(prev => [...prev, citation])
        } else if (action === 'delete') {
            setFindingsCitation(findingsCitation.filter(_citation => _citation.id !== id))

        }
    }


    return (
        <div className="form-control">
            <label htmlFor="findings" className="label">Add your findings:<InfoItem message={`Share your findings with the world! Drag and drop to re-order your findings.`} linkOptions={{ text: `Learn more on how to make your findings more presentable using the ${globals.appName} way`, link: '/' }} /></label>
            <input type="text" name="findings" placeholder="Add your Findings..." onChange={handleChange} value={findingsText} className="input input-bordered" />
            {errors && <InputError message={errors.findings?.message} />}
            <div hidden={!findingsText} className="shadow-md bg-white z-99 p-3 space-y-3 text-wrap overflow-hidden">
                <div className="flex justify-between">
                    <p><span className="text-slate-300">Finding:</span> {findingsText}</p>
                    <button className="btn btn-sm btn-outline" onClick={handleAddition}>Add Finding</button>
                </div>
                <Select options={badgesOptions} defaultValue={badgesOptions[0]} onChange={handleBadgeChange} />
                <button type="button" className="btn btn-sm btn-outline" onClick={() => setDisplayCite(!displayCite)}>{displayCite ? 'Hide' : 'Add'} Citation(s)</button>
                {displayCite && <AddCitations citations={findingsCitation} onCitationUpdate={handleCitationUpdate} />}
            </div>
            <FindingsDragAndDrop selectedFindings={findings} setFindings={setFindings} />
        </div>
    )
}

export default FindingsFormElement