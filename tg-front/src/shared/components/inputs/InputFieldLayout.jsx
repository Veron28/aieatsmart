import { memo } from "react"
import PaperSection from "@shared/components/PaperSection"

const InputFieldLayout = ({ fieldIcon, fieldName, inputControl }) => {
    const iconIsUrl = typeof fieldIcon === "string" || fieldIcon instanceof String

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
                {fieldIcon && (iconIsUrl ? <img src={fieldIcon} alt={`Icon for ${fieldName}`} /> : fieldIcon)}
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
