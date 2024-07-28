import PaperSection from "@shared/ui/PaperSection"
import PCFBreakdown from "../widgets/PCFBreakdown"
import PCFChart from "../widgets/PCFChart"
import { twMerge } from "tailwind-merge"

export default ({ pcfConsumptionData, className }) => {
    return (
        <PaperSection className={twMerge("flex gap-5", className)}>
            <PCFChart pcfConsumption={pcfConsumptionData} />
            <PCFBreakdown pcfConsumption={pcfConsumptionData} />
        </PaperSection>
    )
}
