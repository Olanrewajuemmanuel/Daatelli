import { useNavigate, useSearchParams } from "react-router-dom"
import DocumentsFlow from "../../components/step-form/DocumentsFlow";
import { routesMap } from "../../constants";

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
            display = <div>Code</div>
            break;
        case 'videos':
        case 'images':
            // Multimedia view
            display = <div>Multimedia</div>
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
                {display}
            </div>
        </div>
    );



}

export default AddFinding