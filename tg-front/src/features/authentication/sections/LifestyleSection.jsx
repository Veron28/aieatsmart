import ActivitySelectorInput from "../components/ActivitySelectorInput"
import StressSelectorInput from "../components/StressSelectorInput"

const LifestyleSection = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5em",
                alignItems: "stretch",
            }}
        >
            <ActivitySelectorInput />
            <StressSelectorInput />
        </div>
    )
}

export default LifestyleSection
