import { ChangeEvent, useEffect, useState } from "react";
import ResearcherSuggestionItem from "./ResearcherSuggestionItem";
import InfoItem from "../uiEnhancements/InfoItem";
import { SuggestionItem, UploadFileSchemaType } from "../../types/types";
import AuthorsDragAndDrop from "./AuthorsDragAndDrop";
import { useFormContext } from "react-hook-form";
import InputError from "../uiEnhancements/InputError";
import { useCookies } from "react-cookie";
import { getUserAssociations } from "../../actions/user";
import { idGenerator } from "../../constants/utils";


function SelectMultipleResearchers() {
    const { setValue, formState: { errors }, setError } = useFormContext<UploadFileSchemaType>();
    const [loading, setLoading] = useState(true);

    const [researcher, setResearcher] = useState('');
    const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
    const [selectedNames, setSelectedNames] = useState<SuggestionItem[]>([]);
    const [cookies] = useCookies(['access'])
    let timeout: NodeJS.Timeout | undefined;

    useEffect(() => {
        async function getUsersProfiles() {
            // pre-fetch users profiles
            try {
                const response = await getUserAssociations(cookies.access, { association: true, limit: 10 });

                setSuggestions(response.map((association: { id: string; full_name: string; avatar: string | null; }) => ({
                    id: association.id,
                    name: association.full_name,
                    avatarUrl: association.avatar,
                })))

            } catch (error) {
                console.error(error);
                setError("root", { message: (error as Error).message })
                setTimeout(() => setError("root", { message: (error as Error).message }))
            } finally {
                setLoading(false)
            }
        }

        getUsersProfiles();
    }, [researcher])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                    setSuggestions([{ id: idGenerator, name: input }])
                } else {
                    setSuggestions([...filteredSuggestions]);
                }
            }
        }, 2000) // debounce typing
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
            {errors && <InputError message={errors.researchers?.message?.toString()} />}
            <label htmlFor="researchers" className="label">Add Authors:<InfoItem message="Arrange authors in order of relevance from highest (first author) to least relevant. Drag and drop names to re-order." /></label>
            <div id="">
                <AuthorsDragAndDrop selectedNames={selectedNames} handleDeletion={handleDeletion} onDrag={setSelectedNames} />
                <div className="form-control space-y-2 relative">
                    <input type="text" name="researchers" placeholder="Add a co-author..." value={researcher} onChange={handleChange} className="input focus:border-b focus:border-b-primary focus:outline-none focus:ring-0 border-0 bg-slate-50" />
                    <span className="text-sm font-semibold absolute right-5 top-3/5 -translate-y-3/5 cursor-pointer" onClick={() => setSuggestions([])}>Close</span>
                </div>
            </div>
            {suggestions.length > 0 && (
                <div className="shadow-md" data-testid="suggestionContainer">{loading ? 'Loading...' : suggestions.map(suggestion =>
                    <ResearcherSuggestionItem suggestion={suggestion} onClickSuggestion={handleAddition} key={suggestion.id} />
                )}
                </div>
            )}
        </div>
    )
}

export default SelectMultipleResearchers