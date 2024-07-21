import { memo, useCallback, useContext } from "react"

import {
    RiHealthBookFill,
    RiDropFill as DiabetesIcon,
    RiScalesFill as ObesityIcon,
    RiPulseLine as HypertoniaIcon,
    RiHeartPulseFill as HeartDiseasesIcon,
    RiFlaskFill as AllergiesIcon,
} from "@remixicon/react"

import StyledIcon from "@/components/StyledIcon"
import CheckboxSelectorInput from "@/components/inputs/CheckboxSelectorInput"
import InputFieldLayout from "@/components/inputs/InputFieldLayout"

import { storeUserHealthInfo } from "@/features/registration/api/RegistrationApi"
import { WizardSectionContext } from "@/features/registration/components/WizardSectionContext"

const healthItemsData = [
    {
        name: "Диабет",
        icon: <StyledIcon iconShape={<DiabetesIcon />} />,
    },
    {
        name: "Ожирение",
        icon: <StyledIcon iconShape={<ObesityIcon />} />,
    },
    {
        name: "Гипертония",
        icon: <StyledIcon iconShape={<HypertoniaIcon />} />,
    },
    {
        name: "Сердечные заболевания",
        icon: <StyledIcon iconShape={<HeartDiseasesIcon />} />,
    },
    {
        name: "Аллергия",
        icon: <StyledIcon iconShape={<AllergiesIcon />} />,
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

const HealthSectionContents = memo(() => {
    const sectionData = useContext(WizardSectionContext)
    const inputFields = healthItemsData.map(({ name, icon }) => (
        <InputFieldLayout key={name} fieldIcon={icon} fieldName={name} inputControl={getCheckbox(name, sectionData)} />
    ))

    return <div className="grid gap-2">{inputFields}</div>
})

export default {
    sectionContents: <HealthSectionContents />,
    metaContents: {
        sectionName: "health",
        title: "Здоровье",
        subtitle: (
            <span style={{ display: "contents" }}>
                Пожалуйста, укажите все имеющиеся
                <wbr /> у Вас медицинские противопоказания:
            </span>
        ),
        sectionIcon: <RiHealthBookFill />,
    },
    dataHandlers: {
        saveState: storeUserHealthInfo,
    },
}