import InputFieldLayout from "../components/InputFieldLayout"
import DiabetesIcon from "@/assets/icon1.svg"
import ObesityIcon from "@/assets/icon2.svg"
import HypertoniaIcon from "@/assets/icon3.svg"
import HeartDiseasesIcon from "@/assets/icon4.svg"
import AllergiesIcon from "@/assets/icon5.svg"

const HealthSection = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
            }}
        >
            <InputFieldLayout fieldIcon={DiabetesIcon} fieldName="Диабет" />
            <InputFieldLayout fieldIcon={ObesityIcon} fieldName="Ожирение" />
            <InputFieldLayout fieldIcon={HypertoniaIcon} fieldName="Гипертония" />
            <InputFieldLayout fieldIcon={HeartDiseasesIcon} fieldName="Сердечные заболевания" />
            <InputFieldLayout fieldIcon={AllergiesIcon} fieldName="Аллергия" />
        </div>
    )
}

export default HealthSection
