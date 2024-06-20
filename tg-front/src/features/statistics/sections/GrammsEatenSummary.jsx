import { RiScalesFill as ScalesIcon } from "@remixicon/react"

import CellSummaryLayout from "../components/CellSummaryLayout"

const GrammsEatenSummary = ({ foodIntakeData }) => {
    const dataToDisplay = {
        icon: <ScalesIcon />,
        emphasis: "2,250",
        remainingSummary: "гр",
        actionDescription: "Съедено",
    }
    return <CellSummaryLayout dataToDisplay={dataToDisplay} />
}

export default GrammsEatenSummary
