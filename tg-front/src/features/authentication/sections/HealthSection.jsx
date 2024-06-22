import { useCallback, useContext } from "react"

import DiabetesIcon from "@/assets/icon1.svg"
import ObesityIcon from "@/assets/icon2.svg"
import HypertoniaIcon from "@/assets/icon3.svg"
import HeartDiseasesIcon from "@/assets/icon4.svg"
import AllergiesIcon from "@/assets/icon5.svg"

import CheckboxSelectorInput from "@/components/inputs/CheckboxSelectorInput"

import InputFieldLayout from "../components/InputFieldLayout"
import { WizardSectionContext } from "../components/WizardSectionContext"

const getCheckbox = (valueName, sectionData) => {
    const onChangeFn = useCallback(
        (itemIsSelected) => {
            if (!sectionData.base) {
                sectionData.base = []
            }
            if (itemIsSelected) {
                sectionData.base.push(valueName)
            } else {
                const newItems = sectionData.base.filter((item) => item !== valueName)
                sectionData.base = newItems
            }
        },
        [sectionData, valueName]
    )
    const thisCheckboxIsSelected = sectionData.base?.includes(valueName) ?? false
    return <CheckboxSelectorInput isSelected={thisCheckboxIsSelected} onChange={onChangeFn} />
}

const HealthSection = () => {
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
                fieldIcon={DiabetesIcon}
                fieldName="Диабет"
                inputControl={getCheckbox("Диабет", sectionData)}
            />
            <InputFieldLayout
                fieldIcon={ObesityIcon}
                fieldName="Ожирение"
                inputControl={getCheckbox("Ожирение", sectionData)}
            />
            <InputFieldLayout
                fieldIcon={HypertoniaIcon}
                fieldName="Гипертония"
                inputControl={getCheckbox("Гипертония", sectionData)}
            />
            <InputFieldLayout
                fieldIcon={HeartDiseasesIcon}
                fieldName="Сердечные заболевания"
                inputControl={getCheckbox("Сердечные заболевания", sectionData)}
            />
            <InputFieldLayout
                fieldIcon={AllergiesIcon}
                fieldName="Аллергия"
                inputControl={getCheckbox("Аллергия", sectionData)}
            />
        </div>
    )
}

export default HealthSection
