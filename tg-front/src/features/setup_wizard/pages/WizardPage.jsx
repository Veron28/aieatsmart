import { useState } from "react"
import WelcomeSection from "../sections/WelcomeSection"

const SECTION_WELCOME = "welcome"
const SECTION_BASICS = "basics"
const SECTION_HEALTH = "health"
const SECTION_GOALS = "goals"
const SECTION_PREFERENCES = "preferences"
const SECTION_LIFESTYLE = "lifestyle"

const SECTION_FINAL = "final"

const WIZARD_SECTIONS = [
    SECTION_WELCOME,
    SECTION_BASICS,
    SECTION_HEALTH,
    SECTION_GOALS,
    SECTION_PREFERENCES,
    SECTION_LIFESTYLE,
    SECTION_FINAL,
]

const getSectionForWizard = (sectionName) => {
    switch (sectionName) {
        case SECTION_WELCOME:
            return <WelcomeSection />
        default:
            return <WelcomeSection />
    }
}

const SetupWizardPage = () => {
    const [currentWizardSection, setCurrentWizardSection] = useState(WIZARD_SECTIONS[0])
    const currentSection = getSectionForWizard(currentWizardSection)

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            {currentSection}
        </div>
    )
}

export default SetupWizardPage
