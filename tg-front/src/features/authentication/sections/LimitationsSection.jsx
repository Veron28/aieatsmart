import { useContext, useState } from "react"
import { AnimatePresence } from "framer-motion"

import MeatIcon from "@/assets/ingridients/meat.png"
import FishIcon from "@/assets/ingridients/fish.png"
import MilkIcon from "@/assets/ingridients/milk.png"
import SweetsIcon from "@/assets/ingridients/sweets.png"
import FastFoodIcon from "@/assets/ingridients/fast_food.png"
import MushroomsIcon from "@/assets/ingridients/mushrooms.png"
import FruitsIcon from "@/assets/ingridients/fruits.png"
import VegetablesIcon from "@/assets/ingridients/vegetables.png"
import FlourBasedIcon from "@/assets/ingridients/flour_based.png"
import CerealsIcon from "@/assets/ingridients/cereals.png"
import NutsIcon from "@/assets/ingridients/nuts.png"

import CrossOutIcon from "@/assets/crossout.svg"

import { WizardSectionContext } from "../components/WizardSectionContext"

const limitationsList = [
    {
        title: "Говядина",
        icon: MeatIcon,
    },
    {
        title: "Рыба",
        icon: FishIcon,
    },
    {
        title: "Молочное",
        icon: MilkIcon,
    },
    {
        title: "Сладости",
        icon: SweetsIcon,
    },
    {
        title: "Фастфуд",
        icon: FastFoodIcon,
    },
    {
        title: "Грибы",
        icon: MushroomsIcon,
    },
    {
        title: "Фрукты",
        icon: FruitsIcon,
    },
    {
        title: "Овощи",
        icon: VegetablesIcon,
    },
    {
        title: "Мучное",
        icon: FlourBasedIcon,
    },
    {
        title: "Крупы",
        icon: CerealsIcon,
    },
    {
        title: "Орехи",
        icon: NutsIcon,
    },
]

const LimitationCard = ({ isSelected: defaultIsSelected, limitation, onSelectionChange }) => {
    const [isSelected, setIsSelected] = useState(defaultIsSelected ?? false)
    const { title, icon } = limitation

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: ".7em",
                transition: "all .2s",
            }}
            onClick={() => {
                const newState = !isSelected
                setIsSelected(newState)
                onSelectionChange(newState)
            }}
        >
            {icon && (
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "1/1",
                        boxSizing: "border-box",
                        padding: isSelected ? "30%" : "20%",
                        borderRadius: ".5em",
                        backgroundColor: isSelected ? "var(--theme_accent_color)" : "transparent",
                        transition: "all .1s",
                    }}
                >
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            filter: `grayscale(${isSelected ? 1 : 0})`,
                        }}
                        className="noselect"
                        src={icon}
                        alt={`Thumbnail for ${title}`}
                    />
                    <AnimatePresence>
                        {isSelected && (
                            <img
                                src={CrossOutIcon}
                                alt="cross-out diagonal"
                                className="noselect"
                                style={{
                                    width: "60%",
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    translate: "-50% -50%",
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            )}
            <span
                style={{
                    fontSize: ".875em",
                    color: isSelected ? "var(--theme_accent_color)" : "var(--theme_subtitle_text_color)",
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
