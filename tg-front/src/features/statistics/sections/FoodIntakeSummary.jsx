import { RiCakeFill as CakeIcon } from "@remixicon/react"

import CellSummaryLayout from "../widgets/CellSummaryLayout"

export default ({ foodIntakeData }) => {
    const dataToDisplay = {
        icon: <CakeIcon />,
        emphasis: foodIntakeData.current,
        remainingSummary: `из ${foodIntakeData.total}`,
        actionDescription: "Приема пищи",
    }
    return <CellSummaryLayout dataToDisplay={dataToDisplay} />
}
