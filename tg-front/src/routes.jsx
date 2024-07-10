import { createBrowserRouter } from "react-router-dom"

import App from "@/App"

import {
    rootLoader,
    authenticatedOnlyProtector,
    guestOnlyProtector,
} from "@/features/authentication/data/UserDataLoaders"

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        element: <App />,
        // loader: rootLoader,
        children: [
            {
                path: "welcome",
                async lazy() {
                    const { default: importedPage } = await import("@/features/registration/pages/WelcomePage")
                    return { Component: importedPage }
                },
            },
            {
                path: "signup",
                children: [
                    {
                        index: true,
                        async lazy() {
                            const { default: importedPage } = await import("@/features/registration/pages/WizardPage")
                            return { Component: importedPage }
                        },
                    },
                    {
                        path: "completed",
                        async lazy() {
                            const { default: importedPage } = await import(
                                "@/features/registration/pages/SignupCompletedPage"
                            )
                            return { Component: importedPage }
                        },
                    },
                ],
            },
            {
                path: "statistics",
                async lazy() {
                    const { default: importedPage } = await import("@/features/statistics/pages/StatisticsPage")
                    return { Component: importedPage }
                },
            },
        ],
    },
])

export default router
