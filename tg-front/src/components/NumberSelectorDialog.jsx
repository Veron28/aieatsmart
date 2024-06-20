import { memo, useCallback } from "react"
import PaperSection from "./PaperSection"
import SimpleButton from "./SimpleButton"

const NumberSelectorDialog = ({ title, unitSectionText, unitShorthand, integerNumbers, onValueSelected }) => {
    const onOKClick = useCallback(() => {
        onValueSelected()
    }, [onValueSelected])

    return (
        <dialog>
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
                    <SimpleButton text="Отмена" isPlain />
                    <SimpleButton text="ОК" onClick={onOKClick} />
                </div>
            </PaperSection>
        </dialog>
    )
}

export default memo(NumberSelectorDialog)
