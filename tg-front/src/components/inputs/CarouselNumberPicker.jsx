import React from "react"
import { NumberPickerItem } from "./NumberPickerItem"

const emblaLabelClasses = "font-bold pointer-events-none text-[--theme_accent_color] text-2xl"

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
        <div className="relative flex items-center justify-center gap-2 w-fit max-w-full mx-auto h-96">
            <NumberPickerItem
                loop
                minValue={minValue}
                maxValue={maxValue}
                onChange={onChange}
            />
            {subUnitSlide ? <span className={emblaLabelClasses}>{dividerContent}</span> : null}
            {subUnitSlide}
            <span className={emblaLabelClasses}>{subUnit?.name ?? unit.name}</span>
        </div>
    )
}

export default EmblaCarousel
