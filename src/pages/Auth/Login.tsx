import { useEffect, useState } from 'react'
import RootLogin from '../../components/RootLogin'
import CollabLogin from '../../components/CollabLogin'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { routesMap } from '../../constants'

function Login() {
    const [state, setState] = useState('root')
    const [cookies] = useCookies(['access'])

    const navigate = useNavigate()
    useEffect(() => {
        // TODO: validate token
        if (cookies.access) navigate(routesMap.feed)

    }, [cookies.access, navigate])
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
                {state === 'root' ? <RootLogin /> : <CollabLogin />}
            </div>
            <p>Create an account <Link to={routesMap.register}>here</Link></p>

        </div>
    )
}

export default Login