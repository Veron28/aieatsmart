import InputFieldLayout from "../components/InputFieldLayout"

const BasicsSection = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
            }}
        >
            <InputFieldLayout fieldName="Пол" />
            <InputFieldLayout fieldName="Вес" />
            <InputFieldLayout fieldName="Рост" />
            <InputFieldLayout fieldName="Возраст" />
        </div>
    )
}

export default BasicsSection
