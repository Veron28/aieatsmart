import PaperSection from "@/components/PaperSection"
import PCFBreakdown from "../components/PCFBreakdown"
import PCFChart from "../components/PCFChart"

const PCFConsumptionSummary = ({ pcfConsumptionData, style: styleProps }) => {
    return (
        <PaperSection
            style={{
                display: "flex",
                gap: "1.25em",
                ...styleProps,
            }}
        >
            <PCFChart pcfConsumption={pcfConsumptionData} />
            <PCFBreakdown pcfConsumption={pcfConsumptionData} />
        </PaperSection>
    )
}

export default PCFConsumptionSummary
