import { defer } from "react-router-dom"

import { getUserData } from "@/features/authentication/api/AuthenticationApi"
import { waitForTelegramLoad } from "@/utils/TelegramUtils"

export const rootLoader = async () => {
    const userDataPromise = getUserData()
    const telegramLoadPromise = waitForTelegramLoad()

    return defer({
        userInformation: userDataPromise,
        compositePromise: Promise.all([userDataPromise, telegramLoadPromise])
    })
}
