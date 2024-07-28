import { m as motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

export default ({ className, ...imgProps }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const imageRef = useRef(null)

    useEffect(() => {
        if (imageRef.current && imageRef.current.complete) {
            setIsLoaded(true)
        }
    }, [])

    const handleImageLoaded = () => {
        setIsLoaded(true)
    }

    return (
        <motion.img
            className={twMerge(className, isLoaded ? "block" : "hidden")}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onLoad={handleImageLoaded}
            ref={imageRef}
            decoding="async"
            {...imgProps}
        />
    )
}
