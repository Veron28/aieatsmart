import React from "react"
import { NumberPickerItem } from "./NumberPickerItem"

const EmblaCarousel = ({ unit = { name: "something", minValue: 0, maxValue: 20 }, subUnit }) => {
    const { name, minValue, maxValue } = unit

    let subUnitSlide = null
    if (subUnit) {
        const { name, minValue, maxValue } = subUnit
        subUnitSlide = (
            <NumberPickerItem
                minValue={minValue}
                slideCount={maxValue - minValue}
                perspective="right"
                loop={true}
                label={name}
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
            />
            {subUnitSlide}
        </div>
    )
}

export default EmblaCarousel
