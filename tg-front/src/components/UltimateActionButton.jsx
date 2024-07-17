import { memo } from "react"

export default memo(({ text, progress, icon, onClick }) => {
    const currentStage = progress?.currentStage ?? 0
    const finalStage = progress?.totalStages ?? 0
    const completePercentage =
        finalStage <= 0 ? 0 : currentStage === finalStage ? 100 : Math.round(100 * (currentStage / finalStage))

    return (
        <button
            className="inline-grid rounded-lg overflow-clip grid-cols-[1fr] grid-rows-[1fr] *:col-span-full *:row-span-full"
            onClick={onClick}
            style={{
                color: "var(--theme_button_text_color)",
            }}
        >
            <span className="flex items-stretch">
                <span
                    className="bg-[--theme_button_color] transition-[width]"
                    style={{
                        width: `${completePercentage}%`,
                    }}
                />
                <span className="grow transition-[width] bg-[--theme_accent_progress_color]" />
            </span>

            <div className="flex p-4 gap-4 items-center justify-between">
                {icon ? <span /> : null}
                <span className="basis-0 grow font-medium">{text}</span>
                {icon}
            </div>
        </button>
    )
})
