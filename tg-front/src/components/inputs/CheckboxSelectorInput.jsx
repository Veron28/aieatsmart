import { memo, useState } from "react"
import { RiRadioButtonFill as RadioButtonSelectedIcon } from "@remixicon/react"

const CheckboxSelectorInput = ({ style: styleProps, isSelected: defaultIsSelected, onChange }) => {
    const [isSelected, setSelected] = useState(defaultIsSelected ?? false)

    // Outer span is just a bigger tap area for better UX
    return (
        <span
            style={{
                width: "fit-content",
                height: "100%",
                boxSizing: "border-box",

                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,

                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                
                padding: ".9em",
                paddingLeft: "4em",
                paddingRight: "1.2em",
                boxSizing: "border-box",
                ...styleProps,
            }}
            onClick={() => {
                setSelected(!isSelected)
                onChange?.(!isSelected)
            }}
        >
            <span
                style={{
                    width: "1.5em",
                    height: "1.5em",
                }}
            >
                {isSelected ? (
                    <RadioButtonSelectedIcon color="var(--theme_button_color)" />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            boxSizing: "border-box",
                            borderRadius: "50%",
                            transition: "all .2s",
                            backgroundColor: "transparent",
                            borderColor: "var(--theme_text_hint_color)",
                            border: "1px solid",
                        }}
                    />
                )}
            </span>
        </span>
    )
}

export default memo(CheckboxSelectorInput)
