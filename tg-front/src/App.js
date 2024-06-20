import "./styles/application.css"

import { waitForTelegramLoad } from "./utils/TelegramUtils"

import WizardPage from "./features/setup_wizard/pages/WizardPage"
import { useState } from "react"

export default function App() {
    const [isLoading, setIsLoading] = useState(true)
    waitForTelegramLoad().then(() => setIsLoading(false))
    return (
        <div className="main">
            <div className="container">{isLoading ? <h1>Загрузка...</h1> : <WizardPage />}</div>
        </div>
    )
}
