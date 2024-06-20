import { memo } from "react"
import PaperSection from "../../../components/PaperSection"

const InputFieldLayout = ({ fieldIcon, fieldName, inputControl }) => {
    return (
        <PaperSection
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: ".875em",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".3em",
                    flexBasis: 0,
                    flexGrow: 1,
                }}
            >
                {fieldIcon && <img src={fieldIcon} alt={`Icon for ${fieldName}`} />}
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
