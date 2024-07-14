import { memo } from "react"
import InputFieldLayout from "@/components/inputs/InputFieldLayout"

import WeightSelectorInput from "../components/WeightSelectorInput"
import HeightSelectorInput from "../components/HeightSelectorInput"
import GenderSelectorInput from "../components/GenderSelectorInput"
import AgeSelectorInput from "../components/AgeSelectorInput"

const BasicsSection = () => {
    return (
        <div className="grid gap-2">
            <InputFieldLayout fieldName="Пол" inputControl={<GenderSelectorInput />} />
            <InputFieldLayout fieldName="Вес" inputControl={<WeightSelectorInput />} />
            <InputFieldLayout fieldName="Рост" inputControl={<HeightSelectorInput />} />
            <InputFieldLayout fieldName="Возраст" inputControl={<AgeSelectorInput />} />
        </div>
    )
}

export default memo(BasicsSection)
