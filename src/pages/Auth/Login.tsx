import { useEffect, useState } from 'react'
import RootLogin from '../../components/RootLogin'
import CollabLogin from '../../components/CollabLogin'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { routesMap } from '../../constants'
import { loginUser } from '../../actions/auth'

function Login() {
    const [state, setState] = useState('root')
    const [cookies, setCookies] = useCookies(['refresh', 'access'])
    const [uid, setUid] = useState('')

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
        <div>
            <h1>Sign in</h1>
            {/* Radio elements to toggle login state */}
            <div>
                <div>
                    <input type="radio" name='state' value="root"
                        checked={state === 'root'} onChange={(e) => setState(e.target.value)} />
                    <label htmlFor='root'>Sign in as root user</label>
                </div>
                <div>
                    <input type="radio" name='state' value="collaborator"
                        checked={state === 'collaborator'} onChange={(e) => setState(e.target.value)} />
                    <label htmlFor='root'>Sign in as a collaborator</label>
                </div>
            </div>
            {/* Sign in Form */}
            <div>
                {state === 'root' ? <RootLogin onLogin={handleLogin} setCurrentUid={setUid} /> : <CollabLogin />}
            </div>
            <Link to={routesMap.forgotPassword + `?uid=${uid}`}>Forgot password?</Link>
            <p>Create an account <Link to={routesMap.register}>here</Link></p>

        </div>
    )
}

export default Login