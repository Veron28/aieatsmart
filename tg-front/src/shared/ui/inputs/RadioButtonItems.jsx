import { useCallback, useState } from "react"

import InputFieldLayout from "@shared/ui/inputs/InputFieldLayout"
import CheckboxSelectorInput from "@shared/ui/inputs/CheckboxSelectorInput"

const getRadioButton = (thisValue, currentSelection, updateSelection) => {
    const onChangeFn = useCallback(
        (thisItemGotSelected) => {
            if (thisItemGotSelected) {
                updateSelection(thisValue)
            }
        },
        [currentSelection, thisValue, updateSelection]
    )
    const thisItemIsSelected = currentSelection === thisValue
    return <CheckboxSelectorInput isSelected={thisItemIsSelected} onChange={onChangeFn} />
}

const RadioButtonItems = ({ options, onSelectionChange }) => {
    // We use this state to trigger whole section's rerender
    // This rerender is necessary, so all checkboxes refresh. Only one can be selected.
    const [selection, setSelection] = useState("")
    const onChange = useCallback(
        (newSelection) => {
            setSelection(newSelection)
            onSelectionChange?.(newSelection)
        },
        [onSelectionChange]
    )

    const inputs = options.map(({ name, icon }) => (
        <InputFieldLayout
            key={name}
            fieldIcon={icon}
            fieldName={name}
            inputControl={getRadioButton(name, selection, onChange)}
        />
    ))

    return <>{inputs}</>
}

export default RadioButtonItems
