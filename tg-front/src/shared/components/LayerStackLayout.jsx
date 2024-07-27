import { twMerge } from "tailwind-merge"

export const LayerStackLayout = ({ children, className }) => {
    return (
        <div
            className={twMerge("grid place-items-center *:col-span-full *:row-span-full", className)}
            style={{
                gridTemplateColumns: "1fr",
                gridTemplateRows: "1fr",
            }}
        >
            {children}
        </div>
    )
}
