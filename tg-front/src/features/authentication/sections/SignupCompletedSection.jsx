import SpinningImages from "../components/SpinningImages"
import CheckmarkGraphics from "@/assets/firstAnimationImages/variant8.png"

const WelcomeSection = () => {
    return (
        <SpinningImages>
            <img
                alt="Checkbox logo"
                src={CheckmarkGraphics}
                />
        </SpinningImages>
    )
}

export default WelcomeSection
