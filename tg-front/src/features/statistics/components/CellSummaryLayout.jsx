import { RiCakeFill as CakeIcon } from "@remixicon/react"

import PaperSection from "../../../components/PaperSection"

const CellSummaryLayout = ({ dataToDisplay }) => {
    const { icon, emphasis, remainingSummary, actionDescription } = dataToDisplay
    return (
        <PaperSection
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "end",
                gap: "1.5em",
            }}
        >
            <span
                style={{
                    boxSizing: "border-box",
                    width: "3.25em",
                    height: "3.25em",
                    padding: "1em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    aspectRatio: "1/1",
                    backgroundColor: "var(--theme_button_color)",
                    color: "var(--theme_accent_light_color)",
                }}
            >
                {icon}
            </span>

            <p
                style={{
                    fontSize: ".825em",
                    color: "var(--theme_subtitle_text_color)",
                }}
            >
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
                    {remainingSummary}
                </p>
                <p
                    style={{
                        marginTop: ".4em",
                    }}
                >
                    {actionDescription}
                </p>
            </p>
        </PaperSection>
    )
}

export default CellSummaryLayout
