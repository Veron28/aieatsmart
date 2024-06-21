import { useState } from "react"
import PaperSection from "@/components/PaperSection"

const SliderInputLayout = ({ title, subtitle, initialValue, minValue, maxValue, classifierFn, onChange }) => {
    const [currentValue, setCurrentValue] = useState(initialValue ?? minValue)

    return (
        <PaperSection>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                    fontSize: ".875em",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1em",
                    }}
                >
                    <span style={{ fontWeight: 500, color: "var(--theme_text_color)" }}>{title}</span>
                    <span style={{ color: "var(--theme_accent_color)" }}>{classifierFn?.(currentValue)}</span>
                </div>
                <span>Slider be here....</span>
                <p style={{ color: "var(--theme_subtitle_text_color)" }}>{subtitle}</p>
            </div>
        </PaperSection>
    )
}

export default SliderInputLayout
