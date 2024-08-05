import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import { routesMap } from "../../constants"

function Register() {
    const [cookies, setCookies] = useCookies(['access'])

    let navigate = useNavigate()
    useEffect(() => {
        // TODO: validate token
        if (cookies.access) navigate(routesMap.feed)

    }, [cookies.access, navigate])
    return (
        <div>Register

            <p>Already a user? <Link to={routesMap.login}>Sign in</Link></p>
        </div>
    )
}

export default Register