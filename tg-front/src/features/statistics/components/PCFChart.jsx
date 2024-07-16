import { memo } from "react"

export default memo(({ pcfConsumption }) => {
    const totalConsumption = pcfConsumption.map((dataItem) => dataItem.calories).reduce((a, b) => a + b, 0)
    const consuptionBars = pcfConsumption.map((dataItem, index) => {
        const topRadius = index === 0 ? ".5em" : ".25em"
        const bottomRadius = index === pcfConsumption.length - 1 ? ".5em" : ".25em"

        return (
            <span
                key={dataItem.name}
                style={{
                    backgroundColor: dataItem.color,
                    flexGrow: dataItem.calories / totalConsumption,
                    borderTopLeftRadius: topRadius,
                    borderTopRightRadius: topRadius,
                    borderBottomLeftRadius: bottomRadius,
                    borderBottomRightRadius: bottomRadius,
                }}
            ></span>
        )
    })

    return <figure className="min-w-5 flex flex-col flex-nowrap gap-1">{consuptionBars}</figure>
})
