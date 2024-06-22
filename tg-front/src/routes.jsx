import { createBrowserRouter } from "react-router-dom"

import App from "@/App"

import { getStatistics } from "@/features/statistics/api/StatisticsApi"

import WelcomePage from "@/features/registration/pages/WelcomePage"
import WizardPage from "@/features/registration/pages/WizardPage"
import SignupCompletePage from "@/features/registration/pages/SignupCompletedPage"
import StatisticsPage from "@/features/statistics/pages/StatisticsPage"

const rootLoader = async () => {
    const statistics = await getStatistics()
    return { userInformation: statistics }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        id: "root",
        loader: rootLoader,
        children: [
            { index: true, element: <WelcomePage /> },
            {
                path: "signup",
                children: [
                    { index: true, element: <WizardPage /> },
                    { path: "completed", element: <SignupCompletePage /> },
                ],
            },
            { path: "statistics", element: <StatisticsPage /> },
        ],
    },
])

export default router
