import { FormEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { sendResetPasswordRequest } from "../../actions/auth";
import HealthCheck from "../../components/healthCheck";
import { routesMap } from "../../constants";

function ForgotPassword() {
    const [searchParams,] = useSearchParams();
    const [email, setEmail] = useState(searchParams.get('uid') ?? '')
    const [formSuccess, setFormSuccess] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [formErrors, setFormErrors] = useState<Array<{ error: string; label?: string }>>([])

    useEffect(() => {
        if (email) {
            setDisabled(false)
        } else {
            setDisabled(true);
        }
    }, [email])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setDisabled(true)
        if (!email) {
            setFormErrors([{ error: 'Email was not provided' }])
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFormErrors([{ error: "Email is not a valid email address" }])
            return;
        }

        setTimeout(() => setFormErrors([]), 2000)
        setDisabled(false)

        // Submit email
        try {
            const response = await sendResetPasswordRequest(email);
            setFormSuccess(response.message)
            setDisabled(true)

        } catch (err: unknown) {
            setFormErrors([{ error: (err as Error)?.message || 'An unknown error has occurred' }])
        }
    }


    return (
        <div className="inter-body absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 min-w-[880px]">
            <form onSubmit={handleSubmit} className="w-4/5 space-y-6">
                <div>{formSuccess}<Link to={routesMap.login} className="ml-2 link">Go to Login</Link></div>
                <ul>
                    {formErrors.length > 0 && formErrors.map(({ error }, idx) =>
                        <li key={idx}>{error}</li>
                    )}
                </ul>
                <h1 className="text-2xl font-semibold inter-heading">Forgot Password</h1>
                <div className="form-control">
                    <label htmlFor="email" className="label font-semibold">Email:</label>
                    <input type="email" name="email" value={email} placeholder="Ex: user@mail.com" onChange={(e) => setEmail(e.target.value)} className="input" />
                </div>
                <button type="submit" disabled={disabled} className="btn bg-primary text-white disabled:text-slate-100">Submit</button>
                <HealthCheck />
            </form>
        </div>
    )
}

export default ForgotPassword