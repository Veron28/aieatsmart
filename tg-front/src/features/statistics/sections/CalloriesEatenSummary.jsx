import { RiScalesFill as ScalesIcon } from "@remixicon/react"

import CellSummaryLayout from "../components/CellSummaryLayout"

const GrammsEatenSummary = ({ foodIntakeData }) => {
    const dataToDisplay = {
        icon: <ScalesIcon />,
        emphasis: foodIntakeData.current,
        remainingSummary: "ккал",
        actionDescription: "Съедено",
    }
    return <CellSummaryLayout dataToDisplay={dataToDisplay} />
}

export default GrammsEatenSummary
