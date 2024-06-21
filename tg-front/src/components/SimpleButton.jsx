const SimpleButton = ({ onClick, text, isPlain, style: styleProps }) => {
    return (
        <button
            style={{
                padding: "1em",
                borderRadius: ".75em",
                boxShadow: "0px .25em 2.125em rgba(156, 106, 249, 0.25)",
                color: isPlain ? "var(--theme_text_color)" : "var(--theme_button_text_color)",
                backgroundColor: isPlain ? "var(--theme_section_bg_color)" : "var(--theme_button_color)",
                ...styleProps,
            }}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default SimpleButton
