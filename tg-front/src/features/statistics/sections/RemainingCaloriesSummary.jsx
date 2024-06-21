import PaperSection from "@/components/PaperSection"

const RemainingCaloriesSummary = ({ caloriesConsumptionData, style: styleProps }) => {
    const { current, total } = caloriesConsumptionData
    const remaining = total - current

    const oneAngle = total / 360
    const remainingAngles = Math.trunc(remaining / oneAngle)

    return (
        <PaperSection
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                boxSizing: "border-box",
                justifyContent: "space-between",
                ...styleProps,
            }}
        >
            <p
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: ".7em",
                    color: "var(--theme_subtitle_text_color)",
                }}
            >
                <p>
                    <span
                        style={{
                            fontWeight: 500,
                            color: "var(--theme_text_color)",
                        }}
                    >
                        {remaining}
                    </span>
                </p>
                <p>Осталось</p>
            </p>

            <span
                style={{
                    width: "2.5em",
                    height: "2.5em",
                    aspectRatio: "1/1",
                    borderRadius: "50%",
                    background: `conic-gradient(
                        var(--theme_accent_light_color) 0deg,
                        var(--theme_accent_light_color) ${remainingAngles}deg,
                        var(--theme_accent_color) ${remainingAngles}deg,
                        var(--theme_accent_color) 0deg
                    )`,
                }}
            ></span>
        </PaperSection>
    )
}

export default RemainingCaloriesSummary
