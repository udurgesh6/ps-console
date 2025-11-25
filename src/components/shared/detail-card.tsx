import { Badge } from "@/components/ui/badge";
import { StatItem } from "./stat-item-card";
import { COLOR_SCHEMES } from "@/constants/colors";
import { LucideIcon } from "lucide-react";

interface Stat {
    icon: LucideIcon;
    label: string;
    iconColor?: string;
    iconBgColor?: string;
}

interface Details {
    name: string;
    type?: string;
    status: string;
    badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline';
    stats: Stat[];
}

export const DetailCard = ({ details }: { details: Details }) => {
    const { name, status, badgeVariant, stats } = details;

    const badgeClasses = {
        default: "border-0",
        secondary: "border-0",
        destructive: "border-0",
        outline: "border-0",
    }[badgeVariant] || "border-0";

    const badgeStyles = {
        default: {
            backgroundColor: COLOR_SCHEMES.status.success.bg,
            color: COLOR_SCHEMES.status.success.main,
        },
        secondary: {
            backgroundColor: COLOR_SCHEMES.status.info.bg,
            color: COLOR_SCHEMES.status.info.main,
        },
        destructive: {
            backgroundColor: COLOR_SCHEMES.risk.high.bg,
            color: COLOR_SCHEMES.risk.high.main,
        },
        outline: {
            backgroundColor: COLOR_SCHEMES.status.info.bg,
            color: COLOR_SCHEMES.status.info.main,
        },
    }[badgeVariant];

    return (
        <div className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-white">
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 pr-4">
                    <h4 className="font-semibold text-slate-900 truncate">{name}</h4>
                </div>
                <Badge
                    variant={badgeVariant}
                    className={badgeClasses}
                    style={badgeStyles}
                >
                    {status}
                </Badge>
            </div>

            <div 
                className="grid gap-3 text-sm" 
                style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
            >
                {stats.map((stat, index) => (
                    <StatItem
                        key={index}
                        icon={stat.icon}
                        label={stat.label}
                        iconColor={stat.iconColor}
                        iconBgColor={stat.iconBgColor}
                    />
                ))}
            </div>
        </div>
    );
};
