import { Link } from "react-router-dom"
import { routesMap } from "../../constants"

function ComingSoonFeed() {
    return <div className="space-y-5 my-5">
        <p className="text-base flex items-center gap-2">We are working on this feature as fast as we can. It will be ready soon!</p>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-3 rounded-md text-sm font-semibold hover:opacity-90">
            <Link to={routesMap.feed}>
                Go back to your Feed
            </Link>
        </button>
    </div>
}

export default ComingSoonFeed