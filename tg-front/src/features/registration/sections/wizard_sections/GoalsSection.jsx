import { memo, useContext } from "react"

import {
    RiCheckboxCircleFill,
    RiArrowUpFill as WeightGainIcon,
    RiArrowDownFill as WeightLossIcon,
    RiScalesFill as WeightMaintenanceIcon,
    RiUserHeartFill as HealthImprovementIcon,
    RiRunFill as SportResultsIcon,
} from "@remixicon/react"

import RadioButtonItems from "@/components/inputs/RadioButtonItems"
import StyledIcon from "@/components/StyledIcon"

import { storeUserGoals } from "@/features/registration/api/RegistrationApi"
import { WizardSectionContext } from "@/features/registration/components/WizardSectionContext"

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

const GoalsSectionContents = memo(() => {
    const sectionData = useContext(WizardSectionContext)
    const updateGoalInSectionData = (newGoal) => {
        sectionData.goal = newGoal
    }

    return (
        <div className="grid gap-2">
            <RadioButtonItems options={goalsDataItems} onSelectionChange={updateGoalInSectionData} />
        </div>
    )
})

export default {
    sectionContents: <GoalsSectionContents />,
    metaContents: {
        sectionName: "goals",
        title: "Цели",
        subtitle: (
            <span style={{ display: "contents" }}>
                Выберите одну цель,
                <wbr /> которая больше Вам подходит:
            </span>
        ),
        sectionIcon: <RiCheckboxCircleFill />,
    },
    dataHandlers: {
        saveState: storeUserGoals,
    },
}
