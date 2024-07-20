import { twMerge } from "tailwind-merge"

export default ({ children, className }) => {
    return (
        <section className={twMerge("z-10 absolute bottom-8 inset-x-5 flex flex-col items-stretch gap-2", className)}>
            {children}
        </section>
    )
}
