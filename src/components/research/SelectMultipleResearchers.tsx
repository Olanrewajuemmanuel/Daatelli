import { ChangeEvent, useEffect, useState } from "react";
import ResearcherSuggestionItem from "./ResearcherSuggestionItem";
import InfoItem from "../InfoItem";
import { SuggestionItem, UploadFileSchemaType } from "../../types/types";
import AuthorsDragAndDrop from "./AuthorsDragAndDrop";
import { useFormContext } from "react-hook-form";
import InputError from "../InputError";
import { useCookies } from "react-cookie";
import { getUsers } from "../../actions/user";


function SelectMultipleResearchers() {
    const { setValue, formState: { errors } } = useFormContext<UploadFileSchemaType>();

    const [researcher, setResearcher] = useState('');
    const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
    const [selectedNames, setSelectedNames] = useState<SuggestionItem[]>([]);
    const [cookies] = useCookies(['access'])
    let timeout: NodeJS.Timeout | undefined;

    useEffect(() => {
        async function getUsersProfiles() {
            // pre-fetch users profiles
            try {
                const response = await getUsers(cookies.access);
                setSuggestions(response.map(user => ({
                    id: user.id,
                    name: user.fullName,
                    avatarUrl: user.avatarUrl,
                })))
            } catch (error) {
                console.error(error);
            }
        }

        getUsersProfiles();
    }, [researcher])

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setResearcher(input)


        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (input && input.trim() !== "") {
                // fetch list of researchers and update state
                const filteredSuggestions = suggestions.filter(suggestion =>
                    suggestion.name.toLowerCase().includes(input.toLowerCase())
                );

                if (filteredSuggestions.length <= 0) {
                    // Display input as fallback if there are no suggestions
                    setSuggestions([{ id: Math.random().toString(), name: input }])
                } else {
                    setSuggestions([...filteredSuggestions]);
                }
            }
        }, 500) // debounce typing
    }

    const handleAddition = (selectedResearcher: SuggestionItem) => {
        if (selectedNames.find(name => name.name === selectedResearcher.name)) return

        setSelectedNames([...selectedNames, selectedResearcher])

        setValue("researchers", [...selectedNames, selectedResearcher], { shouldValidate: true, })
        setResearcher('')
        // Remove selected researcher from suggestions
        setSuggestions(prev => prev.filter(suggestion => suggestion.name !== selectedResearcher.name))
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