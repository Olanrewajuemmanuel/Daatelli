import { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DocumentFormSchemaType, User } from "../../types/types";
import { attestationSchema, createUploadFileSchema, uploadFindingsSchema } from "../../validations/schema/commons";
import UploadFileStep from "../research/common/UploadFileStep";
import UploadFindingsStep from "../research/common/UploadFindingsStep";
import { ObjectSchema } from "yup";
import AttestationStep from "../research/common/AttestationStep";
import { getUserProfile } from "../../actions/user";
import { useCookies } from "react-cookie";
import { createFinding } from "../../actions/findings";


function DocumentsFlow({ onCreateFinding }: { onCreateFinding: (findingId: string) => void }) {
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

    const getSchema = (step: number): ObjectSchema<DocumentFormSchemaType> => {
        switch (step) {
            case 1:
                return createUploadFileSchema(user?.fullName);
            case 2:
                return uploadFindingsSchema;
            default:
                return attestationSchema;
        }
    };

    const methods = useForm({
        resolver: yupResolver(getSchema(step)),
    });

    const onSubmit: SubmitHandler<DocumentFormSchemaType> = async (data) => {
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
                {methods.formState.errors.root?.message}
                {step === 1 && <UploadFileStep />}
                {step === 2 && <UploadFindingsStep />}
                {step === 3 &&
                    // Attestation as last step
                    <AttestationStep />}

                <div className="flex justify-end mt-5">
                    <button type="submit" className="btn bg-primary text-white disabled:text-slate-500" disabled={step === 3 && (!methods.formState.isDirty || !methods.formState.isValid || methods.formState.isSubmitting)}>
                        {step === 3 ? (methods.formState.isSubmitting ? "Submitting" : "Submit") : "Next"}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default DocumentsFlow