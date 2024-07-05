import { createBrowserRouter, redirect } from "react-router-dom"

import App from "@/App"

import { getStatistics } from "@/features/statistics/api/StatisticsApi"

import WelcomePage from "@/features/registration/pages/WelcomePage"
import WizardPage from "@/features/registration/pages/WizardPage"
import SignupCompletePage from "@/features/registration/pages/SignupCompletedPage"
import StatisticsPage from "@/features/statistics/pages/StatisticsPage"

const rootLoader = async () => {
    try {
        const statistics = await getStatistics()
        return { userInformation: statistics }
    } catch (error) {
        return redirect("/welcome")
    }
}

const unprotectedLoader = (allParams) => {
    console.log("Unprotected loader...", allParams)
    if (allParams?.request?.userInformation?.is_stat) {
        redirect("/statistics")
    }
    return {}
}

const protectedLoader = ({ request }) => {
    if (!request?.userInformation?.is_stat) {
        redirect("/welcome")
    }
    return {}
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        id: "root",
        loader: rootLoader,
        children: [
            { path: "welcome", loader: unprotectedLoader, element: <WelcomePage /> },
            {
                path: "signup",
                children: [
                    { index: true, loader: unprotectedLoader, element: <WizardPage /> },
                    { path: "completed", element: <SignupCompletePage /> },
                ],
            },
            { path: "statistics", loader: protectedLoader, element: <StatisticsPage /> },
        ],
    },
])

export default router
