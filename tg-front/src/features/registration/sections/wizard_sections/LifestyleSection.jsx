import { memo } from "react"
import { RiMentalHealthFill } from "@remixicon/react"

import { storeUserLifestyleData } from "@/features/registration/api/RegistrationApi"
import GradualSliderSection from "@/features/registration/components/GradualSliderSection"

const GRADE_DESCRIPTIONS = ["Минимальный", "Небольшой", "Умеренный", "Больше среднего", "Максимальный"]

const activityLevelSubtext = (
    <span
        style={{
            display: "content",
        }}
    >
        Выберите свой обычный уровень активности, где{" "}
        <span style={{ color: "var(--theme_accent_color)" }}>1 - {GRADE_DESCRIPTIONS[0].toLowerCase()}</span>, а 5 -{" "}
        {GRADE_DESCRIPTIONS[GRADE_DESCRIPTIONS.length - 1].toLowerCase()}
    </span>
)

const stressLevelSubtext = (
    <span
        style={{
            display: "content",
        }}
    >
        Выберите свой обычный уровень стресса, где{" "}
        <span style={{ color: "var(--theme_accent_color)" }}>1 - {GRADE_DESCRIPTIONS[0].toLowerCase()}</span>, а 5 -{" "}
        {GRADE_DESCRIPTIONS[GRADE_DESCRIPTIONS.length - 1].toLowerCase()}
    </span>
)

const gradeClassifier = (currentGrade) => {
    return GRADE_DESCRIPTIONS[Math.floor(currentGrade) - 1]
}

const LifestyleSectionContents = memo(() => {
    const onActivityLevelChangeFn = (newValue) => {
        const sectionData = useContext(WizardSectionContext)
        sectionData.activity_level = newValue
    }

    const onStressLevelChangeFn = (newValue) => {
        const sectionData = useContext(WizardSectionContext)
        sectionData.stress_level = newValue
    }

    return (
        <div className="flex flex-col items-stretch gap-2">
            <GradualSliderSection
                title="Уровень активности"
                subtitle={activityLevelSubtext}
                classifierFn={gradeClassifier}
                onChange={onActivityLevelChangeFn}
            />
            <GradualSliderSection
                title="Уровень стресса"
                subtitle={stressLevelSubtext}
                classifierFn={gradeClassifier}
                onChange={onStressLevelChangeFn}
            />
            <textarea
                className="rounded-lg drop-shadow-2xl bg-white min-h-36 p-4 text-sm"
                placeholder="Например: хожу в тренажерный зал, 3 тренировки в неделю, тренировка длится час, во время тренировки бегаю на дорожке.&#10;&#10;Если физической активности нет, оставьте поле пустым."
                autocomplete="off"
                autocapitalize="sentences"
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
