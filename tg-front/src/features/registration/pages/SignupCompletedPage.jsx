import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { RiArrowRightLine as ForwardIcon } from "@remixicon/react"

import { getBotUrl } from "@/utils/ApplicationLinks"

import SectionHeading from "@/components/SectionHeading"
import PageActionsBlock from "@/components/PageActionsBlock"
import SimpleButton from "@/components/SimpleButton"
import UltimateActionButton from "@/components/UltimateActionButton"

import SignupCompletedSection from "@/features/registration/sections/SignupCompletedSection"

const SignupCompletePage = () => {
    const navigate = useNavigate()
    const goToStatistics = useCallback(() => {
        navigate("/statistics")
    }, [navigate])
    const goToChat = useCallback(() => {
        navigate(getBotUrl)
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
            <SectionHeading title="Готово" subtitle={<span>Бонус уже ждёт тебя в чате</span>} />
            <PageActionsBlock>
                <SimpleButton plain onClick={goToStatistics} text="Перейти в статистику" />
                <UltimateActionButton text="Открыть чат" icon={<ForwardIcon />} onClick={goToChat} />
            </PageActionsBlock>
            <SignupCompletedSection />
        </div>
    )
}

export default SignupCompletePage
