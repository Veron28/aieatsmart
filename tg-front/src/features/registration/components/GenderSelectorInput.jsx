import { useContext } from "react"
import SingleSelectDropdown from "@/components/inputs/SingleSelectDropdown"
import { WizardSectionContext } from "./WizardSectionContext"

const values = ["Мужской", "Женский"]

const GenderSelectorInput = () => {
    const currentSectionData = useContext(WizardSectionContext)
    const onSelectionChange = (newSelection) => {
        currentSectionData.genders = newSelection
    }

    return (
        <SingleSelectDropdown unselectedTitle={"Выберите пол"} onSelectionChange={onSelectionChange} values={values} />
    )
}

export default GenderSelectorInput
