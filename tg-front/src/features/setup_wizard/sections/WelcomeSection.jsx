import SectionHeading from "../components/SectionHeading"

const WelcomeSection = () => {
    const subtitleContents = (
        <span>Это <a href="#" style={{
            color: "var(--theme_link_color)"
        }}>EatSmart</a>, твой личный ИИ-гуру питания</span>
    )

    return (
        <SectionHeading
            title="Добро пожаловать"
            subtitle={subtitleContents}
            />
    )
}

export default WelcomeSection
