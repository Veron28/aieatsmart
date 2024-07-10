import { createContext, useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

/// Different components, that execute redirects depending on the authentication state.
/// Helpful for protecting pages.

const AUTHENTICATED_HOME_PAGE = "/statistics"
const UNAUTHENTICATED_HOME_PAGE = "/welcome"

export const AuthenticationContext = createContext({
    isAuthenticated: false,
})

export const AuthenticationRedirector = () => {
    const navigate = useNavigate()
    const authData = useContext(AuthenticationContext)

    useEffect(() => {
        if (authData?.isAuthenticated) {
            navigate(AUTHENTICATED_HOME_PAGE)
        } else {
            navigate(UNAUTHENTICATED_HOME_PAGE)
        }
    }, [authData])
    return <Outlet />
}

export const AuthenticatedOnly = () => {
    const navigate = useNavigate()
    const authData = useContext(AuthenticationContext)

    useEffect(() => {
        if (!authData?.isAuthenticated) {
            navigate(UNAUTHENTICATED_HOME_PAGE)
        }
    }, [authData])

    return <Outlet />
}

export const UnauthenticatedOnly = () => {
    const navigate = useNavigate()
    const authData = useContext(AuthenticationContext)

    useEffect(() => {
        if (authData?.isAuthenticated) {
            navigate(AUTHENTICATED_HOME_PAGE)
        }
    }, [authData])

    return <Outlet />
}
