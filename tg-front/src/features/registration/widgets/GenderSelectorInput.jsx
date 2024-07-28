import { useCallback, useContext, useRef, useState } from "react"
import { RiArrowDownSFill as ArrowDownIcon, RiMenFill as MaleIcon, RiWomenFill as FemaleIcon } from "@remixicon/react"

import RadioSelectorDialog from "@shared/ui/inputs/RadioSelectorDialog"
import { WizardSectionContext } from "./WizardSectionContext"
import StyledIcon from "@shared/ui/StyledIcon"
import { twMerge } from "tailwind-merge"

const values = [
    {
        name: "Мужской",
        icon: <StyledIcon iconShape={<MaleIcon />} />,
    },
    {
        name: "Женский",
        icon: <StyledIcon iconShape={<FemaleIcon />} />,
    },
]

const GenderSelectorInput = () => {
    const [selectedGender, setSelectedGender] = useState(undefined)
    const currentSectionData = useContext(WizardSectionContext)
    const dialogRef = useRef(null)
    const openDialogFn = useCallback(() => {
        dialogRef.current?.showModal()
    }, [dialogRef])

    const onSelectionChange = (newSelection) => {
        console.log("New selected gender", newSelection)
        currentSectionData.gender = newSelection
        setSelectedGender(newSelection)
    }

    return (
        <>
            <RadioSelectorDialog
                ref={dialogRef}
                options={values}
                title="Ваш пол"
                subtitle="Выберите Ваш пол"
                selectedOption={selectedGender}
                onValueSelected={onSelectionChange}
            />

            <button
                className={twMerge(
                    "flex items-center gap-1 border-none bg-transparent text-sm cursor-pointer",
                    selectedGender ? "text-[--theme_link_color]" : "text-[--theme_text_hint_color]"
                )}
                onClick={openDialogFn}
            >
                {selectedGender ? selectedGender : "Выберите Ваш пол"} <ArrowDownIcon />
            </button>
        </>
    )
}

export default GenderSelectorInput
