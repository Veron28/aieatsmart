import { memo, useMemo } from "react"
import EatSmartGradient from "@/assets/EatSmart_gradient.jpg"

export default memo(({ iconShape }) => {
    const maskId = useMemo(() => "mask" + performance.now() + Math.random(), [])

    const sizeToUse = iconShape.props.size ?? 24

    return (
        <svg width={sizeToUse} height={sizeToUse} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <mask id={maskId} color="white">
                    {iconShape}
                </mask>
            </defs>
            <image href={EatSmartGradient} width={sizeToUse} height={sizeToUse} mask={`url(#${maskId})`} />
        </svg>
    )
})
