import { memo } from "react"

const BADGE_PAST = 0
const BADGE_CURRENT = 1
const BADGE_FUTURE = 2

const PageIndicatorBadge = ({ badgeState }) => {
    let badgeStylingProps
    switch (badgeState) {
        case BADGE_PAST:
            badgeStylingProps = {
                borderWidth: "3px",
                backgroundColor: "var(--theme_button_color)",
                borderColor: "var(--theme_accent_light_color)",
            }
            break
        case BADGE_FUTURE:
            badgeStylingProps = {
                borderWidth: "1px",
                borderColor: "var(--theme_text_hint_color)",
            }
            break
        case BADGE_CURRENT:
        default:
            badgeStylingProps = {
                borderWidth: "4px",
                borderColor: "var(--theme_button_color)",
            }
    }

    return (
        <span
            style={{
                width: "12px",
                height: "12px",
                boxSizing: "border-box",
                border: "solid",
                borderRadius: "50%",
                transition: "all .3s",
                ...badgeStylingProps,
            }}
        />
    )
}

const PageIndicator = ({ progress, style: styleProps }) => {
    const currentStage = progress?.currentStage ?? 1
    const totalStages = progress?.totalStages ?? 0

    if (totalStages === 0) {
        return null
    }

    const stepBadges = []
    for (let stepNumber = 0; stepNumber < totalStages; stepNumber++) {
        let stepType = BADGE_CURRENT
        if (stepNumber < currentStage) {
            stepType = BADGE_PAST
        } else if (stepNumber > currentStage) {
            stepType = BADGE_FUTURE
        }

        const stepBadge = <PageIndicatorBadge key={stepNumber} badgeState={stepType} />
        stepBadges.push(stepBadge)
    }

    return (
        <div
            style={{
                width: "fit-content",
                backgroundColor: "var(--theme_section_bg_color)",
                display: "flex",
                alignItems: "center",
                padding: "8px",
                gap: "10px",
                borderRadius: "60px",
                boxShadow: "0px 4px 52px 8px rgba(0, 0, 0, 0.15)",
                ...styleProps,
            }}
        >
            {stepBadges}
        </div>
    )
}

export default memo(PageIndicator)
