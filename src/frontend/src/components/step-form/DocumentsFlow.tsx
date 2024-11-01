import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DocumentFormSchemaType } from "../../types/types";
import { attestationSchema, createUploadFileSchema, uploadAnalysisSchema, uploadFindingsSchema } from "../../validations/schema/commons";
import UploadFileStep from "../research/common/UploadFileStep";
import UploadFindingsStep from "../research/common/UploadFindingsStep";
import { ObjectSchema } from "yup";
import AttestationStep from "../research/common/AttestationStep";
import { createFinding } from "../../actions/findings";
import UploadAnalysisStep from "../research/common/UploadAnalysisStep";
import { useUserStore } from "../../store/user";
import { useCookies } from "react-cookie";

function DocumentsFlow({ onCreateFinding }: { onCreateFinding: (findingId: string) => void }) {
    const [step, setStep] = useState(1);
    const { user } = useUserStore()


    const getSchema = (step: number): ObjectSchema<DocumentFormSchemaType> => {
        switch (step) {
            case 1:
                return createUploadFileSchema(user?.full_name);
            case 2:
                return uploadFindingsSchema;
            case 3:
                return uploadAnalysisSchema;
            default:
                return attestationSchema;
        }
    };

    const methods = useForm({
        resolver: yupResolver(getSchema(step)),
    });

    const onSubmit: SubmitHandler<DocumentFormSchemaType> = async (data) => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            // Submit data to the server and redirect to the finding details page
            return new Promise((resolve) => {
                resolve(createFinding(data))

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
                {step === 3 && <UploadAnalysisStep />}
                {step === 4 &&
                    // Attestation as last step
                    <AttestationStep />}

                <div className="flex justify-end mt-5">
                    <button type="button" className="btn btn-sm btn-outline" onClick={() => setStep(step - 1)}>Back</button>
                    <button type="submit" className="btn bg-primary text-white disabled:text-slate-500" disabled={step === 4 && (!methods.formState.isDirty || !methods.formState.isValid || methods.formState.isSubmitting)}>
                        {step === 4 ? (methods.formState.isSubmitting ? "Submitting" : "Submit") : "Next"}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default DocumentsFlow