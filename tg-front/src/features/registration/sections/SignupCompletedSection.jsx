import StyledIcon from "@/components/StyledIcon"
import { RiCheckFill as CheckmarkIcon } from "@remixicon/react"
import CirclesOrbitsIcons from "@/features/registration/sections/CirclesOrbitsIcons"

const checkmarkAnimation = {
    animate: { scaleX: [0, 1] },
    transition: { ease: "easeOut", duration: 0.5, delay: .75 },
}

export default () => {
    return (
        <CirclesOrbitsIcons
            centerIcon={<StyledIcon iconShape={<CheckmarkIcon size={130} />} />}
            centerIconAnimation={checkmarkAnimation}
        />
    )
}
