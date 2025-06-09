import { TrendingUp } from "lucide-react";

export default function StatCard({
    icon: Icon,
    title,
    value,
    subtitle,
    bgFrom,
    bgTo,
    iconBg,
    textColor,
    borderColor,
    trendColor,
}) {
    return (
        <div
            className={`group relative overflow-hidden bg-gradient-to-br ${bgFrom} ${bgTo} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${borderColor}`}
        >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
            <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${iconBg} rounded-xl`}>
                        <Icon className="h-8 w-8 text-white" />
                    </div>
                    <TrendingUp className={`h-5 w-5 ${trendColor}`} />
                </div>
                <div className="space-y-1">
                    <p className={`${textColor} text-sm font-medium`}>{title}</p>
                    <p className={`text-4xl font-bold ${textColor}`}>{value}</p>
                    <p className={`${trendColor} text-xs`}>{subtitle}</p>
                </div>
            </div>
        </div>
    );
}
