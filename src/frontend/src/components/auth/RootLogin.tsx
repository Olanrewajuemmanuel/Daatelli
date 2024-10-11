import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react"
import { FormData } from "../../types/types";


function RootLogin({ onLogin, setCurrentUid }: { onLogin: (email: string, password: string, rememberMe: boolean) => Promise<void>, setCurrentUid: Dispatch<React.SetStateAction<string>> }) {
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState<FormData>({ email: '', password: '', rememberMe: false });

    useEffect(() => {
        if (formData?.email && formData.password) {
            setDisabled(false)

        } else {
            setDisabled(true);
        }
    }, [formData?.email, formData?.password])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
        setCurrentUid(formData.email)
    }

    const handleSubmit = async (e: FormEvent) => {
        // Login logic
        e.preventDefault();
        try {
            setDisabled(true) // deactivate button on requests
            await onLogin(formData.email, formData.password, formData.rememberMe as boolean)
        } catch (err: unknown) {
            setError((err as Error)?.message || 'An unexpected error occurred')

        }
        setDisabled(false);
        setTimeout(() => setError(''), 3000)

    }
    return (

        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="form-control">
                <label htmlFor="email" className="label font-semibold">Email:</label>
                <input type="email" name="email" placeholder="Ex: rootuser@mail.com" required className="input" onChange={handleChange}></input>
            </div>
            <div className="form-control">
                <label htmlFor="password" className="label font-semibold">Password:</label>
                <input type="password" name="password" placeholder="Password" required className="input" onChange={handleChange}></input>
            </div>
            <div className="flex items-center gap-x-2 my-3">
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} className="checkbox checkbox-sm" onChange={e => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}></input> Remember this device
            </div>
            <button disabled={disabled} className="btn bg-primary text-white disabled:text-slate-100">Submit</button>
        </form>
    )
}

export default RootLogin