import { useFormContext } from "react-hook-form";
import Attestation from "../../Attestation"
import { AttestationSchemaType } from "../../../types/types";

function AttestationStep() {
    const { register, formState: { errors } } = useFormContext<AttestationSchemaType>();
    return (
        <div>
            <Attestation />
            <div>
                <input {...register('attestation')} type="checkbox" name="attestation" id="attest" />
                <label htmlFor="attestation">I have read and agreed to the above Attestation of Authorship, Compliance and Terms</label>
                {errors && <p className="text-red-500">{errors.attestation?.message}</p>}
            </div>
        </div>
    )
}

export default AttestationStep