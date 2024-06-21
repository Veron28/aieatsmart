import { memo, useState } from "react"

const CheckboxSelectorInput = ({ isSelected: defaultIsSelected, onChange }) => {
    const [isSelected, setSelected] = useState(defaultIsSelected ?? false)

    // Outer span is just a bigger tap area for better UX
    return (
        <span
            style={{
                display: "inline-flex",
                justifyContent: "end",
                width: "fit-content",
                height: "100%",
                padding: ".9em",
                paddingLeft: "2em",
                boxSizing: "border-box",
            }}
            onClick={() => {
                setSelected(!isSelected)
                onChange(!isSelected)
            }}
        >
            <div
                style={{
                    width: "1.5em",
                    height: "1.5em",
                    boxSizing: "border-box",
                    borderRadius: "50%",
                    transition: "all .2s",
                    backgroundColor: isSelected ? "var(--theme_accent_color)" : "transparent",
                    borderColor: isSelected ? "transparent" : "var(--theme_text_hint_color)",
                    border: isSelected ? "none" : "1px solid",
                }}
            ></div>
        </span>
    )
}

export default memo(CheckboxSelectorInput)
