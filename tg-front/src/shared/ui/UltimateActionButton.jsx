import { memo } from "react"
import { twMerge } from "tailwind-merge"

export default memo(({ text, progress, validationErrorMessage, icon, onClick }) => {
    const currentStage = progress?.currentStage ?? 0
    const finalStage = progress?.totalStages ?? 0
    const completePercentage =
        finalStage <= 0 ? 100 : currentStage === finalStage ? 100 : Math.round(100 * (currentStage / finalStage))

    return (
        <button
            className={twMerge(
                "inline-grid rounded-lg overflow-clip grid-cols-[1fr] grid-rows-[1fr]",
                "*:col-span-full *:row-span-full"
            )}
            onClick={onClick}
        >
            {validationErrorMessage ? (
                <span className="grow bg-[--theme_destructive_bg_color]" />
            ) : (
                <span className="flex items-stretch">
                    <span
                        className="bg-[--theme_button_color] transition-[width]"
                        style={{
                            width: `${completePercentage}%`,
                        }}
                    />
                    <span className="grow transition-[width] bg-[--theme_accent_progress_color]" />
                </span>
            )}

            <div
                className={twMerge(
                    "flex p-4 gap-4 items-center justify-between transition-colors",
                    validationErrorMessage
                        ? "text-[--theme_destructive_text_color]"
                        : "text-[--theme_button_text_color]"
                )}
            >
                {icon ? <span /> : null}
                <span className="basis-0 grow font-medium">{validationErrorMessage ?? text}</span>
                {icon}
            </div>
        </button>
    )
})
