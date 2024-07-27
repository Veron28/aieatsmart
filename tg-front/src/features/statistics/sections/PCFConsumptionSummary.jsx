import PaperSection from "@shared/components/PaperSection"
import PCFBreakdown from "../components/PCFBreakdown"
import PCFChart from "../components/PCFChart"

export default ({ pcfConsumptionData, style: styleProps }) => {
    return (
        <PaperSection
            className="flex gap-5"
            style={{
                ...styleProps,
            }}
        >
            <PCFChart pcfConsumption={pcfConsumptionData} />
            <PCFBreakdown pcfConsumption={pcfConsumptionData} />
        </PaperSection>
    )
}
