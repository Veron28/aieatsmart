import { useCallback, useContext, useState, useRef } from "react"
import { RiArrowDownSFill as ArrowDownIcon } from "@remixicon/react"
import NumberSelectorDialog from "@shared/ui/inputs/NumberSelectorDialog"
import { WizardSectionContext } from "./WizardSectionContext"

const unit = {
    minValue: 40,
    maxValue: 280,
}

const subUnit = {
    name: "см",
    minValue: 0,
    maxValue: 9,
}

const WeightSelectorInput = () => {
    const [selectedHeight, setSelectedHeight] = useState(undefined)
    const currentSectionData = useContext(WizardSectionContext)
    const dialogRef = useRef(null)

    const openDialogFn = useCallback(() => {
        dialogRef.current?.showModal()
    }, [dialogRef])

    const onValueSelected = useCallback(
        (newHeightMeters, newHeightCentimeters) => {
            const computedHeight = newHeightMeters + (newHeightCentimeters > 0 ? 0.1 * newHeightCentimeters : 0)
            setSelectedHeight(computedHeight)
            currentSectionData.height = computedHeight
        },
        [setSelectedHeight, currentSectionData]
    )

    return (
        <>
            <NumberSelectorDialog
                ref={dialogRef}
                title="Ваш рост"
                unitSectionText="Сантиметры"
                unit={unit}
                subUnit={subUnit}
                divider=","
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
