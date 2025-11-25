import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, BarChart2 } from "lucide-react";
import { ChartHeading } from "@/components/charts/chart-heading";
import { DetailCard } from "@/components/shared/detail-card";
import { dummySimulationProfiles } from "@/constants/temporary/simulation-profiles";
import { COLOR_SCHEMES } from "@/constants/colors";
import { ChartWrapper } from "@/components/layouts/dashboard/chart-wrapper";

const threatsData = [
  {
    id: 1,
    name: dummySimulationProfiles[0].name,
    severity: "High",
    trend: "increasing",
    detected: 127,
    blocked: 124,
  },
  {
    id: 2,
    name: dummySimulationProfiles[1].name,
    severity: "Medium",
    trend: "stable",
    detected: 89,
    blocked: 86,
  },
  {
    id: 3,
    name: dummySimulationProfiles[2].name,
    severity: "High",
    trend: "decreasing",
    detected: 45,
    blocked: 45,
  },
];

const threats = threatsData.map((threat) => ({
  name: threat.name,
  type: threat.trend,
  status: threat.severity,
  badgeVariant:
    threat.severity === "High"
      ? ("destructive" as const)
      : ("secondary" as const),
  stats: [
    {
      icon: Users,
      label: `${threat.detected} detected`,
      iconColor: COLOR_SCHEMES.risk.medium.main,
      iconBgColor: COLOR_SCHEMES.risk.medium.bg,
    },
    {
      icon: Shield,
      label: `${threat.blocked} blocked`,
      iconColor: COLOR_SCHEMES.security.shield.main,
      iconBgColor: COLOR_SCHEMES.security.shield.bg,
    },
    {
      icon: BarChart2,
      label: `${threat.trend.charAt(0).toUpperCase() + threat.trend.slice(1)}`,
      iconColor: COLOR_SCHEMES.analytics.chart.main,
      iconBgColor: COLOR_SCHEMES.analytics.chart.bg,
    },
  ],
}));

export const ThreatIntel = () => {
  const threats = threatsData.map((threat) => ({
    name: threat.name,
    type: threat.trend,
    status: threat.severity,
    badgeVariant:
      threat.severity === "High"
        ? ("destructive" as const)
        : ("secondary" as const),
    stats: [
      {
        icon: Users,
        label: `${threat.detected} detected`,
        iconColor: COLOR_SCHEMES.risk.medium.main,
        iconBgColor: COLOR_SCHEMES.risk.medium.bg,
      },
      {
        icon: Shield,
        label: `${threat.blocked} blocked`,
        iconColor: COLOR_SCHEMES.security.shield.main,
        iconBgColor: COLOR_SCHEMES.security.shield.bg,
      },
      {
        icon: BarChart2,
        label: `${threat.trend.charAt(0).toUpperCase() + threat.trend.slice(1)}`,
        iconColor: COLOR_SCHEMES.analytics.chart.main,
        iconBgColor: COLOR_SCHEMES.analytics.chart.bg,
      },
    ],
  }));

  return (
    <ChartWrapper
      title="Active Simulation"
      icon={Shield}
      iconColor={COLOR_SCHEMES.security.shield.main}
    >
      <div className="space-y-4">
        {threats.map((threat) => (
          <DetailCard key={threat.name} details={threat} />
        ))}
      </div>
    </ChartWrapper>
  );
};
