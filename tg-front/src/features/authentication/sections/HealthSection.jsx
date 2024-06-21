import { useContext } from "react"

import DiabetesIcon from "@/assets/icon1.svg"
import ObesityIcon from "@/assets/icon2.svg"
import HypertoniaIcon from "@/assets/icon3.svg"
import HeartDiseasesIcon from "@/assets/icon4.svg"
import AllergiesIcon from "@/assets/icon5.svg"

import CheckboxSelectorInput from "@/components/inputs/CheckboxSelectorInput"

import InputFieldLayout from "../components/InputFieldLayout"
import { WizardSectionContext } from "../components/WizardSectionContext"

const getCheckbox = (valueName, isSelected) => {
    const onChangeFn = (newValue) => {
        const sectionData = useContext(WizardSectionContext)
        if (!sectionData.base) {
            sectionData.base = []
        }
        if (newValue) {
            sectionData.base.push(valueName)
        } else {
            sectionData.base = sectionData.base.filter(item => item !== valueName)
        }
    }
    return <CheckboxSelectorInput isSelected={isSelected} onChange={onChangeFn} />
}

const HealthSection = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
            }}
        >
            <InputFieldLayout fieldIcon={DiabetesIcon} fieldName="Диабет" inputControl={getCheckbox("Диабет")} />
            <InputFieldLayout fieldIcon={ObesityIcon} fieldName="Ожирение" inputControl={getCheckbox("Ожирение")} />
            <InputFieldLayout fieldIcon={HypertoniaIcon} fieldName="Гипертония" inputControl={getCheckbox("Гипертония")} />
            <InputFieldLayout fieldIcon={HeartDiseasesIcon} fieldName="Сердечные заболевания" inputControl={getCheckbox("Сердечные заболевания")} />
            <InputFieldLayout fieldIcon={AllergiesIcon} fieldName="Аллергия" inputControl={getCheckbox("Аллергия")} />
        </div>
    )
}

export default HealthSection
