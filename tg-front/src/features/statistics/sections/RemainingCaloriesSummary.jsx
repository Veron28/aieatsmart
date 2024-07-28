import { memo } from "react"
import PaperSection from "@shared/ui/PaperSection"
import { twMerge } from "tailwind-merge"

export default memo(({ caloriesConsumptionData, className }) => {
    const { current, total } = caloriesConsumptionData
    let remaining = total - current
    if (isNaN(remaining)) {
        remaining = "Нет данных"
    }

    const oneAngle = total / 360
    const remainingAngles = Math.trunc(remaining / oneAngle)

    return (
        <PaperSection className={twMerge("w-full flex items-center justify-between", className)}>
            <div className="flex flex-col items-start gap-3 text-[--theme_subtitle_text_color]">
                <p className="font-medium text-[--theme_text_color]">{remaining}</p>
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
