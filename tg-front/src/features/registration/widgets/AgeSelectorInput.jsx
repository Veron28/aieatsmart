import { useCallback, useContext, useState, useRef } from "react"
import { RiArrowDownSFill as ArrowDownIcon } from "@remixicon/react"
import NumberSelectorDialog from "@shared/ui/inputs/NumberSelectorDialog"
import { WizardSectionContext } from "./WizardSectionContext"
import { twMerge } from "tailwind-merge"

const unit = {
    name: "год",
    minValue: 0,
    maxValue: 120,
}

const AgeSelectorInput = () => {
    const [selectedAge, setSelectedAge] = useState(undefined)
    const dialogRef = useRef(null)
    const currentSectionData = useContext(WizardSectionContext)

    const openDialogFn = useCallback(() => {
        dialogRef.current?.showModal()
    }, [dialogRef])

    const onValueSelected = useCallback(
        (newAgeYears) => {
            setSelectedAge(newAgeYears)
            currentSectionData.age = newAgeYears
        },
        [setSelectedAge, currentSectionData]
    )

    return (
        <>
            <NumberSelectorDialog
                ref={dialogRef}
                title="Ваш возраст"
                unitSectionText="Сколько Вам полных лет"
                unit={unit}
                onValueSelected={onValueSelected}
            />
            <button
                className={twMerge(
                    "flex items-center gap-1 border-none bg-transparent cursor-pointer text-sm",
                    selectedAge ? "text-[--theme_link_color]" : "text-[--theme_text_hint_color]"
                )}
                onClick={openDialogFn}
            >
                {selectedAge ? `${selectedAge} лет` : "Выберите возраст"} <ArrowDownIcon />
            </button>
        </>
    )
}

export default AgeSelectorInput
