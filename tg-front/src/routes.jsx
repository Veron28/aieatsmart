import { createBrowserRouter } from "react-router-dom"

import App from "@/App"

import {
    rootLoader,
    authenticatedOnlyProtector,
    guestOnlyProtector,
} from "@/features/authentication/data/UserDataLoaders"

import WelcomePage from "@/features/registration/pages/WelcomePage"
import WizardPage from "@/features/registration/pages/WizardPage"
import SignupCompletePage from "@/features/registration/pages/SignupCompletedPage"
import StatisticsPage from "@/features/statistics/pages/StatisticsPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        id: "root",
        loader: rootLoader,
        children: [
            { path: "welcome", loader: guestOnlyProtector, element: <WelcomePage /> },
            {
                path: "signup",
                loader: guestOnlyProtector,
                children: [
                    { index: true, element: <WizardPage /> },
                    { path: "completed", element: <SignupCompletePage /> },
                ],
            },
            { path: "statistics", loader: authenticatedOnlyProtector, element: <StatisticsPage /> },
        ],
    },
])

export default router
