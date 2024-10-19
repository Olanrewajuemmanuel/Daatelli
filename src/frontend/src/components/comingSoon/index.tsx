import HomeHeader from "../homeHeader"
import { Link } from "react-router-dom"
import { routesMap } from "../../constants"
import { useCookies } from "react-cookie"

function ComingSoon() {
    const [cookies] = useCookies(['access'])

    return <div className="flex flex-col min-h-screen inter-body">
        <HomeHeader cookies={cookies} />
        <main className="flex-grow flex flex-col items-center justify-center gap-4 px-10 text-center">
            <h1 className="text-gradient-oth text-3xl font-semibold">Coming Soon</h1>
            <p>Hi! You are at a page that is not yet available. We are working on it and it will be ready soon...</p>
            <p>For now, you could head back to the <Link className="link" to={routesMap.home}>homepage</Link></p>
        </main>
        <footer className="px-10 mt-auto py-10">
            <div className="flex justify-center">
                <p className="text-sm text-slate-600">© {new Date().getFullYear()} Daatelli. All rights reserved.</p>
            </div>
        </footer>
    </div>
}

export default ComingSoon