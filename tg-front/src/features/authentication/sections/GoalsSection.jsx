import InputFieldLayout from "../components/InputFieldLayout"

const GoalsSection = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
            }}
        >
            <InputFieldLayout fieldName="Набор массы" />
            <InputFieldLayout fieldName="Снижение веса" />
            <InputFieldLayout fieldName="Поддержание текущего веса" />
            <InputFieldLayout fieldName="Улучшение здоровья" />
            <InputFieldLayout fieldName="Улучшение спортивных результатов" />
        </div>
    )
}

export default GoalsSection
