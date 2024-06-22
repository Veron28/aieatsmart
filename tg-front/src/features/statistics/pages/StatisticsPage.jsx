import { useState, useEffect } from "react"
import { RiShareFill as ShareIcon } from "@remixicon/react"

import SectionHeading from "@/components/SectionHeading"
import UltimateActionButton from "@/components/UltimateActionButton"
import PageActionsBlock from "@/components/PageActionsBlock"

import PCFConsumptionSummary from "../sections/PCFConsumptionSummary"
import FoodIntakeSummary from "../sections/FoodIntakeSummary"
import GrammsEatenSummary from "../sections/GrammsEatenSummary"
import RemainingCaloriesSummary from "../sections/RemainingCaloriesSummary"
import { getStatistics } from "../api/StatisticsApi"

const getFoodIntakeData = () => ({
    current: 3,
    total: 3,
})

const getCaloriesIntakeData = () => ({
    current: 1000,
    total: 1230,
})

const StatisticsPage = () => {
    const [statisticsData, setStatisticsData] = useState({})
    useEffect(() => {
        getStatistics().then(setStatisticsData)
        console.log("Statistics", statisticsData)
    }, [])

    const foodIntakeData = getFoodIntakeData()
    const caloriesConsumptionData = getCaloriesIntakeData()

    return (
        <section
            className="page"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "14px",
            }}
        >
            <SectionHeading title="Статистика" subtitle="За сегодня" />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: ".5em",
                }}
            >
                <PCFConsumptionSummary
                    style={{
                        gridColumnStart: "span 2",
                    }}
                />
                <FoodIntakeSummary foodIntakeData={foodIntakeData} />
                <GrammsEatenSummary foodIntakeData={foodIntakeData} />
                <RemainingCaloriesSummary
                    style={{
                        gridColumnStart: "span 2",
                    }}
                    caloriesConsumptionData={caloriesConsumptionData}
                />
            </div>
            <PageActionsBlock>
                <UltimateActionButton text="Поделиться" icon={<ShareIcon />} />
            </PageActionsBlock>
        </section>
    )
}

export default StatisticsPage
