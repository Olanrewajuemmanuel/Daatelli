import InfoItem from "../../InfoItem";
import SelectMultipleResearchers from "../SelectMultipleResearchers";
import { UploadFileSchemaType } from "../../../types/types";
import { useFormContext } from "react-hook-form";
import InputError from "../../InputError";



function UploadFileStep() {
    const { register, formState: { errors } } = useFormContext<UploadFileSchemaType>();
    return (
        <div>
            <div>
                <input {...register('files')} type="file" name="files" multiple />
                <label htmlFor="files">Upload files (max. 200MB total for a max of 10 files) <InfoItem message="Upload PDFs, CSVs, Excel sheets or docx files. By uploading each file, you confirm that you have reviewed and verified each file. You also agree to allow Air-data to extract from each file any data, text snippets, tables, graphs, images, captions and metadata as applicable." /></label>
                {errors && <InputError message={errors.files?.message?.toString()} />}
            </div>
            <div>
                <input {...register('privateCopy')} type="checkbox" name="privateCopy" />
                <label htmlFor="privateCopy">Upload as a private copy <InfoItem message="Private copies are only visible to your account and can be viewed in this Finding details once created." /></label>
                {errors && <InputError message={errors.files?.message?.toString()} />}
            </div>
            <SelectMultipleResearchers />
            <div>
                <label htmlFor="doiOrLink">Add a DOI or a link to your article <InfoItem message="Add links to an external site if the article belongs to an online journal or is available online. Kindly ensure links submitted are authentic, credible and not expired" /></label>
                <input {...register('doiOrLink', { required: true })} type="text" name="doiOrLink" />
                {errors && <InputError message={errors.doiOrLink?.message?.toString()} />}
            </div>
        </div>
    )

}

export default UploadFileStep;