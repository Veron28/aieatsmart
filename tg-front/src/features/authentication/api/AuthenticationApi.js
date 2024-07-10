import { callBackend } from "@/api/client"

export function getUserData() {
    return callBackend("/api/v1/auth", { method: "POST" })
}
