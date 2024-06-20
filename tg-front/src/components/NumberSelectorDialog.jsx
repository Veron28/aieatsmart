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
        <dialog ref={ref}>
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
                        display: "flex",
                    }}
                >
                    <SimpleButton text="Отмена" isPlain onClick={onClose} />
                    <SimpleButton text="ОК" onClick={onOKClick} />
                </div>
            </PaperSection>
        </dialog>
    )
})

export default NumberSelectorDialog
