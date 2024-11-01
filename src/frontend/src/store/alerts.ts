import { Slide, toast } from "react-toastify";
import { create } from "zustand";

type Alert = {
    id: "analysis" | "building" | "storing";
    sender: string;
    message: string;
    created_at: string;
}

type AlertsState = {
    alerts: Alert[];
}

type Action = {
    busy: boolean;
    getAlerts: () => void
    notifyAlert: (alert: Alert) => void
}

export const useAlertsStore = create<AlertsState & Action>((set) => ({
    alerts: [],
    busy: false,
    getAlerts: async () => {
        const alerts = localStorage.getItem("DT_alerts") || "[]"
        set({ alerts: JSON.parse(alerts) })
    },
    notifyAlert: (alert: Alert) => {
        set((state) => {
            localStorage.setItem("DT_alerts", JSON.stringify([...state.alerts, alert]))
            return { alerts: [...state.alerts, alert] }
        })
        // Show alert
        toast(alert.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Slide
        })
    }
}))

