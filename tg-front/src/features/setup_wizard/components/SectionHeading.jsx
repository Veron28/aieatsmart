const SectionHeading = ({ title, subtitle }) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: "4px",
        }}>
            <h1 style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "var(--theme_text_color)"
            }}>
                {title}
            </h1>
            <h2 style={{
                fontSize: "14px",
                color: "var(--theme_subtitle_text_color)"
            }}>
                {subtitle}
            </h2>
        </div>
    )
}

export default SectionHeading
