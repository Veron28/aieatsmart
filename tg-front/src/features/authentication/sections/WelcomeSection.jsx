import SpinningImages from "../components/SpinningImages"
import WeightsGraphics from "../../../assets/firstAnimationImages/Vector1.svg"

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
