import { forwardRef, useCallback } from "react"
import PaperSection from "./PaperSection"
import SimpleButton from "./SimpleButton"

const NumberSelectorDialog = forwardRef((props, ref) => {
    const { title, unitSectionText, unitShorthand, integerNumbers, onValueSelected } = props
    const onClose = useCallback(() => {
        ref?.current?.close()
    }, [ref])
    const onOKClick = useCallback(() => {
        onValueSelected?.()
        onClose()
    }, [onValueSelected, onClose])

    return (
        <dialog
            ref={ref}
            style={{
                width: "100%",
            }}
        >
            <PaperSection
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                }}
            >
                <h1
                    style={{
                        fontSize: "2em",
                        fontWeight: "bold",
                    }}
                >
                    {title}
                </h1>
                <p
                    style={{
                        marginTop: ".25em",
                        fontSize: ".875em",
                        color: "var(--theme_subtitle_text_color)",
                    }}
                >
                    {unitSectionText}
                </p>

                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "stretch",
                        gap: ".5em",
                    }}
                >
                    <SimpleButton
                        text="Отмена"
                        isPlain
                        onClick={onClose}
                        style={{
                            flexBasis: 0,
                            flexGrow: 1,
                        }}
                    />
                    <SimpleButton
                        text="ОК"
                        onClick={onOKClick}
                        style={{
                            flexBasis: 0,
                            flexGrow: 1,
                        }}
                    />
                </div>
            </PaperSection>
        </dialog>
    )
})

export default NumberSelectorDialog
