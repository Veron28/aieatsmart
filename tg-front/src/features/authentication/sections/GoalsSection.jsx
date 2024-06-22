import { useCallback, useContext } from "react"
import CheckboxSelectorInput from "@/components/inputs/CheckboxSelectorInput"

import InputFieldLayout from "../components/InputFieldLayout"
import WeightGainIcon from "@/assets/up.svg"
import WeightLossIcon from "@/assets/down.svg"
import WeightMaintenanceIcon from "@/assets/icon2.svg"
import HealthImprovementIcon from "@/assets/heart.svg"
import SportResultsIcon from "@/assets/run.svg"

import { WizardSectionContext } from "../components/WizardSectionContext"

const getRadioButton = (valueName, sectionData) => {
    const onChangeFn = useCallback(
        (thisGoalIsSelected) => {
            if (thisGoalIsSelected) {
                sectionData.goal = valueName
            }
        },
        [sectionData, valueName]
    )
    const thisGoalIsSelected = sectionData.goal === valueName
    return <CheckboxSelectorInput isSelected={thisGoalIsSelected} onChange={onChangeFn} />
}

const GoalsSection = () => {
    const sectionData = useContext(WizardSectionContext)
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
            }}
        >
            <InputFieldLayout
                fieldIcon={WeightGainIcon}
                fieldName="Набор массы"
                inputControl={getRadioButton("Набор массы", sectionData)}
            />
            <InputFieldLayout
                fieldIcon={WeightLossIcon}
                fieldName="Снижение веса"
                inputControl={getRadioButton("Снижение веса", sectionData)}
            />
            <InputFieldLayout
                fieldIcon={WeightMaintenanceIcon}
                fieldName="Поддержание текущего веса"
                inputControl={getRadioButton("Поддержание текущего веса", sectionData)}
            />
            <InputFieldLayout
                fieldIcon={HealthImprovementIcon}
                fieldName="Улучшение здоровья"
                inputControl={getRadioButton("Улучшение здоровья", sectionData)}
            />
            <InputFieldLayout
                fieldIcon={SportResultsIcon}
                fieldName="Улучшение спортивных результатов"
                inputControl={getRadioButton("Улучшение спортивных результатов", sectionData)}
            />
        </div>
    )
}

export default GoalsSection
