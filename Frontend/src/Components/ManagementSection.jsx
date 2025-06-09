import React from "react";

export default function ManagementSection({
    title,
    description,
    icon,
    headerColor,
    items,
    itemCountLabel,
    renderItem,
    rightHeaderContent,
}) {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className={`px-8 py-6 ${headerColor}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            {icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{title}</h2>
                            <p className="text-white/80">{description}</p>
                        </div>
                    </div>

                    {rightHeaderContent ? (
                        rightHeaderContent
                    ) : (
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-white font-semibold">
                                {items.length} {itemCountLabel}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8 space-y-6">
                {items.map((item, index) => renderItem(item, index))}
            </div>
        </div>
    );
}
