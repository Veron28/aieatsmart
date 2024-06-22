import { useCallback } from "react"

import { RiArrowRightLine as ForwardIcon } from "@remixicon/react"

import SectionHeading from "@/components/SectionHeading"
import PageActionsBlock from "@/components/PageActionsBlock"
import UltimateActionButton from "@/components/UltimateActionButton"

import { getBotUrl } from "@/utils/ApplicationLinks"

import WelcomeSection from "@/features/registration/sections/WelcomeSection"

import { startRegistration } from "@/features/registration/api/RegistrationApi"
import { useNavigate } from "react-router-dom"

const WelcomePage = () => {
    const navigate = useNavigate()
    const onStartClick = useCallback(() => {
        startRegistration()
        navigate("/signup")
    }, [navigate])

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
            <SectionHeading
                title="Добро пожаловать"
                subtitle={
                    <span>
                        Это{" "}
                        <a
                            href={getBotUrl()}
                            style={{
                                color: "var(--theme_link_color)",
                            }}
                            target="__blank"
                        >
                            EatSmart
                        </a>
                        , твой личный ИИ-гуру питания
                    </span>
                }
            />
            <PageActionsBlock>
                <UltimateActionButton text="Начать" icon={<ForwardIcon />} onClick={onStartClick} />
            </PageActionsBlock>
            <WelcomeSection />
        </div>
    )
}

export default WelcomePage
