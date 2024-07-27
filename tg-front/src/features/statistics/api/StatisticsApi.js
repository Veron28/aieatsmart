import { getUserData } from "@features/authentication/api/AuthenticationApi"

export const getStatistics = getUserData

export function shareStatistics() {
    return callBackend("/api/v1/share_stat", { method: "POST" })
}
