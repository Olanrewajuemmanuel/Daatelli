import { FormEvent, useEffect, useState } from "react"
import { loginUser } from "../actions/auth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../constants";


type FormData = {
    email: string;
    password: string;
    rememberMe?: boolean;
}

function RootLogin() {
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState<FormData>({ email: '', password: '', rememberMe: false });
    const [cookies, setCookies] = useCookies(['refresh', 'access'])
    let navigate = useNavigate();

    useEffect(() => {
        if (formData?.email && formData.password) {
            setDisabled(false)

        } else {
            setDisabled(true);
        }
    }, [formData?.email, formData?.password])

    const handleSubmit = async (e: FormEvent) => {
        // Login logic
        e.preventDefault();
        try {
            setDisabled(true) // deactivate button on requests
            const response = await loginUser(formData.password, formData.email)
            setCookies('access', response.accessToken)


            // Create cookies and navigate to feed
            if (formData.rememberMe) {
                // 7 days expiry time to use refresh token
                setCookies('refresh', response.refreshToken, { expires: new Date(Date.now() + 3600 * 1000 * 24 * 7) })
            }

            return navigate(routesMap.feed, { replace: true })
        } catch (err: any) {
            setError(err?.message || 'An unexpected error occurred')

        }
        setDisabled(false);
        setTimeout(() => setError(''), 3000)

    }
    return (

        <form onSubmit={handleSubmit}>
            {error || <p>{error}</p>}
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="Ex: rootuser@mail.com" required onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}></input>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" placeholder="Password" required onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}></input>
            </div>
            <div>
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={e => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}></input> Remember this device
            </div>
            <button disabled={disabled} className="disabled:text-red-500">Submit</button>
        </form>
    )
}

export default RootLogin