import { useState } from "react";
import { researchKeywords, truncateText } from "../../../constants/utils";
import BadgeColor from "../../uiEnhancements/badgeColor";

function FindingItem({ finding, highlight, setHighlight }: { finding: any, highlight: boolean, setHighlight: (highlight: boolean) => void }) {

    // Function to highlight keywords
    const highlightKeywords = (text: string) => {
        let highlightedText = text;

        researchKeywords.forEach(keyword => {
            const regex = typeof keyword === 'string' ? new RegExp(`\\b${keyword}\\b`, 'gi') : keyword;
            highlightedText = highlightedText.replace(regex, match => `<span class="bg-gray-200 rounded px-1">${match}</span>`);
        });

        return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    };

    return (
        <div className="flex items-center gap-2 shadow-md rounded-lg p-3 leading-relaxed" onClick={() => setHighlight(!highlight)}>
            <BadgeColor badge={finding.badge} />
            <p className="text-sm">{highlight ? highlightKeywords(finding.text) : truncateText(finding.text, 125)}</p>
        </div>
    )
}

export default FindingItem;
