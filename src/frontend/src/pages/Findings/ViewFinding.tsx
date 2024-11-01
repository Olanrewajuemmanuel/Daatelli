import { useParams } from "react-router-dom";
import HealthCheck from "../../components/healthCheck";
import NavBar from "../../components/uiEnhancements/NavBar";
import { useEffect, useState } from "react";
import { getFinding } from "../../actions/findings";
import LoadingComponent from "../../components/loading/LoadingComponent";

function ViewFinding() {
    const params = useParams()
    const [finding, setFinding] = useState<Record<string, any> | null>(null)
    const [loading, setLoading] = useState(true)

    function getFindingData(id: string) {
        return getFinding(id).then(setFinding).catch(console.error).finally(() => setLoading(false))
    }

    useEffect(() => {
        getFindingData(params.id ?? "")
    }, [params.id])
    return <><div>
        <NavBar onMessagesUpdate={() => { }} />
        <main className="max-w-[calc(100vw-4rem)] mx-auto py-8">
            <h1>Viewing finding id: {params.id}</h1>
            <div>
                {loading ? <LoadingComponent /> : <div>{finding ?
                    (<div>
                        <h2>{finding.title}</h2>
                        <p>{finding.description}</p>
                    </div>) : <p>No finding found
                        <button onClick={() => {
                            setLoading(true)
                            getFindingData(params?.id ?? "")
                        }}>Refresh</button>
                    </p>}</div>}
            </div>
        </main>
    </div><HealthCheck /></>
}

export default ViewFinding;