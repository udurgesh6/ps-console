
import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChartHeading } from './chart-heading';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  description?: string;
}

interface StatDisplayProps {
  title: string;
  icon: LucideIcon;
  stats: StatItem[];
  className?: string;
}

export const StatDisplay: FC<StatDisplayProps> = ({ title, icon, stats, className = '' }) => {
  const getVariantStyles = (variant: StatItem['variant']) => {
    switch (variant) {
      case 'success':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'warning':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'danger':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-900 bg-slate-50 border-slate-200';
    }
  };

  return (
    <Card className={className}>
      <ChartHeading title={title} icon={icon} />
      <CardContent className="space-y-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white transition-all"
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 text-slate-600">
                  {stat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-slate-600 block">
                    {stat.label}
                  </span>
                  {stat.description && (
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {stat.description}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`px-3 py-1.5 rounded-md border font-medium text-sm transition-colors ${getVariantStyles(
                  stat.variant
                )}`}
              >
                {stat.value}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
