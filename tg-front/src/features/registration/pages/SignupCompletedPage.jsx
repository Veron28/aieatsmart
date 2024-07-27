import { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { RiArrowRightLine as ForwardIcon } from "@remixicon/react"

import { getBotUrl } from "@/utils/ApplicationLinks"
import { closeMiniApp, openTelegramLink } from "@/utils/TelegramUtils"

import SectionHeading from "@shared/components/SectionHeading"
import PageActionsBlock from "@shared/components/PageActionsBlock"
import SimpleButton from "@shared/components/SimpleButton"
import UltimateActionButton from "@shared/components/UltimateActionButton"

import SignupCompletedSection from "@/features/registration/sections/SignupCompletedSection"

export default memo(() => {
    const navigate = useNavigate()
    const goToStatistics = useCallback(() => {
        navigate("/statistics")
    }, [navigate])
    const goToChat = useCallback(() => {
        openTelegramLink(getBotUrl())
        closeMiniApp()
    }, [navigate])

    return (
        <div className="page w-full flex flex-col items-stretch relative">
            <SectionHeading title="Готово" subtitle={<span>Бонус уже ждёт тебя в чате</span>} />
            <PageActionsBlock>
                <SimpleButton plain onClick={goToStatistics} text="Перейти в статистику" />
                <UltimateActionButton text="Открыть чат" icon={<ForwardIcon />} onClick={goToChat} />
            </PageActionsBlock>
            <SignupCompletedSection />
        </div>
    )
})
