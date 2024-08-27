import { ChangeEvent, useState } from "react"
import { Citation, Findings, UploadFindingSchemaType } from "../../types/types"
import FindingsDragAndDrop from "./FindingsDragAndDrop"
import InfoItem from "../InfoItem"
import { globals } from "../../constants"
import Select from "react-select"
import { FindingsBadge } from "../../types/enums"
import AddCitations from "./AddCitations"
import { useFormContext } from "react-hook-form"
import InputError from "../InputError"
import { idGenerator } from "../../lib/utils"

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
        <div className="border">
            <label htmlFor="findings">Add your findings:<InfoItem message={`Share your findings with the world! Drag and drop to re-order your findings.`} linkOptions={{ text: `Learn more on how to make your findings more presentable using the ${globals.appName} way`, link: '/' }} /></label>
            <input type="text" name="findings" onChange={handleChange} value={findingsText} />
            {errors && <InputError message={errors.findings?.message} />}
            <div hidden={!findingsText} className="cursor-pointer" >
                {/* TODO: Own component */}
                <p onClick={handleAddition}>{findingsText}</p>
                <Select options={badgesOptions} defaultValue={badgesOptions[0]} onChange={handleBadgeChange} />
                <button type="button" onClick={() => setDisplayCite(true)} hidden={displayCite}>Add Citation</button>
                {displayCite && <AddCitations citations={findingsCitation} onCitationUpdate={handleCitationUpdate} />}
                <span>EnterIcon</span>
            </div>
            <FindingsDragAndDrop selectedFindings={findings} setFindings={setFindings} />
        </div>
    )
}

export default FindingsFormElement