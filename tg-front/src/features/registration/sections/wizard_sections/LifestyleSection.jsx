import { memo, useCallback, useContext, useState } from "react"
import { RiMentalHealthFill } from "@remixicon/react"

import { WizardSectionContext } from "@features/registration/widgets/WizardSectionContext"

import { storeUserLifestyleData } from "@features/registration/api/RegistrationApi"
import GradualSliderSection from "@features/registration/widgets/GradualSliderSection"

const LifestyleSectionContents = memo(() => {
    const sectionData = useContext(WizardSectionContext)
    const [extraText, setExtraText] = useState(sectionData.extra)
    const onActivityLevelChangeFn = (newValue) => {
        sectionData.activity_level = newValue
    }

    const onStressLevelChangeFn = (newValue) => {
        sectionData.stress_level = newValue
    }

    const updateExtraLifestyleInformation = useCallback(
        (event) => {
            event?.preventDefault?.()
            sectionData.extra = event?.target?.value ?? undefined
            console.log("Lifestyle section triggered with: ", sectionData.extra)
            console.log("Section data is: ", sectionData)
            setExtraText(sectionData.extra)
        },
        [sectionData, setExtraText]
    )

    return (
        <div className="flex flex-col items-stretch gap-2">
            <GradualSliderSection
                title="Уровень активности"
                subtext={"Выберите свой обычный уровень активности, где "}
                initialValue={sectionData.activity_level}
                onChange={onActivityLevelChangeFn}
            />
            <GradualSliderSection
                title="Уровень стресса"
                subtext={"Выберите свой обычный уровень стресса, где"}
                initialValue={sectionData.stress_level}
                onChange={onStressLevelChangeFn}
            />
            <textarea
                className="rounded-lg drop-shadow-2xl bg-white min-h-36 p-4 text-sm"
                placeholder="Например: хожу в тренажерный зал, 3 тренировки в неделю, тренировка длится час, во время тренировки бегаю на дорожке.&#10;&#10;Если физической активности нет, оставьте поле пустым."
                autocomplete="off"
                autocapitalize="sentences"
                value={extraText}
                maxLength={2500}
                onChange={updateExtraLifestyleInformation}
                style={{
                    resize: "none",
                }}
            />
        </div>
    )
})

export default {
    sectionContents: <LifestyleSectionContents />,
    metaContents: {
        sectionName: "lifestyle",
        title: "Стресс и образ жизни",
        subtitle: "Расскажите нам больше о Вашем рационе и распорядке дня:",
        sectionIcon: <RiMentalHealthFill />,
    },
    dataHandlers: {
        saveState: storeUserLifestyleData,
    },
}
