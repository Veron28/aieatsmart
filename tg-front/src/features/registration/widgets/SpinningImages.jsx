import { m as motion } from "framer-motion"

const ConcentratedCircle = ({ children, style: styleProps }) => {
    return (
        <motion.div
            key={Date.now.toString()}
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            style={{
                width: "100%",
                borderRadius: "50%",
                padding: "15%",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                background:
                    "radial-gradient(50% 50% at 50% 50%, var(--theme_bg_color) 0%, rgba(213, 192, 252, 0) 85.37%, rgba(156, 106, 249, 0.1) 100%)",
                aspectRatio: "1/1",
                zIndex: -1,
                ...styleProps,
            }}
        >
            {children}
        </motion.div>
    )
}

const SpinningImages = ({ children }) => {
    return (
        <div
            style={{
                width: "100%",
                height: "fit-content",
                aspectRatio: "1/1",
                minHeight: "30dvh",
                boxSizing: "border-box",
                padding: "7em",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            <ConcentratedCircle
                style={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <ConcentratedCircle>
                    <ConcentratedCircle></ConcentratedCircle>
                </ConcentratedCircle>
            </ConcentratedCircle>
            {children}
        </div>
    )
}

export default SpinningImages
