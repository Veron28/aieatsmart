export default ({ style: styleProps, children }) => {
    return (
        <section className="z-[3] fixed flex flex-col items-stretch"
            style={{
                bottom: "2em",
                left: "1.25em",
                right: "1.25em",
                gap: ".5em",

                ...styleProps,
            }}
        >
            {children}
        </section>
    )
}
