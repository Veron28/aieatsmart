import { useCallback, useState, useRef, useContext } from "react"
import { RiArrowDownSFill as ArrowDownIcon } from "@remixicon/react"
import NumberSelectorDialog from "@/components/inputs/NumberSelectorDialog"
import { WizardSectionContext } from "./WizardSectionContext"

const unit = {
    name: "Кг",
    minValue: 40,
    maxValue: 280,
}

const subUnit = {
    name: "г",
    minValue: 0,
    maxValue: 999,
}

const WeightSelectorInput = () => {
    const [selectedWeight, setSelectedWeight] = useState(undefined)
    const dialogRef = useRef(null)
    const openDialogFn = useCallback(() => {
        dialogRef.current?.showModal()
    }, [dialogRef])
    const onValueSelected = useCallback(
        (newWeight) => {
            setSelectedWeight(newWeight)
            const currentSectionData = useContext(WizardSectionContext)
            currentSectionData.weight = newWeight
        },
        [setSelectedWeight]
    )

    return (
        <>
            <NumberSelectorDialog ref={dialogRef} unit={unit} subUnit={subUnit} onValueSelected={onValueSelected} />
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
