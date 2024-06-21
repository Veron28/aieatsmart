const PaperSection = ({ children, style: styleProps }) => {
    return (
        <div
            style={{
                borderRadius: ".5em",
                backgroundColor: "var(--theme_section_bg_color)",
                boxShadow: "0px 4px 52px 8px rgba(0, 0, 0, 0.1)",
                padding: "1em",
                overflow: "clip",
                ...styleProps,
            }}
        >
            {children}
        </div>
    )
}

export default PaperSection
