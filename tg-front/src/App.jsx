import { Suspense, useState } from "react"
import { Await, Outlet, useRouteLoaderData } from "react-router-dom"

import "./styles/application.css"

export default function App() {
    const initialData = useRouteLoaderData("root")
    return (
        <div className="main">
            <div className="container">
                <Suspense fallback={<p>Loading...</p>}>
                    <Await resolve={initialData?.compositePromise}>
                        <Outlet />
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}
