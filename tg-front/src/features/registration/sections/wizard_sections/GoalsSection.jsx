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
        <div className="flex flex-col items-stretch">
            <div className="grid gap-2">
                <RadioButtonItems options={goalsDataItems} onSelectionChange={updateGoalInSectionData} />
            </div>
            <span className="mt-8 mb-3">Не нашли в списке?</span>
            <textarea
                className="rounded-lg drop-shadow-2xl bg-white min-h-20 p-4 text-sm"
                placeholder="Напишите здесь цель, которую вы хотите достичь с помощью правильного питания. Не более 2500 символов."
                autocomplete="off"
                autocapitalize="sentences"
                maxLength={2500}
                style={{
                    resize: "none",
                }}
            />
        </div>
    )
})

const canProceed = (sectionData) => {
    return sectionData?.goal ? null : "Выберите цель"
}

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
        canProceed,
    },
}
