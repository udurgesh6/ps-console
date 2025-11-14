import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartHeading } from "@/components/charts/chart-heading";
import { LucideIcon, TrendingUp } from "lucide-react";

interface SummaryItem {
  text: string;
  variant?: 'success' | 'warning' | 'info';
}

interface SummaryProps {
  icon: LucideIcon;
  summaryTitle1: string;
  summary1: SummaryItem[];
  summaryTitle2: string;
  summary2: SummaryItem[];
  recommendedAction?: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  };
  className?: string;
}

export const Summary: FC<SummaryProps> = ({
  icon,
  summaryTitle1,
  summary1,
  summaryTitle2,
  summary2,
  recommendedAction,
  className = ''
}) => {
  const getVariantColor = (variant: SummaryItem['variant']) => {
    switch (variant) {
      case 'success':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-amber-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <Card className={className}>
      <ChartHeading title="Executive Summary" icon={icon} />
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <div className="w-1 h-5 bg-emerald-500 rounded-full" />
              {summaryTitle1}
            </h4>
            <ul className="space-y-3">
              {summary1.map((item, index) => (
                <li key={index} className="flex flex-row items-center gap-3 text-sm text-slate-600 group">
                  <div className={`w-2 h-2 ${getVariantColor(item.variant || 'success')} rounded-full flex-shrink-0`} />
                  <span className="leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <div className="w-1 h-5 bg-amber-500 rounded-full" />
              {summaryTitle2}
            </h4>
            <ul className="space-y-3">
              {summary2.map((item, index) => (
                <li key={index} className="flex flex-row items-center gap-3 text-sm text-slate-600 group">
                  <div className={`w-2 h-2 ${getVariantColor(item.variant || 'warning')} rounded-full flex-shrink-0`} />
                  <span className="leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {recommendedAction && (
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-slate-600 mt-0.5 flex-shrink-0">
                {recommendedAction.icon || <TrendingUp className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 mb-1">
                  {recommendedAction.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {recommendedAction.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
