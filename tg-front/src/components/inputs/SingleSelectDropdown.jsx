import { memo } from "react"

const SingleSelectDropdown = ({ unselectedTitle, selectedValue, values, onSelectionChange }) => {
    const optionItems = values.map((value) => (
        <option key={value} value={value}>
            {value}
        </option>
    ))

    return <select defaultValue={selectedValue} onChange={onSelectionChange}>{optionItems}</select>
}

export default memo(SingleSelectDropdown)
