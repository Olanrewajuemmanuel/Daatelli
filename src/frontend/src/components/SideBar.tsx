function SideBar() {
    return (
        <div className="min-w-36">
            <ul>
                <div className="pb-2 mb-5 border-b">
                    <li><a href="#">Communities</a></li>
                    <li><a href="#">Top researchers</a></li>
                    <li><a href="#">Trends</a></li>
                    <li><a href="#">Hot topics</a></li>
                    <li><a href="#">Collaborative projects</a></li>
                    <li><a href="#">Events & Webinars</a></li>
                </div>
                <div>
                    <li><a href="#">Achievements</a></li>
                    <li><a href="#">Followers</a></li>
                    <li><a href="#">Following</a></li>
                    <li><a href="#">Messages</a></li>
                </div>

            </ul>
            <aside className="absolute bottom-0 left-0 px-4">Ads</aside>
        </div>
    )
}

export default SideBar