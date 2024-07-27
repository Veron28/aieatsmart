import { useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, LayoutGroup, m as motion } from "framer-motion"
import {
    RiArrowLeftLine as BackIcon,
    RiArrowRightLine as ForwardIcon,
    RiCheckFill as CheckmarkIcon,
} from "@remixicon/react"

import { weAreInWebBrowser, useTelegramOnBackListener } from "@/utils/TelegramUtils"

import SectionHeading from "@/components/SectionHeading"
import UltimateActionButton from "@/components/UltimateActionButton"
import PageActionsBlock from "@/components/PageActionsBlock"
import StyledIcon from "@/components/StyledIcon"

import PageIndicator from "../components/PageIndicator"
import { WizardSectionContext } from "../components/WizardSectionContext"

import WelcomeSection from "../sections/WelcomeSection"
import SignupCompletedSection from "../sections/SignupCompletedSection"

import SectionBasics from "../sections/wizard_sections/BasicsSection"
import SectionHealth from "../sections/wizard_sections/HealthSection"
import SectionGoals from "../sections/wizard_sections/GoalsSection"
import SectionLimitations from "../sections/wizard_sections/LimitationsSection"
import SectionLifestyle from "../sections/wizard_sections/LifestyleSection"

const IntroductionSection = WelcomeSection
const WIZARD_SECTIONS = [SectionBasics, SectionHealth, SectionGoals, SectionLimitations, SectionLifestyle]
const CompletedSection = SignupCompletedSection

const ANIMATION_DURATION = 0.25
const variants = {
    enter: (direction) => {
        return {
            x: direction === 0 ? 0 : direction > 0 ? "100dvw" : "-100dvw",
            opacity: 0,
        }
    },
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => {
        return {
            position: "absolute",
            x: direction < 0 ? "100dvw" : "-100dvw",
            opacity: 0,
        }
    },
}

const iconVariants = {
    enter: (direction) => {
        return {
            x: direction === 0 ? 0 : direction > 0 ? "1.5em" : "-1.5em",
            opacity: 0,
        }
    },
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => {
        return {
            position: "absolute",
            x: direction < 0 ? "1.5em" : "-1.5em",
            opacity: 0,
        }
    },
}

const getButtonState = (currentStageIndex) => {
    switch (currentStageIndex) {
        case WIZARD_SECTIONS.length - 1:
            return {
                title: "Готово",
                icon: <CheckmarkIcon />,
            }
        default:
            return {
                title: "Продолжить",
                icon: <ForwardIcon />,
            }
    }
}

export default () => {
    const navigate = useNavigate()
    const [[currentStageIndex, navigationDirection], setCurrentStageIndex] = useState([0, 0])
    const [wizardState, setWizardState] = useState({})
    const [validationMessage, setValidationMessage] = useState(null)

    const currentSectionData = WIZARD_SECTIONS[currentStageIndex]

    const [currentStageName, currentSectionState] = useMemo(() => {
        // We modify wizard state here
        const sectionName = currentSectionData.metaContents.stageName
        if (!wizardState[sectionName]) {
            wizardState[sectionName] = {}
        }

        return [sectionName, wizardState]
    }, [currentStageIndex, wizardState, currentSectionData])

    const currentSectionContents = currentSectionData.sectionContents
    const currentSectionMetaContents = currentSectionData.metaContents
    const actionButtonState = getButtonState(currentStageIndex)

    const progressInfo = {
        currentStage: currentStageIndex + 1,
        totalStages: WIZARD_SECTIONS.length,
    }
    let stagesLeft = WIZARD_SECTIONS.length - 1 - currentStageIndex
    switch (stagesLeft) {
        case 0:
            stagesLeft = "этот этап"
            break
        case 1:
            stagesLeft = "1 этап"
            break
        default:
            stagesLeft = `${stagesLeft} этапа`
            break
    }

    // Navigation actions
    const proceed = (direction) => {
        setCurrentStageIndex([
            Math.max(0, Math.min(WIZARD_SECTIONS.length - 1, currentStageIndex + direction)),
            direction,
        ])
    }
    const goToPreviousSection = () => proceed(-1) // left
    useTelegramOnBackListener(goToPreviousSection)

    const exitAction = () => navigate("/signup/completed")
    const goToNextSection = () => {
        const { canProceed: canProceedFn, saveState: stateSaveHandler } = currentSectionData.dataHandlers

        const newValidationMessage = null // canProceedFn ? canProceedFn(currentSectionState) : null
        setValidationMessage(newValidationMessage)
        if (newValidationMessage) {
            return
        }

        stateSaveHandler?.(currentSectionState)
        setWizardState({
            ...wizardState,
            [currentStageName]: currentSectionState,
        })

        if (currentStageIndex == WIZARD_SECTIONS.length) {
            // This was the last section of wizard.
            exitAction()
        } else {
            proceed(+1) // right
        }
    }

    return (
        <div className="w-full relative flex flex-col items-stretch page">
            <LayoutGroup>
                <AnimatePresence>
                    <motion.nav
                        key="wizardStageIndicator"
                        className="h-fit flex items-center gap-4 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, position: "sticky", top: "2em", zIndex: 1 }}
                        exit={{ opacity: 0, position: "absolute", duration: ANIMATION_DURATION }}
                        layout
                    >
                        {weAreInWebBrowser && currentStageIndex > 0 && <BackIcon onClick={goToPreviousSection} />}
                        <PageIndicator progress={progressInfo} />
                    </motion.nav>
                </AnimatePresence>
                <span
                    key="wizardStageIcon"
                    className="size-12 rounded-full bg-white p-1 flex justify-center items-center absolute top-8 right-0 drop-shadow-2xl"
                >
                    <span className="p-1.5 rounded-full relative overflow-hidden">
                        <AnimatePresence custom={navigationDirection}>
                            <motion.div
                                initial="enter"
                                animate="center"
                                exit="exit"
                                key={currentStageIndex}
                                custom={navigationDirection}
                                variants={iconVariants}
                                transition={{
                                    ease: "easeOut",
                                    duration: ANIMATION_DURATION,
                                }}
                            >
                                <StyledIcon key={currentStageIndex} iconShape={currentSectionMetaContents.sectionIcon} />
                            </motion.div>
                        </AnimatePresence>
                    </span>
                </span>

                <section className="w-full flex min-h-0 grow">
                    <AnimatePresence custom={navigationDirection}>
                        <motion.section
                            className="w-full grid gap-6"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            key={currentStageIndex}
                            custom={navigationDirection}
                            variants={variants}
                            transition={{
                                ease: "easeOut",
                                duration: ANIMATION_DURATION,
                            }}
                        >
                            <SectionHeading
                                title={currentSectionMetaContents.title}
                                subtitle={currentSectionMetaContents.subtitle}
                            />
                            <WizardSectionContext.Provider value={currentSectionState}>
                                <span className="flow-root basis-0 grow h-fit mb-28">{currentSectionContents}</span>
                            </WizardSectionContext.Provider>
                        </motion.section>
                    </AnimatePresence>
                </section>
            </LayoutGroup>

            <PageActionsBlock>
                <UltimateActionButton
                    text={actionButtonState.title}
                    progress={progressInfo}
                    icon={actionButtonState.icon}
                    validationErrorMessage={validationMessage}
                    onClick={goToNextSection}
                />
                <span className="mt-4 text-center text-sm text-[--theme_text_hint_color]">
                    Ещё <span className="text-[--theme_accent_color]">{stagesLeft}</span> до конца регистрации
                </span>
            </PageActionsBlock>
        </div>
    )
}
