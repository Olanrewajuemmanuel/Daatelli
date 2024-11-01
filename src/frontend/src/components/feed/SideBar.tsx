import { NavLink } from "react-router-dom";
import { routesMap } from "../../constants";

function SideBar() {
    return (
        <div className="max-w-48 py-2 absolute top-28 left-4 text-sm">
            <ul>
                <div className="py-2 mb-5 border-gray-200 space-y-4">
                    <li><NavLink to={routesMap.feed} className={({ isActive, isPending }) => isPending ? "text-gray-500" : (isActive && window.location.pathname === routesMap.feed) ? "text-primary font-semibold" : ""}>Home</NavLink></li>
                    <li><NavLink to={routesMap.communities} className={({ isActive, isPending }) => isPending ? "text-gray-500" : isActive ? "text-primary font-semibold" : ""}   >Communities</NavLink></li>
                    <li><NavLink to={routesMap.topResearchers} className={({ isActive, isPending }) => isPending ? "text-gray-500" : isActive ? "text-primary font-semibold" : ""}>Top researchers</NavLink></li>
                    <li><NavLink to={routesMap.trends} className={({ isActive, isPending }) => isPending ? "text-gray-500" : isActive ? "text-primary font-semibold" : ""}>Trends</NavLink></li>
                    <li><NavLink to={routesMap.hotTopics} className={({ isActive, isPending }) => isPending ? "text-gray-500" : isActive ? "text-primary font-semibold" : ""}>Hot topics</NavLink></li>
                    <li><NavLink to={routesMap.collaborativeProjects} className={({ isActive, isPending }) => isPending ? "text-gray-500" : isActive ? "text-primary font-semibold" : ""}>Collaborative projects</NavLink></li>
                    <li><NavLink to={routesMap.eventsWebinars} className={({ isActive, isPending }) => isPending ? "text-gray-500" : isActive ? "text-primary font-semibold" : ""}>Events & Webinars</NavLink></li>
                </div>
                <span className="divider"></span>
                <div className="py-2 mb-5 space-y-4">
                    <li><a href={routesMap.achievements}>Achievements</a></li>
                    <li><a href={routesMap.followers}>Followers</a></li>
                    <li><a href={routesMap.following}>Following</a></li>
                    <li><a href={routesMap.messages}>Messages</a></li>
                </div>
            </ul>
            <span className="divider"></span>
            <aside className="absolute bottom-0 left-0">Ads</aside>
        </div>
    )
}

export default SideBar