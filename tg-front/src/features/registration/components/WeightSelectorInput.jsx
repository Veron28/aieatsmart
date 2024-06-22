import { useCallback, useState, useRef, useContext } from "react"
import { RiArrowDownSFill as ArrowDownIcon } from "@remixicon/react"
import NumberSelectorDialog from "@/components/inputs/NumberSelectorDialog"
import { WizardSectionContext } from "./WizardSectionContext"

const unit = {
    minValue: 30,
    maxValue: 150,
}

const subUnit = {
    name: "кг",
    minValue: 0,
    maxValue: 9,
}

const WeightSelectorInput = () => {
    const [selectedWeight, setSelectedWeight] = useState(undefined)
    const dialogRef = useRef(null)
    const currentSectionData = useContext(WizardSectionContext)
    const openDialogFn = useCallback(() => {
        dialogRef.current?.showModal()
    }, [dialogRef])
    const onValueSelected = useCallback(
        (newWeightKilograms, newWeightGrams) => {
            const computedWeight = newWeightKilograms + (newWeightGrams > 0 ? 0.1 * newWeightGrams : 0)
            setSelectedWeight(computedWeight)
            currentSectionData.weight = computedWeight
        },
        [setSelectedWeight, currentSectionData]
    )

    return (
        <>
            <NumberSelectorDialog
                ref={dialogRef}
                unit={unit}
                divider=","
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
                    color: selectedWeight ? "var(--theme_link_color)" : "var(--theme_text_hint_color)",
                }}
                onClick={openDialogFn}
            >
                {selectedWeight ? `${selectedWeight} кг` : "Выберите вес"} <ArrowDownIcon />
            </button>
        </>
    )
}

export default WeightSelectorInput
