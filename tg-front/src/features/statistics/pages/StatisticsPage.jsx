import { useRouteLoaderData } from "react-router-dom"
import { RiShareFill as ShareIcon } from "@remixicon/react"

import SectionHeading from "@shared/ui/SectionHeading"
import UltimateActionButton from "@shared/ui/UltimateActionButton"
import PageActionsBlock from "@shared/ui/PageActionsBlock"

import { closeMiniApp } from "@shared/utils/TelegramUtils"

import PCFConsumptionSummary from "../sections/PCFConsumptionSummary"
import FoodIntakeSummary from "../sections/FoodIntakeSummary"
import CaloriesEatenSummary from "../sections/CaloriesEatenSummary"
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

    const { userInformation } = loaderData

    const onShareClick = () => {
        shareStatistics()
        closeMiniApp()
    }

    const foodIntakeData = getFoodIntakeData(userInformation)
    const caloriesConsumptionData = getCaloriesIntakeData(userInformation)
    const pcfConsumptionData = getPCFConsumptionData(userInformation)

    return userInformation ? (
        <section className="page flex flex-col items-stretch gap-3.5">
            <SectionHeading title="Статистика" subtitle="За сегодня" />
            <div className="grid gap-2 grid-cols-2 col-start-2">
                <PCFConsumptionSummary className="col-span-2" pcfConsumptionData={pcfConsumptionData} />
                <FoodIntakeSummary foodIntakeData={foodIntakeData} />
                <CaloriesEatenSummary foodIntakeData={caloriesConsumptionData} />
                <RemainingCaloriesSummary className="col-span-2"
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
