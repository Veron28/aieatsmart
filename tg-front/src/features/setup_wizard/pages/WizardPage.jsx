import { useCallback, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { RiArrowLeftLine as BackIcon } from "@remixicon/react"
import { useNavigate } from "react-router-dom"

import SectionHeading from "../../../components/SectionHeading"
import UltimateActionButton from "../../../components/UltimateActionButton"

import PageIndicator from "../components/PageIndicator"

import WelcomeSection from "../sections/WelcomeSection"
import BasicsSection from "../sections/BasicsSection"
import HealthSection from "../sections/HealthSection"
import FinalSection from "../sections/FinalSection"

import { weAreInWebBrowser, useOnBackListener } from "../../../utils/TelegramUtils"

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

const getHeadingForWizard = (sectionName) => {
    switch (sectionName) {
        case SECTION_WELCOME:
            return {
                title: "Добро пожаловать",
                subtitle: (
                    <span>
                        Это{" "}
                        <a
                            href="#"
                            style={{
                                color: "var(--theme_link_color)",
                            }}
                        >
                            EatSmart
                        </a>
                        , твой личный ИИ-гуру питания
                    </span>
                ),
            }
        case SECTION_BASICS:
            return {
                title: "Основное",
                subtitle: "Чем больше мы о Вас знаем, тем лучше мы сможем Вам помочь:",
            }
        case SECTION_HEALTH:
            return {
                title: "Здоровье",
                subtitle: "Пожалуйста, укажите все имеющиеся у Вас медицинские противопоказания:",
            }
        case SECTION_GOALS:
            return {
                title: "Цели",
                subtitle: "Выберите одну или несколько целей, которые больше Вам подходят:",
            }
        case SECTION_PREFERENCES:
            return {
                title: "Предпочтения",
                subtitle: "Выберите продукты и блюда, которые Вы предпочитаете употреблять:",
            }
        case SECTION_LIFESTYLE:
            return {
                title: "Стресс и образ жизни",
                subtitle: "Расскажите нам больше о Вашем рационе и распорядке дня:",
            }
        case SECTION_FINAL:
            return {
                title: "Готово",
                subtitle: "Бонус уже ждет тебя в чате",
            }
        default:
            return null
    }
}

const getSectionForWizard = (sectionName) => {
    switch (sectionName) {
        case SECTION_WELCOME:
            return <WelcomeSection />
        case SECTION_BASICS:
            return <BasicsSection />
        case SECTION_HEALTH:
            return <HealthSection />
        case SECTION_GOALS:
            return null
        case SECTION_PREFERENCES:
            return null
        case SECTION_LIFESTYLE:
            return null
        case SECTION_FINAL:
            return <FinalSection />
        default:
            return null
    }
}

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? "100dvw" : "-100dvw",
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

const SetupWizardPage = () => {
    const [[currentStageIndex, navigationDirection], setCurrentStageIndex] = useState([0, 0])
    const currentStageName = WIZARD_SECTIONS[currentStageIndex]
    const navigate = useNavigate()

    const progressInfo = {
        currentStage: currentStageIndex,
        totalStages: WIZARD_SECTIONS.length - 2,
    }

    const weAreInWizard = currentStageName !== SECTION_WELCOME && currentStageName !== SECTION_FINAL

    const currentSectionHeading = getHeadingForWizard(currentStageName)
    const currentSectionContents = getSectionForWizard(currentStageName)

    const goToPreviousSection = () => {
        setCurrentStageIndex([
            Math.max(0, Math.min(WIZARD_SECTIONS.length - 1, currentStageIndex - 1)),
            -1, // left
        ])
    }
    const goToNextSection = useCallback(() => {
        if (currentStageIndex === WIZARD_SECTIONS.length - 1) {
            navigate("/statistics")
            return
        }

        setCurrentStageIndex([
            Math.max(0, Math.min(WIZARD_SECTIONS.length - 1, currentStageIndex + 1)),
            1, // right
        ])
    }, [navigate, currentStageIndex])

    useOnBackListener(goToPreviousSection)

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
                    {weAreInWizard && (
                        <motion.nav
                            key="pageIndicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, position: "absolute", duration: 0.1 }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1em",
                                marginTop: "2em",
                                marginBottom: "2em",
                            }}
                        >
                            {weAreInWebBrowser && <BackIcon onClick={goToPreviousSection} />}
                            <PageIndicator progress={progressInfo} />
                        </motion.nav>
                    )}
                </AnimatePresence>

                <section
                    style={{
                        display: "flex",
                        width: "100%",
                        minHeight: 0,
                        flexGrow: 1,
                    }}
                >
                    <AnimatePresence initial={false} custom={navigationDirection}>
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
                            }}
                        >
                            <SectionHeading
                                title={currentSectionHeading.title}
                                subtitle={currentSectionHeading.subtitle}
                            />
                            {currentSectionContents}
                        </motion.section>
                    </AnimatePresence>
                </section>
            </LayoutGroup>

            <UltimateActionButton
                text="Начать"
                progress={progressInfo}
                style={{
                    position: "absolute",
                    bottom: "2em",
                    left: 0,
                    right: 0,
                }}
                onClick={goToNextSection}
            />
        </div>
    )
}

export default SetupWizardPage
