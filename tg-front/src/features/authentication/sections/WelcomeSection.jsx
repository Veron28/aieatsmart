import SpinningImages from "../components/SpinningImages"
import WeightsGraphics from "@/assets/firstAnimationImages/variant1.png"

const WelcomeSection = () => {
    return (
        <SpinningImages>
            <img
                alt="Weights logo"
                src={WeightsGraphics}
                />
        </SpinningImages>
    )
}

export default WelcomeSection
