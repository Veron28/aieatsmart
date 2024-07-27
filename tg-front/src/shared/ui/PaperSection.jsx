import { twMerge } from "tailwind-merge"

export default ({ children, className, style: styleProps }) => {
    return (
        <div className={twMerge("p-4 rounded-lg overflow-clip", className)}
            style={{
                backgroundColor: "var(--theme_section_bg_color)",
                boxShadow: "0px 4px 52px 8px rgba(0, 0, 0, 0.1)",
                ...styleProps,
            }}
        >
            {children}
        </div>
    )
}
