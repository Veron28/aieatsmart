import { memo, useCallback, useContext } from "react"
import { RiMentalHealthFill } from "@remixicon/react"

import { WizardSectionContext } from "@features/registration/widgets/WizardSectionContext"

import { storeUserLifestyleData } from "@features/registration/api/RegistrationApi"
import GradualSliderSection from "@features/registration/widgets/GradualSliderSection"

const LifestyleSectionContents = memo(() => {
    const sectionData = useContext(WizardSectionContext)
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
        },
        [sectionData]
    )

    return (
        <div className="flex flex-col items-stretch gap-2">
            <GradualSliderSection
                title="Уровень активности"
                subtext={"Выберите свой обычный уровень активности, где "}
                onChange={onActivityLevelChangeFn}
            />
            <GradualSliderSection
                title="Уровень стресса"
                subtext={"Выберите свой обычный уровень стресса, где"}
                onChange={onStressLevelChangeFn}
            />
            <textarea
                className="rounded-lg drop-shadow-2xl bg-white min-h-36 p-4 text-sm"
                placeholder="Например: хожу в тренажерный зал, 3 тренировки в неделю, тренировка длится час, во время тренировки бегаю на дорожке.&#10;&#10;Если физической активности нет, оставьте поле пустым."
                autocomplete="off"
                autocapitalize="sentences"
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
