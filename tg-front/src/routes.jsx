import { createBrowserRouter } from "react-router-dom"

import App from "./App"
import WizardPage from "./features/authentication/pages/WizardPage"
import StatisticsPage from "./features/statistics/pages/StatisticsPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <WizardPage /> },
            { path: "statistics", element: <StatisticsPage />}
        ],
    },
])

export default router
