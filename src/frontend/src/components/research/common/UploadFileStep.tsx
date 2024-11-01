import InfoItem from "../../uiEnhancements/InfoItem";
import SelectMultipleResearchers from "../SelectMultipleResearchers";
import { UploadFileSchemaType } from "../../../types/types";
import { useFormContext } from "react-hook-form";
import InputError from "../../uiEnhancements/InputError";
import { globals } from "../../../constants";



function UploadFileStep() {
    const { register, getValues, formState: { errors } } = useFormContext<UploadFileSchemaType>();
    const files = getValues('files') || []
    return (
        <div className="space-y-3">
            <div className="form-control">
                <div className="label">
                    <span className="label-text">Upload files (max. 200MB total for a max of 10 files)</span>
                </div>
                <input {...register('files')} id="files" type="file" name="files" className="file-input" multiple />
                {errors && <InputError message={errors.files?.message?.toString()} />}
            </div>
            {
                files.length > 0 && (
                    <div className="flex items-center gap-x-2">
                        <input {...register('privateCopy')} type="checkbox" id="privateCopy" name="privateCopy" className="checkbox checkbox-sm" />
                        <label htmlFor="privateCopy">Upload as a private copy <InfoItem message="Private copies are only visible to your account and can be viewed in this Finding details once created." /></label>
                        {errors && <InputError message={errors.privateCopy?.message?.toString()} />}
                    </div>
                )
            }

            <SelectMultipleResearchers />
            <div className="form-control">
                <label htmlFor="doiOrLink" className="my-2">Add a DOI or a link to your article <InfoItem message="Add links to an external site if the article belongs to an online journal or is available online. Kindly ensure links submitted are authentic, credible and not expired" /></label>
                <input {...register('doiOrLink', { required: true })} type="text" name="doiOrLink" className="input input-bordered" />
                {errors && <InputError message={errors.doiOrLink?.message?.toString()} />}
            </div>
        </div>
    )

}

export default UploadFileStep;