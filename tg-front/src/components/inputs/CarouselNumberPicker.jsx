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
            {subUnitSlide && (
                <span
                    className="embla__ios-picker__label"
                    style={{
                        display: "contents",
                        fontSize: "1.8em",
                    }}
                >
                    {dividerContent}
                </span>
            )}
            {subUnitSlide}
        </div>
    )
}

export default EmblaCarousel
