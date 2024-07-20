import { memo, useEffect, useMemo } from "react"
import { m as motion, useAnimate, stagger } from "framer-motion"
import { twMerge } from "tailwind-merge"

import { RiCake3Fill, RiEmpathizeFill, RiHeart3Fill, RiHealthBookFill, RiCupFill, RiLeafFill } from "@remixicon/react"

import StyledIcon from "@/components/StyledIcon"
import { LayerStackLayout } from "@/components/LayerStackLayout"

import { MotionGradientCircle } from "@/features/registration/components/GradientCircle"

const icons = [
    <StyledIcon iconShape={<RiCake3Fill size={60} />} />,
    <StyledIcon iconShape={<RiEmpathizeFill size={60} />} />,
    <StyledIcon iconShape={<RiHeart3Fill size={60} />} />,
    <StyledIcon iconShape={<RiHealthBookFill size={60} />} />,
    <StyledIcon iconShape={<RiCupFill size={60} />} />,
    <StyledIcon iconShape={<RiLeafFill size={60} />} />,
]

const rotationDelta = 30
const scaleDelta = 0.1
const opacityFadeIn = { opacity: [0, 1] }
const scaleAndFadeIn = Object.assign({}, opacityFadeIn, { scale: [0, 1] })
const fadeInDuration = 0.4
const fadeInStagger = fadeInDuration / 2
const fadeInTransition = (myIndexInSequence) => ({
    ease: "easeOut",
    duration: fadeInDuration,
    delay: myIndexInSequence * fadeInStagger,
})

const IconsOrbit = memo(({ orbitRadius = "200px", className }) => {
    const [scope, animate] = useAnimate()

    useEffect(() => {
        animate("div", opacityFadeIn, {
            ease: "easeOut",
            duration: fadeInDuration,
            delay: stagger(0.1, { startDelay: 3 * fadeInStagger + fadeInDuration }),
        })
    })

    const orbitItems = useMemo(
        () =>
            icons.map((icon, index) => {
                const degrees = index * 60
                const rotation = Math.random() * (rotationDelta * 2) - rotationDelta
                const scale = 1 + Math.random() * (scaleDelta * 2) - scaleDelta

                return (
                    <div
                        key={`orbitItemKey${index}`}
                        className="will-change-transform absolute left-1/2 top-1/2 size-16"
                        style={{
                            transform: `translateX(-50%) translateY(-50%)
                        rotate(${degrees}deg) translate(${orbitRadius}) rotate(${-degrees + rotation}deg)
                        scale(${scale})
                    `,
                        }}
                    >
                        {icon}
                    </div>
                )
            }),
        []
    )

    return (
        <div className={twMerge("relative", className)} ref={scope}>
            {orbitItems}
        </div>
    )
})

const CirclesWithScales = memo(({ centerIconAnimation, centerIcon }) => {
    return (
        <MotionGradientCircle animate={scaleAndFadeIn} transition={fadeInTransition(0)}>
            <MotionGradientCircle animate={scaleAndFadeIn} transition={fadeInTransition(1)}>
                <MotionGradientCircle animate={scaleAndFadeIn} transition={fadeInTransition(2)}>
                    {centerIconAnimation ? <motion.div {...centerIconAnimation}>{centerIcon}</motion.div> : centerIcon}
                </MotionGradientCircle>
            </MotionGradientCircle>
        </MotionGradientCircle>
    )
})

export default memo(({ centerIconAnimation, centerIcon }) => {
    return (
        <LayerStackLayout>
            <CirclesWithScales centerIconAnimation={centerIconAnimation} centerIcon={centerIcon} />
            <IconsOrbit className="size-full" />
        </LayerStackLayout>
    )
})
