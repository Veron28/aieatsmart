import { RiShareFill as ShareIcon } from "@remixicon/react"

import SectionHeading from "../../../components/SectionHeading"
import UltimateActionButton from "../../../components/UltimateActionButton"
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
            <UltimateActionButton
                text="Поделиться"
                style={{
                    position: "absolute",
                    bottom: "2em",
                    left: 0,
                    right: 0,
                }}
                icon={<ShareIcon />}
            />
        </section>
    )
}

export default StatisticsPage
