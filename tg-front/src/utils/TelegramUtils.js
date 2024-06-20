import { useEffect } from "react"

const getTelegramObject = () => {
    return window?.Telegram?.WebApp
}

export const waitForTelegramLoad = async () => {
    const telegramObject = getTelegramObject()
    await telegramObject?.ready()
    telegramObject?.expand()
}

export const weAreInWebBrowser = () => {
    return !getTelegramObject()?.version
}

export const useOnBackListener = (onBackListener) => {
    useEffect(() => {
        const backButton = getTelegramObject()?.BackButton
        backButton?.onClick(onBackListener)
        return () => {
            backButton?.offClick(onBackListener)
        }
    })
}
