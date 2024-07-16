import { memo, useCallback, useContext } from "react"

import {
    RiArrowUpFill as WeightGainIcon,
    RiArrowDownFill as WeightLossIcon,
    RiScalesFill as WeightMaintenanceIcon,
    RiUserHeartFill as HealthImprovementIcon,
    RiRunFill as SportResultsIcon,
} from "@remixicon/react"

import RadioButtonItems from "@/components/inputs/RadioButtonItems"
import StyledIcon from "@/components/StyledIcon"

import { WizardSectionContext } from "../components/WizardSectionContext"

const goalsDataItems = [
    {
        name: "Набор массы",
        icon: <StyledIcon iconShape={<WeightGainIcon />} />,
    },
    {
        name: "Снижение веса",
        icon: <StyledIcon iconShape={<WeightLossIcon />} />,
    },
    {
        name: "Поддержание текущего веса",
        icon: <StyledIcon iconShape={<WeightMaintenanceIcon />} />,
    },
    {
        name: "Улучшение здоровья",
        icon: <StyledIcon iconShape={<HealthImprovementIcon />} />,
    },
    {
        name: "Улучшение спортивных результатов",
        icon: <StyledIcon iconShape={<SportResultsIcon />} />,
    },
]

export default memo(() => {
    const sectionData = useContext(WizardSectionContext)
    const updateGoalInSectionData = useCallback(
        (newGoal) => {
            sectionData.goal = newGoal
        },
        [sectionData]
    )

    return (
        <div className="grid gap-2">
            <RadioButtonItems options={goalsDataItems} onSelectionChange={updateGoalInSectionData} />
        </div>
    )
})
