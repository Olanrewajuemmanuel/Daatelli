import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { sendResetPasswordConfirmation } from "../../actions/auth";
import HealthCheck from "../../components/healthCheck";
import MetaTags from "react-meta-tags";

function ResetPassword() {
    const [disabled, setDisabled] = useState(true)
    const [formData, setFormData] = useState<{ oldPassword: string; newPassword: string }>({
        oldPassword: '',
        newPassword: '',
    })
    const [formSuccess, setFormSuccess] = useState(false)
    const [searchParams] = useSearchParams()
    const [error, setError] = useState('')

    useEffect(() => {
        if (!formData.oldPassword || !formData.newPassword) {
            setDisabled(true)
        } else {
            setDisabled(false);
        }
    }, [formData.oldPassword, formData.newPassword])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.oldPassword !== formData.newPassword) {
            setError('Passwords do not match')
            return;
        }

        try {
            setDisabled(true)
            await sendResetPasswordConfirmation(searchParams.get('token')!, formData.oldPassword, formData.newPassword);
            setFormSuccess(true)

        } catch (err) {
            setError((err as Error).message || 'An unknown error occurred')
            setDisabled(false)
        }
    }

    if (!searchParams.get('token')) return <div>Invalid or expired token</div>
    if (formSuccess) return <div>Your password has been successfully changed</div>
    return (
        <>
            <MetaTags>
                <title>Daatelli | Reset Password</title>
            </MetaTags>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <h2>Change your password</h2>
                <div>
                    <label htmlFor="oldPassword">Old password:</label>
                    <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="newPassword">New password:</label>
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                </div>
                <button type="submit" disabled={disabled} className="disabled:text-red-100">Submit</button>
                <HealthCheck />
            </form>
        </>
    )
}

export default ResetPassword;