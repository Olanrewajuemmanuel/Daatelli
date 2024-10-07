import { useEffect, useState } from "react";
import UploadFileStep from "../research/common/UploadFileStep";
import AttestationStep from "../research/common/AttestationStep";
import UploadFindingsStep from "../research/common/UploadFindingsStep";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MultiMediaFormType, User } from "../../types/types";
import { ObjectSchema } from "yup";
import { createMultiMediaUploadFileSchema } from "../../validations/schema/multimedia";
import { attestationSchema, uploadFindingsSchema } from "../../validations/schema/commons";
import { useCookies } from "react-cookie";
import { getUserProfile } from "../../actions/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { createFinding } from "../../actions/findings";

function MultimediaFlow({ onCreateFinding }: { onCreateFinding: (findingId: string) => void }) {
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

    const getSchema = (step: number): ObjectSchema<MultiMediaFormType> => {
        switch (step) {
            case 1:
                return createMultiMediaUploadFileSchema(user?.fullName);
            case 2:
                return uploadFindingsSchema;
            default:
                return attestationSchema;
        }
    };

    const methods = useForm({
        resolver: yupResolver(getSchema(step)),
    });

    const onSubmit: SubmitHandler<MultiMediaFormType> = async (data) => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Submit data to the server and redirect to the finding details page
            return new Promise((resolve) => {
                resolve(createFinding(data, cookies.access))

            }).then(data => {
                if ((data as { id: string }).id)
                    onCreateFinding((data as { id: string }).id)
            }).catch(error => methods.setError("root", { type: error.message }))
        }
    };


    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {step === 1 && <UploadFileStep />}
                {step === 2 && <UploadFindingsStep />}
                {step === 3 &&
                    // Attestation as last step
                    <AttestationStep />}
                <div>
                    <button type="submit" disabled={step === 3 && (!methods.formState.isDirty || !methods.formState.isValid || methods.formState.isSubmitting)} className="disabled:text-slate-500">
                        {step === 3 ? (methods.formState.isSubmitting ? "Submitting" : "Submit") : "Next"}
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}

export default MultimediaFlow