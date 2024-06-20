import PaperSection from "@/components/PaperSection"

const RemainingCaloriesSummary = ({ caloriesConsumptionData, style: styleProps }) => {
    const { current, total } = caloriesConsumptionData
    const remaining = total - current

    return (
        <PaperSection
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
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
        </PaperSection>
    )
}

export default RemainingCaloriesSummary
