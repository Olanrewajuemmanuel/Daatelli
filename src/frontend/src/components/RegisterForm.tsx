import { ChangeEvent, FormEvent, useState } from "react";
import professions from "../lib/fields"
import { RegisterType } from "../types/enums"
import InfoItem from "./InfoItem"
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { RegistrationData } from "../types/types";
import { registerMember, validateForm } from "../actions/register";


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
        <form onSubmit={(ev) => handleSubmit(ev, mode)}>
            {formErrors.length > 0 &&

                <div>
                    Your registration was unsuccessful due to the following reasons:
                    <ul>
                        {formErrors.map(({ error }) =>
                            <li key={error}>{error}</li>
                        )}
                    </ul>
                </div>
            }
            {
                mode === RegisterType.member ? (
                    // Member form
                    <div>
                        <div>
                            <label htmlFor="name">Name:<span>*</span></label>
                            <input type="text" name="name" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="email">Email:<span>*</span></label>
                            <input type="text" name="email" onChange={handleInputChange} />
                            <input type="checkbox" name="work-email" onChange={handleInputChange} />
                            <label htmlFor="email">This is an institutional email<InfoItem message="The chances of becoming a researcher or enjoying other benefits for example, being a community member increases when you provide an institutional email. We only verify this email once when you provide it by sending a verification mail. We won't mail you again after unless you change your settings." /></label>
                        </div>
                        <div>
                            <label htmlFor="field">Field:<span>*</span></label>
                            <CreatableSelect placeholder="Select main field" options={fieldOptions} onChange={handleSelectField} />
                        </div>
                        <div>
                            <label htmlFor="interests">Interests:<InfoItem message="You may select up to 5 other fields that may interest you apart from your main field" /></label>
                            <CreatableSelect placeholder="Select interests" options={fieldOptions} value={formData.interests} onChange={handleSelectMultiple} isMulti isOptionDisabled={() => formData.interests!.length >= 5} />

                        </div>
                        <div>
                            <label htmlFor="password1">Password:</label>
                            <input type="password" name="password1" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="password2">Confirm password:</label>
                            <input type="password" name="password2" onChange={handleInputChange} />
                        </div>

                        <div>
                            <label htmlFor="refs">How did you learn about us:</label>
                            <Select options={referralOptions} defaultValue={referralOptions[0]} onChange={handleSelectRef} />
                        </div>
                        <div>
                            <button type="submit" disabled={disabled} className="disabled:bg-red-400">Submit</button>
                        </div>
                    </div>
                ) : (
                    // Researcher form
                    <div>
                        <div>
                            <label htmlFor="name">Name:<span>*</span></label>
                            <input type="text" name="name" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="institution">Institution:<span>*</span></label>
                            <input type="text" name="institution" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="affiliations">Other affiliations:<InfoItem message="This may include other institutions or organizations you work with directly or indirectly. Separate each affiliate with a comma." /></label>
                            <input type="text" name="affiliations" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="email">Email:<span>*</span></label>
                            <input type="text" name="email" onChange={handleInputChange} />
                            <input type="checkbox" name="work-email" onChange={handleInputChange} />
                            <label htmlFor="email">This is an institutional email<InfoItem message="The chances of becoming a researcher or enjoying other benefits for example, being a community member increases when you provide an institutional email. We only verify this email once when you provide it by sending a verification mail. We won't mail you again after unless you change your settings." /></label>
                        </div>
                        <div>
                            <label htmlFor="researcher-type">What type of researcher are you:<span>*</span></label>
                            <CreatableSelect placeholder="Select..." options={researcherTypes} onChange={handleSelectResearcherType} />
                        </div>
                        <div>
                            <label htmlFor="field">Research field:<span>*</span></label>
                            <CreatableSelect placeholder="Select main field" options={fieldOptions} onChange={handleSelectField} />
                        </div>
                        <div>
                            <label htmlFor="interests">Interests:<InfoItem message="You may select up to 5 other fields that may interest you apart from your main field" /></label>
                            <CreatableSelect placeholder="Select interests" options={fieldOptions} value={formData.interests} onChange={handleSelectMultiple} isMulti isOptionDisabled={() => formData.interests!.length >= 5} />
                        </div>
                        <div>
                            <label htmlFor="password1">Password:</label>
                            <input type="password" name="password1" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="password2">Confirm password:</label>
                            <input type="password" name="password2" onChange={handleInputChange} />
                        </div>

                        <div>
                            <label htmlFor="refs">How did you learn about us:</label>
                            <Select options={referralOptions} defaultValue={referralOptions[0]} onChange={handleSelectRef} />
                        </div>
                        <div>
                            <button type="submit" disabled={disabled} className="disabled:bg-red-400">Submit</button>
                        </div>
                    </div>
                )
            }
        </form>
    )
}

export default RegisterForm