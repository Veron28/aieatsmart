import { useContext, useState } from "react"
import { WizardSectionContext } from "../components/WizardSectionContext"

const limitationsList = [
    {
        title: "Говядина",
    },
    {
        title: "Овощи",
    },
    {
        title: "Клубника",
    },
    {
        title: "Картофель",
    },
    {
        title: "Перец",
    },
    {
        title: "Спагетти",
    },
    {
        title: "Макароны",
    },
    {
        title: "Хлеб",
    },
    {
        title: "Капуста",
    },
    {
        title: "Крупа",
    },
    {
        title: "Сыр",
    },
    {
        title: "Киви",
    },
    {
        title: "Цитрусовые",
    },
    {
        title: "Рис",
    },
    {
        title: "Шоколад",
    },
]

const LimitationCard = ({ isSelected: defaultIsSelected, limitation, onSelectionChange }) => {
    const [isSelected, setIsSelected] = useState(defaultIsSelected ?? false)
    const { title, image } = limitation

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                aspectRatio: "1/1",
                gap: ".7em",
                padding: isSelected ? "1.2em" : ".5em",
                transition: "all .3s",
                borderRadius: ".2em",
                backgroundColor: isSelected ? "var(--theme_bg_secondary_color)" : "transparent",
            }}
            onClick={() => {
                const newState = !isSelected
                setIsSelected(newState)
                onSelectionChange(newState)
            }}
        >
            <span
                style={{
                    width: "100%",
                    minHeight: "4em",
                    aspectRatio: "1/1",
                    borderRadius: ".25em",
                    backgroundColor: "var(--theme_section_bg_color)",
                }}
            >
                {image && (
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        src={image}
                        alt={`Thumbnail for ${title}`}
                    />
                )}
            </span>
            <span
                style={{
                    fontSize: ".875em",
                    color: isSelected ? "var(--theme_text_color)" : "var(--theme_text_hint_color)",
                }}
            >
                {title}
            </span>
        </div>
    )
}

const getLimitationCard = (limitation) => {
    const onChangeFn = (isSelected) => {
        const sectionData = useContext(WizardSectionContext)
        if (!sectionData.base) {
            sectionData.base = []
        }
        if (isSelected) {
            sectionData.base.push(limitation.title)
        } else {
            sectionData.base = sectionData.base.filter((item) => item !== limitation.title)
        }
    }
    return <LimitationCard key={limitation.title} limitation={limitation} onSelectionChange={onChangeFn} />
}

const LimitationsSection = () => {
    const limitationCards = limitationsList.map(getLimitationCard)

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: ".6em",
            }}
        >
            {limitationCards}
        </div>
    )
}

export default LimitationsSection
