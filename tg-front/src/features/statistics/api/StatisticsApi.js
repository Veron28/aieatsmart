import { callBackend } from "@/api/client"

export function getStatistics() {
    return callBackend("/api/v1/auth", { method: "POST" })
}

export function shareStatistics() {
    return callBackend("/api/v1/share_stat", { method: "POST" })
}
