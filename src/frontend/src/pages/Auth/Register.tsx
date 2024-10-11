import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import { routesMap } from "../../constants"
import { RegisterType } from "../../types/enums"
import RegisterForm from "../../components/auth/RegisterForm"
import { loginUser } from "../../actions/auth"
import HealthCheck from "../../components/healthCheck"
import DatelliLogo from '../../assets/Daatelli.svg'


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
        setCookies('access', response.accessToken, { expires: new Date(Date.now() + 3600 * 1000 * 24 * 7) })
        return navigate(routesMap.feed, { replace: true })
    }
    return (
        <div className="px-8 inter-body e">
            <header className='py-4'>
                <a href={routesMap.home}>
                    <img src={DatelliLogo} alt="Daatelli Logo" width={250} className="mx-auto" />
                </a>
            </header>
            <h1 className={`${formMode ? 'text-center' : ''} text-2xl inter-heading`}>Sign up to Daatelli</h1>
            {
                formMode ? (<RegisterForm mode={modeName!} onRegister={handleRegister} />) : (
                    <div className="flex gap-5 my-5">
                        <button className="px-4 pb-12 cursor-pointer w-1/2 min-h-[400px] rounded-xl bg-primary bg-gradient-to-r from-[#3a1c71] via-[#d76d77] to-[#ffaf7b] text-white inline-flex flex-col justify-end backdrop-layers-light-1" onClick={() => handleRegisternavigation(RegisterType.researcher)}>
                            <h2 className="text-2xl font-semibold">Researcher</h2>
                            <p className="text-left">Access to research databases, exclusive forums, AI and data analytics</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>

                        </button>
                        <button className="px-4 pb-12 cursor-pointer w-1/2 rounded-xl bg-success bg-gradient-to-r from-[#42275a] to-[#734b6d] text-white inline-flex flex-col justify-end shadow-lg backdrop-layers-light-2" onClick={() => handleRegisternavigation(RegisterType.member)}>
                            <h2 className="text-2xl font-semibold">Member</h2>
                            <p className="text-left">Access to the latest research content and our awesome community. Don&apos;t worry, you can become a researcher after your account is created</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                )
            }


            <p className="text-center">Already a user? <Link to={routesMap.login} className="link">Sign in</Link></p>
            <HealthCheck />
        </div>
    )
}

export default Register