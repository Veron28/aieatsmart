import { memo } from "react"

const PCFBreakdownItem = ({ consumptionItem }) => {
    return (
        <>
            <span
                className="size-2 aspect-square rounded-full self-center"
                style={{
                    backgroundColor: consumptionItem.color,
                }}
            />
            <h3 className="font-medium">{consumptionItem.name}</h3>
            <span />
            <p className="text-sm text-[--theme_subtitle_text_color]">
                {consumptionItem.gramms ? `${consumptionItem.gramms} гр` : "Нет данных"}
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
            className="grid gap-x-2 gap-y-3"
            style={{
                gridTemplateColumns: "auto 1fr",
            }}
        >
            {consumptionItemViews}
        </div>
    )
}

export default memo(PCFBreakdown)
