import { useCallback, useMemo, useState } from "react"
import { AnimatePresence, LayoutGroup, m as motion } from "framer-motion"
import {
    RiArrowLeftLine as BackIcon,
    RiArrowRightLine as ForwardIcon,
    RiCheckFill as CheckmarkIcon,
} from "@remixicon/react"
import { useNavigate } from "react-router-dom"

import SectionHeading from "@/components/SectionHeading"
import UltimateActionButton from "@/components/UltimateActionButton"
import PageActionsBlock from "@/components/PageActionsBlock"

import PageIndicator from "../components/PageIndicator"

import BasicsSection from "../sections/BasicsSection"
import HealthSection from "../sections/HealthSection"
import GoalsSection from "../sections/GoalsSection"
import LimitationsSection from "../sections/LimitationsSection"
import LifestyleSection from "../sections/LifestyleSection"

import { weAreInWebBrowser, useTelegramOnBackListener } from "@/utils/TelegramUtils"
import {
    storeUserGoals,
    storeUserHealthInfo,
    storeUserLifestyleData,
    storeUserLimitations,
    storeUserPhysiologyInfo,
} from "../api/RegistrationApi"
import { WizardSectionContext } from "../components/WizardSectionContext"

const SECTION_BASICS = "basics"
const SECTION_HEALTH = "health"
const SECTION_GOALS = "goals"
const SECTION_LIMITATIONS = "limitations"
const SECTION_LIFESTYLE = "lifestyle"

const WIZARD_SECTIONS = [SECTION_BASICS, SECTION_HEALTH, SECTION_GOALS, SECTION_LIMITATIONS, SECTION_LIFESTYLE]

const getHeadingForWizard = (sectionName) => {
    switch (sectionName) {
        case SECTION_BASICS:
            return {
                title: "Основное",
                subtitle: (
                    <span style={{ display: "contents" }}>
                        Чем больше мы о Вас знаем,
                        <wbr /> тем лучше мы сможем Вам помочь:
                    </span>
                ),
            }
        case SECTION_HEALTH:
            return {
                title: "Здоровье",
                subtitle: (
                    <span style={{ display: "contents" }}>
                        Пожалуйста, укажите все имеющиеся
                        <wbr /> у Вас медицинские противопоказания:
                    </span>
                ),
            }
        case SECTION_GOALS:
            return {
                title: "Цели",
                subtitle: (
                    <span style={{ display: "contents" }}>
                        Выберите одну цель,
                        <wbr /> которая больше Вам подходит:
                    </span>
                ),
            }
        case SECTION_LIMITATIONS:
            return {
                title: "Исключаемые продукты",
                subtitle: (
                    <span style={{ display: "contents" }}>
                        Выберите категории продуктов,
                        <wbr /> которые Вы не едите:
                    </span>
                ),
            }
        case SECTION_LIFESTYLE:
            return {
                title: "Стресс и образ жизни",
                subtitle: "Расскажите нам больше о Вашем рационе и распорядке дня:",
            }
        default:
            return null
    }
}

const getSectionForWizard = (sectionName) => {
    switch (sectionName) {
        case SECTION_BASICS:
            return <BasicsSection />
        case SECTION_HEALTH:
            return <HealthSection />
        case SECTION_GOALS:
            return <GoalsSection />
        case SECTION_LIMITATIONS:
            return <LimitationsSection />
        case SECTION_LIFESTYLE:
            return <LifestyleSection />
        default:
            return null
    }
}

const getStateSaveHandler = (sectionName) => {
    switch (sectionName) {
        case SECTION_BASICS:
            return storeUserPhysiologyInfo
        case SECTION_HEALTH:
            return storeUserHealthInfo
        case SECTION_GOALS:
            return storeUserGoals
        case SECTION_LIMITATIONS:
            return storeUserLimitations
        case SECTION_LIFESTYLE:
            return storeUserLifestyleData
        default:
            return null
    }
}

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

const getButtonState = (currentStageName) => {
    switch (currentStageName) {
        case WIZARD_SECTIONS[WIZARD_SECTIONS.length - 1]:
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

const SetupWizardPage = () => {
    const navigate = useNavigate()
    const [[currentStageIndex, navigationDirection], setCurrentStageIndex] = useState([0, 0])
    const [wizardState, setWizardState] = useState({})

    const [currentStageName, currentSectionState] = useMemo(() => {
        // We calculate different things, that depend on stage index
        const sectionName = WIZARD_SECTIONS[currentStageIndex]
        if (!wizardState[sectionName]) {
            wizardState[sectionName] = {}
        }
        return [sectionName, wizardState[sectionName]]
    }, [currentStageIndex, wizardState])

    const commitSectionState = useCallback(
        (stageName, newSectionState) => {
            const stateSaveHandler = getStateSaveHandler(stageName)
            stateSaveHandler?.(newSectionState)
            setWizardState({
                ...wizardState,
                [stageName]: newSectionState,
            })
        },
        [wizardState, setWizardState]
    )

    const progressInfo = {
        currentStage: currentStageIndex,
        totalStages: WIZARD_SECTIONS.length,
    }

    const currentSectionHeading = getHeadingForWizard(currentStageName)
    const currentSectionContents = getSectionForWizard(currentStageName)
    const actionButtonState = getButtonState(currentStageName)

    // Navigation actions

    const proceed = (direction) => {
        setCurrentStageIndex([
            Math.max(0, Math.min(WIZARD_SECTIONS.length - 1, currentStageIndex + direction)),
            direction,
        ])
    }

    const exitAction = useCallback(() => {
        navigate("/signup/completed")
    }, [navigate])

    const goToPreviousSection = () => {
        proceed(-1) // left
    }
    useTelegramOnBackListener(goToPreviousSection)

    const goToNextSection = useCallback(() => {
        commitSectionState(currentStageName, currentSectionState)
        if (currentStageIndex == WIZARD_SECTIONS.length - 1) {
            // This was the last section of wizard.
            exitAction()
        } else {
            proceed(+1) // right
        }
    }, [navigate, commitSectionState, currentStageName, currentSectionState])

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
            <LayoutGroup>
                <AnimatePresence>
                    <motion.nav
                        key="pageIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, position: "sticky", top: "2em", zIndex: 1, }}
                        exit={{ opacity: 0, position: "absolute", duration: 0.1 }}
                        layout
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1em",
                            marginBottom: "2em",
                        }}
                    >
                        {weAreInWebBrowser && currentStageIndex > 0 && <BackIcon onClick={goToPreviousSection} />}
                        <PageIndicator progress={progressInfo} />
                    </motion.nav>
                </AnimatePresence>

                <section
                    style={{
                        display: "flex",
                        width: "100%",
                        minHeight: 0,
                        flexGrow: 1,
                    }}
                >
                    <AnimatePresence custom={navigationDirection}>
                        <motion.section
                            key={currentStageName}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={navigationDirection}
                            variants={variants}
                            transition={{
                                ease: "easeOut",
                                duration: 0.25,
                            }}
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch",
                                gap: "1.5em",
                            }}
                        >
                            <SectionHeading
                                title={currentSectionHeading.title}
                                subtitle={currentSectionHeading.subtitle}
                            />
                            <WizardSectionContext.Provider value={currentSectionState}>
                                <span
                                    style={{
                                        display: "flow-root",
                                        flexBasis: 0,
                                        flexGrow: 1,
                                        height: "fit-content",
                                        marginBottom: "7em",
                                    }}
                                >
                                    {currentSectionContents}
                                </span>
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
                    onClick={goToNextSection}
                />
            </PageActionsBlock>
        </div>
    )
}

export default SetupWizardPage
