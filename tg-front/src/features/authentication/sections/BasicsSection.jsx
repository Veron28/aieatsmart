import InputFieldLayout from "../components/InputFieldLayout"
import WeightSelectorInput from "../components/WeightSelectorInput"

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
            <InputFieldLayout fieldName="Вес" inputControl={<WeightSelectorInput />} />
            <InputFieldLayout fieldName="Рост" />
            <InputFieldLayout fieldName="Возраст" />
        </div>
    )
}

export default BasicsSection
