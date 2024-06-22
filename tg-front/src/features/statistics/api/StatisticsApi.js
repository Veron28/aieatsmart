import { callBackend } from "@/api/client"

export function getStatistics() {
    return callBackend("/api/v1/auth", { method: "POST" })
}
