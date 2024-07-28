import { useCallback, useMemo, useState } from "react"
import { twMerge } from "tailwind-merge"
import PaperSection from "@shared/ui/PaperSection"
import { GradualSliderInput } from "@shared/ui/inputs/GradualSliderInput"

const GRADE_DESCRIPTIONS = ["Минимальный", "Небольшой", "Умеренный", "Больше среднего", "Максимальный"]

const gradeClassifier = (currentGrade) => {
    return GRADE_DESCRIPTIONS[Math.floor(currentGrade) - 1]
}

const sublevelTextPattern = (sublevelText, currentValue) => (
    <span className="contents">
        {sublevelText + " "}
        <span
            className={twMerge(
                "transition-colors",
                currentValue === 1 ? "text-[--theme_link_color]" : "text-[--theme_subtitle_text_color]"
            )}
        >
            1 - {gradeClassifier(1).toLowerCase()}
        </span>
        , а{" "}
        <span
            className={twMerge(
                "transition-colors",
                currentValue === 5 ? "text-[--theme_link_color]" : "text-[--theme_subtitle_text_color]"
            )}
        >
            5 - {gradeClassifier(5).toLowerCase()}
        </span>
    </span>
)

export default ({ title, subtext, initialValue, onChange }) => {
    const [currentValue, setCurrentValue] = useState(initialValue ?? 1)
    const valueChangeObserver = useCallback((newValue) => {
        const postProcessedValue = Math.floor(newValue)
        setCurrentValue(postProcessedValue)
        onChange(postProcessedValue)
    }, [setCurrentValue, onChange])
    const subtitle = useMemo(() => sublevelTextPattern(subtext, currentValue), [subtext, currentValue])

    return (
        <PaperSection>
            <div className="flex flex-col gap-6 text-sm">
                <div className="flex justify-between gap-4">
                    <span className="text-[--theme_text_color] font-medium">{title}</span>
                    <span className="text-[--theme_accent_color]">{gradeClassifier(currentValue)}</span>
                </div>
                <GradualSliderInput grades={5} onChange={valueChangeObserver} />
                <p className="text-[--theme_subtitle_text_color]">{subtitle}</p>
            </div>
        </PaperSection>
    )
}