import { callBackend } from "@/api/client"

export const isAuthenticatedFn = (userData) => false // userData?.is_stat ?? false

export function getUserData() {
    return callBackend("/api/v1/auth", { method: "POST" })
}
