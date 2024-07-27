import { memo, useCallback, useContext, useState } from "react"
import { AnimatePresence } from "framer-motion"

import { RiCake3Fill } from "@remixicon/react"

import SmoothImg from "@shared/components/SmoothImg"

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

import { storeUserLimitations } from "@/features/registration/api/RegistrationApi"
import { WizardSectionContext } from "@/features/registration/components/WizardSectionContext"

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
            className="flex flex-col justify-center items-center gap-[.7em] transition-all"
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
                        padding: isSelected ? "25%" : "20%",
                        borderRadius: ".5em",
                        backgroundColor: isSelected ? "var(--theme_accent_color)" : "transparent",
                        transition: "all .1s",
                    }}
                >
                    <SmoothImg
                        style={{
                            filter: `grayscale(${isSelected ? 1 : 0})`,
                        }}
                        className="noselect size-full object-contain"
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
        if (isSelected) {
            sectionData.base.push(limitation.title)
        } else {
            sectionData.base = sectionData.base.filter((item) => item !== limitation.title)
        }
    }
    return <LimitationCard key={limitation.title} limitation={limitation} onSelectionChange={onChangeFn} />
}

const LimitationsSectionContents = memo(() => {
    const sectionData = useContext(WizardSectionContext)
    if (!sectionData.base) {
        sectionData.base = []
    }
    const limitationCards = limitationsList.map(getLimitationCard)
    const updateExtraLimitationsInformation = useCallback(
        (event) => {
            event?.preventDefault?.()
            sectionData.extra = event?.target?.value ?? undefined
        },
        [sectionData]
    )

    return (
        <div className="flex flex-col items-stretch">
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: ".6em",
                }}
            >
                {limitationCards}
            </div>
            <span className="mt-8 mb-3">Не нашли в списке?</span>
            <textarea
                className="rounded-lg drop-shadow-2xl bg-white min-h-16 p-4 text-sm"
                placeholder="Перечислите здесь продукты, которые вы не едите.&#10;Не более 2500 символов."
                autocomplete="off"
                autocapitalize="sentences"
                maxLength={2500}
                onChange={updateExtraLimitationsInformation}
                style={{
                    resize: "none",
                }}
            />
        </div>
    )
})

export default {
    sectionContents: <LimitationsSectionContents />,
    metaContents: {
        sectionName: "limitations",
        title: "Исключаемые продукты",
        subtitle: (
            <span style={{ display: "contents" }}>
                Выберите категории продуктов,
                <wbr /> которые Вы не едите:
            </span>
        ),
        sectionIcon: <RiCake3Fill />,
    },
    dataHandlers: {
        saveState: storeUserLimitations,
    },
}
