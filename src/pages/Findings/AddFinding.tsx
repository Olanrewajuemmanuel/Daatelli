import { useSearchParams } from "react-router-dom"

function AddFinding() {
    const [searchParams, setSearchParams] = useSearchParams()

    let display = null;

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
            display = <div>Document</div>
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