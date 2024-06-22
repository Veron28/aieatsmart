import { memo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import PaperSection from "@/components/PaperSection"

const InputFieldLayout = ({ fieldIcon, fieldName, inputControl }) => {
    return (
        <PaperSection
            style={{
                display: "flex",
                position: "relative",
                justifyContent: "space-between",
                alignItems: "stretch",
                fontSize: ".875em",
                minHeight: "2em",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1em",
                    flexBasis: 0,
                    flexGrow: 1,
                }}
            >
                <AnimatePresence>
                    {fieldIcon && (
                        <motion.img
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            src={fieldIcon}
                            alt={`Icon for ${fieldName}`}
                        />
                    )}
                </AnimatePresence>
                <span
                    style={{
                        fontWeight: 500,
                    }}
                >
                    {fieldName}
                </span>
            </div>
            {inputControl}
        </PaperSection>
    )
}

export default memo(InputFieldLayout)
