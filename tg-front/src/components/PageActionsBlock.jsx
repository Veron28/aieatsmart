const PageActionsBlock = ({ style: styleProps, children }) => {
    return (
        <section
            style={{
                zIndex: 3,
                position: "fixed",
                bottom: "2em",
                left: "1.25em",
                right: "1.25em",

                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: ".5em",

                ...styleProps,
            }}
        >
            {children}
        </section>
    )
}

export default PageActionsBlock
