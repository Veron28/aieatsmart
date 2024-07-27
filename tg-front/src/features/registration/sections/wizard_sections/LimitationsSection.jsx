import { memo, useCallback, useContext, useState } from "react"
import { AnimatePresence } from "framer-motion"

import { RiCake3Fill } from "@remixicon/react"

import SmoothImg from "@shared/ui/SmoothImg"

import MeatIcon from "@shared/ui/assets/ingridients/meat.png"
import FishIcon from "@shared/ui/assets/ingridients/fish.png"
import MilkIcon from "@shared/ui/assets/ingridients/milk.png"
import SweetsIcon from "@shared/ui/assets/ingridients/sweets.png"
import FastFoodIcon from "@shared/ui/assets/ingridients/fast_food.png"
import MushroomsIcon from "@shared/ui/assets/ingridients/mushrooms.png"
import FruitsIcon from "@shared/ui/assets/ingridients/fruits.png"
import VegetablesIcon from "@shared/ui/assets/ingridients/vegetables.png"
import FlourBasedIcon from "@shared/ui/assets/ingridients/flour_based.png"
import CerealsIcon from "@shared/ui/assets/ingridients/cereals.png"
import NutsIcon from "@shared/ui/assets/ingridients/nuts.png"

import CrossOutIcon from "@shared/ui/assets/crossout.svg"

import { storeUserLimitations } from "@features/registration/api/RegistrationApi"
import { WizardSectionContext } from "@features/registration/widgets/WizardSectionContext"
import { twMerge } from "tailwind-merge"

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
            {icon ? (
                <div
                    className={twMerge(
                        "relative w-full aspect-square transition-all duration-100 rounded-lg",
                        isSelected ? "p-[25%] bg-[--theme_accent_color]" : "p-[20%] bg-transparent"
                    )}
                >
                    <SmoothImg
                        className={twMerge(
                            "noselect size-full object-contain",
                            isSelected ? "grayscale" : "grayscale-0"
                        )}
                        src={icon}
                        alt={`Thumbnail for ${title}`}
                    />
                    <AnimatePresence>
                        {isSelected ? (
                            <SmoothImg
                                src={CrossOutIcon}
                                alt="cross-out diagonal"
                                className="noselect absolute w-[60%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        ) : null}
                    </AnimatePresence>
                </div>
            ) : null}
            <span
                className={twMerge(
                    "text-sm",
                    isSelected ? "text-[--theme_accent_color]" : "text-[--theme_subtitle_text_color]"
                )}
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
        <div className="grid items-stretch">
            <div
                className="grid gap-3"
                style={{
                    gridTemplateColumns: "repeat(3, 1fr)",
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
