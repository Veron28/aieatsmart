import "./styles/application.css"

import WizardPage from "./features/setup_wizard/pages/WizardPage"

export default function App() {
    return (
        <div className="main">
            <div className="container">
                <WizardPage />
            </div>
        </div>
    )
}
