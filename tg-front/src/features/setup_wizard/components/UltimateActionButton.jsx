const UltimateActionButton = ({ text, style: styleProps }) => {
    return (
        <button
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

export default UltimateActionButton
