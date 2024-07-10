import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"

import App from "@/App"

const WelcomePage = lazy(() => import("@/features/registration/pages/WelcomePage"))
const SignupPage = lazy(() => import("@/features/registration/pages/WizardPage"))
const SignupCompletedPage = lazy(() => import("@/features/registration/pages/SignupCompletedPage"))
const UserStatisticsPage = lazy(() => import("@/features/statistics/pages/StatisticsPage"))

import { rootLoader } from "@/features/authentication/data/UserDataLoaders"
import {
    AuthenticationRedirector,
    AuthenticatedOnly,
    UnauthenticatedOnly,
} from "@/features/authentication/components/AuthenticationLayouts"

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        element: <App />,
        loader: rootLoader,
        children: [
            {
                index: true,
                element: <AuthenticationRedirector />,
            },
            {
                path: "welcome",
                element: <UnauthenticatedOnly />,
                children: [
                    {
                        index: true,
                        element: <WelcomePage />,
                    },
                ],
            },
            {
                path: "signup",
                element: <UnauthenticatedOnly />,
                children: [
                    {
                        index: true,
                        element: <SignupPage />,
                    },
                    {
                        path: "completed",
                        element: <SignupCompletedPage />,
                    },
                ],
            },
            {
                path: "statistics",
                element: <AuthenticatedOnly />,
                children: [
                    {
                        index: true,
                        element: <UserStatisticsPage />,
                    },
                ],
            },
        ],
    },
])

export default router
