import { useContext, useEffect, useState } from 'react'
import RootLogin from '../../components/auth/RootLogin'
import CollabLogin from '../../components/auth/CollabLogin'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { routesMap } from '../../constants'
import { loginUser } from '../../actions/auth'
import HealthCheck from '../../components/healthCheck'
import DatelliLogo from "../../assets/Daatelli.svg"
import ComingSoonBanner from '../../components/comingSoon/banner'
import { FeaturesContext } from '../../contexts'
import MetaTags from "react-meta-tags";


function Login() {
    const [state, setState] = useState('root')
    const [cookies, setCookies] = useCookies(['refresh', 'access'])
    const [uid, setUid] = useState('')
    const devFeatures = useContext(FeaturesContext)

    const navigate = useNavigate()
    useEffect(() => {
        // TODO: validate token
        if (cookies.access) navigate(routesMap.feed)

    }, [cookies.access, navigate])

    const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
        const response = await loginUser(password, email)
        setCookies('access', response.accessToken, { expires: new Date(Date.now() + 3600 * 1000 * 24 * 7) })


        // Create cookies and navigate to feed
        if (rememberMe) {
            // 7 days expiry time to use refresh token
            setCookies('refresh', response.refreshToken, { expires: new Date(Date.now() + 3600 * 1000 * 24 * 7) })
        }

        return navigate(routesMap.feed, { replace: true })
    }

    return (
        <>
            <MetaTags>
                <title>Daatelli | Login</title>
            </MetaTags>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 inter-body w-full lg:max-w-[978px] px-10">
                <header className='py-4'>
                    <a href={routesMap.home}>
                        <img src={DatelliLogo} alt="Daatelli Logo" width={250} className="mx-auto" />
                    </a>
                </header>
                {devFeatures.includes('auth') && <ComingSoonBanner />}
                <>
                    <h1 className="text-2xl lg:text-3xl inter-heading">Sign in</h1>
                    <div className="block lg:flex flex-row justify-between gap-2 space-y-5 lg:space-y-0">
                        {/* Radio elements to toggle login state */}
                        <div className='flex flex-col mt-8 gap-y-5'>
                            <div className='inline-flex items-center'>
                                <input type="radio" name='state' value="root"
                                    checked={state === 'root'} onChange={(e) => setState(e.target.value)} className='radio radio-sm' />
                                <label htmlFor="root" className='mx-2'>Sign in as Root user</label>
                            </div>
                            <div className='inline-flex items-center'>
                                <input type="radio" name='state' value="collaborator"
                                    checked={state === 'collaborator'} id="collaborator" onChange={(e) => setState(e.target.value)} className='radio radio-sm' />
                                <label htmlFor='collaborator' className='mx-2'>Sign in as a Collaborator</label>
                            </div>
                        </div>
                        {/* Sign in Form */}
                        <div className='lg:min-w-[600px] h-64 space-y-4'>
                            {state === 'root' ? <RootLogin onLogin={handleLogin} setCurrentUid={setUid} /> : <CollabLogin />}
                            <div className='md:flex justify-between'>
                                <p><Link to={routesMap.forgotPassword + `?uid=${uid}`} className='link'>Forgot password?</Link></p>
                                <p>Create an account <Link to={routesMap.register} className='link'>here</Link></p>
                            </div>

                        </div>

                        <HealthCheck />
                    </div>
                </>
            </div>
        </>
    )
}

export default Login