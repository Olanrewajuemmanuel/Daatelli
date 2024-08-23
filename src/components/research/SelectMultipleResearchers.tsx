import { ChangeEvent, useState } from "react";
import ResearcherSuggestionItem from "./ResearcherSuggestionItem";
import InfoItem from "../InfoItem";
import { SuggestionItem, UploadFileSchemaType } from "../../types/types";
import AuthorsDragAndDrop from "./AuthorsDragAndDrop";
import { useFormContext } from "react-hook-form";
import InputError from "../InputError";

const predefinedNames: SuggestionItem[] = [
    { name: 'Alice', id: 'asca12', avatarUrl: '' },
    { name: 'Bob', id: 'as12', avatarUrl: 'https://c5.rgstatic.net/m/41010379691719/images/icons/svgicons/publication-creation-grey.svg' },
];

function SelectMultipleResearchers() {
    const { setValue, formState: { errors } } = useFormContext<UploadFileSchemaType>();

    const [researcher, setResearcher] = useState('');
    const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
    const [selectedNames, setSelectedNames] = useState<SuggestionItem[]>([]);
    let timeout: NodeJS.Timeout | undefined;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setResearcher(input)


        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (input && input.trim() !== "") {
                // fetch list of researchers and update state
                const filteredSuggestions = predefinedNames.filter(name =>
                    name.name.toLowerCase().includes(input.toLowerCase())
                );

                if (filteredSuggestions.length <= 0) {
                    // Display input as fallback if there are no suggestions
                    setSuggestions([{ id: Math.random().toString(), name: input }])
                } else {
                    setSuggestions([...filteredSuggestions]);
                }
            } else {
                setSuggestions([])
            }
        }, 500) // debounce typing
    }

    const handleAddition = (selectedResearcher: SuggestionItem) => {
        if (selectedNames.find(name => name.name === selectedResearcher.name)) return

        setSelectedNames([...selectedNames, selectedResearcher])

        setValue("researchers", [...selectedNames, selectedResearcher], { shouldValidate: true, })
        setResearcher('')
        setSuggestions([])
    }
    const handleDeletion = (id: string) => {
        const filteredNames = selectedNames.filter(selectedName => selectedName.id !== id)
        setValue("researchers", filteredNames, { shouldValidate: true, })
        setSelectedNames(filteredNames)
    }

    return (
        <div>
            <label htmlFor="researchers">Add Authors:<InfoItem message="Arrange authors in order of relevance from highest (first author) to least relevant. Drag and drop names to re-order." /></label>
            <div id="">
                <AuthorsDragAndDrop selectedNames={selectedNames} handleDeletion={handleDeletion} onDrag={setSelectedNames} />
                <textarea name="researchers" value={researcher} onChange={handleChange}></textarea>
                {errors && <InputError message={errors.researchers?.message?.toString()} />}
            </div>
            <div>{suggestions.map(suggestion =>
                <ResearcherSuggestionItem suggestion={suggestion} onClickSuggestion={handleAddition} key={suggestion.id} />
            )}</div>
        </div>
    )
}

export default SelectMultipleResearchers