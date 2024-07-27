import { Suspense, useEffect, useState } from "react"
import { Await, Outlet, useRouteLoaderData } from "react-router-dom"
import { LazyMotion, domMax } from "framer-motion"

import "@app/styles/application.css"
import { AuthenticationContext } from "@features/authentication/widgets/AuthenticationLayouts"
import { isAuthenticatedFn } from "@features/authentication/api/AuthenticationApi"
import LoadingFallback from "@shared/ui/LoadingFallback"

export default function App() {
    const [authFlag, setAuthFlag] = useState(false)
    const initialApplicationData = useRouteLoaderData("root")

    useEffect(() => {
        initialApplicationData.userInformation
            .then(isAuthenticatedFn)
            .then(setAuthFlag)
            .catch((error) => {
                console.log("User retrieval error: ", error)
                setAuthFlag(false)
            })
    }, [initialApplicationData])

    return (
        <div className="main">
            <div className="container">
                <LazyMotion features={domMax} strict>
                    <Suspense fallback={<LoadingFallback />}>
                        <Await resolve={initialApplicationData?.applicationIsReady}>
                            <AuthenticationContext.Provider
                                value={{
                                    isAuthenticated: authFlag,
                                }}
                            >
                                <Outlet />
                            </AuthenticationContext.Provider>
                        </Await>
                    </Suspense>
                </LazyMotion>
            </div>
        </div>
    )
}
