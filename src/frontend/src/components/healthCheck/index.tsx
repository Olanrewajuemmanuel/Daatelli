/**
 * Use for all pages that require API logic.
 */
import { useCallback, useEffect, useState } from "react"
import { HEALTH_CHECK_INTERVAL, SYSTEM_MESSAGES } from "../../constants/utils"
import PlugDisconnectedLogo from "../../assets/plug-disconnected-svgrepo-com.svg"
import { axiosPublicClient } from "../../actions/config"
import { getURL, serverRoutes } from "../../constants"

export default function HealthCheck() {
    const [isLoading, setIsLoading] = useState(false)
    const [healthCheckSuccess, setHealthCheckSuccess] = useState(true)

    useEffect(() => {
        if (window.localStorage.getItem('last-health-check') !== 'ok') {
            checkHealth();
        }
        const intervalId = setInterval(checkHealth, HEALTH_CHECK_INTERVAL)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const checkHealth = useCallback(async () => {
        setIsLoading(true)
        try {
            const res = await axiosPublicClient(getURL(serverRoutes.health))
            if (res.status === 200) {
                setHealthCheckSuccess(true)
            } else {
                setHealthCheckSuccess(false)
            }
        } catch (error) {
            if ((error as Error).name === 'AbortError') {
                console.log("Duplicate request");
                setHealthCheckSuccess(true)
            } else {
                console.log("Health check failed", error)
                setHealthCheckSuccess(false)
            }
        }


        setTimeout(() => {
            setIsLoading(false)
            // Give the user time to retry
        }, 10000)
    }, [])
    if (!healthCheckSuccess) {
        return (
            <div className="inter-body absolute top-0 left-0 w-full h-full opacity-90 bg-slate-700 flex flex-col items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg py-8 px-4 min-w-[300px] space-y-4">
                    <img src={PlugDisconnectedLogo} alt="" width={60} className="mx-auto" />

                    <h2 className="text-lg font-semibold max-w-sm text-center">{SYSTEM_MESSAGES["health-check-failure"]}</h2>
                    <button className="btn bg-primary text-white float-right" onClick={() => checkHealth()}>
                        {isLoading ? <span className="loading loading-ring mx-auto"></span> : "Retry"}
                    </button>
                </div>
            </div>
        )
    }
    return;
}