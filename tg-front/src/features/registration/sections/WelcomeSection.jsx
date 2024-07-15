import StyledIcon from "@/components/StyledIcon"
import { RiScales2Fill } from "@remixicon/react"

import SpinningImages from "../components/SpinningImages"

export default () => {
    return (
        <SpinningImages>
            <StyledIcon iconShape={<RiScales2Fill size={130} />} />
        </SpinningImages>
    )
}
