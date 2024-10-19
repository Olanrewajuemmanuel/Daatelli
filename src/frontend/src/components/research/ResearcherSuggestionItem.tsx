import { SuggestionItem } from "../../types/types";

function ResearcherSuggestionItem({ suggestion, onClickSuggestion }: {
    suggestion: SuggestionItem; onClickSuggestion: (selectedResearcher: SuggestionItem) => void
}) {
    return (
        <div className="cursor-pointer hover:bg-slate-100 my-2 p-2 flex items-center justify-between" onClick={() => onClickSuggestion(suggestion)}>
            <div className="flex items-center gap-2">
                <img src={suggestion.avatarUrl} alt="" className="w-8 h-8 mr-4 rounded-full" width={8} />
                {suggestion.name[0].toLocaleUpperCase() + suggestion.name.slice(1)}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#222" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
            </svg>

        </div>
    )
}

export default ResearcherSuggestionItem