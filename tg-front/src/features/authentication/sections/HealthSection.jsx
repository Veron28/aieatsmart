import InputFieldLayout from "../components/InputFieldLayout"

const HealthSection = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
            }}
        >
            <InputFieldLayout fieldName="Диабет" />
            <InputFieldLayout fieldName="Ожирение" />
            <InputFieldLayout fieldName="Гипертония" />
            <InputFieldLayout fieldName="Сердечные заболевания" />
            <InputFieldLayout fieldName="Аллергия" />
        </div>
    )
}

export default HealthSection
