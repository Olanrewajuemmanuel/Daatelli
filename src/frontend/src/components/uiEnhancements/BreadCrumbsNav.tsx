import { routesMap } from "../../constants";

function BreadcrumbsNav({ currentPage, parentPage }: { currentPage: string, parentPage: string }) {
    return <div className="breadcrumbs text-sm">
        <ul>
            <li><a href={routesMap.home}>Home</a></li>
            <li><a href={routesMap.news}>{parentPage}</a></li>
            <li>{currentPage}</li>
        </ul>
    </div>
}

export default BreadcrumbsNav;