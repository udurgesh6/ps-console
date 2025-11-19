
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Globe, Users, BarChart2 } from "lucide-react";
import { ChartHeading } from "@/components/charts/chart-heading";
import { DetailCard } from "@/components/shared/detail-card";
import { dummySimulationProfiles } from "@/constants/temporary/simulation-profiles";

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

export const ThreatIntel = () => {
    const threats = threatsData.map(threat => ({
        name: threat.name,
        type: threat.trend, // Using 'trend' as the secondary type info
        status: threat.severity, // Using 'severity' as the main status/badge
        badgeVariant: threat.severity === 'High' ? 'destructive' : 'secondary',
        stats: [
            // Note the use of different icons and labels here, demonstrating flexibility
            { icon: Users, label: `${threat.detected} detected`, iconClassName: "text-orange-500" },
            { icon: Shield, label: `${threat.blocked} blocked`, iconClassName: "text-green-500" },
            { icon: BarChart2, label: `${threat.trend.charAt(0).toUpperCase() + threat.trend.slice(1)}`, iconClassName: "text-purple-500" },
        ]
    }));

    return (
        <Card>
            <ChartHeading title="Active Simulation" icon={Shield} />
            <CardContent>
                <div className="space-y-4">
                    {threats.map((threat) => (
                        // Pass the entire transformed object
                        <DetailCard key={threat.name} details={threat} />
                    ))}
                </div>
                
                {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <Globe className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Global Threat Feed</span>
                    </div>
                    <p className="text-xs text-blue-700">
                        Live updates from 50+ threat intelligence sources worldwide
                    </p>
                </div> */}
            </CardContent>
        </Card>
    );
};
