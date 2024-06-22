import { useContext } from "react"

import SliderInputLayout from "./SliderInputLayout"
import { WizardSectionContext } from "./WizardSectionContext"

const subtext = (
    <span
        style={{
            display: "content",
        }}
    >
        Выберите свой обычный уровень стресса, где{" "}
        <span style={{ color: "var(--theme_accent_color)" }}>1 - минимальный</span>, а 5 - максимальный
    </span>
)

const StressSelectorInput = () => {
    const onChangeFn = (newValue) => {
        const sectionData = useContext(WizardSectionContext)
        sectionData.stress_level = newValue
    }

    return <SliderInputLayout title="Уровень стресса" minValue={1} maxValue={5} subtitle={subtext} onChange={onChangeFn} />
}

export default StressSelectorInput
