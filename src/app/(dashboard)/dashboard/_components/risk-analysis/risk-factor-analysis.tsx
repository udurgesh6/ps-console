import { Card, CardContent } from "@/components/ui/card";
import { ChartHeading } from "@/components/charts/chart-heading";
import { TrendingUp } from "lucide-react";
import { ProgressItem } from "@/components/shared/progress-item";

export const RiskFactorAnalysis = () => {
  const riskFactors = [
    { factor: "Role Sensitivity", impact: 89, description: "Increasing risk factor" },
    { factor: "Past Incidents", impact: 76, description: "Decreasing risk factor" },
    { factor: "Training Completion", impact: 82, description: "Increasing risk factor" },
    { factor: "Department Risk", impact: 67, description: "Stable risk factor" },
    { factor: "Time Since Training", impact: 54, description: "Decreasing risk factor" },
  ];

  return (
    <Card>
      <ChartHeading title="Risk Factor Analysis" icon={TrendingUp} />
      <CardContent className="gap-4 flex flex-col">
        {riskFactors.map((riskFactor) => (
          <div key={riskFactor.factor} className="rounded-lg p-4 py-5 border border-slate-200">
            <ProgressItem
              key={riskFactor.factor}
              label={riskFactor.factor}
              value={riskFactor.impact}
              description={riskFactor.description}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
