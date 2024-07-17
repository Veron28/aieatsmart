import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, LayoutGroup, m as motion } from "framer-motion"
import {
    RiArrowLeftLine as BackIcon,
    RiArrowRightLine as ForwardIcon,
    RiCheckFill as CheckmarkIcon,
    RiEmpathizeFill as BasicsiStageIcon,
    RiHealthBookFill as HealthStageIcon,
    RiCheckboxCircleFill as GoalsStageIcon,
    RiCake3Fill as LimitationsStageIcon,
    RiMentalHealthFill as LifestyleStageIcon,
} from "@remixicon/react"

import SectionHeading from "@/components/SectionHeading"
import UltimateActionButton from "@/components/UltimateActionButton"
import PageActionsBlock from "@/components/PageActionsBlock"
import StyledIcon from "@/components/StyledIcon"

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

const getIconForWizard = (currentStageName) => {
    switch (currentStageName) {
        case SECTION_BASICS:
            return <BasicsiStageIcon />
        case SECTION_HEALTH:
            return <HealthStageIcon />
        case SECTION_GOALS:
            return <GoalsStageIcon />
        case SECTION_LIMITATIONS:
            return <LimitationsStageIcon />
        case SECTION_LIFESTYLE:
            return <LifestyleStageIcon />
        default:
            return null
    }
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

export default () => {
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

    const currentSectionHeading = getHeadingForWizard(currentStageName)
    const currentSectionContents = getSectionForWizard(currentStageName)
    const currentSectionIcon = getIconForWizard(currentStageName)
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
        if (currentStageIndex == WIZARD_SECTIONS.length) {
            // This was the last section of wizard.
            exitAction()
        } else {
            proceed(+1) // right
        }
    }, [navigate, commitSectionState, currentStageName, currentSectionState])

    return (
        <div className="w-full relative flex flex-col items-stretch page">
            <LayoutGroup>
                <AnimatePresence>
                    <motion.nav
                        key="wizardStageIndicator"
                        className="h-fit flex items-center gap-4 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, position: "sticky", top: "2em", zIndex: 1 }}
                        exit={{ opacity: 0, position: "absolute", duration: 0.1 }}
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
                    <span className="p-1.5">
                        <StyledIcon iconShape={currentSectionIcon} />
                    </span>
                </span>

                <section className="w-full flex min-h-0 grow">
                    <AnimatePresence custom={navigationDirection}>
                        <motion.section
                            className="w-full grid gap-6"
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
                        >
                            <SectionHeading
                                title={currentSectionHeading.title}
                                subtitle={currentSectionHeading.subtitle}
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
                    onClick={goToNextSection}
                />
                <span className="mt-4 text-center text-sm text-[--theme_text_hint_color]">
                    Ещё <span className="text-[--theme_accent_color]">{stagesLeft}</span> до конца регистрации
                </span>
            </PageActionsBlock>
        </div>
    )
}
