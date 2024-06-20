import { useState } from "react"
import PageIndicator from "../components/PageIndicator"
import UltimateActionButton from "../components/UltimateActionButton"

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
            return null
    }
}

const SetupWizardPage = () => {
    const [currentWizardSection, setCurrentWizardSection] = useState(WIZARD_SECTIONS[0])
    const currentSection = getSectionForWizard(currentWizardSection)

    const progressInfo = {
        currentStage: 3,
        totalStages: WIZARD_SECTIONS.length - 2,
    }

    return (
        <div
            className="page"
            style={{
                width: "100%",
                display: "flex",
                position: "relative",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            <PageIndicator
                progress={progressInfo}
                style={{
                    position: "absolute",
                    left: 0,
                    top: "2em",
                }}
                />

            {currentSection}

            <UltimateActionButton
                text="Начать"
                progress={progressInfo}
                style={{
                    position: "absolute",
                    bottom: "2em",
                    left: 0,
                    right: 0,
                }}
            />
        </div>
    )
}

export default SetupWizardPage
