import { ofetch } from "ofetch"
const BACKEND_URL = import.meta.env.EATSMART_API_URL
import { getTelegramInitData } from "../utils/TelegramUtils"

export const callBackend = (url, ...args) => {
    const initData = getTelegramInitData()
    const authHeader = initData ? `Bearer ${initData}` : undefined

    const totalOptions = Object.assign(
        {},
        {
            baseURL: BACKEND_URL,
            headers: {
                Authorization: authHeader,
            },
        },
        {
            retry: 3,
            retryDelay: 500, // ms
        },
        ...args
    )

    console.log("So, this is request props", JSON.stringify(totalOptions))
    console.log("And this is url", url)

    return ofetch(url, totalOptions)
}
