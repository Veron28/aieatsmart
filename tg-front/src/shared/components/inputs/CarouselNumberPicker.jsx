import React from "react"
import { LayerStackLayout } from "../LayerStackLayout"

import { NumberPickerItem } from "./NumberPickerItem"
import { twMerge } from "tailwind-merge"

const emblaLabelClasses = "font-bold noselect text-[--theme_accent_color] text-2xl"

const GrayColorLens = ({ children }) => {
    return (
        <LayerStackLayout className="min-w-24 h-full justify-center">
            {children}
            <div className="size-full grid grid-rows-[1fr_72px_1fr] noselect">
                <span className="grayscale backdrop-grayscale border-b border-[--theme_section_separator_color]"></span>
                <span></span>
                <span className="grayscale backdrop-grayscale border-t border-[--theme_section_separator_color]"></span>
            </div>
        </LayerStackLayout>
    )
}

const EmblaCarousel = ({ unit, subUnit, divider: dividerContent }) => {
    const { minValue, maxValue, onChange } = unit

    let subUnitSlide = null
    if (subUnit) {
        const { minValue, maxValue, onChange } = subUnit
        subUnitSlide = (
            <NumberPickerItem
                loop
                minValue={minValue}
                maxValue={maxValue}
                onChange={(newSubvalue) => {
                    onChange?.(newSubvalue)
                }}
            />
        )
    }

    return (
        <div className="relative flex items-center justify-center gap-2 w-fit max-w-full mx-auto h-96">
            <GrayColorLens>
                <NumberPickerItem loop minValue={minValue} maxValue={maxValue} onChange={onChange} />
            </GrayColorLens>
            {subUnitSlide ? <span className={emblaLabelClasses}>{dividerContent}</span> : null}
            {subUnitSlide ? <GrayColorLens>{subUnitSlide}</GrayColorLens> : null}
            <span className={emblaLabelClasses}>{subUnit?.name ?? unit.name}</span>
        </div>
    )
}

export default EmblaCarousel
