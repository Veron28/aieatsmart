import PaperSection from "@shared/ui/PaperSection"

export default ({ dataToDisplay }) => {
    const { icon, emphasis, remainingSummary, actionDescription } = dataToDisplay

    const cellContents =
        emphasis && remainingSummary ? (
            <p>
                <span className="font-medium text-base text-[--theme_text_color]">{emphasis}</span>{" "}
                <span className="contents text-xs">{remainingSummary}</span>
            </p>
        ) : (
            <p>Нет данных</p>
        )

    return (
        <PaperSection className="flex flex-col items-start justify-end gap-6">
            <span
                className={`size-14 p-4 flex justify-center rounded-full aspect-square
                bg-[--theme_button_color] text-[--theme_accent_light_color]`}
            >
                {icon}
            </span>

            <div className="text-[--theme_subtitle_text_color]">
                {cellContents}
                <p className="contents text-sm mt-2">{actionDescription}</p>
            </div>
        </PaperSection>
    )
}
