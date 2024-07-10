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
                lazy: async () => {
                    const { default: importedPage } = await import("@/features/registration/pages/WelcomePage")
                    return { Component: importedPage }
                },
            },
            {
                path: "signup",
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const { default: importedPage } = await import("@/features/registration/pages/WizardPage")
                            return { Component: importedPage }
                        },
                    },
                    {
                        path: "completed",
                        lazy: async () => {
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
                lazy: async () => {
                    const { default: importedPage } = await import("@/features/statistics/pages/StatisticsPage")
                    return { Component: importedPage }
                },
            },
        ],
    },
])

export default router
