import React from "react";

import { ChartHeading } from "@/components/charts/chart-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Clock } from "lucide-react";
import { ProgressItem } from "@/components/shared/progress-item";

export const AiEngineStatus = () => {
  const metrics = [
    { label: "Models Training", value: 87 },
    { label: "Risk Profiling", value: 94 },
    { label: "Auto-Simulations", value: 100 },
  ];

  return (
    <Card>
      <ChartHeading title="AI Engine Status" icon={Target} />
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <ProgressItem
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
        <div className="pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Clock className="h-4 w-4" />
            <span>Last updated: 2 minutes ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
