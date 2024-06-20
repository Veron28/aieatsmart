import SectionHeading from "../../../components/SectionHeading"
import PCFConsumptionSummary from "../sections/PCFConsumptionSummary"

const StatisticsPage = () => {
    return (
        <section
            className="page"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "14px",
            }}
        >
            <SectionHeading title="Статистика" subtitle="За сегодня" />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                }}
            >
                <PCFConsumptionSummary
                    style={{
                        gridColumnStart: "span 2",
                    }}
                />
            </div>
        </section>
    )
}

export default StatisticsPage
