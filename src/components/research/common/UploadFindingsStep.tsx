import CreatableSelect from "react-select/creatable"
import FindingsFormElement from "../FindingsFormElement";
import { UploadFindingSchemaType } from "../../../types/types";
import { Controller, useFormContext } from "react-hook-form";


const exampleTags = [
    { value: 'research', label: 'Research' },
    { value: 'hot', label: 'Hot topic' },
    { value: 'novel', label: 'New finding' },
]
function UploadFindingsStep() {
    const { register, control, formState: { errors } } = useFormContext<UploadFindingSchemaType>();
    return (
        <div>
            <div>
                <label htmlFor="abstract">Abstract: </label>
                <textarea {...register('abstract')} name="abstract" rows={5} />
                {errors && <p className="text-red-500">{errors.abstract?.message}</p>}
            </div>
            <div>
                <FindingsFormElement />
            </div>
            <div>
                <label htmlFor="domainOfResearch">Domain of research: </label>
                <input {...register('domainOfResearch')} type="text" name="domainOfResearch" />
                {errors && <p className="text-red-500">{errors.domainOfResearch?.message}</p>}
            </div>
            <div>
                <label htmlFor="tags">Tags: </label>
                <Controller control={control} name="tags" render={({ field }) =>
                    <CreatableSelect {...field} options={exampleTags} onChange={field.onChange} isMulti />
                } />

                {errors && <p className="text-red-500">{errors.tags?.message}</p>}
            </div>
        </div>
    )
}

export default UploadFindingsStep;