import { forwardRef, memo, useEffect, useMemo } from "react"
import { useAnimate, stagger } from "framer-motion"
import { twMerge } from "tailwind-merge"

import {
    RiScales2Fill,
    RiCake3Fill,
    RiEmpathizeFill,
    RiHeart3Fill,
    RiHealthBookFill,
    RiCupFill,
    RiLeafFill,
} from "@remixicon/react"

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
const fadeInDuration = 0.3

const IconsOrbit = ({ orbitRadius = "200px", className }) => {
    const [scope, animate] = useAnimate()

    useEffect(() => {
        animate("div", opacityFadeIn, {
            ease: "easeOut",
            duration: fadeInDuration,
            delay: stagger(0.1, { startDelay: fadeInDuration * 3 }),
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
        <div className={twMerge("grid relative", className)} ref={scope}>
            {orbitItems}
        </div>
    )
}

const CirclesWithScales = () => {
    const transition = { ease: "easeIn", duration: fadeInDuration }

    return (
        <MotionGradientCircle animate={opacityFadeIn} transition={transition}>
            <MotionGradientCircle animate={opacityFadeIn} transition={transition}>
                <MotionGradientCircle animate={opacityFadeIn} transition={transition}>
                    <StyledIcon iconShape={<RiScales2Fill size={130} />} />
                </MotionGradientCircle>
            </MotionGradientCircle>
        </MotionGradientCircle>
    )
}

export default memo(() => {
    return (
        <LayerStackLayout>
            <CirclesWithScales />
            <IconsOrbit className="size-full" />
        </LayerStackLayout>
    )
})
