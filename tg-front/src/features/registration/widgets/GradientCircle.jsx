import { m as motion } from "framer-motion"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

export const GradientCircle = forwardRef(({ children, className }, ref) => {
    return (
        <div
            className={twMerge("size-fit rounded-full p-16 grid place-items-center", className)}
            style={{
                background:
                    "radial-gradient(50% 50% at 50% 50%, var(--theme_bg_color) 0%, rgba(213, 192, 252, 0) 85.37%, rgba(156, 106, 249, 0.1) 100%)",
            }}
            ref={ref}
        >
            {children}
        </div>
    )
})

export const MotionGradientCircle = motion(GradientCircle)
