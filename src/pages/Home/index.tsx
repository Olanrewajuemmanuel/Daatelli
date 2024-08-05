import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { routesMap } from "../../constants";
import { useCookies } from "react-cookie";

function Home() {
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies(['access'])
    return (
        <div>
            <header>
                <a href="/">Logo</a>
                <div>
                    <div hidden={cookies.access}>
                        <button onClick={() => navigate(routesMap.login)}>Login</button>
                        <button onClick={() => navigate(routesMap.register)}>Register</button>
                    </div>
                    <button hidden={!cookies.access} onClick={() => navigate(routesMap.feed)}>Return to feed</button>

                </div>

            </header>
        </div>
    )
}

export default Home