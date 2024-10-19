import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import professions from "../../constants/fields"
import { RegisterType } from "../../types/enums"
import InfoItem from "../uiEnhancements/InfoItem"
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { RegistrationData } from "../../types/types";
import { registerMember, validateForm } from "../../actions/register";
import { SYSTEM_MESSAGES } from "../../constants/utils";
import { FeaturesContext } from "../../contexts";
import ComingSoonButton from "../comingSoon/button";


const fieldOptions: readonly {
    value: string;
    label: string;
}[] = professions.map(profession => ({ value: profession, label: profession }))
const referralOptions = [
    { value: 'Socials', label: 'Social media' },
    { value: 'Someone', label: 'Someone told me about it' },
    { value: 'internet', label: 'Internet search' },
    { value: 'ads', label: 'Found it on another website' },
]
const researcherTypes = [
    { value: 'undergraduate', label: 'Undergraduate researcher' },
    { value: 'self', label: 'Solo researcher' },
    { value: 'doctorate', label: 'Doctorate researcher' },
    { value: 'masters', label: 'Masters researcher' },
    { value: 'technician', label: 'Research technician' },
    { value: 'senior', label: 'Senior researchers' },
]

function RegisterForm({ mode, onRegister }: { mode: RegisterType, onRegister: (email: string, password: string) => Promise<void> }) {
    const [formData, setFormData] = useState<Partial<RegistrationData>>({
        interests: []
    })
    const [disabled, setDisabled] = useState(false);
    const [formErrors, setFormErrors] = useState<{ error: string; label: string; }[]>([])
    const devFeatures = useContext(FeaturesContext)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [formErrors])


    const handleSelectField = (option: unknown) => {
        setFormData(prev => ({
            ...prev, 'field': (option as {
                value: string;
                label: string;
            }).value
        }))
    }
    const handleSelectResearcherType = (option: unknown) => {
        setFormData(prev => ({
            ...prev, 'researcherType': (option as {
                value: string;
                label: string;
            }).value
        }))
    }
    const handleSelectRef = (option: unknown) => {
        setFormData(prev => ({
            ...prev, 'refs': (option as {
                value: string;
                label: string;
            }).value
        }))
    }
    const handleSelectMultiple = (options: unknown) => {
        if (formData.interests!.length <= 5) (setFormData(prev => ({
            ...prev, 'interests': options as {
                value: string;
                label: string;
            }[]
        })))

    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.currentTarget;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }))
        }
        setFormData(prev => ({ ...prev, [name]: value }))

    }

    const handleSubmit = async (e: FormEvent, mode: RegisterType) => {
        e.preventDefault();
        // Check if feature is under development
        if (devFeatures.includes('auth')) {
            setFormErrors([{ error: 'Feature is under development', label: '' }])
            return
        }
        // Handle member signup submission

        const validate = validateForm(formData as RegistrationData, mode)

        if (validate.length === 0) {
            // Submit form
            try {
                setDisabled(true) // toggle disabled attr of submit button

                await registerMember(formData as RegistrationData);
                await onRegister(formData.email as string, formData.password1 as string)
            } catch (err: unknown) {
                setFormErrors([{ error: (err as Error)?.message || 'An unexpected error occurred', label: '' }])
            } finally {
                setDisabled(false)
            }
        } else {
            // Display errors
            setFormErrors(validate)
        }
    }
    return (
        <div className="inter-body max-w-[600px] mx-auto">
            <form onSubmit={(ev) => handleSubmit(ev, mode)} className="my-5">
                {formErrors.length > 0 &&
                    <div className="bg-error text-white p-2 rounded-md">
                        {SYSTEM_MESSAGES['register-failure']}
                        <ul>
                            {formErrors.map(({ error }) =>
                                <li key={error} className="text-sm">{error}</li>
                            )}
                        </ul>
                    </div>
                }
                {
                    mode === RegisterType.member ? (
                        // Member form
                        <div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="name" className="font-semibold">Name:<span>*</span></label>
                                <input type="text" name="name" id="name" className="input " placeholder="Enter your full name" onChange={handleInputChange} />
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="email" className="font-semibold">Email:<span>*</span></label>
                                <input type="text" name="email" id="email" className="input " placeholder="Enter your email" onChange={handleInputChange} />
                                <div className="inline-flex gap-2">
                                    <input type="checkbox" className="checkbox checkbox-sm" id="work-email" name="work-email" onChange={handleInputChange} />
                                    <label htmlFor="work-email">This is an institutional email<InfoItem message="The chances of becoming a researcher or enjoying other benefits for example, being a community member increases when you provide an institutional email. We only verify this email once when you provide it by sending a verification mail. We won't mail you again after unless you change your settings." /></label>
                                </div>

                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="field" className="font-semibold">Field:<span>*</span></label>
                                <CreatableSelect placeholder="Select main field" classNames={{
                                    control: () => 'select'
                                }} options={fieldOptions} onChange={handleSelectField} />
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="interests" className="font-semibold">Interests:<InfoItem message="You may select up to 5 other fields that may interest you apart from your main field" /></label>
                                <CreatableSelect placeholder="Select interests" classNames={{
                                    control: () => 'select'
                                }} options={fieldOptions} value={formData.interests} onChange={handleSelectMultiple} isMulti isOptionDisabled={() => formData.interests!.length >= 5} />

                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="password1" className="font-semibold">Password:<span>*</span></label>
                                <input type="password" name="password1" id="password1" className="input " placeholder="Enter your password" onChange={handleInputChange} />
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="password2" className="font-semibold">Confirm password:<span>*</span></label>
                                <input type="password" name="password2" id="password2" className="input " placeholder="Confirm your password" onChange={handleInputChange} />
                            </div>

                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="refs" className="font-semibold">How did you learn about us:</label>
                                <Select options={referralOptions} classNames={{
                                    control: () => 'select'
                                }} defaultValue={referralOptions[0]} onChange={handleSelectRef} />
                            </div>

                            <div className="my-4">
                                <button type="submit" disabled={disabled} className="btn bg-primary text-white disabled:text-slate-100">Submit</button>
                            </div>

                        </div>
                    ) : (
                        // Researcher form
                        <div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="name" className="font-semibold">Name:<span>*</span></label>
                                <input type="text" name="name" id="name" placeholder="Enter your full name" className="input" onChange={handleInputChange} />
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="institution" className="font-semibold">Institution:<span>*</span></label>
                                <input type="text" name="institution" id="institution" placeholder="Ex: University of Ibadan, Nigeria" className="input" onChange={handleInputChange} />
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="affiliations" className="font-semibold">Other affiliations:<InfoItem message="This may include other institutions or organizations you work with directly or indirectly. Separate each affiliate with a comma." /></label>
                                <input type="text" name="affiliations" placeholder="Ex: Greenway Corp., Zxebs Ltd" className="input" onChange={handleInputChange} />
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="email" className="font-semibold">Email:<span>*</span></label>
                                <input type="text" name="email" className="input" onChange={handleInputChange} />
                                <div className="inline-flex gap-2">
                                    <input type="checkbox" className="checkbox checkbox-sm" id="work-email" name="work-email" onChange={handleInputChange} />
                                    <label htmlFor="work-email">This is an institutional email<InfoItem message="The chances of becoming a researcher or enjoying other benefits for example, being a community member increases when you provide an institutional email. We only verify this email once when you provide it by sending a verification mail. We won't mail you again after unless you change your settings." /></label>
                                </div>
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="researcher-type" className="font-semibold">What type of researcher are you:<span>*</span></label>
                                <CreatableSelect placeholder="Select..." classNames={{
                                    control: () => 'select'
                                }} options={researcherTypes} onChange={handleSelectResearcherType} />
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="field" className="font-semibold">Research field:<span>*</span></label>
                                <CreatableSelect placeholder="Select main field" classNames={{
                                    control: () => 'select'
                                }} options={fieldOptions} onChange={handleSelectField} />
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="interests" className="font-semibold">Interests:<InfoItem message="You may select up to 5 other fields that may interest you apart from your main field" /></label>
                                <CreatableSelect placeholder="Select interests" classNames={{
                                    control: () => 'select'
                                }} options={fieldOptions} value={formData.interests} onChange={handleSelectMultiple} isMulti isOptionDisabled={() => formData.interests!.length >= 5} />
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="password1" className="font-semibold">Password:</label>
                                <input type="password" name="password1" id="password1" className="input" onChange={handleInputChange} />
                            </div>
                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="password2" className="font-semibold">Confirm password:</label>
                                <input type="password" name="password2" id="password2" className="input" onChange={handleInputChange} />
                            </div>

                            <div className="form-control my-4 space-y-3">
                                <label htmlFor="refs" className="font-semibold">How did you learn about us:</label>
                                <Select options={referralOptions} defaultValue={referralOptions[0]} classNames={{
                                    control: () => 'select'
                                }} onChange={handleSelectRef} />
                            </div>
                            <div className="my-4">
                                <button type="submit" disabled={disabled} className="btn bg-primary text-white disabled:text-slate-100">Submit</button>
                            </div>

                        </div>
                    )
                }
            </form>
        </div>
    )
}

export default RegisterForm