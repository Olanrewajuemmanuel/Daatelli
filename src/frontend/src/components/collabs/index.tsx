import ComingSoonFeed from "../comingSoon/feed"

function CollaborativeProjects() {
    return (
        <div>
            <h1 className="text-lg font-semibold flex items-center gap-1">Collaborative Projects
                <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 2v5.5c0 .5-.3 1-.6 1.4L4 16c-.7.8-1 1.9-1 3 0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2 0-1.1-.3-2.2-1-3l-5.4-7.1c-.3-.4-.6-.9-.6-1.4V2m-8 14h12M10 2h4"
                    />
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        d="M8 13.5l4-2 4 2"
                    />
                </svg></h1>
            <ComingSoonFeed />
        </div>
    )
}

export default CollaborativeProjects