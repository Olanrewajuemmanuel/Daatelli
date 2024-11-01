import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { routesMap } from "../../constants";
import DatelliLogo from "../../assets/Daatelli.svg"

function HomeHeader({ cookies }: { cookies: any }) {
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()


    return (
        <header className="inter-body text-body flex items-center max-h-64 py-2 border-b border-gray-200">
            <a href={routesMap.home}>
                <img src={DatelliLogo} alt="Daatelli Logo" width={300} className="mx-auto max-w-full" />
            </a>
            <div className="mr-8 w-full flex items-center justify-between gap-x-5">
                <ul className={`menu menu-vertical lg:menu-horizontal gap-8 font-semibold absolute left-0 top-0 right-0 lg:relative z-99 bg-white lg:bg-transparent ${showMenu ? 'menu' : 'hidden'}`}>
                    <li><a href={routesMap.about} className="mt-10 lg:mt-0 hover:bg-transparent">About Daatelli</a></li>
                    <li><a href={routesMap.developers} className="lg:hover:bg-transparent">Developers</a></li>
                    <li><a href={routesMap.roadmap} className="lg:hover:bg-transparent">What's new? <span className="indicator-icon"></span></a></li>
                    <button className="btn btn-ghost hover:bg-transparent absolute right-0 text-2xl lg:hidden" onClick={() => setShowMenu(false)}><span>✕</span></button>
                </ul>
                <div className="w-full text-end lg:w-auto">
                    {cookies.access ? (
                        <button onClick={() => navigate(routesMap.feed)} className="btn bg-primary text-white">Return to your Feed</button>
                    ) : (
                        <div className="space-x-2 justify-end flex items-center">
                            <button className="btn btn-sm lg:btn-md bg-primary text-white" onClick={() => navigate(routesMap.login)}>Login</button>
                            <button className="btn btn-sm lg:btn-md" onClick={() => navigate(routesMap.register)}>Register</button>
                        </div>
                    )}
                </div>
                <div className="lg:hidden">
                    <button onClick={() => setShowMenu(true)}><span className="text-2xl font-semibold">☰</span></button>
                </div>
            </div>
        </header>
    )
}

export default HomeHeader
