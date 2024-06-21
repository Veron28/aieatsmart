import { memo } from "react"

const SingleSelectDropdown = ({ unselectedTitle, selectedValue, values, onSelectionChange }) => {
    const optionItems = values.map((value) => (
        <option key={value} value={value} selected={selectedValue === value}>
            {value}
        </option>
    ))

    return <select onChange={onSelectionChange}>{optionItems}</select>
}

export default memo(SingleSelectDropdown)
