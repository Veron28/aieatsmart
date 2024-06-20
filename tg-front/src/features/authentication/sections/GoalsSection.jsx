import InputFieldLayout from "../components/InputFieldLayout"
import WeightGainIcon from "../../../assets/up.svg"
import WeightLossIcon from "../../../assets/up2.svg"
import WeightMaintenanceIcon from "../../../assets/icon2.svg"
import HealthImprovementIcon from "../../../assets/heart.svg"
import SportResultsIcon from "../../../assets/run.svg"

const GoalsSection = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
            }}
        >
            <InputFieldLayout fieldIcon={WeightGainIcon} fieldName="Набор массы" />
            <InputFieldLayout fieldIcon={WeightLossIcon} fieldName="Снижение веса" />
            <InputFieldLayout fieldIcon={WeightMaintenanceIcon} fieldName="Поддержание текущего веса" />
            <InputFieldLayout fieldIcon={HealthImprovementIcon} fieldName="Улучшение здоровья" />
            <InputFieldLayout fieldIcon={SportResultsIcon} fieldName="Улучшение спортивных результатов" />
        </div>
    )
}

export default GoalsSection
