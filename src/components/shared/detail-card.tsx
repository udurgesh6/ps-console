import { Badge } from "@/components/ui/badge";
import { StatItem } from "./stat-item-card";

export const DetailCard = ({ details }) => {
    const { name, type, status, badgeVariant, stats } = details;

    const badgeClasses = {
        default: "bg-green-100 text-green-700 border-green-200",
        secondary: "bg-blue-100 text-blue-700 border-blue-200",
        destructive: "bg-red-100 text-red-700 border-red-200",
        outline: "bg-gray-100 text-gray-700 border-gray-200",
    }[badgeVariant] || "bg-gray-100 text-gray-700 border-gray-200";

    return (
        <div className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-white">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-4">
                    <h4 className="font-semibold text-slate-900 truncate">{name}</h4>
                    {type && <p className="text-sm text-slate-600 truncate mt-0.5">{type}</p>}
                </div>
                <Badge
                    variant={badgeVariant}
                    className={badgeClasses}
                >
                    {status}
                </Badge>
            </div>

            <div className={`grid gap-3 text-sm`} style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
                {stats.map((stat, index) => (
                    <StatItem
                        key={index}
                        icon={stat.icon}
                        label={stat.label}
                        iconClassName={stat.iconClassName}
                    />
                ))}
            </div>
        </div>
    );
};

