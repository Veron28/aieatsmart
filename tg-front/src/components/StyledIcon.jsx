import EatSmartGradient from "@/assets/EatSmart_gradient.jpg"

export default ({ size, iconShape }) => {
    const sizeToUse = size ?? iconShape.props.size
    return (
        <svg width={sizeToUse} height={sizeToUse} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <mask id="mask" color="white">
                    {iconShape}
                </mask>
            </defs>
            <image href={EatSmartGradient} width={sizeToUse} height={sizeToUse} mask="url(#mask)" />
        </svg>
    )
}
