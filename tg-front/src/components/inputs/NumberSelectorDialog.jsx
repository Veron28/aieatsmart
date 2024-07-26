import { forwardRef, useCallback, useState } from "react"
import PaperSection from "@/components/PaperSection"
import SimpleButton from "@/components/SimpleButton"

import CarouselNumberPicker from "./CarouselNumberPicker"

const NumberSelectorDialog = forwardRef((props, ref) => {
    const { title, unitSectionText, unit, subUnit, divider, onValueSelected } = props
    const [unitValue, setUnitValue] = useState(0)
    const [subUnitValue, setSubUnitValue] = useState(0)
    const onClose = useCallback(() => {
        ref?.current?.close()
    }, [ref])
    const onOKClick = useCallback(() => {
        onValueSelected?.(unitValue, subUnitValue)
        onClose()
    }, [unitValue, subUnitValue, onValueSelected, onClose])

    return (
        <dialog className="w-full" ref={ref}>
            <PaperSection className="flex flex-col items-stretch">
                <h1 className="font-bold text-4xl">{title}</h1>
                <p className="text-[--theme_subtitle_text_color] mt-1 text-sm">{unitSectionText}</p>

                <span className="contents relative text-[--theme_text_color]">
                    <CarouselNumberPicker
                        unit={{
                            ...unit,
                            onChange: setUnitValue,
                        }}
                        divider={divider}
                        subUnit={
                            subUnit
                                ? {
                                      ...subUnit,
                                      onChange: setSubUnitValue,
                                  }
                                : undefined
                        }
                    />
                </span>

                <div className="w-full gap-2 grid grid-flow-col">
                    <SimpleButton text="Отмена" plain onClick={onClose} />
                    <SimpleButton text="ОК" onClick={onOKClick} />
                </div>
            </PaperSection>
        </dialog>
    )
})

export default NumberSelectorDialog
