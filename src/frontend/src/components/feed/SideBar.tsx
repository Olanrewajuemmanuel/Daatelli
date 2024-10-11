function SideBar() {
    return (
        <div className="max-w-48 py-2 absolute top-28 left-4 text-sm">
            <ul>
                <div className="py-2 mb-5 border-gray-200 space-y-4">
                    <li><a href="#">Communities</a></li>
                    <li><a href="#">Top researchers</a></li>
                    <li><a href="#">Trends</a></li>
                    <li><a href="#">Hot topics</a></li>
                    <li><a href="#">Collaborative projects</a></li>
                    <li><a href="#">Events & Webinars</a></li>
                </div>
                <span className="divider"></span>
                <div className="py-2 mb-5 space-y-4">
                    <li><a href="#">Achievements</a></li>
                    <li><a href="#">Followers</a></li>
                    <li><a href="#">Following</a></li>
                    <li><a href="#">Messages</a></li>
                </div>
            </ul>
            <span className="divider"></span>
            <aside className="absolute bottom-0 left-0">Ads</aside>
        </div>
    )
}

export default SideBar