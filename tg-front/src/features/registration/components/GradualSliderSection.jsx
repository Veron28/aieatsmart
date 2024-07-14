import { useState } from "react"
import PaperSection from "@/components/PaperSection"
import GradualSliderInput from "@/components/inputs/GradualSliderInput"

export default ({ title, subtitle, initialValue, minValue = 1, maxValue = 5, classifierFn, onChange }) => {
    const [currentValue, setCurrentValue] = useState(initialValue ?? minValue)

    return (
        <PaperSection>
            <div className="flex flex-col gap-6 text-sm">
                <div className="flex justify-between gap-4">
                    <span style={{ fontWeight: 500, color: "var(--theme_text_color)" }}>{title}</span>
                    <span style={{ color: "var(--theme_accent_color)" }}>{classifierFn?.(currentValue)}</span>
                </div>
                <GradualSliderInput grades={5} onChange={onChange} />
                <p style={{ color: "var(--theme_subtitle_text_color)" }}>{subtitle}</p>
            </div>
        </PaperSection>
    )
}
