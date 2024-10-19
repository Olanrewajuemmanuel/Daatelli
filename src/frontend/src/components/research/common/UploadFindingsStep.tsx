import CreatableSelect from "react-select/creatable"
import FindingsFormElement from "../FindingsFormElement";
import { UploadFindingSchemaType } from "../../../types/types";
import { Controller, useFormContext } from "react-hook-form";
import InputError from "../../uiEnhancements/InputError";


const exampleTags = [
    {
        label: 'Popular tags',
        options: [
            { value: 'research', label: 'Research' },
            { value: 'hot', label: 'Hot topic' },
            { value: 'novel', label: 'New finding' },
        ]
    },
    { value: 'outlier', label: 'Outlier finding' }

]
function UploadFindingsStep() {
    const { register, control, formState: { errors } } = useFormContext<UploadFindingSchemaType>();
    return (
        <div className="">
            <div className="form-control">
                <label htmlFor="abstract" className="label">Abstract: </label>
                <textarea {...register('abstract')} name="abstract" className="textarea textarea-bordered" rows={5} />
                {errors && <InputError message={errors.abstract?.message?.toString()} />}
            </div>
            <div>
                <FindingsFormElement />
            </div>
            <div className="form-control">
                <label htmlFor="domainOfResearch" className="label">Domain of research: </label>
                <input {...register('domainOfResearch')} type="text" name="domainOfResearch" className="input input-bordered" />
                {errors && <InputError message={errors.domainOfResearch?.message?.toString()} />}
            </div>
            <div className="form-control">
                <label htmlFor="tags" className="label">Tags: </label>
                <Controller control={control} name="tags" render={({ field }) =>
                    <CreatableSelect {...field} options={exampleTags} onChange={field.onChange} placeholder="Add tags..." isMulti />
                } />

                {errors && <InputError message={errors.tags?.message?.toString()} />}
            </div>
        </div>
    )
}

export default UploadFindingsStep;