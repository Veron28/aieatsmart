import { memo } from "react"

const UltimateActionButton = ({ text, progress, icon, onClick, style: styleProps }) => {
    const currentStage = progress?.currentStage ?? 0
    const finalStage = progress?.totalStages ?? 0

    return (
        <button
            onClick={onClick}
            style={{
                display: "inline-flex",
                justifyContent: "space-between",
                backgroundColor: "var(--theme_button_color)",
                color: "var(--theme_button_text_color)",
                borderRadius: ".5em",
                padding: "1em",
                ...styleProps,
            }}
        >
            {icon && (
                <span
                ></span>
            )}
            <span
                style={{
                    flexBasis: 0,
                    flexGrow: 1,
                    fontWeight: "500",
                }}
            >
                {text}
            </span>
            {icon}
        </button>
    )
}

export default memo(UltimateActionButton)