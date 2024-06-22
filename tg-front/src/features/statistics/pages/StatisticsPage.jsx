import { useState, useEffect, useCallback } from "react"
import { RiShareFill as ShareIcon } from "@remixicon/react"

import SectionHeading from "@/components/SectionHeading"
import UltimateActionButton from "@/components/UltimateActionButton"
import PageActionsBlock from "@/components/PageActionsBlock"

import { closeMiniApp } from "@/utils/TelegramUtils"

import PCFConsumptionSummary from "../sections/PCFConsumptionSummary"
import FoodIntakeSummary from "../sections/FoodIntakeSummary"
import CaloriesEatenSummary from "../sections/CalloriesEatenSummary"
import RemainingCaloriesSummary from "../sections/RemainingCaloriesSummary"
import { getStatistics, shareStatistics } from "../api/StatisticsApi"

const getFoodIntakeData = ({ eating_today, eating_daily_norm }) => ({
    current: eating_today,
    total: eating_daily_norm,
})

const getCaloriesIntakeData = ({ kcal_today, kcal_left }) => ({
    current: kcal_today,
    total: kcal_today + kcal_left,
})

const getPCFConsumptionData = ({ squirrels, fats, carbohydrates }) => [
    {
        name: "Жиры",
        gramms: fats,
        color: "var(--theme_color_pcf_fats)",
    },
    {
        name: "Углеводы",
        gramms: carbohydrates,
        color: "var(--theme_color_pcf_carbons)",
    },
    {
        name: "Белки",
        gramms: squirrels,
        color: "var(--theme_color_pcf_proteins)",
    },
]

const StatisticsPage = () => {
    const [statisticsData, setStatisticsData] = useState({})
    useEffect(() => {
        getStatistics().then(setStatisticsData)
        console.log("Statistics", statisticsData)
    }, [])

    const onShareClick = () => {
        console.log("On share clicked")
        shareStatistics()
        closeMiniApp()
    }

    const foodIntakeData = getFoodIntakeData(statisticsData)
    const caloriesConsumptionData = getCaloriesIntakeData(statisticsData)
    const pcfConsumptionData = getPCFConsumptionData(statisticsData)

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
                    pcfConsumptionData={pcfConsumptionData}
                />
                <FoodIntakeSummary foodIntakeData={foodIntakeData} />
                <CaloriesEatenSummary foodIntakeData={caloriesConsumptionData} />
                <RemainingCaloriesSummary
                    style={{
                        gridColumnStart: "span 2",
                    }}
                    caloriesConsumptionData={caloriesConsumptionData}
                />
            </div>
            <PageActionsBlock>
                <UltimateActionButton text="Поделиться" icon={<ShareIcon />} onClick={onShareClick} />
            </PageActionsBlock>
        </section>
    )
}

export default StatisticsPage
