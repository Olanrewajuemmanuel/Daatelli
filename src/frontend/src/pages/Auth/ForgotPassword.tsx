import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { sendResetPasswordRequest } from "../../actions/auth";
import HealthCheck from "../../components/healthCheck";

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
        <form onSubmit={handleSubmit}>
            <div>{formSuccess}</div>
            <ul>
                {formErrors.length > 0 && formErrors.map(({ error }, idx) =>
                    <li key={idx}>{error}</li>
                )}
            </ul>

            <p>We will send an email to your already registered email with instructions to reset your password</p>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" disabled={disabled} className="disabled:text-red-100">Submit</button>
            <HealthCheck />
        </form>
    )
}

export default ForgotPassword