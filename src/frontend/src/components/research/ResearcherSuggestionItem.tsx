import { SuggestionItem } from "../../types/types";

function ResearcherSuggestionItem({ suggestion, onClickSuggestion }: {
    suggestion: SuggestionItem; onClickSuggestion: (selectedResearcher: SuggestionItem) => void
}) {
    return (
        <div className="cursor-pointer" onClick={() => onClickSuggestion(suggestion)}>
            <img src={suggestion.avatarUrl} alt="" />
            {suggestion.name[0].toLocaleUpperCase() + suggestion.name.slice(1)} EnterIcon
        </div>
    )
}

export default ResearcherSuggestionItem