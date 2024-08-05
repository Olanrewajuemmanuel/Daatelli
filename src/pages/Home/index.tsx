import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { routesMap } from "../../constants";

function Home() {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false);
    return (
        <div>
            <header>
                <a href="/">Logo</a>
                <div>
                    <div hidden={auth}>
                        <button onClick={() => navigate(routesMap.login)}>Login</button>
                        <button onClick={() => navigate(routesMap.register)}>Register</button>
                    </div>
                    <button hidden={!auth} onClick={() => navigate(routesMap.feed)}>Return to feed</button>

                </div>

            </header>
        </div>
    )
}

export default Home