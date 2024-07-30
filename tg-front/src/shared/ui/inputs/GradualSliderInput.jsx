import ReactSlider from "react-slider"

export const GradualSliderInput = ({ initialValue, onChange }) => {
    return (
        <ReactSlider
            marks
            min={1}
            max={5}
            step={0.01}
            defaultValue={initialValue}
            className="w-full h-6 flex items-center pr-3"
            thumbClassName={`size-6 rounded-full bg-[--theme_button_color] text-[--theme_button_text_color] cursor-pointer
                flex justify-center items-center`}
            trackClassName="bg-[--theme_section_separator_color] rounded-full h-1"
            markClassName="size-1 box-content rounded-full border-2 border-[--theme_bg_color] bg-[--theme_section_separator_color]"
            renderThumb={(props, state) => <div {...props}>{Math.floor(state.valueNow)}</div>}
            onChange={onChange}
        />
    )
}
