import { memo, useCallback, useContext } from "react"

import {
    RiCheckboxCircleFill,
    RiArrowUpFill as WeightGainIcon,
    RiArrowDownFill as WeightLossIcon,
    RiScalesFill as WeightMaintenanceIcon,
    RiUserHeartFill as HealthImprovementIcon,
    RiRunFill as SportResultsIcon,
} from "@remixicon/react"

import RadioButtonItems from "@shared/ui/inputs/RadioButtonItems"
import StyledIcon from "@shared/ui/StyledIcon"

import { storeUserGoals } from "@features/registration/api/RegistrationApi"
import { WizardSectionContext } from "@features/registration/widgets/WizardSectionContext"

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
    const updateExtraGoal = useCallback((event) => {
        event?.preventDefault?.()
        sectionData.extra = event?.target?.value ?? undefined
    }, [sectionData])
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
                onChange={updateExtraGoal}
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
