import { callBackend } from "../../../api/client"

export function startRegistration() {
    return callBackend("/api/v1/user_reg_start", { method: "POST" })
}
