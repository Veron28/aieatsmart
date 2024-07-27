import { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { RiArrowRightLine as ForwardIcon } from "@remixicon/react"

import { getBotUrl } from "@shared/utils/ApplicationLinks"
import { closeMiniApp, openTelegramLink } from "@shared/utils/TelegramUtils"

import SectionHeading from "@shared/ui/SectionHeading"
import PageActionsBlock from "@shared/ui/PageActionsBlock"
import SimpleButton from "@shared/ui/SimpleButton"
import UltimateActionButton from "@shared/ui/UltimateActionButton"

import SignupCompletedSection from "@features/registration/sections/SignupCompletedSection"

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
