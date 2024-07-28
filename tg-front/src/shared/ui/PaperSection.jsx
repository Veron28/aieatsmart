import { twMerge } from "tailwind-merge"

export default ({ children, className, style: styleProps }) => {
    return (
        <div
            className={twMerge("p-4 rounded-lg overflow-clip bg-[--theme_section_bg_color] drop-shadow-xl", className)}
            style={{
                ...styleProps,
            }}
        >
            {children}
        </div>
    )
}
