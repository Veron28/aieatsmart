import { memo, useCallback, useContext } from "react"

import DiabetesIcon from "@/assets/icon1.svg"
import ObesityIcon from "@/assets/icon2.svg"
import HypertoniaIcon from "@/assets/icon3.svg"
import HeartDiseasesIcon from "@/assets/icon4.svg"
import AllergiesIcon from "@/assets/icon5.svg"

import CheckboxSelectorInput from "@/components/inputs/CheckboxSelectorInput"

import InputFieldLayout from "../components/InputFieldLayout"
import { WizardSectionContext } from "../components/WizardSectionContext"

const healthItemsData = [
    {
        name: "Диабет",
        icon: DiabetesIcon,
    },
    {
        name: "Ожирение",
        icon: ObesityIcon,
    },
    {
        name: "Гипертония",
        icon: HypertoniaIcon,
    },
    {
        name: "Сердечные заболевания",
        icon: HeartDiseasesIcon,
    },
    {
        name: "Аллергия",
        icon: AllergiesIcon,
    },
]

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
    const inputFields = healthItemsData.map(({ name, icon }) => (
        <InputFieldLayout key={name} fieldIcon={icon} fieldName={name} inputControl={getCheckbox(name, sectionData)} />
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

export default memo(HealthSection)
