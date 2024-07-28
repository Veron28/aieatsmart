import { forwardRef, useCallback, useState } from "react"
import PaperSection from "@shared/ui/PaperSection"
import SimpleButton from "@shared/ui/SimpleButton"
import RadioButtonItems from "@shared/ui/inputs/RadioButtonItems"

export default forwardRef((props, ref) => {
    const { title, subtitle, selectedOption, options, onValueSelected } = props
    const [currentGender, setSelectedGender] = useState(selectedOption)
    const onClose = useCallback(() => {
        ref?.current?.close()
    }, [ref])
    const onOKClick = useCallback(() => {
        onValueSelected?.(currentGender)
        onClose()
    }, [currentGender, onValueSelected, onClose])

    return (
        <dialog ref={ref} className="w-full">
            <PaperSection className="flex flex-col items-center">
                <h1 className="text-4xl font-bold">{title}</h1>
                <span className="text-[--theme_subtitle_text_color] text-sm mt-1 mb-4">{subtitle}</span>

                <span className="w-full grid gap-1 text-[--theme_text_color]">
                    <RadioButtonItems options={options} onSelectionChange={setSelectedGender} />
                </span>

                <div className="w-full grid grid-flow-col gap-2 mt-4">
                    <SimpleButton text="Отмена" plain onClick={onClose} />
                    <SimpleButton text="ОК" onClick={onOKClick} />
                </div>
            </PaperSection>
        </dialog>
    )
})
