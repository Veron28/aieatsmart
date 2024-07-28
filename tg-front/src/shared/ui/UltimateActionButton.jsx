import { memo } from "react"
import { twMerge } from "tailwind-merge"

import { LayerStackLayout } from "@shared/ui/LayerStackLayout"

export default memo(({ text, progress, validationErrorMessage, icon, onClick }) => {
    const currentStage = progress?.currentStage ?? 0
    const finalStage = progress?.totalStages ?? 0
    const completionPercentage = Math.max(
        0,
        Math.min(
            100,
            finalStage <= 0 || currentStage === finalStage ? 100 : Math.round((currentStage * 100.0) / finalStage)
        )
    )

    return (
        <button className="grid rounded-lg overflow-hidden" onClick={onClick}>
            <LayerStackLayout className="size-full">
                {validationErrorMessage ? (
                    <span className="size-full bg-[--theme_destructive_bg_color]" />
                ) : (
                    <span className="size-full flex items-stretch">
                        <span
                            className={twMerge("bg-[--theme_button_color] transition-[width]")}
                            style={{
                                width: `${completionPercentage}%`,
                            }}
                        />
                        <span className="grow bg-[--theme_accent_progress_color]" />
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
            </LayerStackLayout>
        </button>
    )
})
