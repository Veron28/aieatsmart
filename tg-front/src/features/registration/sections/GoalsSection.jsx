import { memo, useCallback, useContext, useState } from "react"
import CheckboxSelectorInput from "@/components/inputs/CheckboxSelectorInput"
import WeightGainIcon from "@/assets/up.svg"
import WeightLossIcon from "@/assets/down.svg"
import WeightMaintenanceIcon from "@/assets/icon2.svg"
import HealthImprovementIcon from "@/assets/heart.svg"
import SportResultsIcon from "@/assets/run.svg"

import InputFieldLayout from "../components/InputFieldLayout"
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

const getRadioButton = (goalName, sectionData, setSelectionState) => {
    const onChangeFn = useCallback(
        (thisGoalIsSelected) => {
            if (thisGoalIsSelected) {
                sectionData.goal = goalName
                setSelectionState?.(goalName)
            }
        },
        [sectionData, goalName, setSelectionState]
    )
    const thisGoalIsSelected = sectionData.goal === goalName
    return <CheckboxSelectorInput isSelected={thisGoalIsSelected} onChange={onChangeFn} />
}

const GoalsSection = () => {
    const sectionData = useContext(WizardSectionContext)
    // We use this state to trigger whole section's rerender
    // This rerender is necessary, so all checkboxes refresh. Only one can be selected.
    const [sectionSelection, setSelection] = useState(sectionData.goal ?? "")
    const inputFields = goalsDataItems.map(({name, icon}) => (
        <InputFieldLayout
            key={name}
            fieldIcon={icon}
            fieldName={name}
            inputControl={getRadioButton(name, sectionData, setSelection)} />
    ))

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
            }}
        >
            {inputFields}
        </div>
    )
}

export default memo(GoalsSection)
