import { useEffect, useState } from "react";
import { getUserProfile } from "../../actions/user";
import { useCookies } from "react-cookie";
import { User } from "../../types/types";
import { FormProvider, useForm } from "react-hook-form";
import UploadCodeFile from "../research/common/UploadCodeFileStep";
import UploadFindingsStep from "../research/common/UploadFindingsStep";
import AttestationStep from "../research/common/AttestationStep";

function CodeFlow({ onCreateFinding }: { onCreateFinding: (findingId: string) => void }) {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<User>()
    const [cookies] = useCookies(['access'])


    useEffect(() => {
        const getUserData = async () => {
            try {
                const user = await getUserProfile(cookies.access);
                setUser(user);
            } catch (err) {
                console.error(err);
            }
        }

        getUserData();

    }, [])

    const methods = useForm({
    });
    const onSubmit = async (data: any) => {
        if (step < 3) {
            setStep(step + 1)
        } else {

        }

    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {step === 1 && <UploadCodeFile />}
                {step === 2 && <UploadFindingsStep />}
                {step === 3 && <AttestationStep />}
                <div>
                    <button type="submit" disabled={step === 3 && (!methods.formState.isDirty || !methods.formState.isValid || methods.formState.isSubmitting)} className="disabled:text-slate-500">
                        {step === 3 ? (methods.formState.isSubmitting ? "Submitting" : "Submit") : "Next"}
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}

export default CodeFlow