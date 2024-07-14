import { memo, useCallback, useContext, useState } from "react"
import CheckboxSelectorInput from "@/components/inputs/CheckboxSelectorInput"
import WeightGainIcon from "@/assets/up.svg"
import WeightLossIcon from "@/assets/down.svg"
// import WeightMaintenanceIcon from "@/assets/icon2.svg"
import HealthImprovementIcon from "@/assets/heart.svg"
import SportResultsIcon from "@/assets/run.svg"

import {
    RiScalesFill as WeightMaintenanceIcon
} from "@remixicon/react"

import RadioButtonItems from "@/components/inputs/RadioButtonItems"

import { WizardSectionContext } from "../components/WizardSectionContext"

const goalsDataItems = [
    {
        name: "Набор массы",
        icon: WeightGainIcon,
    },
    {
        name: "Снижение веса",
        icon: WeightLossIcon,
    },
    {
        name: "Поддержание текущего веса",
        icon: WeightMaintenanceIcon,
    },
    {
        name: "Улучшение здоровья",
        icon: HealthImprovementIcon,
    },
    {
        name: "Улучшение спортивных результатов",
        icon: SportResultsIcon,
    },
]

const GoalsSection = () => {
    const sectionData = useContext(WizardSectionContext)
    const updateGoalInSectionData = useCallback(
        (newGoal) => {
            sectionData.goal = newGoal
        },
        [sectionData]
    )

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
            }}
        >
            <RadioButtonItems options={goalsDataItems} onSelectionChange={updateGoalInSectionData} />
        </div>
    )
}

export default memo(GoalsSection)
