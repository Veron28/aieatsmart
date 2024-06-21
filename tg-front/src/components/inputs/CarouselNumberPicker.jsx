import React from "react"
import { NumberPickerItem } from "./NumberPickerItem"

const EmblaCarousel = ({ unit, subUnit }) => {
    const { name, minValue, maxValue, onChange } = unit

    let subUnitSlide = null
    if (subUnit) {
        const { name, minValue, maxValue, onChange } = subUnit
        subUnitSlide = (
            <NumberPickerItem
                minValue={minValue}
                slideCount={maxValue - minValue}
                perspective="right"
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
                slideCount={maxValue - minValue}
                perspective={subUnit ? "left" : undefined}
                loop={true}
                label={name}
                onChange={onChange}
            />
            {subUnitSlide}
        </div>
    )
}

export default EmblaCarousel
