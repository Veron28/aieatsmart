import React, { useEffect, useCallback, useMemo, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { twMerge } from "tailwind-merge"

const CIRCLE_DEGREES = 360
const WHEEL_ITEM_SIZE = 64
const WHEEL_ITEM_COUNT = 13
const WHEEL_ITEMS_IN_VIEW = 3

export const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT
export const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW
export const WHEEL_RADIUS = Math.round(WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT))

const isInView = (wheelLocation, slidePosition) => Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES

const setSlideStyles = (emblaApi, index, loop, slideCount, totalRadius) => {
    const slideNode = emblaApi.slideNodes()[index]
    const wheelLocation = emblaApi.scrollProgress() * totalRadius
    const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius
    const positionLoopStart = positionDefault + totalRadius
    const positionLoopEnd = positionDefault - totalRadius

    let inView = false
    let angle = index * -WHEEL_ITEM_RADIUS

    if (isInView(wheelLocation, positionDefault)) {
        inView = true
    }

    if (loop && isInView(wheelLocation, positionLoopEnd)) {
        inView = true
        angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS
    }

    if (loop && isInView(wheelLocation, positionLoopStart)) {
        inView = true
        angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS
    }

    if (inView) {
        slideNode.style.opacity = "1"
        slideNode.style.transform = `translateY(-${index * 100}%) rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`
    } else {
        slideNode.style.opacity = "0"
        slideNode.style.transform = "none"
    }
}

export const setContainerStyles = (emblaApi, wheelRotation) => {
    emblaApi.containerNode().style.transform = `rotateX(${wheelRotation}deg)`
}

export const NumberPickerItem = ({ minValue, maxValue, loop = false, onChange }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop,
        axis: "y",
        dragFree: true,
        containScroll: "keepSnaps",
        watchSlides: false,
    })
    const [slideCount, slides, slideViews] = useMemo(() => {
        const carouselItemsCount = Math.max(1, 1 + (maxValue ?? 0) - (minValue ?? 0))
        const carouselItemValues = [...Array(carouselItemsCount).keys()].map((i) => minValue + i)
        const carouselItemViews = carouselItemValues.map((slideData) => (
            <li
                key={slideData}
                className={twMerge(
                    "h-full flex justify-center items-center px-12",
                    "text-4xl text-center font-medium noselect",
                    "text-[--theme_accent_color] opacity-0"
                )}
                style={{
                    backfaceVisibility: "hidden",
                }}
            >
                {slideData}
            </li>
        ))

        return [carouselItemsCount, carouselItemValues, carouselItemViews]
    }, [minValue, maxValue])

    const onSelectedListener = useCallback(() => {
        const selectedSlide = emblaApi.selectedScrollSnap()
        const newSelectedValue = slides[selectedSlide]
        onChange?.(newSelectedValue)
    }, [emblaApi, slides, onChange])

    const totalRadius = slideCount * WHEEL_ITEM_RADIUS
    const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS

    const inactivateEmblaTransform = (emblaApi) => {
        if (!emblaApi) return
        const { translate, slideLooper } = emblaApi.internalEngine()
        translate.clear()
        translate.toggleActive(false)
        slideLooper.loopPoints.forEach(({ translate }) => {
            translate.clear()
            translate.toggleActive(false)
        })
    }

    const rotateWheel = useCallback(
        (emblaApi) => {
            const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset
            const wheelRotation = rotation * emblaApi.scrollProgress()
            setContainerStyles(emblaApi, wheelRotation)
            emblaApi.slideNodes().forEach((_, index) => {
                setSlideStyles(emblaApi, index, loop, slideCount, totalRadius)
            })
        },
        [slideCount, rotationOffset, totalRadius]
    )

    useEffect(() => {
        if (!emblaApi) return

        emblaApi.on("pointerUp", (emblaApi) => {
            const { scrollTo, target, location } = emblaApi.internalEngine()
            const diffToTarget = target.get() - location.get()
            const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1
            const distance = diffToTarget * factor
            scrollTo.distance(distance, true)
        })

        if (onChange) {
            emblaApi.on("select", onSelectedListener)
        }

        emblaApi.on("scroll", rotateWheel)

        emblaApi.on("reInit", (emblaApi) => {
            inactivateEmblaTransform(emblaApi)
            rotateWheel(emblaApi)
        })

        inactivateEmblaTransform(emblaApi)
        rotateWheel(emblaApi)
    }, [emblaApi, inactivateEmblaTransform, rotateWheel, onChange])

    return (
        <div className="size-full flex items-center justify-center">
            <div
                ref={emblaRef}
                className={`w-full h-12`}
                style={{
                    perspective: "1000px",
                }}
            >
                <ul
                    className="size-full will-change-transform"
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
                    {slideViews}
                </ul>
            </div>
        </div>
    )
}
