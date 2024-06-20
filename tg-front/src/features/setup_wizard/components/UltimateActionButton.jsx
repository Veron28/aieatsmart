import { memo } from "react";

const UltimateActionButton = ({
    text,
    progress,
    onClick,
    style: styleProps,
}) => {
    const currentStage = progress?.currentStage ?? 0
    const finalStage = progress?.totalStages ?? 0

    return (
        <button
            onClick={onClick}
            style={{
                display: "inline-flex",
                justifyContent: "center",
                backgroundColor: "var(--theme_button_color)",
                borderRadius: "8px",
                padding: "1em",
                ...styleProps,
            }}
        >
            <span
                style={{
                    color: "var(--theme_button_text_color)",
                    fontWeight: "500",
                }}
            >
                {text}
            </span>
        </button>
    )
}

export default memo(UltimateActionButton)
