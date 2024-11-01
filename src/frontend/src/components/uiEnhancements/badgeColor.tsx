import { badgeColor } from "../../constants/utils";
import { FindingsBadge } from "../../types/enums";

function BadgeColor({ badge }: { badge: string }) {
    return <span className={`${badgeColor(badge.toLowerCase() as FindingsBadge)} w-2 h-9 rounded-xl tooltip`} data-tip={badge}></span>
}

export default BadgeColor;