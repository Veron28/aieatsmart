const SectionHeading = ({ title, subtitle }) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: ".5em",
        }}>
            <h1 style={{
                fontSize: "2em",
                fontWeight: "bold",
                color: "var(--theme_text_color)"
            }}>
                {title}
            </h1>
            <h2 style={{
                fontSize: "0.875em",
                color: "var(--theme_subtitle_text_color)",
                fontWeight: "normal",
            }}>
                {subtitle}
            </h2>
        </div>
    )
}

export default SectionHeading
