import { useCallback, useContext, useState, useRef } from "react"
import { RiArrowDownSFill as ArrowDownIcon } from "@remixicon/react"
import NumberSelectorDialog from "@/components/inputs/NumberSelectorDialog"
import { WizardSectionContext } from "./WizardSectionContext"

const unit = {
    title: "М",
    minValue: 40,
    maxValue: 280,
}

const subUnit = {
    title: "см",
    minValue: 0,
    maxValue: 99,
}

const WeightSelectorInput = () => {
    const [selectedHeight, setSelectedHeight] = useState(undefined)
    const dialogRef = useRef(null)

    const openDialogFn = useCallback(() => {
        dialogRef.current?.showModal()
    }, [dialogRef])

    const onValueSelected = useCallback(
        (newHeight) => {
            setSelectedHeight(newHeight)
            const currentSectionData = useContext(WizardSectionContext)
            currentSectionData.height = newHeight
        },
        [setSelectedHeight]
    )

    return (
        <>
            <NumberSelectorDialog
                ref={dialogRef}
                title="Ваш рост"
                unitSectionText="Сантиметры"
                unit={unit}
                subUnit={subUnit}
                onValueSelected={onValueSelected}
            />
            <button
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".25em",
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: ".875em",
                    cursor: "pointer",
                    color: selectedHeight ? "var(--theme_link_color)" : "var(--theme_text_hint_color)",
                }}
                onClick={openDialogFn}
            >
                {selectedHeight ? `${selectedHeight} см` : "Выберите рост"} <ArrowDownIcon />
            </button>
        </>
    )
}

export default WeightSelectorInput
