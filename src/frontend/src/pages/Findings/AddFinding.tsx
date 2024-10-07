import { useNavigate, useSearchParams } from "react-router-dom"
import DocumentsFlow from "../../components/step-form/DocumentsFlow";
import { routesMap } from "../../constants";
import MultimediaFlow from "../../components/step-form/MultimediaFlow";
import CodeFlow from "../../components/step-form/CodeFlow";

function AddFinding() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    let display = null;

    const handleCreationNavigation = (findingId: string) => {
        navigate(`${routesMap.viewFinding}/${findingId}`)
    }

    switch (searchParams.get('type')) {
        case 'code':
        case 'algorithms':
        case 'model':
            // Formatted text and test case view
            display = <CodeFlow onCreateFinding={handleCreationNavigation} />
            break;
        case 'videos':
        case 'images':
            // Multimedia view
            display = <MultimediaFlow onCreateFinding={handleCreationNavigation} />
            break;
        default:
            // Display structured data view as fallback (PPT, pdf, docs, csv etc)
            display = <DocumentsFlow onCreateFinding={handleCreationNavigation} />
            break;
    }

    return (
        <div>
            <nav>
                <a href="/feed">Air data</a>
            </nav>
            <div>
                <h2>Add '{searchParams.get('type')}'</h2>
                {display}
            </div>
        </div>
    );



}

export default AddFinding