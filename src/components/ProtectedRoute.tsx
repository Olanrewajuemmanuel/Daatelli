import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { routesMap } from '../constants';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [, setAuth] = useState(false)
    const [cookies] = useCookies(['access'])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    useEffect(() => {

        if (!cookies.access) {
            navigate(routesMap.login, { replace: true })
        }
    }, [cookies.access, navigate])

    // Validate token from backend
    // TODO: let authUser = validate(token)
    setTimeout(() => {
        setAuth(true)
        setLoading(false)
    }, 5000) // mimic token validation

    if (loading) return 'Loading...';
    return children
};

export default ProtectedRoute;
