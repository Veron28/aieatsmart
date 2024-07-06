const authProvider = {
    isAuthenticated: false,
}

export const setIsAuthenticated = (isAuthenticated) => {
    authProvider.isAuthenticated = Boolean(isAuthenticated)
}

export const isAuthenticated = () => authProvider.isAuthenticated
