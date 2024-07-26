import { memo } from "react"
import { RiEmpathizeFill } from "@remixicon/react"

import { storeUserPhysiologyInfo } from "@/features/registration/api/RegistrationApi"

import InputFieldLayout from "@/components/inputs/InputFieldLayout"

import WeightSelectorInput from "@/features/registration/components/WeightSelectorInput"
import HeightSelectorInput from "@/features/registration/components/HeightSelectorInput"
import GenderSelectorInput from "@/features/registration/components/GenderSelectorInput"
import AgeSelectorInput from "@/features/registration/components/AgeSelectorInput"

const BasicsSectionContents = memo(() => {
    return (
        <div className="grid gap-2">
            <InputFieldLayout fieldName="Пол" inputControl={<GenderSelectorInput />} />
            <InputFieldLayout fieldName="Вес" inputControl={<WeightSelectorInput />} />
            <InputFieldLayout fieldName="Рост" inputControl={<HeightSelectorInput />} />
            <InputFieldLayout fieldName="Возраст" inputControl={<AgeSelectorInput />} />
        </div>
    )
})

const canProceed = (sectionData) => {
    const dataIsValid = sectionData?.weight && sectionData?.height && sectionData?.age && sectionData?.gender
    return dataIsValid ? null : "Выберите параметры"
}

export default {
    sectionContents: <BasicsSectionContents />,
    metaContents: {
        sectionName: "basics",
        title: "Основное",
        subtitle: (
            <span style={{ display: "contents" }}>
                Чем больше мы о Вас знаем,
                <wbr /> тем лучше мы сможем Вам помочь:
            </span>
        ),
        sectionIcon: <RiEmpathizeFill />,
    },
    dataHandlers: {
        saveState: storeUserPhysiologyInfo,
        canProceed,
    },
}
