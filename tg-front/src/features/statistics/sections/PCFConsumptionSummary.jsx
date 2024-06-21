import PaperSection from "@/components/PaperSection"
import PCFBreakdown from "../components/PCFBreakdown"
import PCFChart from "../components/PCFChart"

const getPCFConsumptionData = () => [
    {
        name: "Жиры",
        calories: 319,
        gramms: 140,
        color: "var(--theme_color_pcf_fats)",
    },
    {
        name: "Углеводы",
        calories: 425,
        gramms: 210,
        color: "var(--theme_color_pcf_carbons)",
    },
    {
        name: "Белки",
        calories: 920,
        gramms: 1870,
        color: "var(--theme_color_pcf_proteins)",
    },
]

const PCFConsumptionSummary = ({ style: styleProps }) => {
    const pcfConsumptionData = getPCFConsumptionData()

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
