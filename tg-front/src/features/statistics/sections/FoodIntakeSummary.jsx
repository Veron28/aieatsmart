import { RiCakeFill as CakeIcon } from "@remixicon/react"

import CellSummaryLayout from "../components/CellSummaryLayout"

const FoodIntakeSummary = ({ foodIntakeData }) => {
    const dataToDisplay = {
        icon: <CakeIcon />,
        emphasis: foodIntakeData.current,
        remainingSummary: `из ${foodIntakeData.total}`,
        actionDescription: "Приема пищи",
    }
    return <CellSummaryLayout dataToDisplay={dataToDisplay} />
}

export default FoodIntakeSummary
