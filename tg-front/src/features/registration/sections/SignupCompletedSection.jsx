import StyledIcon from "@/components/StyledIcon"
import SpinningImages from "../components/SpinningImages"
import { RiCheckFill as CheckmarkIcon } from "@remixicon/react"

export default () => {
    return (
        <SpinningImages>
            <StyledIcon iconShape={<CheckmarkIcon size={130} />} />
        </SpinningImages>
    )
}
