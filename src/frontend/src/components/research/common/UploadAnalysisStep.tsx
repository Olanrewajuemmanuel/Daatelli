import { useFormContext } from "react-hook-form";

import { UploadAnalysisSchemaType } from "../../../types/types";
import InputError from "../../uiEnhancements/InputError";

const analysisTypes = [
    { label: "Analysis", value: "analysis" },
    { label: "Findings", value: "findings" },
    { label: "Attestation", value: "attestation" },
]

const hypothesisTypes = [
    { label: "Null", value: "null" },
    { label: "Alternative", value: "alternative" },
    { label: "Directional", value: "directional" },
]

function UploadAnalysisStep() {
    const { register, formState: { errors } } = useFormContext<UploadAnalysisSchemaType>();
    return <div className="space-y-3">
        <p className="text-sm">Tell more about your research (optional)</p>
        <div className="form-control">
            <label htmlFor="type" className="label">Type</label>
            <input type="text" id="type" className="input input-bordered" {...register("type")} />
            {errors.type && <InputError message={errors.type.message} />}
        </div>
    </div>
}
export default UploadAnalysisStep;