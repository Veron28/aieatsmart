import { Outlet } from "react-router-dom"

import "./styles/application.css"

import { waitForTelegramLoad } from "./utils/TelegramUtils"
import { useState } from "react"

export default function App() {
    const [isLoading, setIsLoading] = useState(true)
    waitForTelegramLoad().then(() => setIsLoading(false))
    return (
        <div className="main">
            <div className="container">{isLoading ? null : <Outlet />}</div>
        </div>
    )
}
