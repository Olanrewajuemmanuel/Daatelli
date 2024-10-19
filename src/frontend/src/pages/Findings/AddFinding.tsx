import { useNavigate, useSearchParams } from "react-router-dom"
import DocumentsFlow from "../../components/step-form/DocumentsFlow";
import { routesMap } from "../../constants";
import MultimediaFlow from "../../components/step-form/MultimediaFlow";
import CodeFlow from "../../components/step-form/CodeFlow";
import HealthCheck from "../../components/healthCheck";
import NavBar from "../../components/uiEnhancements/NavBar";
import MetaTags from "react-meta-tags";

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
        <>
            <MetaTags>
                <title>Daatelli | Add Finding</title>
            </MetaTags>
            <div>
                <NavBar onMessagesUpdate={() => { }} />
                <div className="max-w-2xl mx-auto p-8 rounded-lg inter-body border border-gray-200">
                    <h2 className="text-2xl font-semibold">Add '{searchParams.get('type')}' to your Findings</h2>
                    <div className="my-8">
                        {display}
                    </div>
                </div>
                <HealthCheck />
            </div>
        </>
    );
}

export default AddFinding