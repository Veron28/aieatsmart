import { redirect } from "react-router-dom"
import { getStatistics } from "@/features/statistics/api/StatisticsApi"

import { setIsAuthenticated, isAuthenticated } from "@/features/authentication/data/AuthenticationProvider"

export const rootLoader = async ({ request }) => {
    try {
        const statisticsData = await getStatistics()
        setIsAuthenticated(statisticsData?.is_stat ?? false)

        console.log("Request is: ", new URL(request.url).pathname)
        console.log("We got this data", statisticsData)

        return { userInformation: statistics }
    } catch (error) {
        return redirect("/welcome")
    }
}

export const authenticatedOnlyProtector = async () => {
    // If the user is not logged in and tries to a
    if (!isAuthenticated()) {
        // return redirect("/welcome")
    }
    return null
}

export const guestOnlyProtector = async () => {
    // If the user is not logged in and tries to a
    if (isAuthenticated()) {
        // return redirect("/statistics")
    }
    return null
}
