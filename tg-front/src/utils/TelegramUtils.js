import { useEffect } from "react"

const getTelegramObject = () => {
    return window?.Telegram?.WebApp
}

export const waitForTelegramLoad = async () => {
    const telegramObject = getTelegramObject()
    if (!telegramObject) {
        return
    }
    await telegramObject?.ready()
    telegramObject?.expand()
}

export const weAreInWebBrowser = () => {
    return !getTelegramObject()?.platform
}

export const getTelegramInitData = () => {
    return getTelegramObject()?.initData
}

export const useTelegramOnBackListener = (onBackListener) => {
    useEffect(() => {
        const backButton = getTelegramObject()?.BackButton
        backButton?.onClick(onBackListener)
        return () => {
            backButton?.offClick(onBackListener)
        }
    })
}