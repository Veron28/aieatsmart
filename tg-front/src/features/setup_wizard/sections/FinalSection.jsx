import SpinningImages from "../components/SpinningImages"
import CheckmarkGraphics from "../../../assets/firstAnimationImages/Vector8.svg"

const WelcomeSection = () => {
    return (
        <SpinningImages>
            <img
                alt="Checkbox image"
                src={CheckmarkGraphics}
                />
        </SpinningImages>
    )
}

export default WelcomeSection
