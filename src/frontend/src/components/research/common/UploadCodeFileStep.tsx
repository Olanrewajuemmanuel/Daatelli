import { useFormContext } from "react-hook-form";
import InputError from "../../InputError";
import InfoItem from "../../InfoItem";
import SelectMultipleResearchers from "../SelectMultipleResearchers";
import Select from "react-select";
import { MouseEvent } from "react";


const licenseOptions = [
    { value: "mit", label: "MIT License" },
    { value: 'apache-2.0', label: 'Apache License 2.0' },
    { value: 'gpl-3.0', label: 'GNU General Public License v3.0' },
    { value: "lgpl-3.0", label: "GNU Lesser General Public License v3.0" },
    { value: "bsd-2-clause", label: "BSD 2-Clause 'Simplified' License" },
    { value: "bsd-3-clause", label: "BSD 3-Clause 'New' or 'Revised' License" },
    { value: "agpl-3.0", label: "GNU Affero General Public License v3.0" },
    { value: "mpl-2.0", label: "Mozilla Public License 2.0" },
    // Other licenses
    { value: "None", label: "None" },
]

const languageOptions = [
    { value: "python", label: "Python" },
    { value: "c++", label: "C++" },
    { value: "javaScript", label: "JavaScript/ECMA" },
    { value: "c", label: "C" },
    { value: "clojure", label: "Clojure" },
    // ...
    { value: "other", label: "Others" }
]

function UploadCodeFileStep() {
    const { register, getValues, formState: { errors } } = useFormContext();
    const files = getValues('files') || []

    const handleOpenEditor = (event: MouseEvent) => {
        event.preventDefault();
    }

    return (
        <div>
            <div>
                <input {...register('files')} type="file" name="files" multiple />
                <label htmlFor="files">Upload files (max. 2GB) <InfoItem message="Upload documents, multimedia and code files as applicable. By uploading each file, you confirm that you have reviewed and verified each file. You also agree to allow Air-data to extract from each file any data, text snippets, tables, graphs, code and images, captions and metadata as applicable." /></label>
                {errors && <InputError message={errors.files?.message?.toString()} />}
            </div>
            <div>
                {/* Code editor */}
                <button onClick={handleOpenEditor}>Open code editor</button>
            </div>
            {
                files.length > 0 && (
                    <div>
                        <input {...register('privateCopy')} type="checkbox" name="privateCopy" />
                        <label htmlFor="privateCopy">Upload as a private copy <InfoItem message="Private copies are only visible to your account and can be viewed in this Finding details once created." /></label>
                        {errors && <InputError message={errors.privateCopy?.message?.toString()} />}
                    </div>
                )
            }
            <div>
                <Select options={languageOptions} placeholder="Select language" />
            </div>

            {/* License */}
            <div>
                <Select options={licenseOptions} />
                <InfoItem message="Select the license that regulates your algorithm/code. If this does not apply to your algorithm/code, select none." linkOptions={{ link: '/', text: 'Lean about the different licenses' }} />
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

export default UploadCodeFileStep