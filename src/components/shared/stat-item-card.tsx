import { LucideIcon } from "lucide-react";

interface StatItemProps {
    icon: LucideIcon;
    label: string;
    iconColor?: string;
    iconBgColor?: string;
    iconClassName?: string; // Keep for backward compatibility
}

export const StatItem = ({ 
    icon: Icon, 
    label, 
    iconColor,
    iconBgColor,
    iconClassName 
}: StatItemProps) => {
    return (
        <div className="flex items-center gap-2">
            <div
                className="p-1.5 rounded-lg flex-shrink-0"
                style={{ 
                    backgroundColor: iconBgColor || 'rgba(0, 0, 0, 0.05)' 
                }}
            >
                <Icon 
                    className={iconClassName || "h-4 w-4"} 
                    style={iconColor ? { color: iconColor } : undefined}
                />
            </div>
            <span className="text-slate-600 text-xs truncate">{label}</span>
        </div>
    );
};
