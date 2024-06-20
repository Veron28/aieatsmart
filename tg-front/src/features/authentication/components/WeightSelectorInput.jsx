import { useCallback, useState, useRef } from "react"
import { RiArrowDownSFill as ArrowDownIcon } from "@remixicon/react"
import NumberSelectorDialog from "../../../components/NumberSelectorDialog"

const WeightSelectorInput = () => {
    const [selectedWeight, setSelectedWeight] = useState(undefined)
    const dialogRef = useRef()
    const openDialogFn = useCallback(() => {
        dialogRef.value?.openDialog()
    }, [dialogRef])
    const onValueSelected = useCallback(
        (newWeight) => {
            setSelectedWeight(newWeight)
        },
        [setSelectedWeight]
    )

    return (
        <>
            <NumberSelectorDialog ref={dialogRef} title="Ваш вес" unitSectionText="Килограммы" />
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
