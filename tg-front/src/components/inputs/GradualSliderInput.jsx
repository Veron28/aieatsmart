import { useMemo } from "react"

const GradualSliderInput = ({ grades, onChange, style: styleProps }) => {
    const gradesBars = useMemo(() => {
        const bars = []
        for (let i = 0; i < grades - 2; i++) {
            bars.push(
                <span
                    key={"circle" + i}
                    style={{
                        width: ".25em",
                        height: ".25em",
                        aspectRatio: "1/1",
                        border: "3px solid var(--theme_section_bg_color)",
                        borderRadius: "50%",
                        backgroundColor: "var(--theme_text_hint_color)",
                    }}
                ></span>
            )
        }
        return bars
    }, [grades])

    return (
        <div
            style={{
                display: "flex",
                position: "relative",
                alignItems: "center",
                gap: ".4em",
                ...styleProps,
            }}
        >
            <input
                type="range"
                className="slider"
                min={1}
                max={grades}
                step="any"
                onChange={(newValue) => {
                    onChange(Math.trunc(newValue))
                }}
                style={{
                    position: "absolute",
                    zIndex: 3,
                    left: 0,
                    right: 0,
                }}
            />
            <span
                className="noselect"
                style={{
                    width: "2em",
                    textAlign: "center",
                    zIndex: 3,
                    color: "var(--theme_text_hint_color)",
                }}
            >
                1
            </span>
            <span
                style={{
                    width: "100%",
                    zIndex: 2,
                    flexBasis: 0,
                    flexGrow: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                }}
            >
                {...gradesBars}
            </span>
            <span
                className="noselect"
                style={{
                    zIndex: 3,
                    color: "var(--theme_text_hint_color)",
                }}
            >
                {grades}
            </span>
        </div>
    )
}

export default GradualSliderInput
