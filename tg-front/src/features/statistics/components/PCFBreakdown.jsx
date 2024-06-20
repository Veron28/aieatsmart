import { memo } from "react"

const PCFBreakdownItem = ({ consumptionItem }) => {
    return (
        <>
            <span
                style={{
                    width: ".5em",
                    height: ".5em",
                    aspectRatio: "1/1",
                    borderRadius: "50%",
                    boxSizing: "border-box",
                    alignSelf: "center",
                    backgroundColor: consumptionItem.color,
                }}
            ></span>
            <h3
                style={{
                    fontWeight: 500,
                }}
            >
                {consumptionItem.name}
            </h3>
            <span></span>
            <p
                style={{
                    fontSize: "0.875em",
                    color: "var(--theme_subtitle_text_color)",
                }}
            >
                {`${consumptionItem.calories} ккал, ${consumptionItem.gramms} гр`}
            </p>
        </>
    )
}

const PCFBreakdown = ({ pcfConsumption }) => {
    const consumptionItemViews = pcfConsumption.map((consumptionDataItem) => (
        <PCFBreakdownItem key={consumptionDataItem.title} consumptionItem={consumptionDataItem} />
    ))

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                rowGap: ".7em",
                columnGap: ".4em",
            }}
        >
            {consumptionItemViews}
        </div>
    )
}

export default memo(PCFBreakdown)
