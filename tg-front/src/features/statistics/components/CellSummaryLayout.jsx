import PaperSection from "@shared/components/PaperSection"

export default ({ dataToDisplay }) => {
    const { icon, emphasis, remainingSummary, actionDescription } = dataToDisplay

    const cellContents =
        emphasis && remainingSummary ? (
            <p>
                <span
                    style={{
                        fontSize: "1em",
                        color: "var(--theme_text_color)",
                        fontWeight: 500,
                    }}
                >
                    {emphasis}
                </span>{" "}
                <span
                    style={{
                        display: "contents",
                        fontSize: ".825em",
                    }}
                >
                    {remainingSummary}
                </span>
            </p>
        ) : (
            <p>Нет данных</p>
        )

    return (
        <PaperSection className="flex flex-col items-start justify-end gap-6">
            <span
                className="p-4 flex justify-center rounded-full aspect-square"
                style={{
                    width: "3.25em",
                    height: "3.25em",
                    backgroundColor: "var(--theme_button_color)",
                    color: "var(--theme_accent_light_color)",
                }}
            >
                {icon}
            </span>

            <div
                style={{
                    color: "var(--theme_subtitle_text_color)",
                }}
            >
                {cellContents}
                <p
                    style={{
                        display: "contents",
                        fontSize: ".825em",
                        marginTop: ".4em",
                    }}
                >
                    {actionDescription}
                </p>
            </div>
        </PaperSection>
    )
}
