import { useContext } from "react"
import CheckboxSelectorInput from "@/components/inputs/CheckboxSelectorInput"

import InputFieldLayout from "../components/InputFieldLayout"
import WeightGainIcon from "@/assets/up.svg"
import WeightLossIcon from "@/assets/down.svg"
import WeightMaintenanceIcon from "@/assets/icon2.svg"
import HealthImprovementIcon from "@/assets/heart.svg"
import SportResultsIcon from "@/assets/run.svg"

import { WizardSectionContext } from "../components/WizardSectionContext"

const getCheckbox = (valueName, isSelected) => {
    const onChangeFn = (newValue) => {
        const sectionData = useContext(WizardSectionContext)
        if (!sectionData.goal) {
            sectionData.goal = []
        }
        if (newValue) {
            sectionData.goal.push(valueName)
        } else {
            sectionData.goal.remove(valueName)
        }
    }
    return <CheckboxSelectorInput isSelected={isSelected} onChange={onChangeFn} />
}

const GoalsSection = () => {
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
                inputControl={getCheckbox("Набор массы")}
            />
            <InputFieldLayout
                fieldIcon={WeightLossIcon}
                fieldName="Снижение веса"
                inputControl={getCheckbox("Снижение веса")}
            />
            <InputFieldLayout
                fieldIcon={WeightMaintenanceIcon}
                fieldName="Поддержание текущего веса"
                inputControl={getCheckbox("Поддержание текущего веса")}
            />
            <InputFieldLayout
                fieldIcon={HealthImprovementIcon}
                fieldName="Улучшение здоровья"
                inputControl={getCheckbox("Улучшение здоровья")}
            />
            <InputFieldLayout
                fieldIcon={SportResultsIcon}
                fieldName="Улучшение спортивных результатов"
                inputControl={getCheckbox("Улучшение спортивных результатов")}
            />
        </div>
    )
}

export default GoalsSection
