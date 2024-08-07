import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import { routesMap } from "../../constants"
import { RegisterType } from "../../types/enums"
import RegisterForm from "../../components/RegisterForm"
import { loginUser } from "../../actions/auth"


function Register() {
    const [cookies, setCookies] = useCookies(['access'])
    const [formMode, setFormMode] = useState(false);
    const [modeName, setModeName] = useState<RegisterType>()

    const navigate = useNavigate()
    useEffect(() => {
        // TODO: validate token
        if (cookies.access) navigate(routesMap.feed)


    }, [cookies.access, navigate])

    useEffect(() => {
        // Change display based on URL search params change
        const urlParams = new URLSearchParams(document.location.search)
        if (!urlParams?.get('type')) setFormMode(false);
        if (urlParams.get('type')! in RegisterType) {
            setFormMode(true)
            setModeName(urlParams.get('type') as RegisterType)
        } else {
            setFormMode(false)
        }


    }, [document.location.search])

    const handleRegisternavigation = (type: RegisterType) => {
        // Change register type in URL based on click event
        const urlParams = new URLSearchParams()
        urlParams.set('type', type)
        document.location.search = urlParams.toString()
    }

    const handleRegister = async (email: string, password: string) => {
        const response = await loginUser(password, email)

        // Store cookie and navigate to feed
        setCookies('access', response.accessToken)
        return navigate(routesMap.feed, { replace: true })
    }
    return (
        <div>
            <h1>Register</h1>
            {
                formMode ? (<RegisterForm mode={modeName!} onRegister={handleRegister} />) : (
                    <div className="flex">
                        <button className="cursor-pointer" onClick={() => handleRegisternavigation(RegisterType.researcher)}>
                            <h2>Researcher</h2>
                            <p>Access to research databases, exclusive forums, AI and data analytics</p>
                        </button>
                        <button className="cursor-pointer" onClick={() => handleRegisternavigation(RegisterType.member)}>
                            <h2>Member</h2>
                            <p>Access to the latest research content and our awesome community. Don&apos;t worry, you can become a researcher after your account is created</p>
                        </button>
                    </div>
                )
            }


            <p>Already a user? <Link to={routesMap.login}>Sign in</Link></p>
        </div>
    )
}

export default Register