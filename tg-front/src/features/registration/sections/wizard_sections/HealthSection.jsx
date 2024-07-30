import { memo, useCallback, useContext, useState } from "react"

import {
    RiHealthBookFill,
    RiSubtractFill as NoLimitationsIcon,
    RiDropFill as DiabetesIcon,
    RiScalesFill as ObesityIcon,
    RiPulseLine as HypertoniaIcon,
    RiHeartPulseFill as HeartDiseasesIcon,
    RiFlaskFill as AllergiesIcon,
} from "@remixicon/react"

import StyledIcon from "@shared/ui/StyledIcon"
import CheckboxSelectorInput from "@shared/ui/inputs/CheckboxSelectorInput"
import InputFieldLayout from "@shared/ui/inputs/InputFieldLayout"

import { storeUserHealthInfo } from "@features/registration/api/RegistrationApi"
import { WizardSectionContext } from "@features/registration/widgets/WizardSectionContext"

const healthItemsData = [
    {
        name: "Не имеется",
        icon: <StyledIcon iconShape={<NoLimitationsIcon />} />,
    },
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
    const [extraText, setExtraText] = useState(sectionData.extra)
    const updateExtraHealthDescription = useCallback((event) => {
        event?.preventDefault?.()
        sectionData.extra = event?.target?.value ?? undefined
        console.log("Health section triggered with: ", sectionData.extra)
        console.log("Section data is: ", sectionData)
        setExtraText(sectionData.extra)
    }, [sectionData, setExtraText])

    if (!sectionData.base) {
        sectionData.base = []
    }
    const inputFields = healthItemsData.map(({ name, icon }) => (
        <InputFieldLayout
            key={name}
            fieldIcon={icon}
            fieldName={name}
            inputControl={getCheckbox(name, sectionData)}
        />
    ))

    return (
        <div className="flex flex-col items-stretch">
            <div className="grid gap-2">{inputFields}</div>
            <span className="mt-8 mb-3">Не нашли в списке?</span>
            <textarea
                className="rounded-lg drop-shadow-2xl bg-white min-h-16 p-4 text-sm"
                placeholder="Введите здесь все имеющиеся медицинские противопоказания.&#10;Не более 2500 символов"
                autocomplete="off"
                autocapitalize="sentences"
                maxLength={2500}
                value={extraText}
                onChange={updateExtraHealthDescription}
                style={{
                    resize: "none",
                }}
            />
        </div>
    )
})

const canProceed = (sectionData) => {
    const selectedHealthIssues = sectionData.base
    const userIsHealthy = selectedHealthIssues.length === 1 && selectedHealthIssues.includes(healthItemsData[0].name)
    const userSelectedHealthIssues = selectedHealthIssues.length > 0 && !selectedHealthIssues.includes(healthItemsData[0].name)

    const dataIsValid = userIsHealthy || userSelectedHealthIssues
    return dataIsValid ? null : "Выберите противопоказание"
}

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
        canProceed
    },
}
