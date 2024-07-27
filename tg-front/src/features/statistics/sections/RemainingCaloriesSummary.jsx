import { memo } from "react"
import PaperSection from "@shared/ui/PaperSection"

export default memo(({ caloriesConsumptionData, style: styleProps }) => {
    const { current, total } = caloriesConsumptionData
    let remaining = total - current
    if (isNaN(remaining)) {
        remaining = "Нет данных"
    }

    const oneAngle = total / 360
    const remainingAngles = Math.trunc(remaining / oneAngle)

    return (
        <PaperSection
            className="w-full flex items-center justify-between"
            style={{
                ...styleProps,
            }}
        >
            <div
                className="flex flex-col items-start"
                style={{
                    gap: ".7em",
                    color: "var(--theme_subtitle_text_color)",
                }}
            >
                <p
                    className="font-medium"
                    style={{
                        color: "var(--theme_text_color)",
                    }}
                >
                    {remaining}
                </p>
                <p>Осталось</p>
            </div>

            {remainingAngles ? (
                <figure
                    className="size-5 aspect-square rounded-full"
                    style={{
                        background: `conic-gradient(
                        var(--theme_accent_light_color) 0deg,
                        var(--theme_accent_light_color) ${remainingAngles}deg,
                        var(--theme_accent_color) ${remainingAngles}deg,
                        var(--theme_accent_color) 0deg
                    )`,
                    }}
                />
            ) : null}
        </PaperSection>
    )
})
