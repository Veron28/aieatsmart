import React from "react"
import { NumberPickerItem } from "./NumberPickerItem"

const EmblaCarousel = ({ unit, subUnit, divider: dividerContent }) => {
    const { name, minValue, maxValue, onChange } = unit

    let subUnitSlide = null
    if (subUnit) {
        const { name, minValue, maxValue, onChange } = subUnit
        subUnitSlide = (
            <NumberPickerItem
                minValue={minValue}
                maxValue={maxValue}
                loop={true}
                label={name}
                onChange={onChange}
            />
        )
    }

    return (
        <div className="embla">
            <NumberPickerItem
                minValue={minValue}
                maxValue={maxValue}
                loop={true}
                label={name}
                onChange={onChange}
            />
            {subUnitSlide && <span className="embla__ios-picker__label">{dividerContent}</span>}
            {subUnitSlide}
            <span className="embla__ios-picker__label">{subUnit?.name ?? unit.name}</span>
        </div>
    )
}

export default EmblaCarousel
