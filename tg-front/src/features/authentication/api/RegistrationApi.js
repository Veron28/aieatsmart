import { callBackend } from "@/api/client"

export function startRegistration() {
    return callBackend("/api/v1/user_reg_start", { method: "POST" })
}

export function storeUserPhysiologyInfo(userPhysiologyInfo) {
    return callBackend("/api/v1/user_main_info", { method: "POST", body: userPhysiologyInfo })
}

export function storeUserHealthInfo(userHealthInfo) {
    return callBackend("/api/v1/user_health_info", { method: "POST", body: userHealthInfo })
}

export function storeUserGoals(userGoals) {
    return callBackend("/api/v1/user_goal_info", { method: "POST", body: userGoals })
}

export function storeUserLimitations(userLimitations) {
    return callBackend("/api/v1/user_limit_info", { method: "POST", body: userLimitations })
}

export function storeUserLifestyleData(userLifestyleData) {
    return callBackend("/api/v1/user_stress_and_activity_info", { method: "POST", body: userLifestyleData })
}
