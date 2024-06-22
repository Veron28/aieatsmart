import InputFieldLayout from "../components/InputFieldLayout"
import WeightSelectorInput from "../components/WeightSelectorInput"
import HeightSelectorInput from "../components/HeightSelectorInput"
import GenderSelectorInput from "../components/GenderSelectorInput"
import AgeSelectorInput from "../components/AgeSelectorInput"

const BasicsSection = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
            }}
        >
            <InputFieldLayout fieldName="Пол" inputControl={<GenderSelectorInput />} />
            <InputFieldLayout fieldName="Вес" inputControl={<WeightSelectorInput />} />
            <InputFieldLayout fieldName="Рост" inputControl={<HeightSelectorInput />} />
            <InputFieldLayout fieldName="Возраст" inputControl={<AgeSelectorInput />} />
        </div>
    )
}

export default BasicsSection
