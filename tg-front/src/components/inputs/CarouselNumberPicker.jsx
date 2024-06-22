import React from "react"
import { NumberPickerItem } from "./NumberPickerItem"

const EmblaCarousel = ({ unit, subUnit, divider: dividerContent }) => {
    const { minValue, maxValue, onChange } = unit

    let subUnitSlide = null
    if (subUnit) {
        const { minValue, maxValue, onChange } = subUnit
        subUnitSlide = (
            <NumberPickerItem
                minValue={minValue}
                maxValue={maxValue}
                loop
                onChange={(newSubvalue) => {
                    onChange?.(newSubvalue)
                }}
            />
        )
    }

    return (
        <div className="embla">
            <NumberPickerItem
                minValue={minValue}
                maxValue={maxValue}
                loop
                onChange={onChange}
            />
            {subUnitSlide && <span className="embla__ios-picker__label">{dividerContent}</span>}
            {subUnitSlide}
            <span className="embla__ios-picker__label">{subUnit?.name ?? unit.name}</span>
        </div>
    )
}

export default EmblaCarousel
