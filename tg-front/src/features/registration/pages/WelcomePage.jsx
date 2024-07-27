import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { RiArrowRightLine as ForwardIcon } from "@remixicon/react"

import { getBotUrl } from "@/utils/ApplicationLinks"

import SectionHeading from "@/components/SectionHeading"
import PageActionsBlock from "@/components/PageActionsBlock"
import UltimateActionButton from "@/components/UltimateActionButton"

import WelcomeSection from "@/features/registration/sections/WelcomeSection"
import { startRegistration } from "@/features/registration/api/RegistrationApi"

const WelcomePage = () => {
    const navigate = useNavigate()
    const onStartClick = useCallback(() => {
        startRegistration()
        navigate("/signup")
    }, [navigate])

    return (
        <div className="page w-full flex relative flex-col items-stretch">
            <SectionHeading
                title="Добро пожаловать"
                subtitle={
                    <span>
                        Это{" "}
                        <a href={getBotUrl()} className="text-[--theme_link_color]" target="__blank">
                            EatSmart
                        </a>
                        , твой личный ИИ-гуру питания
                    </span>
                }
            />
            <PageActionsBlock>
                <div className="flex flex-col items-stretch gap-4">
                    <span className="p-4 rounded-lg text-sm drop-shadow-lg text-[--theme_subtitle_text_color] bg-[--theme_section_bg_color]">
                        Пройдите короткую регистрацию <wbr />и расскажите о себе, <wbr />
                        чтобы бот работал максимально точно
                    </span>
                    <UltimateActionButton text="Начать" icon={<ForwardIcon />} onClick={onStartClick} />
                </div>
            </PageActionsBlock>
            <WelcomeSection />
        </div>
    )
}

export default WelcomePage
