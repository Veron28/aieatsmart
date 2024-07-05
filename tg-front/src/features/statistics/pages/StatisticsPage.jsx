import { useRouteLoaderData } from "react-router-dom"
import { RiShareFill as ShareIcon } from "@remixicon/react"

import SectionHeading from "@/components/SectionHeading"
import UltimateActionButton from "@/components/UltimateActionButton"
import PageActionsBlock from "@/components/PageActionsBlock"

import { closeMiniApp } from "@/utils/TelegramUtils"

import PCFConsumptionSummary from "../sections/PCFConsumptionSummary"
import FoodIntakeSummary from "../sections/FoodIntakeSummary"
import CaloriesEatenSummary from "../sections/CalloriesEatenSummary"
import RemainingCaloriesSummary from "../sections/RemainingCaloriesSummary"
import { shareStatistics } from "../api/StatisticsApi"

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
    const loaderData = useRouteLoaderData("root")
    console.log("This is the loader data we got so far", loaderData)

    const { userInformation } = loaderData

    const onShareClick = () => {
        shareStatistics()
        closeMiniApp()
    }

    const foodIntakeData = getFoodIntakeData(userInformation)
    const caloriesConsumptionData = getCaloriesIntakeData(userInformation)
    const pcfConsumptionData = getPCFConsumptionData(userInformation)

    return userInformation ? (
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
    ) : null
}

export default StatisticsPage
