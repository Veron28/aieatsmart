import PaperSection from "@shared/ui/PaperSection"
import PCFBreakdown from "../widgets/PCFBreakdown"
import PCFChart from "../widgets/PCFChart"

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
