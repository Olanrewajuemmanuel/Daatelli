import CreatableSelect from "react-select/creatable"
import InfoItem from "../InfoItem"
import FindingsFormElement from "../research/FindingsFormElement"
import SelectMultipleResearchers from "../research/SelectMultipleResearchers"
import StepForm from "./StepForm"


const child1 = <div>
    <div>
        <input type="file" name="upload" multiple />
        <label htmlFor="upload">Upload files (max. 200MB total for a max of 10 files) <InfoItem message="Upload PDFs, CSVs, Excel sheets or docx files. By uploading each file, you confirm that you have reviewed and verified each file. You also agree to allow Air-data to extract from each file any data, text snippets, tables, graphs, images, captions and metadata as applicable." /></label>
    </div>
    <SelectMultipleResearchers />
    <div>
        <label htmlFor="authorLink">Add a DOI or a link to your article <InfoItem message="Add links to an external site if the article belongs to an online journal or is available online. Kindly ensure links submitted are authentic, credible and not expired" /></label>
        <input type="text" name="authorLink" />
    </div>
</div>

const child2 = <div>
    <div>
        <label htmlFor="abstract">Abstract: </label>
        <textarea name="abstract" rows={5} />
    </div>
    <div>
        <FindingsFormElement />
    </div>
    <div>
        <label htmlFor="researchField">Domain of research: </label>
        <input type="text" name="researchField" />
    </div>
    <div>
        <label htmlFor="tags">Tags: </label>
        <CreatableSelect name="tags" value={[]} isMulti />
    </div>
</div>


function DocumentsFlow() {
    return (
        <StepForm noOfSteps={2} child1={child1} child2={child2} />
    )
}

export default DocumentsFlow