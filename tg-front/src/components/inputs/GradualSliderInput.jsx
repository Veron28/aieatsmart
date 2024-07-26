import ReactSlider from "react-slider"

export const GradualSliderInput = ({ onChange }) => {
    return (
        <ReactSlider
            className="w-full h-6 flex items-center pr-3"
            marks
            markClassName="size-1 box-content rounded-full border-2 border-[--theme_bg_color] bg-[--theme_text_hint_color]"
            min={1}
            max={5}
            step={0.01}
            thumbClassName={`size-6 rounded-full bg-[--theme_button_color] text-[--theme_button_text_color] cursor-pointer
                flex justify-center items-center`}
            trackClassName="bg-[--tg-theme-section-separator-color] rounded-full h-1"
            renderThumb={(props, state) => <div {...props}>{Math.floor(state.valueNow)}</div>}
            onChange={onChange}
        />
    )
}
