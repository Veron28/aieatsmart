import { forwardRef, useCallback, useState } from "react"
import PaperSection from "@/components/PaperSection"
import SimpleButton from "@/components/SimpleButton"

import CarouselNumberPicker from "./CarouselNumberPicker"

const RadioSelectorDialog = forwardRef((props, ref) => {
    const { title, subtitle, selectedOption, options, onValueSelected } = props
    const [unitValue, setUnitValue] = useState(0)
    const [subUnitValue, setSubUnitValue] = useState(0)
    const onClose = useCallback(() => {
        ref?.current?.close()
    }, [ref])
    const onOKClick = useCallback(() => {
        onValueSelected?.(unitValue, subUnitValue)
        onClose()
    }, [unitValue, subUnitValue, onValueSelected, onClose])

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
                    {subtitle}
                </p>

                <span
                    style={{
                        display: "contents",
                        position: "relative",
                        color: "var(--theme_text_color)",
                    }}
                >
                    <CarouselNumberPicker
                        unit={{
                            ...unit,
                            onChange: setUnitValue,
                        }}
                        divider={divider}
                        subUnit={
                            subUnit
                                ? {
                                      ...subUnit,
                                      onChange: setSubUnitValue,
                                  }
                                : undefined
                        }
                    />
                </span>

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
                        plain
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

export default RadioSelectorDialog
