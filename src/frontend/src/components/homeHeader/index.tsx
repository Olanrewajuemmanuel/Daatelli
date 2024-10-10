import { useNavigate } from "react-router-dom"
import { routesMap } from "../../constants";
import DatelliLogo from "../../assets/Daatelli.svg"

function HomeHeader({ cookies }: { cookies: any }) {
    const navigate = useNavigate()
    console.log(cookies.access);


    return (
        <header className="inter-body flex items-center max-h-64 py-2 border-b border-gray-200 opacity-80">
            <a href="/">
                <img src={DatelliLogo} alt="Daatelli Logo" width={300} className="mx-auto" />
            </a>
            <div className="mr-8 w-full flex items-center justify-between">
                <ul className="flex flex-row gap-8 font-semibold">
                    <li><a href="/about-daatelli">About Daatelli</a></li>
                    <li><a href="/developers">Developers</a></li>
                    <li><a href="/roadmap">What's new? ✨</a></li>
                </ul>
                <div>
                    {cookies.access ? (
                        <button onClick={() => navigate(routesMap.feed)} className="btn bg-primary text-white">Return to feed</button>
                    ) : (
                        <div className="space-x-5">
                            <button className="btn bg-primary text-white" onClick={() => navigate(routesMap.login)}>Login</button>
                            <button className="btn" onClick={() => navigate(routesMap.register)}>Register</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default HomeHeader
