import { useFormContext } from "react-hook-form";
import Attestation from "../Attestation"
import { AttestationSchemaType } from "../../../types/types";
import InputError from "../../uiEnhancements/InputError";

function AttestationStep() {
    const { register, formState: { errors } } = useFormContext<AttestationSchemaType>();
    return (
        <div>
            <Attestation />
            <div className="flex gap-2">
                <input {...register('attestation')} type="checkbox" name="attestation" id="attestation" className="checkbox checkbox-sm" />
                <label htmlFor="attestation">I have read and agreed to the above Attestation of Authorship, Compliance and Terms</label>
            </div>
            {errors && <InputError message={errors.attestation?.message} />}
        </div>
    )
}

export default AttestationStep