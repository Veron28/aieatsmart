import InputFieldLayout from "../components/InputFieldLayout"
import WeightSelectorInput from "../components/WeightSelectorInput"
import HeightSelectorInput from "../components/HeightSelectorInput"

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
            <InputFieldLayout fieldName="Рост" inputControl={<HeightSelectorInput />} />
            <InputFieldLayout fieldName="Возраст" />
        </div>
    )
}

export default BasicsSection
