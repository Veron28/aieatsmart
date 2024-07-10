import { Suspense, useEffect, useState } from "react"
import { Await, Outlet, useRouteLoaderData } from "react-router-dom"

import "./styles/application.css"
import { AuthenticationContext } from "@/features/authentication/components/AuthenticationLayouts"
import { isAuthenticatedFn } from "@/features/authentication/api/AuthenticationApi"

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
                <Suspense fallback={<p>Loading...</p>}>
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
            </div>
        </div>
    )
}
