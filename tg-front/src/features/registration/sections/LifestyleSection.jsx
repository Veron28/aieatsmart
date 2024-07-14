import GradualSliderSection from "../components/GradualSliderSection"

const GRADE_DESCRIPTIONS = [
    "Минимальный",
    "Небольшой",
    "Умеренный",
    "Больше среднего",
    "Максимальный",
]

const activityLevelSubtext = (
    <span
        style={{
            display: "content",
        }}
    >
        Выберите свой обычный уровень активности, где{" "}
        <span style={{ color: "var(--theme_accent_color)" }}>
            1 - {GRADE_DESCRIPTIONS[0].toLowerCase()}
        </span>, а 5 - {GRADE_DESCRIPTIONS[GRADE_DESCRIPTIONS.length - 1].toLowerCase()}
    </span>
)

const stressLevelSubtext = (
    <span
        style={{
            display: "content",
        }}
    >
        Выберите свой обычный уровень стресса, где{" "}
        <span style={{ color: "var(--theme_accent_color)" }}>
            1 - {GRADE_DESCRIPTIONS[0].toLowerCase()}
        </span>, а 5 - {GRADE_DESCRIPTIONS[GRADE_DESCRIPTIONS.length - 1].toLowerCase()}
    </span>
)

const gradeClassifier = (currentGrade) => {
    return GRADE_DESCRIPTIONS[Math.floor(currentGrade) - 1]
}

export default () => {
    const onActivityLevelChangeFn = (newValue) => {
        const sectionData = useContext(WizardSectionContext)
        sectionData.activity_level = newValue
    }

    const onStressLevelChangeFn = (newValue) => {
        const sectionData = useContext(WizardSectionContext)
        sectionData.stress_level = newValue
    }

    return (
        <div className="grid gap-2">
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
        </div>
    )
}
